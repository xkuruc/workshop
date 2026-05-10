const qiskitFirstCircuitLesson = {
  id: "programming-quantum-circuits-in-qiskit",
  title: "Lesson 5: Programming Quantum Circuits in Qiskit",
  summary: "A hands-on lesson on building, simulating, drawing, and measuring Qiskit circuits in Python.",
  theory: `


# Programming quantum circuits in Qiskit

Now we will show how we can write a quantum circuit in **Python** using the **Qiskit** library.

So far, we have drawn quantum circuits as diagrams.
In Qiskit, we will write them as programs.

The basic procedure is:

- create a quantum circuit,
- apply quantum gates to specific qubits,
- measure the qubits,
- run the simulation,
- display the results as a histogram.

---

## Importing libraries

First, we need to import the tools we will use.

    from qiskit import QuantumCircuit, transpile

This line imports:

- **QuantumCircuit**, which we use to create a quantum circuit,
- **transpile**, which prepares the circuit for the simulator.

Next, we import the simulator:

    from qiskit_aer import AerSimulator

**AerSimulator** is a quantum computer simulator.

That means we are not running the quantum circuit on a real quantum computer, but simulating it on a classical computer. In practice, we can simulate only around 15 to 20 qubits. Beyond that, simulation becomes extremely difficult because the complexity grows exponentially. Even a supercomputer can simulate only about 40 qubits at most.

Finally, we import a tool for displaying the results:

    from qiskit.visualization import plot_histogram

Using **plot_histogram**, we display the measurement results as a histogram.

---

## Creating a quantum circuit

We create a quantum circuit like this:

    circuit = QuantumCircuit(1, 1)

This line creates a quantum circuit.

The first number means the number of qubits.

The second number means the number of classical bits.

In this case, we have:

- **1 qubit**,
- **1 classical bit**.

In general, we can write:

    circuit = QuantumCircuit(number_of_qubits, number_of_classical_bits)

We need classical bits so that we can store the measurement results in them.

---

## Applying a quantum gate

We can apply a quantum gate to a qubit.

For example:

    circuit.h(0)

This line applies the **Hadamard** gate to qubit **q0**.

In Qiskit, qubits are numbered starting from zero.

That means:

- the first qubit has number **0**,
- the second qubit has number **1**,
- the third qubit has number **2**.

The Hadamard gate creates a superposition from the state $|0\\rangle$:

$$
H|0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)
$$

After measurement, we can therefore get the result **0** or **1** with approximately the same probability.

---

## Other single-qubit gates

In the same way, we can also apply other gates.

The **X** gate on qubit number 0:

    circuit.x(0)

The **Y** gate on qubit number 0:

    circuit.y(0)

The **Z** gate on qubit number 0:

    circuit.z(0)

A rotation gate around the X axis:

    circuit.rx(3.14, 0)

A rotation gate around the Y axis:

    circuit.ry(3.14, 0)

A rotation gate around the Z axis:

    circuit.rz(3.14, 0)

For rotation gates, the first number means the rotation angle and the second number means the qubit.

For example:

    circuit.rx(3.14, 0)

means that we rotate qubit number **0** around the **X** axis by an angle of approximately $\\pi$ radians.

---

## The CNOT gate in Qiskit

We write the **CNOT** gate using the command:

    circuit.cx(0, 1)

This notation means:

- qubit **0** is the **control qubit**,
- qubit **1** is the **target qubit**.

In general:

    circuit.cx(control, target)

The **CNOT** gate flips the target qubit only when the control qubit is in the state $|1\\rangle$.

---

## Measuring a qubit

At the end of the circuit, we measure the qubit.

    circuit.measure(0, 0)

This line means:

- we measure qubit number **0**,
- we store the result in classical bit number **0**.

In general:

    circuit.measure(qubit, classical_bit)

Measurement converts the quantum state into a classical result.

Before measurement, the qubit may be in superposition.
After measurement, we get a concrete result:

- **0**,
- or **1**.

---

## Running the simulator

First, we create the simulator:

    simulator = AerSimulator()

This line creates a quantum computer simulator.

Then we prepare the circuit for the simulator:

    compiled_circuit = transpile(circuit, simulator)

This line adjusts the circuit so that the simulator can run it correctly.

Then we run the simulation:

    job = simulator.run(compiled_circuit, shots=1000)

This line runs the circuit **1000 times**.

The word **shots** means the number of repetitions of the experiment.

Quantum measurement is probabilistic.
One execution of the circuit gives only one result.
If we run the circuit many times, we can observe the distribution of results.

---

## Getting the results

After running the simulation, we obtain the result:

    result = job.result()

This line retrieves the result from the simulation.

Then we extract the counts of the individual measurement outcomes:

    counts = result.get_counts()

The variable **counts** contains information about how many times each result was measured.

For example, the result may look like this:

    {'0': 505, '1': 495}

That means that in 1000 repetitions, we approximately:

- measured **0** 505 times,
- measured **1** 495 times.

---

## Displaying the histogram

We can display the results as a histogram:

    plot_histogram(counts)

This line draws a chart of the measurement results.

In the histogram, we can see how often we obtained each result.

---

## Full simple example

**We can treat this code as a template that we will use for most simple quantum circuits. Most of the code stays the same.** Most often, we will modify only the **middle part of the code**, which is the place where we apply quantum gates. So do not worry if the code looks complicated.

This program creates one qubit, applies the Hadamard gate to it, measures it, and displays the results.

    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import AerSimulator
    from qiskit.visualization import plot_histogram

    circuit = QuantumCircuit(1, 1)

    circuit.h(0)

    circuit.measure(0, 0)

    simulator = AerSimulator()

    compiled_circuit = transpile(circuit, simulator)

    job = simulator.run(compiled_circuit, shots=1000)

    result = job.result()

    counts = result.get_counts()

    plot_histogram(counts)

---

## What do we expect as a result?

In this example, we applied the Hadamard gate to the state $|0\\rangle$.

It creates the superposition:

$$
H|0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)
$$

Therefore, after measurement we expect approximately:

- **50%** of the results to be **0**,
- **50%** of the results to be **1**.

The results do not have to be exactly 500 and 500, because measurement is probabilistic.

So we may get, for example:

    {'0': 492, '1': 508}

or:

    {'0': 515, '1': 485}

The important point is that the results will be distributed approximately evenly. If we increase the number of shots, the results will get closer and closer to the 50% probability.

---

## Example with two qubits and entanglement

Now we create a circuit with two qubits.

    circuit = QuantumCircuit(2, 2)

This line creates a circuit with:

- **2 qubits**,
- **2 classical bits**.

We apply the Hadamard gate to the first qubit:

    circuit.h(0)

This puts qubit number **0** into superposition.

Then we apply the CNOT gate:

    circuit.cx(0, 1)

This line means:

- qubit **0** is the **control**,
- qubit **1** is the **target**.

Finally, we measure both qubits:

    circuit.measure(0, 0)
    circuit.measure(1, 1)

The first line measures qubit **0** and stores the result in classical bit **0**.

The second line measures qubit **1** and stores the result in classical bit **1**.

---

## Full example with entanglement

    from qiskit import QuantumCircuit, transpile
    from qiskit_aer import AerSimulator
    from qiskit.visualization import plot_histogram

    circuit = QuantumCircuit(2, 2)

    circuit.h(0)

    circuit.cx(0, 1)

    circuit.measure(0, 0)
    circuit.measure(1, 1)

    simulator = AerSimulator()

    compiled_circuit = transpile(circuit, simulator)

    job = simulator.run(compiled_circuit, shots=1000)

    result = job.result()

    counts = result.get_counts()

    plot_histogram(counts)

This circuit creates the entangled state:

$$
\\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)
$$

After measurement, we mainly expect the results:

- **00**,
- **11**.

The results **01** and **10** should not appear in an ideal simulation.

This example shows that qubits can be entangled.
The results of their measurements are then related.

---

## Displaying the circuit

We can also draw the circuit as a diagram:

    display(circuit.draw("mpl"))

This line displays the quantum circuit.

Qiskit therefore allows us to write a quantum circuit as a program, display it, run it on a simulator, and inspect the measurement results.

---
## Task

In this task, try modifying the quantum circuit yourself.

You can treat the code as a **template**. Most parts stay the same: imports, circuit creation, measurement, simulation, and histogram display.

You will mainly modify the **middle part of the circuit**, which is where the quantum gates are applied.

For example, try adding or changing **quantum gates** on different qubits.

You can also try different rotation gates with different angles.

For example:

    circuit.rx(1.28, 0)
    circuit.ry(2.98, 1)

After each change, run the circuit again and observe how the histogram of results changes.

The goal is to understand that different quantum gates change the state of a qubit in different ways, and therefore also change the probabilities of measurement outcomes.
`,
  questions: [],
  showEditor: true,
  starterCode: `from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit.visualization import plot_histogram

circuit = QuantumCircuit(2, 2)

circuit.h(0)
circuit.cx(0, 1)

circuit.measure_all()

display(circuit.draw("mpl"))

simulator = AerSimulator()
compiled_circuit = transpile(circuit, simulator)
job = simulator.run(compiled_circuit, shots=1000)
result = job.result()
counts = result.get_counts()
display(plot_histogram(counts))

`,
};

export default qiskitFirstCircuitLesson;
