# Local-Only Python Workshop App

This project is a local-only workshop web app where the user can:

- read theory lessons with text, images, and LaTeX
- answer questions directly in the browser
- write Python code in a Monaco editor
- run that code locally with a selected Python interpreter on their own machine
- see text output, errors, and rich outputs such as images and rendered visualizations

The app does **not** use Docker, cloud execution, or a remote backend. Python code is executed only through a local FastAPI server bound to `127.0.0.1`.

## What this app uses

- Frontend: React + Vite
- Editor: Monaco Editor
- Backend: FastAPI
- Execution: `subprocess.Popen()` using the Python interpreter selected in the UI
- Local config: `local_config.json`

## Why a local backend is required

A browser cannot directly run your local Python interpreter or use packages installed in your local Python environment. Because of that, the frontend sends code to a local backend running on `127.0.0.1`, and the backend runs:

```text
[python_executable, script_path]
```

That is why packages installed in the selected interpreter, such as `qiskit`, `qiskit-aer`, `matplotlib`, and `pylatexenc`, are available to your code.

## Before you start

This README is written for a **brand-new macOS or Windows computer**.

You do **not** need Docker.

You do **not** need a database.

You do **not** need a cloud account.

You **do** need:

- this project folder on your computer
- Python 3
- Node.js
- npm

Important:

- `npm` is installed together with Node.js. You do **not** need to install npm separately.
- Tool versions change over time. As of **May 10, 2026**, the official Python download pages list **Python 3.14.4** as the latest Python 3 release, and the official Node.js download page lists **Node.js v24.15.0 LTS**.
- If those official pages show a newer stable version when you read this, use the newer stable version unless one of your packages documents a stricter requirement.

## Where to put the project folder

For the commands below, I assume:

- macOS: the project folder is at `~/ECHUB_moj`
- Windows: the project folder is at `C:\ECHUB_moj`

If your folder is somewhere else, that is fine. Just change the `cd` path and the Python executable path later in the app settings.

## Get the project onto the computer

You need the project folder on the machine before you run any commands.

If someone gave you a ZIP file:

1. Download the ZIP.
2. Extract it.
3. Rename the extracted folder to `ECHUB_moj` if needed.
4. Move it to:
   - macOS: your home folder, so the final path is `~/ECHUB_moj`
   - Windows: the root of drive `C:`, so the final path is `C:\ECHUB_moj`

If someone gave you the folder directly, just copy it there.

## Official download links

- Python for macOS: [python.org/downloads/macos](https://www.python.org/downloads/macos/)
- Python for Windows: [python.org/downloads/windows](https://www.python.org/downloads/windows/)
- Node.js download page: [nodejs.org/en/download](https://nodejs.org/en/download)
- npm installation docs: [docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Qiskit install guide: [IBM Quantum docs](https://quantum.cloud.ibm.com/docs/en/guides/install-qiskit)
- Qiskit Aer guide: [Qiskit Aer getting started](https://qiskit.github.io/qiskit-aer/getting_started.html)
- Matplotlib install guide: [matplotlib.org/stable/install/index.html](https://matplotlib.org/stable/install/index.html)
- pylatexenc package: [PyPI - pylatexenc](https://pypi.org/project/pylatexenc/)

---

## Full setup from zero on macOS

### 1. Install Python on macOS

1. Open [python.org/downloads/macos](https://www.python.org/downloads/macos/).
2. Download the latest **Python 3 macOS installer**.
3. On almost all modern Macs, the correct choice is the **macOS universal2 installer**.
4. Open the downloaded `.pkg` file.
5. Click through the installer and finish the installation.
6. Close the installer.
7. Open a **new** Terminal window.

Verify the installation:

```bash
python3 --version
python3 -m pip --version
```

You should see a Python 3 version and a pip version.

### 2. Install Node.js and npm on macOS

1. Open [nodejs.org/en/download](https://nodejs.org/en/download).
2. Download the **LTS** version, not the Current version.
3. Choose the **macOS Installer (.pkg)**.
4. Open the downloaded `.pkg` file.
5. Click through the installer and finish the installation.
6. Open a **new** Terminal window.

Verify the installation:

```bash
node -v
npm -v
```

You should see both a Node.js version and an npm version.

### 3. Create a Python virtual environment

Open Terminal and run:

```bash
cd ~/ECHUB_moj
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
```

After activation, your terminal usually shows something like `(.venv)` at the beginning of the line.

### 4. Install backend dependencies

Still in the same Terminal window, run:

```bash
cd ~/ECHUB_moj
python -m pip install -r backend/requirements.txt
```

### 5. Install Qiskit and all required Python libraries

Still in the same activated virtual environment, run:

```bash
cd ~/ECHUB_moj
python -m pip install "qiskit[visualization]" qiskit-aer matplotlib pylatexenc
```

Optional but useful for notebook-style local work:

```bash
python -m pip install jupyter
```

### 6. Install frontend dependencies

Still in Terminal, run:

```bash
cd ~/ECHUB_moj/frontend
npm install
```

### 7. Start the backend

From the project root:

```bash
cd ~/ECHUB_moj
source .venv/bin/activate
./start_backend.sh
```

If the script does not run for any reason, use the exact fallback command:

```bash
cd ~/ECHUB_moj
source .venv/bin/activate
python -m uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload
```

### 8. Start the frontend

Open a **second** Terminal window and run:

```bash
cd ~/ECHUB_moj
./start_frontend.sh
```

If the script does not run for any reason, use the exact fallback command:

```bash
cd ~/ECHUB_moj/frontend
npm run dev
```

### 9. Open the app

Open these URLs in your browser:

- Frontend: [http://127.0.0.1:5173](http://127.0.0.1:5173)
- Backend health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

### 10. Set the Python interpreter inside the app

In the app's `Execution Settings`, set:

- `Python executable` to:

```text
/Users/<your-mac-username>/ECHUB_moj/.venv/bin/python
```

If you used the exact folder from this README and your macOS home folder shortcut, that is usually:

```text
~/ECHUB_moj/.venv/bin/python
```

- `Working directory` to:

```text
/Users/<your-mac-username>/ECHUB_moj
```

- `Timeout` to something like:

```text
20
```

### 11. Verify that the app is using the correct Python

Paste this into the editor:

```python
import sys
print(sys.executable)
```

Click `Run`.

The printed path should point to your `.venv` Python.

### 12. Verify that Qiskit, Aer, Matplotlib, and pylatexenc are installed

In the activated virtual environment, run:

```bash
cd ~/ECHUB_moj
python -m pip show qiskit
python -m pip show qiskit-aer
python -m pip show matplotlib
python -m pip show pylatexenc
```

You can also verify imports directly:

```bash
python - <<'PY'
import qiskit
import matplotlib
import pylatexenc
from qiskit_aer import AerSimulator

print("qiskit:", qiskit.__version__)
print("matplotlib:", matplotlib.__version__)
print("pylatexenc:", pylatexenc.__version__)
print("AerSimulator OK:", AerSimulator)
PY
```

---

## Full setup from zero on Windows

For the easiest beginner setup on Windows, use **Command Prompt** instead of PowerShell.

### 1. Install Python on Windows

1. Open [python.org/downloads/windows](https://www.python.org/downloads/windows/).
2. Open the latest Python 3 release page.
3. Download the **Windows installer (64-bit)**.
4. Run the installer.
5. If the installer shows an option like **Add python.exe to PATH**, enable it.
6. Finish the installation.
7. Open a **new** Command Prompt window.

Verify the installation:

```bat
py --version
python --version
py -m pip --version
```

If `python` does not work but `py` does, that is still okay.

### 2. Install Node.js and npm on Windows

1. Open [nodejs.org/en/download](https://nodejs.org/en/download).
2. Download the **LTS** version, not the Current version.
3. Choose the **Windows Installer (.msi)**.
4. Run the installer.
5. Keep the default options unless your IT department requires something different.
6. Finish the installation.
7. Open a **new** Command Prompt window.

Verify the installation:

```bat
node -v
npm -v
```

### 3. Create a Python virtual environment

Open Command Prompt and run:

```bat
cd /d C:\ECHUB_moj
py -m venv .venv
.venv\Scripts\activate.bat
python -m pip install --upgrade pip
```

After activation, your prompt usually begins with `(.venv)`.

### 4. Install backend dependencies

Still in the same Command Prompt window, run:

```bat
cd /d C:\ECHUB_moj
python -m pip install -r backend\requirements.txt
```

### 5. Install Qiskit and all required Python libraries

Still in the same activated virtual environment, run:

```bat
cd /d C:\ECHUB_moj
python -m pip install "qiskit[visualization]" qiskit-aer matplotlib pylatexenc
```

Optional but useful for notebook-style local work:

```bat
python -m pip install jupyter
```

### 6. Install frontend dependencies

Still in Command Prompt, run:

```bat
cd /d C:\ECHUB_moj\frontend
npm install
```

### 7. Start the backend

From the project root:

```bat
cd /d C:\ECHUB_moj
.venv\Scripts\activate.bat
start_backend.bat
```

If the script does not run for any reason, use the exact fallback command:

```bat
cd /d C:\ECHUB_moj
.venv\Scripts\activate.bat
py -m uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload
```

### 8. Start the frontend

Open a **second** Command Prompt window and run:

```bat
cd /d C:\ECHUB_moj
start_frontend.bat
```

If the script does not run for any reason, use the exact fallback command:

```bat
cd /d C:\ECHUB_moj\frontend
npm run dev
```

### 9. Open the app

Open these URLs in your browser:

- Frontend: [http://127.0.0.1:5173](http://127.0.0.1:5173)
- Backend health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

### 10. Set the Python interpreter inside the app

In the app's `Execution Settings`, set:

- `Python executable` to:

```text
C:\ECHUB_moj\.venv\Scripts\python.exe
```

- `Working directory` to:

```text
C:\ECHUB_moj
```

- `Timeout` to something like:

```text
20
```

### 11. Verify that the app is using the correct Python

Paste this into the editor:

```python
import sys
print(sys.executable)
```

Click `Run`.

The printed path should point to your `.venv` Python.

### 12. Verify that Qiskit, Aer, Matplotlib, and pylatexenc are installed

In the activated virtual environment, run:

```bat
cd /d C:\ECHUB_moj
python -m pip show qiskit
python -m pip show qiskit-aer
python -m pip show matplotlib
python -m pip show pylatexenc
```

You can also verify imports directly:

```bat
python -c "import qiskit, matplotlib, pylatexenc; from qiskit_aer import AerSimulator; print('qiskit:', qiskit.__version__); print('matplotlib:', matplotlib.__version__); print('pylatexenc:', pylatexenc.__version__); print('AerSimulator OK:', AerSimulator)"
```

### Optional note for PowerShell users

If you prefer PowerShell, the activation command is:

```powershell
.venv\Scripts\Activate.ps1
```

If PowerShell blocks that script, the simplest path for beginners is to use **Command Prompt** instead.

---

## Test code for this app

Paste this into the coding editor:

```python
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

display(qc.draw("mpl"))

simulator = AerSimulator()
job = simulator.run(qc, shots=256)
result = job.result()
counts = result.get_counts()

print("Counts:", counts)
```

Expected result:

- the circuit image should render in the output panel
- `Counts: ...` should appear in text output

## If you want to use a different Python interpreter

You do **not** have to use `.venv`.

If you want to use another local interpreter, install the same packages into that interpreter:

```bash
/path/to/python -m pip install --upgrade pip
/path/to/python -m pip install "qiskit[visualization]" qiskit-aer matplotlib pylatexenc
```

Then set `Python executable` in the app to that exact interpreter path.

Examples:

macOS:

```text
/Users/yourname/miniconda3/envs/qiskit/bin/python
/Users/yourname/project/.venv/bin/python
```

Windows:

```text
C:\Users\yourname\miniconda3\envs\qiskit\python.exe
C:\Users\yourname\project\.venv\Scripts\python.exe
```

## Project structure

```text
ECHUB_moj/
├── backend/
│   ├── app.py
│   ├── completion_service.py
│   ├── config_store.py
│   ├── models.py
│   ├── requirements.txt
│   ├── rich_output_helper.py
│   └── runner.py
├── frontend/
│   ├── package.json
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── content/
│       │   └── lessons/
│       ├── utils/
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
├── local_config.json
├── start_backend.bat
├── start_backend.sh
├── start_frontend.bat
└── start_frontend.sh
```

## Security warning

This app executes arbitrary Python code locally with the permissions of the selected Python interpreter and your user account.

- There is no sandboxing.
- There is no container isolation.
- There is no remote execution.
- Use it only with trusted code.
- The backend binds only to `127.0.0.1`.

## Troubleshooting

### 1. `python`, `py`, `node`, or `npm` is not recognized

Close the terminal completely and open a new one.

Then check again:

macOS:

```bash
python3 --version
node -v
npm -v
```

Windows:

```bat
py --version
node -v
npm -v
```

If the commands still fail, reinstall Python or Node.js from the official links above.

### 2. `qiskit` import fails

Make sure you installed Qiskit into the **exact interpreter** selected in `Execution Settings`.

Use:

```bash
/path/to/python -m pip install "qiskit[visualization]" qiskit-aer matplotlib pylatexenc
```

Then verify:

```bash
/path/to/python -c "import qiskit; print(qiskit.__version__)"
```

### 3. `from qiskit_aer import AerSimulator` fails

Install Aer into the selected interpreter:

```bash
/path/to/python -m pip install qiskit-aer
```

Then verify:

```bash
/path/to/python -c "from qiskit_aer import AerSimulator; print(AerSimulator)"
```

### 4. `display(qc.draw("mpl"))` does not render

Install visualization dependencies into the selected interpreter:

```bash
/path/to/python -m pip install "qiskit[visualization]" matplotlib pylatexenc
```

Then verify:

```bash
/path/to/python - <<'PY'
from qiskit import QuantumCircuit
qc = QuantumCircuit(1)
qc.h(0)
figure = qc.draw("mpl")
print(type(figure))
PY
```

### 5. Backend is not reachable

Check that the backend is running on `127.0.0.1:8000`.

Quick health check:

```bash
curl http://127.0.0.1:8000/health
```

On Windows, you can also open:

[http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

### 6. Frontend is not reachable

Check that the frontend is running on `127.0.0.1:5173`.

### 7. Wrong Python interpreter is being used

In the editor, run:

```python
import sys
print(sys.executable)
```

The printed path must match the interpreter path from `Execution Settings`.

### 8. `npm install` or `npm run dev` fails with an `esbuild` platform error

This usually means `frontend/node_modules` was copied from another computer or another operating system.

Fix it like this:

macOS:

```bash
cd ~/ECHUB_moj/frontend
rm -rf node_modules package-lock.json
npm install
```

Windows Command Prompt:

```bat
cd /d C:\ECHUB_moj\frontend
rmdir /s /q node_modules
del package-lock.json
npm install
```

### 9. PowerShell blocks `.venv\Scripts\Activate.ps1`

Use Command Prompt instead:

```bat
cd /d C:\ECHUB_moj
.venv\Scripts\activate.bat
```

## Quick execution flow

1. You type code in the browser editor.
2. The frontend sends that code to the local FastAPI backend on `127.0.0.1`.
3. The backend writes the code to a temporary `.py` file.
4. The backend runs that file with the exact Python interpreter path selected in the app.
5. That interpreter uses its own installed packages, including `qiskit`, `qiskit-aer`, `matplotlib`, and `pylatexenc`.
6. The backend returns `stdout`, `stderr`, exit code, runtime, and rich outputs back to the browser.
7. The browser shows the result in the output panel.
