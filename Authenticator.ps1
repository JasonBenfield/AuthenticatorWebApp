Import-Module PowershellForXti -Force

$script:authConfig = [PSCustomObject]@{
    RepoOwner = "JasonBenfield"
    RepoName = "AuthenticatorWebApp"
    AppName = "Authenticator"
    AppType = "WebApp"
    ProjectDir = "C:\XTI\src\AuthenticatorWebApp\Apps\AuthenticatorWebApp"
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
        [ValidateSet(“major”, "minor", "patch")]
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

function Xti-CopyShared {
    $source = "..\SharedWebApp\Apps\SharedWebApp"
    $target = ".\Apps\AuthenticatorWebApp"
    robocopy "$source\Scripts\Shared\" "$target\Scripts\Shared\" *.ts /e /purge /njh /njs /np /ns /nc /nfl /ndl /a+:R
    robocopy "$source\Scripts\Shared\" "$target\Scripts\Shared\" /xf *.ts /e /purge /njh /njs /np /ns /nc /nfl /ndl /a-:R
    robocopy "$source\Views\Exports\Shared\" "$target\Views\Exports\Shared\" /e /purge /njh /njs /np /ns /nc /nfl /ndl /a+:R
}

function Auth-Publish {
    param(
        [ValidateSet("Production", “Development", "Staging", "Test")]
        [string] $EnvName="Production",
        [switch] $ExcludePackage
    )
    
    $ErrorActionPreference = "Stop"

    $activity = "Publishing to $EnvName"
    
    $timestamp = Get-Date -Format "yyMMdd_HHmmssfff"
    $backupFilePath = "$($env:XTI_AppData)\$EnvName\Backups\app_$timestamp.bak"
    if($EnvName -eq "Production" -or $EnvName -eq "Staging") {
        Write-Progress -Activity $activity -Status "Backuping up the app database" -PercentComplete 10
	    Xti-BackupMainDb -EnvName "Production" -BackupFilePath $backupFilePath
    }
    if($EnvName -eq "Staging") { 
        Write-Progress -Activity $activity -Status "Restoring the app database" -PercentComplete 15
	    Xti-RestoreMainDb -EnvName $EnvName -BackupFilePath $backupFilePath
    }

    Write-Progress -Activity $activity -Status "Updating the app database" -PercentComplete 18
    Xti-UpdateMainDb -EnvName $EnvName

    if ($EnvName -eq "Test"){
        Write-Progress -Activity $activity -Status "Resetting the app database" -PercentComplete 20
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

    Write-Progress -Activity $activity -Status "Generating the api" -PercentComplete 30
    Auth-GenerateApi -EnvName $EnvName -DefaultVersion $defaultVersion

    Xti-CopyShared

    Write-Progress -Activity $activity -Status "Running web pack" -PercentComplete 40
    $script:authConfig | Auth-Webpack

    Write-Progress -Activity $activity -Status "Building solution" -PercentComplete 50
    dotnet build 

    Write-Progress -Activity $activity -Status "Publishing website" -PercentComplete 80
    
    $script:authConfig | Xti-PublishWebApp -EnvName $EnvName
    if($EnvName -eq "Production") {
        if(-not $ExcludePackage) {
            $script:authConfig | Xti-PublishPackage -DisableUpdateVersion -Prod
        }
        Xti-EndPublish -BranchName $branch
        $script:authConfig | Xti-Merge
    }
    elseif(-not $ExcludePackage) {
        $script:authConfig | Xti-PublishPackage -DisableUpdateVersion
    }
}

function Auth-New-XtiUser {
    param(
        [ValidateSet(“Development", "Production", "Staging", "Test")]
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
    dotnet run --project Apps/AuthApiGeneratorApp --environment=$EnvName --Output:DefaultVersion="`"$DefaultVersion`""
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