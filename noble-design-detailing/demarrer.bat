@echo off
REM ===========================================================================
REM  Noble Design Detailing - lancement du site en local (Windows)
REM
REM  Usage : double-cliquer sur ce fichier,
REM          ou dans un terminal : demarrer.bat 3000
REM
REM  Le site est 100%% statique : aucune installation, aucune dependance.
REM  Pour arreter le serveur : fermer cette fenetre ou Ctrl + C
REM ===========================================================================

setlocal
set PORT=%1
if "%PORT%"=="" set PORT=8080

cd /d "%~dp0"

echo.
echo   Noble Design Detailing - serveur local
echo   ---------------------------------------
echo   Dossier : %CD%
echo   Adresse : http://localhost:%PORT%
echo   Arreter : Ctrl + C
echo.

start "" "http://localhost:%PORT%"

where python >nul 2>&1
if %ERRORLEVEL%==0 (
  python -m http.server %PORT%
  goto :fin
)

where py >nul 2>&1
if %ERRORLEVEL%==0 (
  py -m http.server %PORT%
  goto :fin
)

where npx >nul 2>&1
if %ERRORLEVEL%==0 (
  npx --yes serve . --listen %PORT%
  goto :fin
)

echo   Aucun serveur local trouve (python ou npx).
echo   Solution la plus simple : ouvrez directement index.html
echo   dans votre navigateur.
pause

:fin
endlocal
