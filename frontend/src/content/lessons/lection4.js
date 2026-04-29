import bellCircuitIllustration from "../../assets/qiskit-circuit.svg";
import c1 from "../../assets/c1.png";
import c2 from "../../assets/c2.png";
import c3 from "../../assets/c3.png";
import c4 from "../../assets/c4.png";
import c5 from "../../assets/c5.png";
import c6 from "../../assets/c6.png";


const qiskitFirstCircuitLesson = {
  id: "qiskit-first-circuit",
  title: "Lekcia 2: Prvý obvod v Qiskite",
  summary: "Praktická lekcia s editorom a jednoduchým kvantovým obvodom.",
  theory: `


# Kvantový obvod

Doteraz sme si vysvetlili, čo je qubit, kvantový stav a kvantová brána.

Teraz si ukážeme, ako z týchto prvkov skladáme celý **kvantový výpočet**.

Takýto výpočet zapisujeme pomocou **kvantového obvodu**, po anglicky **quantum circuit**.

---

## Čo je kvantový obvod?

**Kvantový obvod** je postupnosť kvantových operácií aplikovaných na qubity.

Kvantový obvod nám hovorí:

- s akými qubitmi začíname,
- aké kvantové brány aplikujeme na konkrétné qubity,
- v akom poradí ich aplikujeme,
- kedy qubity meriame,
- aký klasický výsledok získame.

Kvantový obvod si môžeme predstaviť ako **recept na kvantový výpočet**.

Nie je to elektrický obvod v klasickom zmysle. **Je to diagram, ktorý opisuje, ako sa kvantový stav mení počas výpočtu**.

---

## Ako čítame kvantový obvod?

Kvantový obvod čítame **zľava doprava**.

Naľavo máme počiatočné stavy qubitov. Smerom doprava aplikujeme kvantové brány. Na konci obvodu qubity zmeriame.

Napríklad:

![Môj obrázok](${c1})

Tento obvod znamená:

1. začíname so stavom $|0\\rangle$,
2. aplikujeme bránu **Hadamard**,
3. potom aplikujeme bránu **X**,
4. nakoniec qubit zmeriame.

Poradie brán je veľmi dôležité, pretože iné poradie môže viesť k inému výslednému stavu.

---

## Qubitové vodiče

Každý qubit má v obvode svoju vodorovnú čiaru.

Napríklad obvod s dvoma qubitmi môže vyzerať takto:

![Môj obrázok](${c2})

Tu máme dva qubity:

- $q0$ je prvý qubit,
- $q1$ je druhý qubit.

Tieto čiary neznamenajú klasické elektrické káble. Sú to iba grafické znázornenia toho, ako sa stav qubitov mení počas výpočtu.


---

## Jednokubitové a viackubitové brány

Niektoré brány pôsobia iba na jeden qubit.

Medzi **jednokubitové brány** patria napríklad:

- **X**,
- **Y**,
- **Z**,
- **H**,
- **$R_x(\\theta)$**,
- **$R_y(\\theta)$**,
- **$R_z(\\theta)$**.

Napríklad:

![Môj obrázok](${c3})

Táto brána pôsobí iba na qubit $q0$.

Niektoré brány však pôsobia na viac qubitov naraz.

Typickým príkladom je brána **CNOT**:

![Môj obrázok](${c4})

V tomto zápise:

- bodka **●** označuje **control qubit**,
- symbol **X** označuje **target qubit**,
- zvislá čiara ukazuje, že ide o jednu spoločnú dvojqubitovú operáciu.

Brána **CNOT** preklopí cieľový qubit iba vtedy, keď je riadiaci qubit v stave $|1\\rangle$.

---

## Meranie

Na konci kvantového obvodu zvyčajne vykonáme **meranie**.

Meranie prevedie kvantový stav na klasický výsledok.

Napríklad:

![Môj obrázok](${c5})


Pred meraním môže byť qubit v superpozícii. Po meraní však dostaneme konkrétny klasický výsledok: **0** alebo **1**, vo závisloti od pravdepodobností. 

Ak napríklad aplikujeme Hadamardovu bránu na stav $|0\\rangle$, dostaneme:

$$
H|0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)
$$

Po meraní dostaneme:

- výsledok **0** s pravdepodobnosťou 50 %,
- výsledok **1** s pravdepodobnosťou 50 %.

Meranie je teda moment, kedy z kvantového stavu získame klasickú informáciu. Ale meranie nám zničí kvantovú informáciu, a ovplyvní aj informáciu vo ďalších qubitoch, so ktorými ma entanglement. 

---

## Kvantové a klasické registre

V kvantových obvodoch často rozlišujeme dva typy registrov:

- **kvantový register** obsahuje qubity,
- **klasický register** obsahuje výsledky merania.

Napríklad:

![Môj obrázok](${c6})

tak výsledok merania qubitu $q0$ uložíme do $c0$ a výsledok merania qubitu $q1$ uložíme do $c1$.


---

## Príklad obvodu s entanglementom

Teraz si ukážeme obvod s dvoma qubitmi:

![Môj obrázok](${c6})

Tento obvod robí nasledovné:

1. Oba qubity začínajú v stave $|0\\rangle$.
2. Na prvý qubit $q0$ aplikujeme bránu **Hadamard**.
3. Qubit $q0$ sa dostane do superpozície.
4. Potom aplikujeme bránu **CNOT**.
5. Prvý qubit je **control** a druhý qubit je **target**.
6. Vznikne previazaný stav, teda **entanglement**.
7. Nakoniec oba qubity zmeriame.

Výsledný stav môžeme zapísať ako:

$$
\\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)
$$

To znamená, že po meraní dostaneme buď:

- **00**,
- alebo **11**.

Nedostaneme však **01** alebo **10**.

Tento príklad ukazuje, že dva qubity môžu byť previazané tak, že ich výsledky merania spolu súvisia.


---

## Z čoho sa skladá kvantový obvod?

Kvantový obvod sa skladá z niekoľkých základných častí:

### Qubity

Qubity sú základné jednotky kvantovej informácie.


### Počiatočný stav

Najčastejšie začíname so všetkými qubitmi v stave $|0\\rangle$.

### Kvantové brány

Kvantové brány menia stav qubitov.


### Viackubitové operácie

Niektoré operácie prepájajú viac qubitov.


### Meranie

Meranie prevedie kvantový stav na klasický výsledok.


### Klasické bity

Klasické bity uchovávajú výsledky merania.


---

## Kvantový obvod ako algoritmus

Kvantový obvod môžeme chápať ako konkrétny zápis kvantového algoritmu.

**Kvantový algoritmus** hovorí, čo chceme vypočítať.  
**Kvantový obvod** hovorí, ako tento výpočet vykonáme pomocou qubitov a kvantových brán.

Inými slovami:

> Kvantový algoritmus je myšlienka výpočtu.  
> Kvantový obvod je konkrétny postup, ako túto myšlienku zapíšeme pomocou brán.

---


`,
  questions: [

  {
    id: "q1",
    type: "multiple-choice",
    prompt: "Kvantový obvod je:",
    options: [
      "postupnosť kvantových operácií aplikovaných na qubity",
      "elektrický kábel v počítači",
      "iba jeden qubit",
      "výsledok merania",
    ],
    correctAnswer: "postupnosť kvantových operácií aplikovaných na qubity",
    explanation: "",
  },

  {
    id: "q2",
    type: "short-answer",
    prompt: "Kvantový obvod sa po anglicky nazýva quantum __________.",
    correctAnswer: ["circuit"],
    explanation: "",
  },

  {
    id: "q3",
    type: "multiple-choice",
    prompt: "Kvantový obvod čítame:",
    options: [
      "zľava doprava",
      "sprava doľava",
      "zdola nahor",
      "náhodne",
    ],
    correctAnswer: "zľava doprava",
    explanation: "",
  },

  {
    id: "q4",
    type: "multiple-choice",
    prompt: "Na konci kvantového obvodu zvyčajne vykonáme:",
    options: [
      "meranie",
      "vymazanie obvodu",
      "kopírovanie qubitu",
      "zmenu názvu qubitu",
    ],
    correctAnswer: "meranie",
    explanation: "",
  },

  {
    id: "q5",
    type: "multiple-choice",
    prompt: "Meranie prevedie kvantový stav na:",
    options: [
      "klasický výsledok",
      "nový kvantový počítač",
      "ďalšiu bránu",
      "Blochovu sféru",
    ],
    correctAnswer: "klasický výsledok",
    explanation: "",
  },

  {
    id: "q6",
    type: "short-answer",
    prompt: "Kvantový register obsahuje __________.",
    correctAnswer: ["qubity", "qubitov"],
    explanation: "",
  },

  {
    id: "q7",
    type: "short-answer",
    prompt: "Klasický register obsahuje výsledky __________.",
    correctAnswer: ["merania", "meraní", "merani"],
    explanation: "",
  },

  {
    id: "q8",
    type: "multiple-choice",
    prompt: "Pri bráne CNOT bodka ● označuje:",
    options: [
      "control qubit",
      "target qubit",
      "klasický bit",
      "meranie",
    ],
    correctAnswer: "control qubit",
    explanation: "",
  },

  {
    id: "q9",
    type: "multiple-choice",
    prompt: "Pravda alebo nepravda: Brána CNOT preklopí cieľový qubit iba vtedy, keď je riadiaci qubit v stave ∣1⟩.",
    options: [
      "Pravda",
      "Nepravda",
    ],
    correctAnswer: "Pravda",
    explanation: "",
  },

  {
    id: "q10",
    type: "multiple-choice",
    prompt: "V príklade s entanglementom po meraní dostaneme hlavne výsledky:",
    options: [
      "00 alebo 11",
      "01 alebo 10",
      "iba 00",
      "iba 10",
    ],
    correctAnswer: "00 alebo 11",
    explanation: "",
  },

    


  
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
