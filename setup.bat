@echo off
echo =========================================
echo   Blackcoffer Dashboard v2 - Setup
echo =========================================
echo.

echo [1/4] Setting up Backend...
cd /d "%~dp0backend"
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt

echo.
echo [2/4] Loading data to MongoDB...
echo Make sure MongoDB is running!
python load_data.py

echo.
echo [3/4] Setting up Frontend...
cd /d "%~dp0frontend"
call npm install

echo.
echo =========================================
echo   Setup Complete!
echo =========================================
echo.
echo To start the dashboard:
echo   1. Run start_backend.bat
echo   2. Run start_frontend.bat
echo   3. Open http://localhost:3000
echo.
pause
