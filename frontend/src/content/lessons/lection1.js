import qubitIllustration from "../../assets/qubit-superposition.svg";

const qubitFoundationsLesson = {
  id: "quantum-computing-fundamentals",
  title: "Lesson 1: Quantum Computing Fundamentals",
  summary: "An introduction to quantum computing, qubits, superposition, entanglement, and measurement.",
  theory: `


# Quantum computing

## Basic definition

**Quantum computing** is a computational approach based on the principles of quantum mechanics.

A classical computer works with bits, which can take the value **0 or 1**. A quantum computer uses quantum particles for computation, and these particles behave according to quantum physics, which allows us to perform calculations using quantum mechanics. Quantum computing relies on several quantum phenomena, but two of the most important are **superposition** and **entanglement**.

---

## Superposition and qubits

**Superposition** is the phenomenon in which a quantum system is not in only one precisely determined state, but in multiple states at the same time. For example, a quantum particle can be in several places at once, can have multiple energy values, and so on.

In quantum computing, we use this to create a **qubit**.

**Qubit** = quantum bit. A qubit can behave as if it contains both 0 and 1 at the same time. That means a quantum computer does not have to work with only one specific combination of zeros and ones during a computation, but can work with multiple possible combinations at once.

If we have 1 qubit, it can represent both 0 and 1. If we have 2 qubits, they can represent 00, 01, 10, and 11 at the same time, which is a total of 4 possibilities. In general, if we have N qubits, a quantum computer can work with $2^N$ possible combinations of zeros and ones at once.

> **The computational power of a quantum computer grows exponentially with each added qubit.**

For comparison, only **280 qubits** would be enough to work with more numbers than there are atoms in the observable universe.



---

## Entanglement

**Entanglement** is the phenomenon in which the state of one qubit affects the state of another qubit without direct physical interaction. Put simply, if we have two entangled qubits, we cannot think of them as two completely independent bits. Their values are linked to each other.
For example, I can entangle two qubits so that they always have the same value. If the first one has the value **1**, then the second one will also have the value **1**. If the first one has the value **0**, then the second one will also have the value **0**.
They behave like one shared system.

Einstein referred to this phenomenon as **“spooky action at a distance”**, because it seemed as if information could travel faster than light, essentially instantly.

The **2022 Nobel Prize in Physics** was awarded for the formal demonstration of this phenomenon.

---

## The effect of measurement

In quantum mechanics, **measurement** fundamentally affects the state of the system.

As long as we do not measure a qubit, it can remain in a superposition of the states **0 and 1**, and together with other qubits it can form a complex quantum state that a quantum algorithm uses for computation.

However, if we measure the system, in other words if we look at the values it is working with, the whole quantum system is destroyed, or **collapses**, and we observe only one possibility out of all the superpositions. For example, we might measure the number **10111** if we had **5 qubits**.

It is important to note that in the case of entanglement, measuring one qubit affects how we can describe the other qubit with which it is entangled. This does not mean that we directly set it to 0 or 1, but rather that the result of measuring the first qubit changes the probabilities of the outcomes we can get when measuring the second qubit.

---

## A simplified comparison with a classical computer

Very roughly, we can imagine this as trying to look inside a register during computation.

In a classical computer, a simple \`print(x)\` would only display the value and would not change the computation.

In a quantum computer, however, measurement is an active intervention in the system: the qubit stops being in superposition and is reduced to one measured value.

If it was entangled with other qubits, the measurement also changes the shared quantum state of the entire entangled system.

---

## What a quantum computer is not

It is important to emphasize that a **quantum computer is not just a faster version of an ordinary computer**.

It is not primarily intended for running regular applications, operating systems, or web services more efficiently.

Its significance lies in the fact that for certain specific classes of problems, it can use quantum phenomena in a way that is extremely difficult or practically unreachable for classical computers.

> Quantum computing therefore represents a **different computational model**, not a universal speedup for everything.

Although a quantum computer is theoretically computationally equivalent to a classical Turing machine, meaning it can perform general computation, that does not mean it will be faster for every task.

The advantage of quantum computers is expected mainly in areas such as **simulations of quantum systems**, **optimization problems**, or specific algorithms such as **Shor’s factoring algorithm**.

At the end of this lesson, try to notice that superposition is not the same as measurement. Measurement happens only when we **observe** the state.
`,
  questions: [
    {
      id: "q1",
      type: "multiple-choice",
      prompt: "What is the most important difference between a classical bit and a qubit?",
      options: [
        "A bit can hold multiple values at once, while a qubit can hold only one",
        "A bit is always a physical particle, while a qubit is only a mathematical value",
        "A bit has the value 0 or 1, while a qubit can be in a superposition of 0 and 1",
        "A qubit is only a faster type of classical bit",
      ],
      correctAnswer: "A bit has the value 0 or 1, while a qubit can be in a superposition of 0 and 1",
      explanation: "",
    },
    // {
    //   id: "q2",
    //   type: "short-answer",
    //   prompt: "The phenomenon in which a quantum system is not only in one precisely determined state, but in a combination of multiple states at once, is called ________.",
    //   correctAnswer: ["superposition"],
    //   explanation: "",
    // },
    {
      id: "q3",
      type: "multiple-choice",
      prompt: "Which two quantum phenomena are described in the text as the most important for quantum computation?",
      options: [
        "Gravity and electromagnetism",
        "Superposition and entanglement",
        "Radioactivity and fusion",
        "Decoherence and thermodynamics",
      ],
      correctAnswer: "Superposition and entanglement",
      explanation: "",
    },
    // {
    //   id: "q4",
    //   type: "short-answer",
    //   prompt: "A quantum bit is called a __________.",
    //   correctAnswer: ["qubit"],
    //   explanation: "",
    // },
    {
      id: "q5",
      type: "multiple-choice",
      prompt: "What happens when a qubit in superposition is measured?",
      options: [
        "The qubit remains in all states at once",
        "The qubit is reduced to one measured value",
        "The qubit returns all values at once",
        "The qubit starts transferring information faster than light",
      ],
      correctAnswer: "The qubit is reduced to one measured value",
      explanation: "",
    },
    // {
    //   id: "q6",
    //   type: "multiple-choice",
    //   prompt: "What does entanglement mean?",
    //   options: [
    //     "A phenomenon in which a qubit loses all of its energy",
    //     "A phenomenon in which the state of one qubit affects another qubit",
    //     "A process in which a quantum computer turns into a classical one",
    //     "A method for cooling a quantum processor",
    //   ],
    //   correctAnswer: "A phenomenon in which the state of one qubit affects another qubit",
    //   explanation: "",
    // },
    // {
    //   id: "q7",
    //   type: "short-answer",
    //   prompt: "During measurement, superposition is often described by saying that the quantum state __________.",
    //   correctAnswer: ["collapses", "collapse"],
    //   explanation: "",
    // },
    // {
    //   id: "q8",
    //   type: "multiple-choice",
    //   prompt: "Why are quantum computations performed before measurement rather than after it?",
    //   options: [
    //     "Because after measurement the qubit can no longer remain in its original superposition",
    //     "Because a quantum computer stops existing after measurement",
    //     "Because measurement always returns all possible results at once",
    //     "Because measurement is possible only on classical bits",
    //   ],
    //   correctAnswer: "Because after measurement the qubit can no longer remain in its original superposition",
    //   explanation: "",
    // },
    {
      id: "q9",
      type: "multiple-choice",
      prompt: "A quantum computer is especially interesting mainly because it:",
      options: [
        "Speeds up all ordinary applications",
        "Replaces operating systems",
        "Can use quantum phenomena for more efficient computation than a classical computer on certain types of problems",
        "Works without physical laws",
      ],
      correctAnswer: "Can use quantum phenomena for more efficient computation than a classical computer on certain types of problems",
      explanation: "",
    },
    {
      id: "q10",
      type: "multiple-choice",
      prompt: "Which statement is the trick answer and is incorrect?",
      options: [
        "A quantum computer is not universally faster at everything",
        "A quantum computer can be advantageous for specific algorithms",
        "A quantum computer is only a more powerful version of a classical computer for regular applications",
        "A quantum computer uses phenomena from quantum mechanics",
      ],
      correctAnswer: "A quantum computer is only a more powerful version of a classical computer for regular applications",
      explanation: "",
    },
    
    // {
    //   id: "superposition-word",
    //   type: "short-answer",
    //   prompt: "What do we call the state in which a qubit contains a combination of \\(|0\\rangle\\) and \\(|1\\rangle\\)?",
    //   correctAnswer: ["superposition"],
    //   explanation: "The correct term is **superposition**.",
    //   placeholder: "Write a short answer",
    // },
  ],
  showEditor: false,
};

export default qubitFoundationsLesson;
