
const qiskitFirstCircuitLesson = {
  id: "qiskit-first-circuit",
  title: "Lekcia 2: Prvý obvod v Qiskite",
  summary: "Praktická lekcia s editorom a jednoduchým kvantovým obvodom.",
  theory: `


# Programovanie kvantových obvodov v Qiskit

Teraz si ukážeme, ako vieme kvantový obvod zapísať v **Pythone** pomocou knižnice **Qiskit**.

Doteraz sme kvantové obvody kreslili ako diagramy.  
V Qiskite ich budeme zapisovať ako program.

Základný postup je:

- vytvoríme kvantový obvod,
- aplikujeme kvantové brány na konkrétne qubity,
- zmeriame qubity,
- spustíme simuláciu,
- výsledky zobrazíme ako histogram.

---

## Import knižníc

Najprv potrebujeme importovať nástroje, ktoré budeme používať.

    from qiskit import QuantumCircuit, transpile

Tento riadok importuje:

- **QuantumCircuit**, pomocou ktorého vytvárame kvantový obvod,
- **transpile**, ktorý pripraví obvod pre simulátor.

Ďalej importujeme simulátor:

    from qiskit_aer import AerSimulator

**AerSimulator** je simulátor kvantového počítača.

To znamená, že kvantový obvod nespúšťame na reálnom kvantovom počítači, ale simulujeme ho na klasickom počítači. Simulovať vieme iba do približne 15-20 qubitov. Simulovanie qubitov je ďalej extrémne náročné, zložitosť rastie exponenciálne. Superpočítač vie simulovať maximálne iba približne 40 qubitov.

Nakoniec importujeme nástroj na zobrazenie výsledkov:

    from qiskit.visualization import plot_histogram

Pomocou **plot_histogram** zobrazíme výsledky merania ako histogram.

---

## Vytvorenie kvantového obvodu

Kvantový obvod vytvoríme takto:

    circuit = QuantumCircuit(1, 1)

Tento riadok vytvorí kvantový obvod.

Prvé číslo znamená počet qubitov.

Druhé číslo znamená počet klasických bitov.

V tomto prípade máme:

- **1 qubit**,
- **1 klasický bit**.

Všeobecne môžeme písať:

    circuit = QuantumCircuit(počet_qubitov, počet_klasických_bitov)

Klasické bity potrebujeme preto, aby sme do nich uložili výsledky merania.

---

## Aplikovanie kvantovej brány

Na qubit môžeme aplikovať kvantovú bránu.

Napríklad:

    circuit.h(0)

Tento riadok aplikuje bránu **Hadamard** na qubit  **q0**.

V Qiskite sa qubity číslujú od nuly.

To znamená:

- prvý qubit má číslo **0**,
- druhý qubit má číslo **1**,
- tretí qubit má číslo **2**.

Brána Hadamard vytvorí zo stavu $|0\\rangle$ superpozíciu:

$$
H|0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)
$$

Po meraní teda môžeme dostať výsledok **0** alebo **1** približne s rovnakou pravdepodobnosťou.

---

## Ďalšie jednokubitové brány

Podobne môžeme aplikovať aj iné brány.

Brána **X** na qubit číslo 0:

    circuit.x(0)

Brána **Y** na qubit číslo 0:

    circuit.y(0)

Brána **Z** na qubit číslo 0:

    circuit.z(0)

Rotačná brána okolo osi X:

    circuit.rx(3.14, 0)

Rotačná brána okolo osi Y:

    circuit.ry(3.14, 0)

Rotačná brána okolo osi Z:

    circuit.rz(3.14, 0)

Pri rotačných bránach prvé číslo znamená uhol rotácie a druhé číslo znamená qubit.

Napríklad:

    circuit.rx(3.14, 0)

znamená, že qubit číslo **0** otočíme okolo osi **X** o uhol približne $\\pi$ radiánov.

---

## Brána CNOT v Qiskit

Bránu **CNOT** zapisujeme pomocou príkazu:

    circuit.cx(0, 1)

Tento zápis znamená:

- qubit **0** je **control qubit**,
- qubit **1** je **target qubit**.

Všeobecne:

    circuit.cx(control, target)

Brána **CNOT** preklopí cieľový qubit iba vtedy, keď je riadiaci qubit v stave $|1\\rangle$.

---

## Meranie qubitu

Na konci obvodu qubit zmeriame.

    circuit.measure(0, 0)

Tento riadok znamená:

- zmeriame qubit číslo **0**,
- výsledok uložíme do klasického bitu číslo **0**.

Všeobecne platí:

    circuit.measure(qubit, klasický_bit)

Meranie prevedie kvantový stav na klasický výsledok.

Pred meraním môže byť qubit v superpozícii.  
Po meraní dostaneme konkrétny výsledok:

- **0**,
- alebo **1**.

---

## Spustenie simulátora

Najprv vytvoríme simulátor:

    simulator = AerSimulator()

Tento riadok vytvorí simulátor kvantového počítača.

Potom pripravíme obvod pre simulátor:

    compiled_circuit = transpile(circuit, simulator)

Tento riadok upraví obvod tak, aby ho simulátor vedel správne spustiť.

Následne spustíme simuláciu:

    job = simulator.run(compiled_circuit, shots=1000)

Tento riadok spustí obvod **1000-krát**.

Slovo **shots** znamená počet opakovaní experimentu.

Kvantové meranie je pravdepodobnostné.  
Jedno spustenie obvodu dá iba jeden výsledok.  
Ak obvod spustíme veľakrát, vidíme rozdelenie výsledkov.



---

## Získanie výsledkov

Po spustení simulácie získame výsledok:

    result = job.result()

Tento riadok zoberie výsledok zo simulácie.

Potom si z výsledku vytiahneme počty jednotlivých meraní:

    counts = result.get_counts()

Premenná **counts** obsahuje informáciu, koľkokrát sme namerali jednotlivé výsledky.

Napríklad výsledok môže vyzerať takto:

    {'0': 505, '1': 495}

To znamená, že pri 1000 opakovaniach sme približne:

- 505-krát namerali výsledok **0**,
- 495-krát namerali výsledok **1**.

---

## Zobrazenie histogramu

Výsledky si môžeme zobraziť ako histogram:

    plot_histogram(counts)

Tento riadok vykreslí graf výsledkov merania.

Na histograme uvidíme, ako často sme dostali jednotlivé výsledky.

---

## Celý jednoduchý príklad

**Tento kód môžeme brať ako šablónu, ktorú budeme používať pri väčšine jednoduchých kvantových obvodov. Väčšina kódu ostáva stále rovnaká.**, Najčastejšie budeme upravovať iba **strednú časť kódu**, teda miesto, kde aplikujeme kvantové brány. Takže vôbec sa netrápte tým, že daný kód vyzerá komplikovane. 


Tento program vytvorí jeden qubit, aplikuje naň Hadamardovu bránu, zmeria ho a zobrazí výsledky.

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

## Čo očakávame ako výsledok?

V tomto príklade sme na stav $|0\\rangle$ aplikovali Hadamardovu bránu.

Tá vytvorí superpozíciu:

$$
H|0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)
$$

Preto po meraní očakávame približne:

- **50 %** výsledkov bude **0**,
- **50 %** výsledkov bude **1**.

Výsledky nemusia byť presne 500 a 500, pretože meranie je pravdepodobnostné.

Môžeme teda dostať napríklad:

    {'0': 492, '1': 508}

alebo:

    {'0': 515, '1': 485}

Dôležité je, že výsledky budú približne rovnomerne rozdelené. Ak by sme zvyšovali počet shots, tak sa nám výsledky budú približovať viac a viac ku 50% pravdepodobnosti.

---

## Príklad s dvoma qubitmi a entanglementom

Teraz vytvoríme obvod s dvoma qubitmi.

    circuit = QuantumCircuit(2, 2)

Tento riadok vytvorí obvod s:

- **2 qubitmi**,
- **2 klasickými bitmi**.

Na prvý qubit aplikujeme Hadamardovu bránu:

    circuit.h(0)

Tým dostaneme qubit číslo **0** do superpozície.

Potom aplikujeme bránu CNOT:

    circuit.cx(0, 1)

Tento riadok znamená:

- qubit **0** je **control**,
- qubit **1** je **target**.

Nakoniec oba qubity zmeriame:

    circuit.measure(0, 0)
    circuit.measure(1, 1)

Prvý riadok zmeria qubit **0** a výsledok uloží do klasického bitu **0**.

Druhý riadok zmeria qubit **1** a výsledok uloží do klasického bitu **1**.

---

## Celý príklad s entanglementom

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

Tento obvod vytvorí previazaný stav:

$$
\\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)
$$

Po meraní očakávame hlavne výsledky:

- **00**,
- **11**.

Výsledky **01** a **10** by sa v ideálnej simulácii nemali objaviť.

Tento príklad ukazuje, že qubity môžu byť previazané.  
Výsledky ich merania potom spolu súvisia.

---

## Zobrazenie obvodu

Obvod si môžeme aj vykresliť ako diagram:

    display(circuit.draw("mpl"))

Tento riadok zobrazí kvantový obvod.


Qiskit nám teda umožňuje zapísať kvantový obvod ako program, zobraziť ho, spustiť ho na simulátore a pozrieť si výsledky merania.


---
## Úloha

V tejto úlohe si vyskúšajte upravovať kvantový obvod.

Kód môžete brať ako **šablónu**. Väčšina častí ostáva rovnaká — importy, vytvorenie obvodu, meranie, simulácia a zobrazenie histogramu.

Upravovať budete hlavne **strednú časť obvodu**, teda miesto, kde sa aplikujú kvantové brány.

Skúste napríklad pridať alebo zmeniť **kvantové brány** na rôznych qubitoch.

Môžete skúšať aj rôzne rotačné brány s rôznymi uhlami.

Napríklad:

    circuit.rx(1.28, 0)
    circuit.ry(2.98, 1)


Po každej zmene obvod znova spustite a sledujte, ako sa zmení histogram výsledkov.

Cieľom je pochopiť, že rôzne kvantové brány menia stav qubitu rôznym spôsobom, a preto menia aj pravdepodobnosti výsledkov merania.

`,
  questions: [
    


  
  ],
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
