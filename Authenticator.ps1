Import-Module PowershellForXti -Force

$script:authConfig = [PSCustomObject]@{
    RepoOwner = "JasonBenfield"
    RepoName = "AuthenticatorWebApp"
    AppKey = "Authenticator"
    AppType = "WebApp"
    ProjectDir = "C:\XTI\src\AuthenticatorWebApp\Apps\AuthenticatorWebApp"
}

function Auth-New-XtiIssue {
    param(
        [Parameter(Mandatory)]
        [string] $IssueTitle,
        $Labels = @(),
        [string] $Body = ""
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
        [ValidateSet(“Development", "Production", "Staging", "Test")]
        $EnvName = "Production",
        [ValidateSet(“major”, "minor", "patch")]
        $VersionType = "minor"
    )
    $script:authConfig | New-XtiVersion @PsBoundParameters
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
        [ValidateSet("Production", “Development", "Staging", "Test")]
        [string] $EnvName="Production"
    )
    
    $ErrorActionPreference = "Stop"

    $activity = "Publishing to $EnvName"
    
    $timestamp = Get-Date -Format "yyMMdd_HHmmssfff"
    $backupFilePath = "$($env:ProgramData)\XTI\Backups\$EnvName\app_$timestamp.bak"
    if($EnvName -eq "Production" -or $EnvName -eq "Staging") {
        Write-Progress -Activity $activity -Status "Backuping up the app database" -PercentComplete 10
	    Xti-BackupAppDb -envName "Production" -BackupFilePath $backupFilePath
        $env:DOTNET_ENVIRONMENT=$EnvName
        $env:ASPNETCORE_ENVIRONMENT=$EnvName
    }
    if($EnvName -eq "Staging") { 
        Write-Progress -Activity $activity -Status "Restoring the app database" -PercentComplete 15
	    Xti-RestoreAppDb -EnvName $EnvName -BackupFilePath $backupFilePath
    }

    Write-Progress -Activity $activity -Status "Updating the app database" -PercentComplete 18
    Xti-UpdateAppDb -EnvName $EnvName

    if ($EnvName -eq "Test"){
        Write-Progress -Activity $activity -Status "Resetting the app database" -PercentComplete 20
	    Xti-ResetAppDb -EnvName $EnvName
    }

    Write-Progress -Activity $activity -Status "Generating the api" -PercentComplete 30
    Auth-GenerateApi -EnvName $EnvName

    Write-Progress -Activity $activity -Status "Running web pack" -PercentComplete 40
    $script:authConfig | Auth-Webpack

    Write-Progress -Activity $activity -Status "Building solution" -PercentComplete 50
    dotnet build 

    Write-Progress -Activity $activity -Status "Setting up Auth Web App" -PercentComplete 60
    Auth-Setup -EnvName $EnvName

    Write-Progress -Activity $activity -Status "Publishing website" -PercentComplete 80

    $script:authConfig | Xti-PublishWebApp -EnvName $EnvName
    if($EnvName -eq "Production") {
        $script:authConfig | Xti-PublishPackage -DisableUpdateVersion
    }
}

function New-XtiAuthUser {
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
        [string] $EnvName='Production'
    )
    $currentDir = (Get-Item .).FullName
    $env:DOTNET_ENVIRONMENT=$EnvName
    Set-Location Apps/AuthApiGeneratorApp
    dotnet run
    Set-Location $currentDir
}

function Auth-Setup {
    param (
        [ValidateSet("Production", "Development", "Staging", "Test")]
        [string] $EnvName="Development"
    )

    $env:DOTNET_ENVIRONMENT=$EnvName
    $env:ASPNETCORE_ENVIRONMENT=$EnvName

    $currentDir = (Get-Item .).FullName
    Set-Location Apps/AuthSetupConsoleApp
    dotnet run --no-launch-profile
    Set-Location $currentDir

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
	Xti-ResetAppDb -EnvName Test
    Auth-Setup -EnvName Test
}