import bellCircuitIllustration from "../../assets/qiskit-circuit.svg";

const qiskitFirstCircuitLesson = {
  id: "qubits-superposition-and-the-bloch-sphere",
  title: "Lesson 2: Qubits, Superposition, and the Bloch Sphere",
  summary: "An overview of one-qubit states, superposition, amplitudes, phase, and Bloch sphere intuition.",
  theory: `


 # Qubit, superposition, and the Bloch sphere

## Basic states of a qubit

For a qubit, we write these values as quantum states: the value 0 corresponds to the state $|0\\rangle$ and the value 1 corresponds to the state $|1\\rangle$.

A qubit does not have to be only in one of these states. It can be in the state $|0\\rangle$, in the state $|1\\rangle$, or in their superposition, meaning a combination of both possibilities at once.

That means that before measurement, a qubit does not have to be definitively $|0\\rangle$ or $|1\\rangle$. As long as we do not measure it, it behaves as if it had both values. Its state can be prepared so that, for example, when measured we get: a 50% probability of the result $|0\\rangle$ and a 50% probability of the result $|1\\rangle$.

But superposition does not always have to be only “half and half.” A qubit can also be prepared so that measurement gives, for example, a 70% chance of the result $|1\\rangle$, a 30% chance of the result $|0\\rangle$, or practically any other combination of probabilities.

---

## Equal probabilities do not have to mean the same state

It is important to understand that two qubits can have the same measurement probabilities, for example both give 50% for $|0\\rangle$ and 50% for $|1\\rangle$, and still not be in the same quantum state. If we applied exactly the same quantum operation to these two qubits, we could get completely different resulting states.

More specifically, there are infinitely many states that give the same 50/50 probabilities when measured, but are not the same state.

---

## The Bloch sphere

We can represent this situation using the Bloch sphere. Every one-qubit state can be shown as a point on the surface of a sphere. More precisely, we talk about a quantum state vector that points to a specific location on the sphere.

In the standard convention, the north pole represents the state $|0\\rangle$, the south pole represents the state $|1\\rangle$, and points on the equator represent superpositions for which we have a 50% probability of measuring $|0\\rangle$ and a 50% probability of measuring $|1\\rangle$.

If the point is closer to the north pole, there is a greater probability of measuring $|0\\rangle$. If it is closer to the south pole, there is a greater probability of measuring $|1\\rangle$. The probability of measuring specific outcomes is determined by the angle between the quantum state vector and the Z axis.

Points on the equator have the same measurement probabilities, but they can differ by the angle around the vertical axis, around the Z axis. This angle represents the phase. That is why it is not enough to say only “this qubit is 50/50.” We also need to know what kind of 50/50 superposition it is, and that is exactly what is described by the quantum state vector on the Bloch sphere.

---

## Operations on qubits

Operations on qubits can be very nicely imagined as rotations of the quantum state vector around the X, Y, and Z axes. Different quantum gates therefore change the position of the vector on the Bloch sphere, and in that way change the probabilities or the phase of the resulting state. It is important to emphasize again that the quantum state vector represents the state the qubit is in, and its movement on the Bloch sphere represents operations on the qubit. It is not a physical movement or a physical rotation, but a change in the state of the qubit.

Please try this online Bloch sphere visualization tool: we recommend copying the URL and opening it in a new window.

[https://bloch.kherb.io/](https://bloch.kherb.io/)

Using this tool, you can try basic quantum operations, which are displayed on the Bloch sphere as **rotations of the state vector**.

I also recommend trying rotations by your own chosen angles, not only **90°** or **180°**, but also other values. Try changing rotations around different axes, for example **X**, **Y**, and **Z**.

By pressing the **“+”** button, the state vector rotates by a positive angle.
By pressing the **“-”** button, the state vector rotates by a negative angle.

---

## Mathematical notation of a qubit state

Mathematically, the state of a qubit is written as a combination of two basis states:

$$
∣ψ⟩=α |0\\rangle +β|1\\rangle
$$

Here, α and β are so-called **probability amplitudes**. They are complex numbers, and the probability of measuring $|0\\rangle$ is $∣α∣^2$ while the probability of measuring $|1\\rangle$ is $∣β∣^2$.

And it must always hold that:

$$
∣α∣^2 + ∣ β ∣^2 = 1
$$

because we have a 100% chance of measuring either $|0\\rangle$ or $|1\\rangle$.

---

## Example

For example, a 50/50 superposition can be written using the state vector like this:

$$
∣ψ⟩ = \\frac{1}{\\sqrt{2}} |0\\rangle + \\frac{1}{\\sqrt{2}} |1\\rangle
$$

That means that the probability of measuring $|0\\rangle$ is:

$$
P(|0\\rangle) = |\\frac{1}{\\sqrt{2}}|² = \\frac{1}{2} = 50 \\%
$$

and the probability of measuring $|1\\rangle$ is also:

$$
P(|1\\rangle) = |\\frac{1}{\\sqrt{2}}|² = \\frac{1}{2} = 50\\%
$$

However, the important point is that there is not only one 50/50 superposition. Here is an example of a different 50/50 superposition involving a complex number:

$$
∣ψ⟩ = \\frac{1}{\\sqrt{2}} |0\\rangle - \\frac{i}{\\sqrt{2}} |1\\rangle
$$

The probabilities are:

$$
P(|0\\rangle) = |\\frac{1}{\\sqrt{2}}|² = \\frac{1}{2} = 50 \\%
$$

$$
P(|1\\rangle) = |-\\frac{i}{\\sqrt{2}}|² = \\frac{1}{2} = 50 \\%
$$

An example of a completely different qubit state with complex numbers is:

$$
∣ψ⟩ = \\frac{1+i}{2\\sqrt{2}} |0\\rangle + \\frac{i \\sqrt{3}}{2} |1\\rangle
$$

The probabilities are:

$$
P(|0\\rangle) = |\\frac{1+i}{2\\sqrt{2}}|² = 25 \\%
$$

$$
P(|1\\rangle) = |\\frac{i \\sqrt{3}}{2}|² = 75 \\%
$$
`,
  questions: [
    // {
    //   id: "q1",
    //   type: "multiple-choice",
    //   prompt: "A classical bit can take the value:",
    //   options: [
    //     "only 0",
    //     "only 1",
    //     "0 or 1",
    //     "any real number",
    //   ],
    //   correctAnswer: "0 or 1",
    //   explanation: "",
    // },
    // {
    //   id: "q2",
    //   type: "multiple-choice",
    //   prompt: "A qubit differs from a classical bit because it can be:",
    //   options: [
    //     "only in the state 0",
    //     "only in the state 1",
    //     "only off or on",
    //     "in the state ∣0⟩, ∣1⟩, or in their superposition",
    //   ],
    //   correctAnswer: "in the state ∣0⟩, ∣1⟩, or in their superposition",
    //   explanation: "",
    // },
    // {
    //   id: "q3",
    //   type: "multiple-choice",
    //   prompt: "If a qubit is in a 50/50 superposition, this means that when measured:",
    //   options: [
    //     "we always measure 0",
    //     "we always measure 1",
    //     "there is a 50% chance to measure 0 and a 50% chance to measure 1",
    //     "the qubit cannot be measured",
    //   ],
    //   correctAnswer: "there is a 50% chance to measure 0 and a 50% chance to measure 1",
    //   explanation: "",
    // },
    {
      id: "q4",
      type: "multiple-choice",
      prompt: "The superposition of a qubit can be:",
      options: [
        "only 50/50",
        "only 70/30",
        "any combination of probabilities, such as 50/50, 70/30, or 90/10",
        "always the same as a classical bit",
      ],
      correctAnswer: "any combination of probabilities, such as 50/50, 70/30, or 90/10",
      explanation: "",
    },
    {
      id: "q5",
      type: "multiple-choice",
      prompt: "The Bloch sphere is used for:",
      options: [
        "measuring the temperature of a qubit",
        "visualizing the state of a single qubit",
        "displaying classical bits",
        "calculating the speed of light",
      ],
      correctAnswer: "visualizing the state of a single qubit",
      explanation: "",
    },
    {
      id: "q6",
      type: "multiple-choice",
      prompt: "In the standard convention, the north pole of the Bloch sphere represents:",
      options: [
        "the state ∣0⟩",
        "the state ∣1⟩",
        "a 50/50 state",
        "an undefined state",
      ],
      correctAnswer: "the state ∣0⟩",
      explanation: "",
    },
    // {
    //   id: "q7",
    //   type: "multiple-choice",
    //   prompt: "The south pole of the Bloch sphere represents:",
    //   options: [
    //     "the state ∣0⟩",
    //     "the state ∣1⟩",
    //     "phase",
    //     "a quantum gate",
    //   ],
    //   correctAnswer: "the state ∣1⟩",
    //   explanation: "",
    // },
    // {
    //   id: "q8",
    //   type: "multiple-choice",
    //   prompt: "Points on the equator of the Bloch sphere represent states for which:",
    //   options: [
    //     "we always measure 0",
    //     "we always measure 1",
    //     "there is a 50% probability of measuring 0 and a 50% probability of measuring 1",
    //     "the qubit stops existing",
    //   ],
    //   correctAnswer: "there is a 50% probability of measuring 0 and a 50% probability of measuring 1",
    //   explanation: "",
    // },
    // {
    //   id: "q9",
    //   type: "multiple-choice",
    //   prompt: "If a point on the Bloch sphere is closer to the north pole, then it is more likely that we will measure:",
    //   options: [
    //     "0",
    //     "1",
    //     "both at once",
    //     "nothing",
    //   ],
    //   correctAnswer: "0",
    //   explanation: "",
    // },
    {
      id: "q10",
      type: "multiple-choice",
      prompt: "Operations on a qubit can be represented on the Bloch sphere as:",
      options: [
        "a physical rotation of a particle in space",
        "rotations of the vector around the X, Y, and Z axes",
        "a change in the color of the sphere",
        "the destruction of the qubit",
      ],
      correctAnswer: "rotations of the vector around the X, Y, and Z axes",
      explanation: "",
    },
    // {
    //   id: "q11",
    //   type: "short-answer",
    //   prompt: "A qubit can be in the state ∣0⟩, ∣1⟩, or in their __________.",
    //   correctAnswer: ["superposition"],
    //   explanation: "",
    // },
    // {
    //   id: "q12",
    //   type: "short-answer",
    //   prompt: "The __________ sphere is a geometric representation of the state of a single qubit.",
    //   correctAnswer: ["bloch"],
    //   explanation: "",
    // },
    // {
    //   id: "q13",
    //   type: "short-answer",
    //   prompt: "Points on the __________ of the Bloch sphere represent 50/50 superpositions.",
    //   correctAnswer: ["equator"],
    //   explanation: "",
    // },
    // {
    //   id: "q14",
    //   type: "short-answer",
    //   prompt: "The angle around the vertical axis on the Bloch sphere represents the quantum __________.",
    //   correctAnswer: ["phase"],
    //   explanation: "",
    // },
    // {
    //   id: "q15",
    //   type: "short-answer",
    //   prompt: "α and β are not directly probabilities, but probability __________.",
    //   correctAnswer: ["amplitudes", "amplitude"],
    //   explanation: "",
    // },
    // {
    //   id: "q16",
    //   type: "short-answer",
    //   prompt: "The values α and β are __________ numbers.",
    //   correctAnswer: ["complex"],
    //   explanation: "",
    // },
    // {
    //   id: "q17",
    //   type: "short-answer",
    //   prompt: "Quantum operations change the state of a qubit, which is shown on the Bloch sphere as a __________ of the vector.",
    //   correctAnswer: ["rotation", "rotations"],
    //   explanation: "",
    // },
    // {
    //   id: "q18",
    //   type: "multiple-choice",
    //   prompt: "A classical bit can be in a superposition of 0 and 1.",
    //   options: [
    //     "True",
    //     "False",
    //   ],
    //   correctAnswer: "False",
    //   explanation: "",
    // },
    // {
    //   id: "q19",
    //   type: "multiple-choice",
    //   prompt: "A qubit can have a 70% chance of giving the result 1 and a 30% chance of giving the result 0 when measured.",
    //   options: [
    //     "True",
    //     "False",
    //   ],
    //   correctAnswer: "True",
    //   explanation: "",
    // },
    {
      id: "q20",
      type: "multiple-choice",
      prompt: "Two qubit states with the same measurement probabilities must always be identical.",
      options: [
        "True",
        "False",
      ],
      correctAnswer: "False",
      explanation: "",
    },
    // {
    //   id: "q21",
    //   type: "multiple-choice",
    //   prompt: "On the equator of the Bloch sphere, all states are 50/50 in terms of measurement probabilities for 0 and 1.",
    //   options: [
    //     "True",
    //     "False",
    //   ],
    //   correctAnswer: "True",
    //   explanation: "",
    // },
    {
      id: "q22",
      type: "multiple-choice",
      prompt: "The movement of the vector on the Bloch sphere means the physical motion of the qubit in space.",
      options: [
        "True",
        "False",
      ],
      correctAnswer: "False",
      explanation: "",
    },
    // {
    //   id: "q23",
    //   type: "multiple-choice",
    //   prompt: "Quantum operations can change the probabilities of a qubit's outcomes.",
    //   options: [
    //     "True",
    //     "False",
    //   ],
    //   correctAnswer: "True",
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
