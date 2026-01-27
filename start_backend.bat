@echo off
echo Starting Backend Server...
cd /d "%~dp0backend"
call venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8000
