@echo off
echo Starting FixMate Server...
echo.
echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found!
echo.
echo Installing dependencies...
call npm install

echo.
echo Starting FixMate server on http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
node server.js

