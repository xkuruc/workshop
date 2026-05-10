import bellCircuitIllustration from "../../assets/qiskit-circuit.svg";

const qiskitFirstCircuitLesson = {
  id: "basic-quantum-states-and-quantum-gates",
  title: "Lesson 3: Basic Quantum States and Quantum Gates",
  summary: "A practical introduction to Dirac notation, single-qubit gates, rotation gates, and the CNOT gate.",
  theory: `


# Basic quantum states and quantum gates

## Basic quantum states

We write the basic quantum states like this: $|0\\rangle \\quad \\text{and} \\quad |1\\rangle$

This notation is called **Dirac notation**.

- The symbol $|0\\rangle$ represents the quantum state **0**.
- The symbol $|1\\rangle$ represents the quantum state **1**.

A qubit can, for example, be in the state:

$$
|\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle
$$

That means the qubit is in a **superposition** of the states $|0\\rangle$ and $|1\\rangle$.

The values $\\alpha$ and $\\beta$ determine the probabilities with which, after measurement, we get the result **$|0\\rangle$** or **$|1\\rangle$**.

It is important to understand that during computation, a qubit is not just a hidden zero or one. It is a quantum state that we can work with using special operations.

These operations are called **quantum operations**, or more commonly **quantum gates**.

---

## Quantum operations

A **quantum operation** is a transformation that we apply to one or more qubits.

When we apply a quantum operation to a qubit, we change its state.

In classical computing, we know logic gates such as:

- **NOT**,
- **AND**,
- **OR**.

These gates work with classical bits. For example, the **NOT** gate changes:

$$
0 \\rightarrow 1
$$

and also:

$$
1 \\rightarrow 0
$$

In quantum computing, we have a similar idea, but instead of classical bits we work with **qubits**.

Quantum operations are called **quantum gates**. Every quantum gate changes the quantum state according to a precisely defined mathematical rule.

Quantum gates are often written as **matrices**.

We can think of a qubit as a **vector** and a quantum gate as a **matrix** that transforms that vector.

For the purposes of this workshop, however, it is not necessary to go too deeply into linear algebra. The important point is to understand that a **quantum gate changes the state of a qubit**, and that **classical computers simulate quantum operations** as matrix multiplication.

---

## Why we say “quantum gate”

We use the term **gate** because an operation is a basic building block of quantum computation.

Just as in a classical computer we build computations from logical operations, in a quantum computer we build computations from **quantum gates**.

A quantum gate can, for example:

- flip the state of a qubit,
- change the phase of a qubit,
- rotate the state of a qubit around a particular axis,
- create superposition,
- entangle multiple qubits with one another.

A **quantum algorithm** is then a sequence of such gates applied to qubits.

---

## Basic quantum gates

In this part, we will introduce the basic **single-qubit quantum gates**.
These gates act on one qubit and change its state on the Bloch sphere.

First we will look at the **X**, **Y**, and **Z** gates.
We can intuitively imagine these gates as rotations of the qubit around the corresponding axes:

- the **X** gate is a rotation around the **X** axis by 180°,
- the **Y** gate is a rotation around the **Y** axis by 180°,
- the **Z** gate is a rotation around the **Z** axis by 180°.

In other words, the **X**, **Y**, and **Z** gates correspond to rotations by an angle of $\\pi$ radians around the X, Y, and Z axes.

Later, we will also work with more general rotation gates: **$R_x(\\theta), \\quad R_y(\\theta), \\quad R_z(\\theta)$**

These gates do the same kind of thing as the X, Y, and Z gates, but with one important difference: the angle of rotation does not have to be only 180°. We can choose any angle $\\theta$.

That means:

- **X** is a special case of $R_x(\\theta)$,
- **Y** is a special case of $R_y(\\theta)$,
- **Z** is a special case of $R_z(\\theta)$.

Using combinations of the rotation gates $R_x(\\theta)$, $R_y(\\theta)$, and $R_z(\\theta)$, we can rotate a qubit to practically any point on the Bloch sphere.

This is a very important idea:
if we can rotate a qubit arbitrarily, we can perform general single-qubit operations on it.
Combined with multi-qubit gates, this allows us to build universal quantum computations.

We will go through the individual gates in more detail in the following sections. For each of them, we will explain the intuition, show how it changes the state of a qubit, and also include its **matrix notation** so that the description is precise and complete.

Matrix notation is important because we can mathematically describe the state of a qubit as a vector. We can geometrically imagine this vector as a point on the Bloch sphere. When we apply a quantum gate to a qubit, we change its state, that is, we “rotate” or **transform** this vector. In linear algebra, such transformations are described using matrix-vector multiplication.

That is why we write quantum gates as matrices, and their action on a qubit can be written as:

$$
\\text{new state} = \\text{gate} \\cdot \\text{original state}
$$

Matrix notation therefore allows us to calculate and simulate the behavior of a quantum computer precisely: how the state of a qubit changes after applying a given gate.

Where the states $\\lvert 0 \\rangle$ and $\\lvert 1 \\rangle$ are represented as:

$$
\\lvert 0 \\rangle =
\\begin{bmatrix}
1 \\\\
0
\\end{bmatrix}
$$

$$
\\lvert 1 \\rangle =
\\begin{bmatrix}
0 \\\\
1
\\end{bmatrix}
$$

In other words:
- $\\lvert 0 \\rangle$ points “up” toward the north pole,
- $\\lvert 1 \\rangle$ points “down” toward the south pole.

---

## X gate

The **X** gate is the quantum version of the classical **NOT** gate.

If we have a qubit in the state $|0\\rangle$, the X gate changes it to $|1\\rangle$.

If we have a qubit in the state $|1\\rangle$, the X gate changes it to $|0\\rangle$.

### Notation

$$
X|0\\rangle = |1\\rangle
$$

$$
X|1\\rangle = |0\\rangle
$$

That is why the **X** gate is often called the **bit-flip gate**, because it flips the value of a qubit in a way similar to the classical NOT operation.

### Matrix notation of the X gate

$$
X =
\\begin{bmatrix}
0 & 1 \\\\
1 & 0
\\end{bmatrix}
$$

### Intuitive explanation

We can imagine the X gate as rotating the qubit state around the **X** axis by $180^\\circ$ on the Bloch sphere.

---

## Z gate

The **Z** gate does not change $|0\\rangle$ into $|1\\rangle$ or $|1\\rangle$ into $|0\\rangle$.

Instead, it changes the **phase** of the state $|1\\rangle$.

### Notation

$$
Z|0\\rangle = |0\\rangle
$$

$$
Z|1\\rangle = -|1\\rangle
$$

That means the state $|0\\rangle$ remains unchanged, but the state $|1\\rangle$ gets a minus sign.
We can imagine the Z gate as rotating the qubit state around the **Y** axis by $180^\\circ$ on the Bloch sphere.

### Matrix notation of the Z gate

$$
Z =
\\begin{bmatrix}
1 & 0 \\\\
0 & -1
\\end{bmatrix}
$$

### Why is phase important?

At first sight, it may seem that the minus sign is not important.

If we simply measured the state $|1\\rangle$, we would still get the result **1**.

In quantum computation, however, phase is very important because it affects **interference** between different states.

Quantum algorithms often rely precisely on the fact that some superpositions are amplified by this phenomenon while others cancel out.

### Intuitive explanation

We can imagine the **Z** gate as rotating the qubit state around the **Z** axis by $180^\\circ$ on the Bloch sphere.

---

## Y gate

The **Y** gate is a combination of a state flip and a phase change. It is a combination of the X and Z gates.

### Notation

$$
Y|0\\rangle = i|1\\rangle
$$

$$
Y|1\\rangle = -i|0\\rangle
$$

Here the imaginary unit $i$ appears, where:

$$
i^2 = -1
$$

### Matrix notation of the Y gate

$$
Y =
\\begin{bmatrix}
0 & -i \\\\
i & 0
\\end{bmatrix}
$$

So the **Y** gate, similarly to X, flips $|0\\rangle$ and $|1\\rangle$, but at the same time adds a complex phase.

### Intuitive explanation

We can imagine the Y gate as rotating the qubit state around the **Y** axis by $180^\\circ$ on the Bloch sphere.

---

## Hadamard gate

The **Hadamard** gate, often denoted **H**, is one of the most important single-qubit quantum gates.

It is used mainly to create **superposition**.

If we have a qubit in the state $|0\\rangle$, the **H** gate changes it into an equal superposition of the states $|0\\rangle$ and $|1\\rangle$.

If we have a qubit in the state $|1\\rangle$, the **H** gate also changes it into a superposition, but with a minus sign in front of the state $|1\\rangle$.

### Notation

$$
H|0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)
$$

$$
H|1\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle)
$$

That is why the **Hadamard** gate is often used to prepare a qubit in superposition.

### Matrix notation of the H gate

$$
H =
\\frac{1}{\\sqrt{2}}
\\begin{bmatrix}
1 & 1 \\\\
1 & -1
\\end{bmatrix}
$$

### Intuitive explanation

We can imagine the **Hadamard** gate as an operation that moves the basis states $|0\\rangle$ and $|1\\rangle$ into superposition, exactly onto the equator.

The **Hadamard** gate is very important because it is used at the beginning of many quantum algorithms to create superposition.

---

## Rotation gates Rx, Ry, Rz

In addition to the **X**, **Y**, and **Z** gates, we also use rotation gates.

These gates rotate the quantum state by a certain angle.

The most common ones are:

| Gate | Meaning |
|---|---|
| $R_x(\\theta)$ | rotation around the X axis |
| $R_y(\\theta)$ | rotation around the Y axis |
| $R_z(\\theta)$ | rotation around the Z axis |

We denote the angle of rotation by the Greek letter $\\theta$.

### Notation of rotation gates

We write rotation gates using the rotation angle $\\theta$.

The matrix notation of the gate $R_x(\\theta)$ is:

$$
R_x(\\theta) =
\\begin{bmatrix}
\\cos\\left(\\frac{\\theta}{2}\\right) & -i\\sin\\left(\\frac{\\theta}{2}\\right) \\\\
-i\\sin\\left(\\frac{\\theta}{2}\\right) & \\cos\\left(\\frac{\\theta}{2}\\right)
\\end{bmatrix}
$$

The matrix notation of the gate $R_y(\\theta)$ is:

$$
R_y(\\theta) =
\\begin{bmatrix}
\\cos\\left(\\frac{\\theta}{2}\\right) & -\\sin\\left(\\frac{\\theta}{2}\\right) \\\\
\\sin\\left(\\frac{\\theta}{2}\\right) & \\cos\\left(\\frac{\\theta}{2}\\right)
\\end{bmatrix}
$$

The matrix notation of the gate $R_z(\\theta)$ is:

$$
R_z(\\theta) =
\\begin{bmatrix}
e^{-i\\frac{\\theta}{2}} & 0 \\\\
0 & e^{i\\frac{\\theta}{2}}
\\end{bmatrix}
$$

---

### X, Y, Z as special cases of rotation gates

We can think of the **X**, **Y**, and **Z** gates as special cases of rotation gates.

Specifically, they are rotations by: $\\theta = 180^\\circ = \\pi$

So we can intuitively say:

| Gate | Interpretation |
|---|---|
| **X** | rotation by $180^\\circ$ around the X axis |
| **Y** | rotation by $180^\\circ$ around the Y axis |
| **Z** | rotation by $180^\\circ$ around the Z axis |

That is, the gates $R_x(\\pi)$, $R_y(\\pi)$, and $R_z(\\pi)$ correspond to the **X**, **Y**, and **Z** gates when $\\theta = 180^\\circ = \\pi$.

These gates are very important because they allow us to fine-tune the state of a qubit by a chosen angle, and they enable so-called universal computation.

---

## Two-qubit gates

So far, we have worked mainly with **single-qubit gates**, meaning gates that act on only one qubit.

In quantum circuits, however, we often also use **two-qubit gates**. These act on two qubits at the same time.

One of the most important two-qubit gates is the **CNOT** gate.

---

## CNOT gate

**CNOT** stands for **Controlled-NOT**.

This gate works with two qubits:

- the first qubit is the **control qubit**,
- the second qubit is the **target qubit**.

The CNOT gate works like this:

- if the control qubit is in the state $|0\\rangle$, the target qubit does not change,
- if the control qubit is in the state $|1\\rangle$, the **X** gate is applied to the target qubit.

In other words:

> CNOT flips the second qubit only when the first qubit is in the state $|1\\rangle$.

### Notation of the action of the CNOT gate

$$
\\text{CNOT}|00\\rangle = |00\\rangle
$$

$$
\\text{CNOT}|01\\rangle = |01\\rangle
$$

$$
\\text{CNOT}|10\\rangle = |11\\rangle
$$

$$
\\text{CNOT}|11\\rangle = |10\\rangle
$$

In this notation, we take the first qubit as the **control** and the second qubit as the **target**.

### Matrix notation of the CNOT gate

If we use the ordering of states:
$
|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle
$

then the matrix notation of the CNOT gate is:

$$
\\text{CNOT} =
\\begin{bmatrix}
1 & 0 & 0 & 0 \\\\
0 & 1 & 0 & 0 \\\\
0 & 0 & 0 & 1 \\\\
0 & 0 & 1 & 0
\\end{bmatrix}
$$

We can imagine the CNOT gate as a conditional version of the **X** gate.

The **X** gate always flips a qubit:
$
|0\\rangle \\rightarrow |1\\rangle
$
and
$
|1\\rangle \\rightarrow |0\\rangle
$.
The **CNOT** gate, however, flips the target qubit only when the control qubit is equal to $|1\\rangle$. An interesting situation appears when the control qubit is in a superposition of the states $|0\\rangle$ and $|1\\rangle$. Then the CNOT is both executed and not executed at the same time, and the second qubit will be in superposition. This creates entanglement between the two qubits, and they can no longer be considered separate qubits. They share one common state.

The **CNOT** gate flips the target qubit only when the **control qubit** is equal to $|1\\rangle$. An interesting situation occurs when the control qubit is in a superposition of the states $|0\\rangle$ and $|1\\rangle$.
In that case, we can say in a simplified way that the **CNOT** gate is **both applied and not applied at the same time**. The target qubit then enters a state that depends on the state of the control qubit, which is itself in superposition.
That means that we can no longer fully regard these two qubits as separate independent qubits. Instead, they share one common quantum state.

That is why CNOT is very important when working with multiple qubits, and it is used, for example, to create entanglement.

---

## Resulting states after applying single-qubit gates

In this table, we can see what happens to a qubit when the input state is $|0\\rangle$ or $|1\\rangle$ and we apply a given gate to it.

| Gate | Input state | Resulting state |
|---|---|---|
| **X** | $\\lvert 0 \\rangle$ | $\\lvert 1 \\rangle$ |
| **X** | $\\lvert 1 \\rangle$ | $\\lvert 0 \\rangle$ |
| **Y** | $\\lvert 0 \\rangle$ | $i\\lvert 1 \\rangle$ |
| **Y** | $\\lvert 1 \\rangle$ | $-i\\lvert 0 \\rangle$ |
| **Z** | $\\lvert 0 \\rangle$ | $\\lvert 0 \\rangle$ |
| **Z** | $\\lvert 1 \\rangle$ | $-\\lvert 1 \\rangle$ |

---

## Resulting states after applying the CNOT gate

The CNOT gate is a two-qubit gate, so we do not have only the inputs $|0\\rangle$ and $|1\\rangle$, but the two-qubit inputs:

$$
|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle
$$

| Gate | Input state | Resulting state |
|---|---|---|
| **CNOT** | $\\lvert00\\rangle$ | $\\lvert00\\rangle$ |
| **CNOT** | $\\lvert01\\rangle$ | $\\lvert01\\rangle$ |
| **CNOT** | $\\lvert10\\rangle$ | $\\lvert11\\rangle$ |
| **CNOT** | $\\lvert11\\rangle$ | $\\lvert10\\rangle$ |

For this table, the following applies:

- the first qubit is the **control**,
- the second qubit is the **target**.

That means the second qubit flips only when the first qubit is in the state $|1\\rangle$.
`,
  questions: [
    // {
    //   id: "q1",
    //   type: "short-answer",
    //   prompt: "The notation ∣0⟩ and ∣1⟩ is called Dirac __________.",
    //   correctAnswer: ["notation"],
    //   explanation: "",
    // },
    {
      id: "q2",
      type: "multiple-choice",
      prompt: "A qubit can be:",
      options: [
        "only in the state ∣0⟩",
        "only in the state ∣1⟩",
        "in the state ∣0⟩, ∣1⟩, or in their superposition",
        "only a classical zero or one",
      ],
      correctAnswer: "in the state ∣0⟩, ∣1⟩, or in their superposition",
      explanation: "",
    },
    {
      id: "q3",
      type: "multiple-choice",
      prompt: "The values α and β determine:",
      options: [
        "the probabilities of measurement outcomes",
        "the number of quantum gates",
        "the type of Bloch sphere",
        "the number of classical bits",
      ],
      correctAnswer: "the probabilities of measurement outcomes",
      explanation: "",
    },
    // {
    //   id: "q4",
    //   type: "short-answer",
    //   prompt: "Quantum operations are more commonly called quantum __________.",
    //   correctAnswer: ["gates", "gate"],
    //   explanation: "",
    // },
    // {
    //   id: "q5",
    //   type: "multiple-choice",
    //   prompt: "A quantum gate changes:",
    //   options: [
    //     "the state of a qubit",
    //     "the color of a qubit",
    //     "the name of a qubit",
    //     "the number of axes in space",
    //   ],
    //   correctAnswer: "the state of a qubit",
    //   explanation: "",
    // },
    // {
    //   id: "q6",
    //   type: "multiple-choice",
    //   prompt: "True or false: Quantum gates are often written as matrices.",
    //   options: [
    //     "True",
    //     "False",
    //   ],
    //   correctAnswer: "True",
    //   explanation: "",
    // },
    {
      id: "q7",
      type: "multiple-choice",
      prompt: "The state of a qubit can be understood mathematically as a:",
      options: [
        "vector",
        "table",
        "ordinary integer",
        "classical logic gate",
      ],
      correctAnswer: "vector",
      explanation: "",
    },
    // {
    //   id: "q8",
    //   type: "multiple-choice",
    //   prompt: "On the Bloch sphere, we can intuitively imagine quantum gates as:",
    //   options: [
    //     "rotations of the qubit state",
    //     "deleting the qubit state",
    //     "measuring the qubit",
    //     "copying the qubit",
    //   ],
    //   correctAnswer: "rotations of the qubit state",
    //   explanation: "",
    // },
    {
      id: "q9",
      type: "multiple-choice",
      prompt: "The X, Y, and Z gates correspond to rotations by:",
      options: [
        "90°",
        "180°",
        "270°",
        "360°",
      ],
      correctAnswer: "180°",
      explanation: "",
    },
    // {
    //   id: "q10",
    //   type: "short-answer",
    //   prompt: "A rotation by 180° corresponds to an angle of __________ radians.",
    //   correctAnswer: ["π", "pi"],
    //   explanation: "",
    // },
    // {
    //   id: "q11",
    //   type: "multiple-choice",
    //   prompt: "The rotation gates Rx(θ), Ry(θ), and Rz(θ) allow:",
    //   options: [
    //     "rotation by any angle θ",
    //     "only rotation by 180°",
    //     "only measurement of a qubit",
    //     "only the creation of two qubits",
    //   ],
    //   correctAnswer: "rotation by any angle θ",
    //   explanation: "",
    // },
    // {
    //   id: "q12",
    //   type: "multiple-choice",
    //   prompt: "The state ∣0⟩ is represented as the column vector:",
    //   options: [
    //     "[1, 0]ᵀ",
    //     "[0, 1]ᵀ",
    //     "[1, 1]ᵀ",
    //     "[0, 0]ᵀ",
    //   ],
    //   correctAnswer: "[1, 0]ᵀ",
    //   explanation: "",
    // },
    // {
    //   id: "q13",
    //   type: "multiple-choice",
    //   prompt: "On the Bloch sphere, the state ∣1⟩ points:",
    //   options: [
    //     "up to the north pole",
    //     "down to the south pole",
    //     "to the positive X axis",
    //     "outside the sphere",
    //   ],
    //   correctAnswer: "down to the south pole",
    //   explanation: "",
    // },
    {
      id: "q14",
      type: "multiple-choice",
      prompt: "The X gate is the quantum version of the classical gate:",
      options: [
        "NOT",
        "AND",
        "OR",
        "CNOT",
      ],
      correctAnswer: "NOT",
      explanation: "",
    },
    {
      id: "q15",
      type: "multiple-choice",
      prompt: "What does the Z gate do to the state ∣1⟩?",
      options: [
        "it changes it to -∣1⟩",
        "it changes it to ∣0⟩",
        "it changes it to ∣1⟩ + ∣0⟩",
        "it destroys the qubit",
      ],
      correctAnswer: "it changes it to -∣1⟩",
      explanation: "",
    },
    // {
    //   id: "q16",
    //   type: "multiple-choice",
    //   prompt: "True or false: The Hadamard gate is used mainly to create superposition.",
    //   options: [
    //     "True",
    //     "False",
    //   ],
    //   correctAnswer: "True",
    //   explanation: "",
    // },
    // {
    //   id: "q17",
    //   type: "short-answer",
    //   prompt: "For the imaginary unit i, we have i² = __________.",
    //   correctAnswer: ["-1"],
    //   explanation: "",
    // },
    // {
    //   id: "q18",
    //   type: "multiple-choice",
    //   prompt: "The CNOT gate acts on:",
    //   options: [
    //     "one qubit",
    //     "two qubits",
    //     "only classical bits",
    //     "three qubits",
    //   ],
    //   correctAnswer: "two qubits",
    //   explanation: "",
    // },
    // {
    //   id: "q19",
    //   type: "multiple-choice",
    //   prompt: "CNOT flips the target qubit when the control qubit is in the state:",
    //   options: [
    //     "∣0⟩",
    //     "∣1⟩",
    //   ],
    //   correctAnswer: "∣1⟩",
    //   explanation: "",
    // },
    // {
    //   id: "q20",
    //   type: "multiple-choice",
    //   prompt: "True or false: CNOT can create entanglement between qubits.",
    //   options: [
    //     "True",
    //     "False",
    //   ],
    //   correctAnswer: "True",
    //   explanation: "",
    // },
  ],
  showEditor: true,
  starterCode: `import sys

print("Interpreter:", sys.executable)

try:
    from qiskit import QuantumCircuit
    circuit = QuantumCircuit(2, 2)
    circuit.h(0)
    circuit.cx(0, 1)
    circuit.measure([0, 1], [0, 1])
    print("Qiskit import OK")
    display(circuit.draw("mpl"))
except Exception as error:
    print("Qiskit import failed:", error)
`,
};

export default qiskitFirstCircuitLesson;
