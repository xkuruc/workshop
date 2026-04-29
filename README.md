# Local-Only Python Workshop App

This project is a local-only workshop web app where the user:

- reads lesson content with text, images, and LaTeX
- answers questions directly in the browser
- writes Python code in a Monaco editor
- runs that code locally with a selected Python interpreter on their own machine
- sees text output, errors, and rich outputs such as images / HTML-like rendered output

The app does **not** use Docker, cloud execution, or a remote backend. The Python code is executed only through a local FastAPI server bound to `127.0.0.1`.

## What this app uses

- Frontend: React + Vite
- Editor: Monaco Editor
- Backend: FastAPI
- Execution: `subprocess.Popen()` using the Python interpreter selected in the UI
- Local config: `local_config.json`

## Why a local backend is required

A browser cannot directly run your local Python interpreter or use libraries installed in your local virtual environment / Conda environment. Because of that, the frontend sends code to a local backend on `127.0.0.1`, and the backend runs:

```text
[python_executable, script_path]
```

That is why packages installed in the selected interpreter, such as `qiskit`, `qiskit-aer`, `matplotlib`, and `pylatexenc`, are available to your code.

## Recommended setup

The simplest setup is:

1. create one Python virtual environment in this repo
2. install backend dependencies into it
3. install Qiskit and visualization packages into the same environment
4. point the app to that environment's Python executable

That way:

- the backend runs from `.venv`
- your executed code also runs from `.venv`
- autocomplete and rich outputs use the same interpreter and installed packages

## Exact setup from zero

### 1. Requirements

You need:

- Python 3
- Node.js + npm

Check versions:

```bash
python3 --version
npm --version
node --version
```

On Windows:

```bat
py --version
npm --version
node --version
```

## 2. Create the Python virtual environment

From the project root:

macOS / Linux:

```bash
cd /Users/kuruckopc/Desktop/ECHUB_moj
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
```

Windows PowerShell:

```powershell
cd C:\Users\kuruckopc\Desktop\ECHUB_moj
py -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

Windows Command Prompt:

```bat
cd /d C:\Users\kuruckopc\Desktop\ECHUB_moj
py -m venv .venv
.venv\Scripts\activate.bat
python -m pip install --upgrade pip
```

## 3. Install backend dependencies

Still in the activated virtual environment:

```bash
python -m pip install -r backend/requirements.txt
```

## 4. Install frontend dependencies

From the project root:

```bash
cd frontend
npm install
cd ..
```

## 5. Install all Python libraries needed for Qiskit + visualization

Install the libraries into the **same Python interpreter that you plan to select in the app**.

Recommended command:

```bash
python -m pip install "qiskit[visualization]" qiskit-aer matplotlib pylatexenc
```

This is the recommended setup for this app because it covers:

- `qiskit`
- `qiskit-aer`
- `matplotlib`
- `pylatexenc`

If you also want notebook support in that environment, you can add:

```bash
python -m pip install jupyter
```

## 6. Start the backend

From the project root:

macOS / Linux:

```bash
cd /Users/kuruckopc/Desktop/ECHUB_moj
source .venv/bin/activate
./start_backend.sh
```

Alternative exact command:

```bash
cd /Users/kuruckopc/Desktop/ECHUB_moj
source .venv/bin/activate
python -m uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload
```

Windows Command Prompt:

```bat
cd /d C:\Users\kuruckopc\Desktop\ECHUB_moj
.venv\Scripts\activate.bat
start_backend.bat
```

Alternative exact command:

```bat
cd /d C:\Users\kuruckopc\Desktop\ECHUB_moj
.venv\Scripts\activate.bat
py -m uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload
```

## 7. Start the frontend

Open a second terminal.

macOS / Linux:

```bash
cd /Users/kuruckopc/Desktop/ECHUB_moj
./start_frontend.sh
```

Alternative exact command:

```bash
cd /Users/kuruckopc/Desktop/ECHUB_moj/frontend
npm run dev
```

Windows:

```bat
cd /d C:\Users\kuruckopc\Desktop\ECHUB_moj
start_frontend.bat
```

Alternative exact command:

```bat
cd /d C:\Users\kuruckopc\Desktop\ECHUB_moj\frontend
npm run dev
```

## 8. Open the app

Open:

- Frontend: [http://127.0.0.1:5173](http://127.0.0.1:5173)
- Backend: [http://127.0.0.1:8000](http://127.0.0.1:8000)

## 9. Point the app to the correct Python interpreter

In `Execution Settings`, set:

- `Python executable`
- `Working directory`
- `Timeout`

If you used the repo `.venv`, then use:

macOS / Linux:

```text
/Users/kuruckopc/Desktop/ECHUB_moj/.venv/bin/python
```

Windows:

```text
C:\Users\kuruckopc\Desktop\ECHUB_moj\.venv\Scripts\python.exe
```

Recommended working directory:

macOS / Linux:

```text
/Users/kuruckopc/Desktop/ECHUB_moj
```

Windows:

```text
C:\Users\kuruckopc\Desktop\ECHUB_moj
```

## 10. Verify the installed Python packages

With the same interpreter that you plan to select in the app, run:

```bash
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

## If you want to use a different interpreter

You do **not** have to use `.venv`.

If you want to use another local interpreter, install the same packages into that interpreter:

```bash
/path/to/python -m pip install --upgrade pip
/path/to/python -m pip install "qiskit[visualization]" qiskit-aer matplotlib pylatexenc
```

Then set `Python executable` in the app to that exact interpreter path.

Examples:

macOS / Linux:

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

### 1. `qiskit` import fails

Make sure you installed Qiskit into the exact interpreter selected in `Execution Settings`.

Use:

```bash
/path/to/python -m pip install "qiskit[visualization]" qiskit-aer matplotlib pylatexenc
```

Then verify:

```bash
/path/to/python -c "import qiskit; print(qiskit.__version__)"
```

### 2. `from qiskit_aer import AerSimulator` fails

Install Aer into the selected interpreter:

```bash
/path/to/python -m pip install qiskit-aer
```

Then verify:

```bash
/path/to/python -c "from qiskit_aer import AerSimulator; print(AerSimulator)"
```

### 3. `display(qc.draw("mpl"))` does not render

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

### 4. Backend is not reachable

Check that the backend is running on `127.0.0.1:8000`.

Quick health check:

```bash
curl http://127.0.0.1:8000/health
```

### 5. Frontend is not reachable

Check that the frontend is running on `127.0.0.1:5173`.

### 6. Wrong Python interpreter is being used

In the editor, run:

```python
import sys
print(sys.executable)
```

The printed path must match the interpreter path from `Execution Settings`.

## Useful links

- Qiskit install guide: [IBM Quantum docs](https://docs.quantum.ibm.com/guides/install-qiskit)
- Qiskit Aer install guide: [Qiskit Aer getting started](https://qiskit.github.io/qiskit-aer/getting_started.html)
- Matplotlib install guide: [Matplotlib installation](https://matplotlib.org/stable/install/index.html)
- pylatexenc package: [PyPI - pylatexenc](https://pypi.org/project/pylatexenc/)
