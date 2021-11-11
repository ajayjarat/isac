@ECHO OFF
setlocal DISABLEDELAYEDEXPANSION
SET BIN_TARGET=%~dp0/../toin0u/digitalocean/digitalocean
php "%BIN_TARGET%" %*
