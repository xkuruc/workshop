export const DEFAULT_QUESTION = `You can use this editor to solve Python tasks with your own local interpreter.

Suggested checks:
1. Print the interpreter that is actually running your code.
2. Try importing qiskit from the selected environment.
3. Change the working directory if your code depends on local project files.
`;

export const DEFAULT_CODE = `import sys

try:
    import qiskit
    print("Qiskit version:", qiskit.__version__)
except Exception as e:
    print("Qiskit import failed:", e)

print("Hello from local Python")
print("Interpreter:", sys.executable)
`;

export const DEFAULT_CONFIG = {
  pythonExecutable: "",
  workingDirectory: "",
  timeoutSeconds: 20,
};
