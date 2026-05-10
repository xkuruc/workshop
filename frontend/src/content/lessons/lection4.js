import bellCircuitIllustration from "../../assets/qiskit-circuit.svg";
import c1 from "../../assets/c1.png";
import c2 from "../../assets/c2.png";
import c3 from "../../assets/c3.png";
import c4 from "../../assets/c4.png";
import c5 from "../../assets/c5.png";
import c6 from "../../assets/c6.png";

const qiskitFirstCircuitLesson = {
  id: "quantum-circuit",
  title: "Lesson 4: Quantum Circuits",
  summary: "A clear introduction to reading quantum circuits, measurement, registers, and entanglement diagrams.",
  theory: `


# Quantum circuit

So far, we have explained what a qubit, a quantum state, and a quantum gate are.

Now we will show how we combine these elements into a complete **quantum computation**.

We write such a computation using a **quantum circuit**.

---

## What is a quantum circuit?

A **quantum circuit** is a sequence of quantum operations applied to qubits.

A quantum circuit tells us:

- which qubits we start with,
- which quantum gates we apply to specific qubits,
- in what order we apply them,
- when we measure the qubits,
- and what classical result we obtain.

We can think of a quantum circuit as a **recipe for quantum computation**.

It is not an electrical circuit in the classical sense. **It is a diagram that describes how the quantum state changes during computation**.

---

## How do we read a quantum circuit?

We read a quantum circuit **from left to right**.

On the left, we have the initial states of the qubits. Moving to the right, we apply quantum gates. At the end of the circuit, we measure the qubits.

For example:

![My image](${c1})

This circuit means:

1. we start with the state $|0\\rangle$,
2. we apply the **Hadamard** gate,
3. then we apply the **X** gate,
4. and finally we measure the qubit.

The order of the gates is very important, because a different order can lead to a different resulting state.

---

## Qubit wires

Each qubit has its own horizontal line in the circuit.

For example, a circuit with two qubits may look like this:

![My image](${c2})

Here we have two qubits:

- $q0$ is the first qubit,
- $q1$ is the second qubit.

These lines do not represent classical electrical wires. They are only graphical representations of how the states of the qubits change during computation.

---

## Single-qubit and multi-qubit gates

Some gates act only on one qubit.

Examples of **single-qubit gates** include:

- **X**,
- **Y**,
- **Z**,
- **H**,
- **$R_x(\\theta)$**,
- **$R_y(\\theta)$**,
- **$R_z(\\theta)$**.

For example:

![My image](${c3})

This gate acts only on qubit $q0$.

However, some gates act on multiple qubits at once.

A typical example is the **CNOT** gate:

![My image](${c4})

In this notation:

- the dot **●** marks the **control qubit**,
- the **X** symbol marks the **target qubit**,
- the vertical line shows that this is one shared two-qubit operation.

The **CNOT** gate flips the target qubit only when the control qubit is in the state $|1\\rangle$.

---

## Measurement

At the end of a quantum circuit, we usually perform **measurement**.

Measurement converts the quantum state into a classical result.

For example:

![My image](${c5})

Before measurement, a qubit can be in superposition. After measurement, however, we get a specific classical result: **0** or **1**, depending on the probabilities.

For example, if we apply the Hadamard gate to the state $|0\\rangle$, we get:

$$
H|0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)
$$

After measurement, we get:

- the result **0** with 50% probability,
- the result **1** with 50% probability.

Measurement is therefore the moment when we obtain classical information from a quantum state. But measurement destroys the quantum information, and it also affects the information in other qubits with which it is entangled.

---

## Quantum and classical registers

In quantum circuits, we often distinguish between two types of registers:

- a **quantum register** contains qubits,
- a **classical register** contains measurement results.

For example:

![My image](${c6})

then we store the measurement result of qubit $q0$ in $c0$, and the measurement result of qubit $q1$ in $c1$.

---

## Example of a circuit with entanglement

Now let us look at a circuit with two qubits:

![My image](${c6})

This circuit does the following:

1. Both qubits start in the state $|0\\rangle$.
2. We apply the **Hadamard** gate to the first qubit $q0$.
3. Qubit $q0$ enters superposition.
4. Then we apply the **CNOT** gate.
5. The first qubit is the **control** and the second qubit is the **target**.
6. An entangled state is created.
7. Finally, we measure both qubits.

The resulting state can be written as:

$$
\\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)
$$

That means that after measurement, we get either:

- **00**,
- or **11**.

But we do not get **01** or **10**.

This example shows that two qubits can be entangled so that their measurement outcomes are related.

---

## What is a quantum circuit made of?

A quantum circuit consists of several basic parts:

### Qubits

Qubits are the basic units of quantum information.

### Initial state

Most often, we begin with all qubits in the state $|0\\rangle$.

### Quantum gates

Quantum gates change the states of qubits.

### Multi-qubit operations

Some operations connect multiple qubits.

### Measurement

Measurement converts the quantum state into a classical result.

### Classical bits

Classical bits store the measurement results.

---

## Quantum circuit as an algorithm

We can understand a quantum circuit as a concrete representation of a quantum algorithm.

A **quantum algorithm** tells us what we want to compute.
A **quantum circuit** tells us how to perform that computation using qubits and quantum gates.

In other words:

> A quantum algorithm is the idea of the computation.
> A quantum circuit is the concrete procedure for writing that idea using gates.
`,
  questions: [
    {
      id: "q1",
      type: "multiple-choice",
      prompt: "A quantum circuit is:",
      options: [
        "a sequence of quantum operations applied to qubits",
        "an electrical cable inside a computer",
        "only one qubit",
        "a measurement result",
      ],
      correctAnswer: "a sequence of quantum operations applied to qubits",
      explanation: "",
    },
    // {
    //   id: "q2",
    //   type: "short-answer",
    //   prompt: "In English, a quantum circuit is called a quantum __________.",
    //   correctAnswer: ["circuit"],
    //   explanation: "",
    // },
    // {
    //   id: "q3",
    //   type: "multiple-choice",
    //   prompt: "We read a quantum circuit:",
    //   options: [
    //     "from left to right",
    //     "from right to left",
    //     "from bottom to top",
    //     "randomly",
    //   ],
    //   correctAnswer: "from left to right",
    //   explanation: "",
    // },
    {
      id: "q4",
      type: "multiple-choice",
      prompt: "At the end of a quantum circuit, we usually perform:",
      options: [
        "measurement",
        "circuit deletion",
        "qubit copying",
        "renaming of a qubit",
      ],
      correctAnswer: "measurement",
      explanation: "",
    },
    {
      id: "q5",
      type: "multiple-choice",
      prompt: "Measurement converts a quantum state into:",
      options: [
        "a classical result",
        "a new quantum computer",
        "another gate",
        "a Bloch sphere",
      ],
      correctAnswer: "a classical result",
      explanation: "",
    },
    // {
    //   id: "q6",
    //   type: "short-answer",
    //   prompt: "A quantum register contains __________.",
    //   correctAnswer: ["qubits", "qubit"],
    //   explanation: "",
    // },
    // {
    //   id: "q7",
    //   type: "short-answer",
    //   prompt: "A classical register contains the results of __________.",
    //   correctAnswer: ["measurement", "measurements"],
    //   explanation: "",
    // },
    // {
    //   id: "q8",
    //   type: "multiple-choice",
    //   prompt: "In a CNOT gate, the dot ● marks the:",
    //   options: [
    //     "control qubit",
    //     "target qubit",
    //     "classical bit",
    //     "measurement",
    //   ],
    //   correctAnswer: "control qubit",
    //   explanation: "",
    // },
    // {
    //   id: "q9",
    //   type: "multiple-choice",
    //   prompt: "True or false: The CNOT gate flips the target qubit only when the control qubit is in the state ∣1⟩.",
    //   options: [
    //     "True",
    //     "False",
    //   ],
    //   correctAnswer: "True",
    //   explanation: "",
    // },
    // {
    //   id: "q10",
    //   type: "multiple-choice",
    //   prompt: "In the entanglement example, after measurement we mainly get the results:",
    //   options: [
    //     "00 or 11",
    //     "01 or 10",
    //     "only 00",
    //     "only 10",
    //   ],
    //   correctAnswer: "00 or 11",
    //   explanation: "",
    // },
  ],
  showEditor: false,
  starterCode: `import sys

print("Interpreter:", sys.executable)

try:
    from qiskit import QuantumCircuit
    circuit = QuantumCircuit(2, 2)
    circuit.h(0)
    circuit.cx(0, 1)
    circuit.measure([0, 1], [0, 1])
    print("Qiskit import OK")
    print(circuit)
except Exception as error:
    print("Qiskit import failed:", error)
`,
};

export default qiskitFirstCircuitLesson;
