Import-Module PowershellForXti -Force

$script:authConfig = [PSCustomObject]@{
    RepoOwner = "JasonBenfield"
    RepoName = "AuthenticatorWebApp"
    AppName = "Authenticator"
    AppType = "WebApp"
    ProjectDir = "Apps\AuthenticatorWebApp"
}

function Auth-New-XtiIssue {
    param(
        [Parameter(Mandatory)]
        [string] $IssueTitle,
        $Labels = @(),
        [string] $Body = "",
        [switch] $Start
    )
    $script:authConfig | New-XtiIssue @PsBoundParameters
}

function Auth-Xti-StartIssue {
    param(
        [Parameter(Position=0)]
        [long]$IssueNumber = 0,
        $IssueBranchTitle = "",
        $AssignTo = ""
    )
    $script:authConfig | Xti-StartIssue @PsBoundParameters
}

function Auth-New-XtiVersion {
    param(
        [ValidateSet(�major�, "minor", "patch")]
        $VersionType = "minor"
    )
    $script:authConfig | New-XtiVersion @PsBoundParameters
}

function Auth-Xti-Merge {
    param(
        $CommitMessage
    )
    $script:authConfig | Xti-Merge @PsBoundParameters
}

function Auth-New-XtiPullRequest {
    param(
        $CommitMessage
    )
    $script:authConfig | New-XtiPullRequest @PsBoundParameters
}

function Auth-Xti-PostMerge {
    param(
    )
    $script:authConfig | Xti-PostMerge @PsBoundParameters
}

function Auth-Publish {
    param(
        [ValidateSet("Production", �Development", "Staging", "Test")]
        [string] $EnvName="Development",
        [switch] $ExcludePackage
    )
    
    $ErrorActionPreference = "Stop"

    Write-Output "Publishing to $EnvName"
    
    $timestamp = Get-Date -Format "yyMMdd_HHmmssfff"
    $backupFilePath = "$($env:XTI_AppData)\$EnvName\Backups\app_$timestamp.bak"
    if($EnvName -eq "Production" -or $EnvName -eq "Staging") {
        Write-Output "Backuping up the app database"
	    Xti-BackupMainDb -EnvName "Production" -BackupFilePath $backupFilePath
    }
    if($EnvName -eq "Staging") { 
        Write-Output "Restoring the app database"
	    Xti-RestoreMainDb -EnvName $EnvName -BackupFilePath $backupFilePath
    }

    Write-Output "Updating the app database"
    Xti-UpdateMainDb -EnvName $EnvName

    if ($EnvName -eq "Test"){
        Write-Output "Resetting the app database"
	    Xti-ResetMainDb -EnvName $EnvName
    }
    Auth-Setup -EnvName $EnvName

    $defaultVersion = ""
    if($EnvName -eq "Production") {
        $branch = Get-CurrentBranchname
        Xti-BeginPublish -BranchName $branch
        $releaseBranch = Parse-ReleaseBranch -BranchName $branch
        $defaultVersion = $releaseBranch.VersionKey
    }

    Write-Output "Generating the api"
    Auth-GenerateApi -EnvName $EnvName -DefaultVersion $defaultVersion
    
    tsc -p "$($script:authConfig.ProjectDir)\Scripts\$($script:authConfig.AppName)\tsconfig.json"
    
    if($EnvName -eq "Production") {
        Auth-ImportWeb -Prod
    }
    else {
        Auth-ImportWeb
    }
    
    Write-Output "Running web pack"
    $script:authConfig | Auth-Webpack

    Write-Output "Building solution"
    dotnet build 

    Write-Output "Publishing website"
    
    $script:authConfig | Xti-PublishWebApp -EnvName $EnvName
    if($EnvName -eq "Production") {
        if(-not $ExcludePackage) {
            $script:authConfig | Xti-PublishPackage -DisableUpdateVersion -Prod
        }
        Auth-ExportWeb -Prod
        Xti-EndPublish -BranchName $branch
        $script:authConfig | Xti-Merge
    }
    else{
        if(-not $ExcludePackage) {
            $script:authConfig | Xti-PublishPackage -DisableUpdateVersion
        }
        Auth-ExportWeb
    }
}

function Auth-New-XtiUser {
    param(
        [ValidateSet(�Development", "Production", "Staging", "Test")]
        [string] $EnvName="Production", 
        [string] $CredentialKey = "", 
        [string] $UserName = "", 
        [string] $Password = "", 
        [string] $RoleNames = ""
    )
    $script:authConfig | New-XtiUser @PsBoundParameters
}

function Auth-GenerateApi {
    param (
        [ValidateSet("Development", "Production", "Staging", "Test")]
        [string] $EnvName="Production",
        [string] $DefaultVersion
    )
    dotnet build
    dotnet run --project Apps/AuthApiGeneratorApp --environment=$EnvName --Output:DefaultVersion="`"$DefaultVersion`""
    tsc -p Apps/AuthenticatorWebApp/Scripts/Authenticator/tsconfig.json
    
    if( $LASTEXITCODE -ne 0 ) {
        Throw "Auth api generator failed"
    }
}

function Auth-Setup {
    param (
        [ValidateSet("Production", "Development", "Staging", "Test")]
        [string] $EnvName="Development"
    )
    dotnet run --project Apps/AuthSetupConsoleApp --no-launch-profile --environment=$EnvName
    if( $LASTEXITCODE -ne 0 ) {
        Throw "Auth setup failed"
    }
}

function Auth-Webpack {
    param(
        [Parameter(Mandatory, ValueFromPipelineByPropertyName = $true)]
        [string] $ProjectDir
    )
    $currentDir = (Get-Item .).FullName
    Set-Location $ProjectDir
    webpack
    Set-Location $currentDir
}

function Auth-ResetTest {
	Xti-ResetMainDb -EnvName Test
    Auth-Setup -EnvName Test
}

function Auth-ImportWeb {
    param(
        [switch] $Prod
    )
    $script:authConfig | Xti-ImportWeb -Prod:$Prod -AppToImport Shared
}

function Auth-ExportWeb {
    param(
        [switch] $Prod
    )
    $script:authConfig | Xti-ExportWeb @PsBoundParameters
}