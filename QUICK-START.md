# FixMate Website - Quick Start Guide

## 🚀 Easy Ways to Start Your Server

### Method 1: Double-Click Batch File (Easiest)
1. Double-click `start-server.bat`
2. The server will automatically:
   - Check if Node.js is installed
   - Install dependencies if needed
   - Start the server
3. Open http://localhost:8080 in your browser

### Method 2: PowerShell Script
1. Right-click on `start-server.ps1`
2. Select "Run with PowerShell"
3. If you get execution policy error, run this first:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### Method 3: Command Line
```bash
# Install dependencies (first time only)
npm install

# Start server
npm start
```

### Method 4: One-time Setup
```bash
# This installs dependencies AND starts server
npm run setup
```

## 🔧 Troubleshooting

### If you get "ERR_CONNECTION_REFUSED":
1. Make sure the server is running (check terminal)
2. Try: `npm run restart` (kills old server and starts new one)
3. Check if port 8080 is being used by another program

### If you get "Node.js not found":
1. Install Node.js from https://nodejs.org/
2. Restart your computer after installation
3. Try the batch file again

### If you get "npm not found":
1. Node.js includes npm, so reinstall Node.js
2. Make sure to check "Add to PATH" during installation

## 📁 Project Structure
```
D:\My Web\
├── start-server.bat      ← Double-click this to start
├── start-server.ps1      ← PowerShell version
├── server.js             ← Main server file
├── package.json          ← Dependencies
├── index.html            ← Home page
├── pass.html             ← FixMate Pass page
├── skilled-labor.html    ← Skilled Labor page
├── home-services.html    ← Home Services page
├── quick-fix.html        ← Quick Fix page
├── styles.css            ← All styling
└── images/               ← Website images
```

## 🌐 Access Your Website
Once the server is running, open your browser and go to:
- **Main Site**: http://localhost:8080
- **FixMate Pass**: http://localhost:8080/pass.html
- **Skilled Labor**: http://localhost:8080/skilled-labor.html
- **Home Services**: http://localhost:8080/home-services.html
- **Quick Fix**: http://localhost:8080/quick-fix.html

## ⚡ Quick Commands
- `npm start` - Start server
- `npm run restart` - Restart server
- `npm run setup` - Install deps + start server
- `npm run install-deps` - Just install dependencies

---
**Note**: Keep the terminal/command prompt open while the server is running. Close it to stop the server.


