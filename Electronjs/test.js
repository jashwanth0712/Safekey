const { spawn } = require('child_process');

function runPythonScript() {
    const pythonScriptPath = 'C:\Users\jashw\OneDrive\Desktop\Pangea\Safekey\scripts\safekey.py';
    const scriptArgs = ['-gu'];
    console.log('python', [pythonScriptPath, ...scriptArgs]);
    const pythonProcess = spawn('python', [pythonScriptPath, ...scriptArgs]);

    pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();
        document.getElementById('output').innerText = output;
    });

    pythonProcess.stderr.on('data', (data) => {
        const error = data.toString();
        console.error('Python script error:', error);
    });

    pythonProcess.on('close', (code) => {
        console.log('Python script exited with code:', code);
    });
}
