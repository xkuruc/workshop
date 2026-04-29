import bellCircuitIllustration from "../../assets/qiskit-circuit.svg";


const qiskitFirstCircuitLesson = {
  id: "qiskit-first-circuit",
  title: "Lekcia 2: Prvý obvod v Qiskite",
  summary: "Praktická lekcia s editorom a jednoduchým kvantovým obvodom.",
  theory: `


 # Qubit, superpozícia a Blochova sféra

## Základné stavy qubitu

Pri qubite tieto hodnoty zapisujeme ako kvantové stavy: hodnota 0 zodpovedá stavu $|0\\rangle$ a hodnota 1 zodpovedá stavu $|1\\rangle$. 

Qubit však nemusí byť iba v jednom z týchto stavov. Môže byť v stave $|0\\rangle$, v stave $|1\\rangle$, alebo v ich superpozícii, teda v kombinácii oboch možností naraz. 

To znamená, že qubit pred meraním nemusí byť jednoznačne $|0\\rangle$ alebo $|1\\rangle$. Pokým ho nezmeriame správa sa akoby mal obidve hodnoty.  Jeho stav môže byť nastavený tak, že pri meraní dostaneme napríklad: s pravdepodobnosťou 50 % výsledok $|0\\rangle$ a s pravdepodobnosťou 50 % výsledok $|1\\rangle$.  

Ale superpozícia nemusí byť vždy len „pol na pol“. Qubit môže byť pripravený aj tak, že pri meraní dostaneme napríklad 70 % šancu na výsledok $|1\\rangle$, 30 % šancu na výsledok $|0\\rangle$, alebo prakticky akúkoľvek inú kombináciu pravdepodobností. 

---

## Rovnaké pravdepodobnosti nemusia znamenať rovnaký stav

Dôležité je, že dva qubity môžu mať rovnaké pravdepodobnosti merania ( napríklad oba dávajú 50 % pre $|0\\rangle$ a 50 % pre $|1\\rangle$, ale napriek tomu nemusia byť v rovnakom kvantovom stave – ak by sme na tieto dva qubity aplikovali úplne rovnakú kvantovú operáciu tak dostanem úplne odlišné stavy. 

Konkrétne, existuje nekonečne veľa stavov, ktoré pri meraní dávajú rovnaké pravdepodobnosti 50/50, ale nie sú rovnaké.  

---

## Blochova sféra

Túto situáciu si vieme reprezentovať pomocou Blochovej sféry. Každý stav jedného qubitu môžeme zobraziť ako bod na povrchu gule. Presnejšie sa hovorí o kvantovom stavovom vektore, ktorý ukazuje na konkrétne miesto na sfére. 

V štandardnom značení platí- severný pól reprezentuje stav $|0\\rangle$, južný pól reprezentuje stav $|1\\rangle$, body na rovníku reprezentujú superpozície, pri ktorých máme 50 % pravdepodobnosť namerať $|0\\rangle$ a 50 % pravdepodobnosť namerať $|1\\rangle$. 

Ak je bod bližšie k severnému pólu, je väčšia pravdepodobnosť namerať $|0\\rangle$. Ak je bližšie k južnému pólu, je väčšia pravdepodobnosť namerať $|1\\rangle$. Pravdepodobnosť na namerania konkrétnych výsledkov je daná uhlom  medzi kvantovým stavovým vektorom a osou Z. 

Body na rovníku majú rovnaké pravdepodobnosti merania, ale môžu sa líšiť uhlom okolo zvislej osi (okolo osi Z). Práve tento uhol reprezentuje fázu. Preto nestačí povedať iba „tento qubit je 50/50“. Treba vedieť aj to, aká 50/50 superpozícia to je – a to sa presne popisuje ako kvantový stavový vektor v Blochovej sfére.  



---

## Operácie na qubitoch

Operácie na qubitoch sa potom dajú veľmi pekne predstaviť ako rotácie kvantového stavového vektora okolo osí X, Y a Z. Rôzne kvantové brány teda menia polohu vektora na Blochovej sfére, a tým menia aj pravdepodobnosti alebo fázu výsledného stavu. Dôležité je znova zdôrazniť, že ten kvantový stavový vektor reprezentuje stav v ktorom sa qubit nachádza, a jeho pohyb po Blochovej sfére reprezentuje operácie nad qubitom - nejedná sa o fyzický pohyb, alebo fyzické rotácie, ale o zmenu stavu qubitu. 

Prosím, vyskúšajte si tento online nástroj na vizualizáciu Blochovej sféry: (odporúčame skopírovať URL a otvoriť vo novom okne)

[https://bloch.kherb.io/](https://bloch.kherb.io/)


Pomocou tohto nástroja si môžete skúsiť základné kvantové operácie, ktoré sa na Blochovej sfére zobrazujú ako **rotácie stavového vektora**.

Odporúčam vyskúšať si aj rotácie o vlastné uhly, teda nielen o **90°** alebo **180°**, ale aj o iné hodnoty. Skúste meniť rotácie okolo rôznych osí, napríklad **X**, **Y** a **Z**.

Stlačením tlačidla **„+“** sa stavový vektor otočí o kladný uhol.  
Stlačením tlačidla **„-“** sa stavový vektor otočí o záporný uhol.


---

## Matematický zápis stavu qubitu

Matematicky sa stav qubitu zapisuje ako kombinácia dvoch základných stavov:

$$
∣ψ⟩=α |0\\rangle +β|1\\rangle
$$

Tu α a β sú tzv. “amplitúdy pravdepodobnosti”- α a β sú komplexné čísla, a Pravdepodobnosť namerať $|0\\rangle$ je $∣α∣^2$ a pravdepodobnosť namerať $|1\\rangle$ je $∣β∣^2$. 

A stále musí platiť že:

$$
∣α∣^2 + ∣ β ∣^2 = 1
$$

lebo máme 100% šancu že nameriame $|0\\rangle$ alebo $|1\\rangle$

---


## Príklad 

Napríklad, 50/50 superpozíciu vieme pomocou stavového vektora zapísať takto: 

$$
∣ψ⟩ = \\frac{1}{\\sqrt{2}} |0\\rangle + \\frac{1}{\\sqrt{2}} |1\\rangle
$$

To znamená, že pravdepodobnosť namerať $|0\\rangle$ je: 

$$
P(|0\\rangle) = |\\frac{1}{\\sqrt{2}}|² = \\frac{1}{2} = 50 \\%
$$

a pravdepodobnosť namerať $|1\\rangle$ je tiež: 

$$
P(|1\\rangle) = |\\frac{1}{\\sqrt{2}}|² = \\frac{1}{2} = 50\\%
$$



Dôležité ale je, že 50/50 superpozícia nemusí byť iba jedna. Príklad inej 50/50 superpozície s komplexným číslom: 

$$
∣ψ⟩ = \\frac{1}{\\sqrt{2}} |0\\rangle - \\frac{i}{\\sqrt{2}} |1\\rangle
$$

Pravdepodobnosti sú: 

$$
P(|0\\rangle) = |\\frac{1}{\\sqrt{2}}|² = \\frac{1}{2} = 50 \\%
$$

$$
P(|1\\rangle) = |-\\frac{i}{\\sqrt{2}}|² = \\frac{1}{2} = 50 \\%
$$


Príklad úplne iného qubitového stavu s komplexnými číslami: 


$$
∣ψ⟩ = \\frac{1+i}{2\\sqrt{2}} |0\\rangle + \\frac{i \\sqrt{3}}{2} |1\\rangle
$$

Pravdepodobnosti sú: 

$$
P(|0\\rangle) = |\\frac{1+i}{2\\sqrt{2}}|² = 25 \\%
$$

$$
P(|1\\rangle) = |\\frac{i \\sqrt{3}}{2}|² = 75 \\%
$$





`,
  images: [
    {
      src: bellCircuitIllustration,
      alt: "Jednoduchý Bell-state circuit",
      caption: "Jedna z klasických ukážok v Qiskite: Hadamard + CNOT + meranie.",
    },
  ],
  questions: [
    
  {
    id: "q1",
    type: "multiple-choice",
    prompt: "Klasický bit môže nadobúdať hodnotu:",
    options: [
      "iba 0",
      "iba 1",
      "0 alebo 1",
      "akékoľvek reálne číslo",
    ],
    correctAnswer: "0 alebo 1",
    explanation: "",
  },

  {
    id: "q2",
    type: "multiple-choice",
    prompt: "Qubit sa od klasického bitu líši tým, že môže byť:",
    options: [
      "iba v stave 0",
      "iba v stave 1",
      "iba vypnutý alebo zapnutý",
      "v stave ∣0⟩, ∣1⟩, alebo v ich superpozícii",
    ],
    correctAnswer: "v stave ∣0⟩, ∣1⟩, alebo v ich superpozícii",
    explanation: "",
  },

  {
    id: "q3",
    type: "multiple-choice",
    prompt: "Ak je qubit v superpozícii 50/50, znamená to, že pri meraní:",
    options: [
      "vždy nameriame 0",
      "vždy nameriame 1",
      "máme 50 % šancu namerať 0 a 50 % šancu namerať 1",
      "qubit sa nedá zmerať",
    ],
    correctAnswer: "máme 50 % šancu namerať 0 a 50 % šancu namerať 1",
    explanation: "",
  },

  {
    id: "q4",
    type: "multiple-choice",
    prompt: "Superpozícia qubitu môže byť:",
    options: [
      "iba 50/50",
      "iba 70/30",
      "ľubovoľná kombinácia pravdepodobností, napríklad 50/50, 70/30, 90/10",
      "vždy rovnaká ako klasický bit",
    ],
    correctAnswer: "ľubovoľná kombinácia pravdepodobností, napríklad 50/50, 70/30, 90/10",
    explanation: "",
  },

  {
    id: "q5",
    type: "multiple-choice",
    prompt: "Blochova sféra slúži na:",
    options: [
      "meranie teploty qubitu",
      "vizualizáciu stavu jedného qubitu",
      "zobrazenie klasických bitov",
      "výpočet rýchlosti svetla",
    ],
    correctAnswer: "vizualizáciu stavu jedného qubitu",
    explanation: "",
  },

  {
    id: "q6",
    type: "multiple-choice",
    prompt: "V štandardnom značení severný pól Blochovej sféry reprezentuje:",
    options: [
      "stav ∣0⟩",
      "stav ∣1⟩",
      "stav 50/50",
      "neurčitý stav",
    ],
    correctAnswer: "stav ∣0⟩",
    explanation: "",
  },

  {
    id: "q7",
    type: "multiple-choice",
    prompt: "Južný pól Blochovej sféry reprezentuje:",
    options: [
      "stav ∣0⟩",
      "stav ∣1⟩",
      "fázu",
      "kvantovú bránu",
    ],
    correctAnswer: "stav ∣1⟩",
    explanation: "",
  },

  {
    id: "q8",
    type: "multiple-choice",
    prompt: "Body na rovníku Blochovej sféry predstavujú stavy, pri ktorých:",
    options: [
      "vždy nameriame 0",
      "vždy nameriame 1",
      "máme 50 % pravdepodobnosť namerať 0 a 50 % pravdepodobnosť namerať 1",
      "qubit prestáva existovať",
    ],
    correctAnswer: "máme 50 % pravdepodobnosť namerať 0 a 50 % pravdepodobnosť namerať 1",
    explanation: "",
  },

  {
    id: "q9",
    type: "multiple-choice",
    prompt: "Ak je bod na Blochovej sfére bližšie k severnému pólu, potom je väčšia pravdepodobnosť, že nameriame:",
    options: [
      "0",
      "1",
      "oboje naraz",
      "nič",
    ],
    correctAnswer: "0",
    explanation: "",
  },

  {
    id: "q10",
    type: "multiple-choice",
    prompt: "Operácie na qubite sa na Blochovej sfére dajú predstaviť ako:",
    options: [
      "fyzická rotácia častice v priestore",
      "rotácie vektora okolo osí X, Y a Z",
      "zmena farby sféry",
      "zničenie qubitu",
    ],
    correctAnswer: "rotácie vektora okolo osí X, Y a Z",
    explanation: "",
  },

  {
    id: "q11",
    type: "short-answer",
    prompt: "Qubit môže byť v stave ∣0⟩, ∣1⟩, alebo v ich __________.",
    correctAnswer: ["superpozícii", "superpozicii", "superpozícia", "superpozicia"],
    explanation: "",
  },

  {
    id: "q12",
    type: "short-answer",
    prompt: "__________ sféra je geometrická reprezentácia stavu jedného qubitu.",
    correctAnswer: ["Blochova", "blochova"],
    explanation: "",
  },

  {
    id: "q13",
    type: "short-answer",
    prompt: "Body na __________ Blochovej sféry reprezentujú superpozície s pravdepodobnosťou 50/50.",
    correctAnswer: ["rovníku", "rovniku"],
    explanation: "",
  },

  {
    id: "q14",
    type: "short-answer",
    prompt: "Uhol okolo zvislej osi na Blochovej sfére reprezentuje kvantovú __________.",
    correctAnswer: ["fázu", "fazu"],
    explanation: "",
  },

  {
    id: "q15",
    type: "short-answer",
    prompt: "α a β nie sú priamo pravdepodobnosti, ale amplitúdy __________.",
    correctAnswer: ["pravdepodobnosti"],
    explanation: "",
  },

  {
    id: "q16",
    type: "short-answer",
    prompt: "Hodnoty α a β sú __________ čísla.",
    correctAnswer: ["komplexné", "komplexne"],
    explanation: "",
  },

  {
    id: "q17",
    type: "short-answer",
    prompt: "Kvantové operácie menia stav qubitu, čo sa na Blochovej sfére zobrazuje ako __________ vektora.",
    correctAnswer: ["rotácia", "rotacia", "rotácie", "rotacie"],
    explanation: "",
  },

  {
    id: "q18",
    type: "multiple-choice",
    prompt: "Klasický bit môže byť v superpozícii 0 a 1.",
    options: [
      "Pravda",
      "Nepravda",
    ],
    correctAnswer: "Nepravda",
    explanation: "",
  },

  {
    id: "q19",
    type: "multiple-choice",
    prompt: "Qubit môže mať pri meraní 70 % šancu na výsledok 1 a 30 % šancu na výsledok 0.",
    options: [
      "Pravda",
      "Nepravda",
    ],
    correctAnswer: "Pravda",
    explanation: "",
  },

  {
    id: "q20",
    type: "multiple-choice",
    prompt: "Dva qubitové stavy s rovnakými pravdepodobnosťami merania musia byť vždy rovnaké.",
    options: [
      "Pravda",
      "Nepravda",
    ],
    correctAnswer: "Nepravda",
    explanation: "",
  },

  {
    id: "q21",
    type: "multiple-choice",
    prompt: "Na rovníku Blochovej sféry sú všetky stavy z pohľadu pravdepodobností merania 0/1 typu 50/50.",
    options: [
      "Pravda",
      "Nepravda",
    ],
    correctAnswer: "Pravda",
    explanation: "",
  },

  {
    id: "q22",
    type: "multiple-choice",
    prompt: "Pohyb vektora po Blochovej sfére znamená fyzický pohyb qubitu v priestore.",
    options: [
      "Pravda",
      "Nepravda",
    ],
    correctAnswer: "Nepravda",
    explanation: "",
  },

  {
    id: "q23",
    type: "multiple-choice",
    prompt: "Kvantové operácie môžu meniť pravdepodobnosti výsledku qubitu.",
    options: [
      "Pravda",
      "Nepravda",
    ],
    correctAnswer: "Pravda",
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
