import deutsch from "../../assets/deutsch.png";

const qiskitFirstCircuitLesson = {
  id: "deutsch-jozsa-algorithm",
  title: "Lesson 6: The Deutsch-Jozsa Algorithm",
  summary: "A first look at a quantum algorithm that uses superposition, an oracle, and interference.",
  theory: `


# The Deutsch-Jozsa algorithm

Now we will look at the first simple quantum algorithm: the **Deutsch-Jozsa algorithm**.

This algorithm is useful for understanding why quantum computation can, in some cases, be more efficient than classical computation.

We will not focus on a lot of mathematics. The main thing is the intuition.

The key idea matters most. Quantum computations are universal computations, which means that any function \`f(x)=y\` can be written in quantum form. Then, by using superposition, we can run that function on all possible inputs \`x\` in a single step and obtain a superposition of all possible \`f(x)=y\` values at once in one call of \`f(x)\`.

We call the quantum form of the function \`f(x)\` an \`oracle\`.

That means the \`oracle\` is, in some sense, applied to all inputs at once and gives us a superposition of all outputs \`y\`. However, if we measured the output immediately, we would get only one of the possible results, because measurement destroys quantum information. But we can use clever "tricks" so that the wrong results "cancel out" through **interference**, and only the useful information remains.

The key idea is still the most important part. Since quantum operations are universal, in quantum computation we can represent every function $f(x) = y$ in quantum form. We call this quantum form of the function an **oracle**.
Using superposition, we can prepare a state that represents all possible inputs $x$ at once. When we then apply the oracle to that state, the function is in some sense applied to all of those inputs at once. The result is a quantum state that **is a superposition of all possible outputs** $y = f(x)$.
It is important, however, that we cannot simply read all of these outputs at once. If we measured the state immediately, we would get only one of the possible results, because measurement destroys the superposition.
The power of quantum algorithms therefore lies in the use of **interference**. By choosing suitable quantum gates, we can make some possibilities cancel out and others become stronger.
The Deutsch-Jozsa algorithm uses exactly this idea. It does not try to read all values of $f(x)$, but instead uses superposition, the oracle, and interference to determine some property of the function.

---

## The problem

Imagine that we have some function that we cannot see directly. We can think of it as a **black box**, or in English, an **oracle**.

We put an input into this black box and it returns an output.

For example:

- input: \`000\`
- output: \`0\`

or:

- input: \`101\`
- output: \`1\`

The function takes a binary input and returns only one bit:

- **0**,
- or **1**.

---

## What question do we want to answer?

The Deutsch-Jozsa algorithm answers this question: **Is the function constant or balanced?**

---

## Constant function

A function is **constant** if it returns the same output for every input.

For example, it always returns \`0\`:

| Input | Output |
|---|---|
| 000 | 0 |
| 001 | 0 |
| 010 | 0 |
| 011 | 0 |
| 100 | 0 |
| 101 | 0 |
| 110 | 0 |
| 111 | 0 |

Or it always returns \`1\`:

| Input | Output |
|---|---|
| 000 | 1 |
| 001 | 1 |
| 010 | 1 |
| 011 | 1 |
| 100 | 1 |
| 101 | 1 |
| 110 | 1 |
| 111 | 1 |

In both cases, the function is **constant**, because the output is always the same.

---

## Balanced function

A function is **balanced** if it returns \`0\` for half of the inputs and \`1\` for the other half.

For example:

| Input | Output |
|---|---|
| 000 | 0 |
| 001 | 1 |
| 010 | 0 |
| 011 | 1 |
| 100 | 0 |
| 101 | 1 |
| 110 | 0 |
| 111 | 1 |

Here we have:

- four outputs are **0**,
- four outputs are **1**.

That is why the function is **balanced**.

---

## Important assumption

In the Deutsch-Jozsa algorithm, we are promised that the function is only one of these two types:

- either it is **constant**,
- or it is **balanced**.

We do not have to consider any other cases.

Our task is to determine which of these two cases has occurred.

---

## How would a classical computer solve it?

A classical computer would try inputs one by one. There is no other way to solve this task than to test inputs and check the outputs.

For example, it would ask:

- what is the output for \`000\`?
- what is the output for \`001\`?
- what is the output for \`010\`?
- and so on.

If it finds two different outputs, for example once \`0\` and once \`1\`, then it knows that the function is **balanced**.

The problem is that if it keeps receiving the same result, it does not immediately know whether the function is truly constant.

It has to check enough inputs to be sure.

---

## Classical complexity

If the function has \`n\` input bits, the number of possible inputs is:

$$
2^n
$$

A classical computer may need to check more than half of all inputs in the worst case.

More precisely:

$$
2^{n-1} + 1
$$

function calls.

For example:

| Number of input bits | Number of all inputs | Classical worst case |
|---|---:|---:|
| 1 | 2 | 2 calls |
| 2 | 4 | 3 calls |
| 3 | 8 | 5 calls |
| 4 | 16 | 9 calls |
| 10 | 1024 | 513 calls |

The more input bits we have, the more function calls a classical computer may need.

---

## How does a quantum computer solve it?

A quantum computer uses superposition.

Instead of testing inputs one by one, it prepares a superposition of all possible inputs at once.

That means that if we have, for example, 3 input qubits, the quantum computer can work simultaneously with the states:

$$
|000\\rangle, |001\\rangle, |010\\rangle, |011\\rangle, |100\\rangle, |101\\rangle, |110\\rangle, |111\\rangle
$$

Then the oracle is applied to this superposition, and we obtain a superposition of all possible results. The important point is that the quantum algorithm does not need to read every output separately. It uses **interference** so that individual superpositions cancel out, and only the relevant information remains.

---

## Main idea of the algorithm

The Deutsch-Jozsa algorithm works like this:

1. prepare the qubits,
2. create superposition using Hadamard gates,
3. apply the oracle,
4. use Hadamard gates again,
5. measure the input qubits,
6. decide from the result whether the function is constant or balanced.

---

## Quantum circuit

The simplified form of the circuit looks like this:

![My image](${deutsch})

We use the input qubits to represent all possible inputs.

The helper qubit helps the oracle encode information about the function into the quantum state.

---

## What happens step by step?

### 1. We start with the input qubits

First, we begin with the input qubits in the state:

$$
|000\\rangle
$$

If we have more input bits, we similarly begin with all zeros.

---

### 2. We set the helper qubit to the state $|1\\rangle$

We use one additional helper qubit.

We set it to the state:

$$
|1\\rangle
$$

This qubit is needed so that the oracle can correctly write information about the function into the quantum state.

---

### 3. We apply Hadamard gates

We apply Hadamard gates to the input qubits.

This creates a superposition of all possible inputs.

Simplified:

> The quantum computer is prepared so that it represents all inputs at once.

We also apply the Hadamard gate to the helper qubit.

---

### 4. We apply the oracle

The oracle is the part of the circuit that represents our function.

We cannot look inside the oracle, but we can use it.

The oracle causes information about the function to be written into the phase of the quantum state.

This is important:
it is not only about the oracle returning the classical result \`0\` or \`1\`.

In quantum computation, information can also be written into the **phase**.

---

### 5. We use Hadamard gates again

After the oracle, we again apply Hadamard gates to the input qubits.

This creates interference.

Some possibilities strengthen each other, while others cancel out.

This is where the quantum advantage appears.

---

### 6. We measure the input qubits

Finally, we measure the input qubits.

From the result, we can determine whether the function was constant or balanced.

---

## How do we read the result?

The result is very simple.

If after measurement we get all zeros:

$$
|000...0\\rangle
$$

the function is **constant**.

If we get anything else:

$$
|001\\rangle, |010\\rangle, |101\\rangle, ...
$$

the function is **balanced**.

So:

| Measurement result | Conclusion |
|---|---|
| all zeros | the function is constant |
| anything other than all zeros | the function is balanced |

---

## Why does it work?

Intuitively, we can imagine it like this:

The Hadamard gates first create a superposition of all inputs.

The oracle then adds information about the function into the phase of the quantum state.

Then another set of Hadamard gates creates interference.

If the function is **constant**, all possibilities combine in such a way that the result returns to the all-zero state.

If the function is **balanced**, some possibilities cancel out and the result will not be the all-zero state.

In other words:

- for a constant function, interference returns the result **000...0**,
- for a balanced function, interference produces a different result.

---

## Why is it interesting?

The Deutsch-Jozsa algorithm is interesting because a quantum computer needs only **one oracle call**.

A classical computer may need, in the worst case:

$$
2^{n-1} + 1
$$

oracle calls.

A quantum computer needs:

$$
1
$$

oracle call.

---

## Comparison

| Type of computer | Number of oracle calls in the worst case |
|---|---:|
| Classical computer | $2^{n-1} + 1$ |
| Quantum computer | $1$ |

That means that in this particular problem, a quantum computer can determine the answer much more efficiently.

---

## Important note

The Deutsch-Jozsa algorithm does not solve every problem faster.

It is a special problem with a special assumption:

> the function is either constant or balanced.

Even so, this algorithm is very important because it nicely demonstrates the basic power of quantum computation:

- superposition,
- phase,
- interference,
- measurement,
- and more efficient extraction of information.

---

## Simple summary

The Deutsch-Jozsa algorithm determines whether a hidden function is **constant** or **balanced**.

A classical computer must, in the worst case, test many inputs.

A quantum computer creates a superposition of all inputs, uses an oracle, and through interference determines the answer after only one use of the oracle.

If after measurement we get all zeros, the function is **constant**.

If we get a different result, the function is **balanced**.

The Deutsch-Jozsa algorithm is therefore a good first example of how a quantum algorithm can use quantum properties for more efficient computation.
`,
  questions: [],
  showEditor: true,
  starterCode: `from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit.visualization import plot_histogram

# Deutsch-Jozsa algorithm
# 5 input qubits + 1 helper qubit
n = 5
helper = 5
# 6 qubits total: q0, q1, q2, q3, q4 are the input qubits

circuit = QuantumCircuit(6, 5)
circuit.x(helper)
circuit.h(range(6))
circuit.barrier()

# -------------------------------
# ORACLE
# -------------------------------
# This is a balanced function.
# The oracle depends on qubits q0, q2, and q4.
# So the hidden pattern is 10101.

circuit.cx(0, helper)
circuit.cx(2, helper)
circuit.cx(4, helper)

# this is a balanced function that always returns 1
# circuit.x(helper)

# this is a balanced function that always returns 0
# nothing

# -------------------------------
# END OF ORACLE
# -------------------------------
circuit.barrier()
# Apply the Hadamard gate to the input qubits again
circuit.h(range(n))

# Measure only the input qubits q0 to q4
# We do not measure the helper qubit
circuit.barrier()
circuit.measure(range(n), range(n))

# Display the quantum circuit
display(circuit.draw("mpl"))

# Run the simulation
simulator = AerSimulator()
compiled_circuit = transpile(circuit, simulator)
job = simulator.run(compiled_circuit, shots=1000)
result = job.result()
counts = result.get_counts()

# Display the results as a histogram
display(plot_histogram(counts))

`,
};

export default qiskitFirstCircuitLesson;
