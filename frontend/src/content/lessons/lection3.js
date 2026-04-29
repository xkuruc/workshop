import bellCircuitIllustration from "../../assets/qiskit-circuit.svg";


const qiskitFirstCircuitLesson = {
  id: "qiskit-first-circuit",
  title: "Lekcia 2: Prvý obvod v Qiskite",
  summary: "Praktická lekcia s editorom a jednoduchým kvantovým obvodom.",
  theory: `


# Základné kvantové stavy a kvantové brány

## Základné kvantové stavy

Základné kvantové stavy zapisujeme takto: $|0\\rangle \\quad \\text{a} \\quad |1\\rangle$

Tento zápis sa volá **Diracova notácia**.

- Symbol $|0\\rangle$ predstavuje kvantový stav **0**.
- Symbol $|1\\rangle$ predstavuje kvantový stav **1**.

Qubit môže byť napríklad v stave:

$$
|\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle
$$

To znamená, že qubit je v **superpozícii** stavov $|0\\rangle$ a $|1\\rangle$.

Hodnoty $\\alpha$ a $\\beta$ určujú pravdepodobnosti, s akými po meraní dostaneme výsledok **$|0\\rangle$** alebo **$|1\\rangle$**.

Dôležité je, že qubit počas výpočtu nie je obyčajná skrytá nula alebo jednotka. Je to kvantový stav, s ktorým môžeme pracovať pomocou špeciálnych operácií.

Tieto operácie sa nazývajú **kvantové operácie**, alebo častejšie **kvantové brány**.



---

## Kvantové operácie

**Kvantová operácia** je transformácia, ktorú aplikujeme na jeden alebo viac qubitov.

Keď na qubit aplikujeme kvantovú operáciu, zmeníme jeho stav.

V klasickom počítaní poznáme logické brány, napríklad:

- **NOT**,
- **AND**,
- **OR**.

Tieto brány pracujú s klasickými bitmi. Napríklad brána **NOT** zmení:

$$
0 \\rightarrow 1
$$

a zároveň:

$$
1 \\rightarrow 0
$$

V kvantovom počítaní máme podobnú myšlienku, ale namiesto klasických bitov pracujeme s **qubitmi**.

Kvantové operácie sa nazývajú **kvantové brány**. Každá kvantová brána mení kvantový stav podľa presne definovaného matematického pravidla.

Kvantové brány sa často zapisujú ako **matice**.

Qubit môžeme chápať ako **vektor** a kvantovú bránu ako **maticu**, ktorá tento vektor transformuje.

Pre účely tohto workshopu však nie je potrebné ísť príliš hlboko do lineárnej algebry. Dôležité je pochopiť, že **Kvantová brána mení stav qubitu** a **klasické počitače simulujú kvantové operácie** ako násobenie matíc.

---

## Prečo hovoríme „kvantová brána“

Pojem **brána** používame preto, že operácia je základný stavebný blok kvantového výpočtu.

Tak ako v klasickom počítači skladáme výpočty z logických operácií, v kvantovom počítači skladáme výpočty z **kvantových brán**.

Kvantová brána môže napríklad:

- preklopiť stav qubitu,
- zmeniť fázu qubitu,
- otočiť stav qubitu okolo určitej osi,
- vytvoriť superpozíciu,
- previazať viac qubitov medzi sebou.

**Kvantový algoritmus** je potom postupnosť takýchto brán aplikovaných na qubity.

---

## Základné kvantové brány

V tejto časti si predstavíme základné **jednokubitové kvantové brány**.  
Tieto brány pôsobia na jeden qubit a menia jeho stav na Blochovej sfére.

Najprv sa pozrieme na brány **X**, **Y** a **Z**.  
Tieto brány si môžeme intuitívne predstaviť ako rotácie qubitu okolo príslušných osí:

- brána **X** je rotácia okolo osi **X** o 180°,
- brána **Y** je rotácia okolo osi **Y** o 180°,
- brána **Z** je rotácia okolo osi **Z** o 180°.

Inými slovami, brány **X**, **Y** a **Z** zodpovedajú rotáciám o uhol $\\pi$ radiánov okolo osí X, Y a Z.

Neskôr budeme pracovať aj so všeobecnejšími rotačnými bránami: **$R_x(\\theta), \\quad R_y(\\theta), \\quad R_z(\\theta)$**


Tieto brány robia to isté ako brány X, Y a Z, ale s jedným dôležitým rozdielom:  uhol rotácie nemusí byť iba 180°. Môžeme si zvoliť ľubovoľný uhol $\\theta$.

To znamená, že:

- **X** je špeciálny prípad  $R_x(\\theta)$,
- **Y** je špeciálny prípad $R_y(\\theta)$,
- **Z** je špeciálny prípad $R_z(\\theta)$.

Pomocou kombinácií rotačných brán  $R_x(\\theta), R_y(\\theta)$ a $R_z(\\theta)$
vieme qubit natočiť prakticky do ľubovoľného bodu na Blochovej sfére.

Toto je veľmi dôležitá myšlienka:  
ak vieme qubit ľubovoľne otáčať, vieme nad ním vykonávať všeobecné jednokubitové operácie.  
V kombinácii s viackubitovými bránami nám to umožňuje skladať univerzálne kvantové výpočty.


Jednotlivé brány si v ďalších častiach prejdeme podrobnejšie. Pri každej z nich si vysvetlíme jej intuíciu, ukážeme si, ako mení stav qubitu, a doplníme aj jej **maticový zápis**, aby bol popis presný a úplný.

Maticový zápis je dôležitý preto, že stav qubitu vieme matematicky opísať ako vektor. Tento vektor si môžeme geometricky predstaviť ako bod na Blochovej sfére. Keď na qubit aplikujeme kvantovú bránu, meníme jeho stav — teda „otáčame“ alebo **transformujeme** tento vektor. V lineárnej algebre sa takéto transformácie opisujú pomocou násobenia matice a vektora.

Preto kvantové brány zapisujeme ako matice a ich pôsobenie na qubit môžeme zapísať ako:

$$
\\text{nový stav} = \\text{brána} \\cdot \\text{pôvodný stav}
$$

Maticový zápis nám teda umožňuje presne vypočítať, a simulovať správanie kvantového počítača; ako sa stav qubitu po aplikovaní danej brány zmení.

Kde stavy $\\lvert 0 \\rangle$ a $\\lvert 1 \\rangle$ sú reprezentované ako :

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

Inými slovami:
- $\\lvert 0 \\rangle$ smeruje „hore“ na severný pól
- $\\lvert 1 \\rangle$ smeruje „dole“ na južný pól


---

## Brána X

Brána **X** je kvantová verzia klasickej brány **NOT**.

Ak máme qubit v stave $|0\\rangle$, brána X ho zmení na $|1\\rangle$.

Ak máme qubit v stave $|1\\rangle$, brána X ho zmení na $|0\\rangle$.

### Zápis

$$
X|0\\rangle = |1\\rangle
$$

$$
X|1\\rangle = |0\\rangle
$$

Preto sa brána **X** často nazýva aj **bit-flip brána**, pretože preklápa hodnotu qubitu podobne ako klasická operácia NOT.

### Maticový zápis brány X

$$
X =
\\begin{bmatrix}
0 & 1 \\\\
1 & 0
\\end{bmatrix}
$$

### Intuitívne vysvetlenie

Bránu X si môžeme predstaviť ako otočenie stavu qubitu okolo osi **X** o $180^\\circ$ na Blochovej sfére.

---

## Brána Z

Brána **Z** nemení $|0\\rangle$ na $|1\\rangle$ ani $|1\\rangle$ na $|0\\rangle$.

Namiesto toho mení **fázu** stavu $|1\\rangle$.

### Zápis

$$
Z|0\\rangle = |0\\rangle
$$

$$
Z|1\\rangle = -|1\\rangle
$$

To znamená, že stav $|0\\rangle$ ostane nezmenený, ale stav $|1\\rangle$ dostane záporné znamienko. 
Bránu Z si môžeme predstaviť ako otočenie stavu qubitu okolo osi **Y** o $180^\\circ$ na Blochovej sfére.

### Maticový zápis brány Z

$$
Z =
\\begin{bmatrix}
1 & 0 \\\\
0 & -1
\\end{bmatrix}
$$


### Prečo je fáza dôležitá?

Na prvý pohľad sa môže zdať, že záporné znamienko nie je dôležité.

Pri samotnom meraní stavu $|1\\rangle$ by sme stále dostali výsledok **1**.

V kvantovom výpočte je však fáza veľmi dôležitá, pretože ovplyvňuje **interferenciu** medzi rôznymi stavmi.

Kvantové algoritmy často využívajú práve to, že niektoré superpozície sa vďaka tomuto javu zosilnia a iné sa vyrušia.


### Intuitívne vysvetlenie

Bránu Z si môžeme predstaviť ako otočenie stavu qubitu okolo osi **Z** o $180^\\circ$ na Blochovej sfére.

---

## Brána Y

Brána **Y** je kombináciou preklopenia stavu a zmeny fázy. Je to kombinácia brán X a Z.

### Zápis

$$
Y|0\\rangle = i|1\\rangle
$$

$$
Y|1\\rangle = -i|0\\rangle
$$

Tu sa objavuje imaginárna jednotka $i$, kde platí:

$$
i^2 = -1
$$

### Maticový zápis brány Y

$$
Y =
\\begin{bmatrix}
0 & -i \\\\
i & 0
\\end{bmatrix}
$$

Brána **Y** teda podobne ako X preklápa $|0\\rangle$ a $|1\\rangle$, ale zároveň pridáva komplexnú fázu.

### Intuitívne vysvetlenie

Bránu Y si môžeme predstaviť ako otočenie stavu qubitu okolo osi **Y** o $180^\\circ$ na Blochovej sfére.


---

## Brána Hadamard

Brána **Hadamard**, často označovaná ako **H**, je jedna z najdôležitejších jednokubitových kvantových brán.

Používa sa najmä na vytvorenie **superpozície**.

Ak máme qubit v stave $|0\\rangle$, brána **H** ho zmení na rovnomernú superpozíciu stavov $|0\\rangle$ a $|1\\rangle$.

Ak máme qubit v stave $|1\\rangle$, brána **H** ho tiež zmení na superpozíciu, ale so záporným znamienkom pri stave $|1\\rangle$.

### Zápis

$$
H|0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)
$$

$$
H|1\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle)
$$

Preto sa brána **Hadamard** často používa na prípravu qubitu do superpozície.

### Maticový zápis brány H

$$
H =
\\frac{1}{\\sqrt{2}}
\\begin{bmatrix}
1 & 1 \\\\
1 & -1
\\end{bmatrix}
$$

### Intuitívne vysvetlenie

Bránu **Hadamard** si môžeme predstaviť ako operáciu, ktorá presunie základné stavy $|0\\rangle$ a $|1\\rangle$ do superpozície, presne na rovník.

Brána **Hadamard** je veľmi dôležitá, pretože sa používa na začiatku mnohých kvantových algoritmov na vytvorenie superpozície.

---

## Rotačné brány Rx, Ry, Rz

Okrem brán **X**, **Y** a **Z** používame aj rotačné brány.

Tieto brány otáčajú kvantový stav o určitý uhol.

Najčastejšie používame:

| Brána | Význam |
|---|---|
| $R_x(\\theta)$ | rotácia okolo osi X |
| $R_y(\\theta)$ | rotácia okolo osi Y |
| $R_z(\\theta)$ | rotácia okolo osi Z |

Uhol rotácie označujeme gréckym písmenom $\\theta$.

### Zápis rotačných brán

Rotačné brány zapisujeme pomocou uhla rotácie $\\theta$.

Maticový zápis brány $R_x(\\theta)$ je:

$$
R_x(\\theta) =
\\begin{bmatrix}
\\cos\\left(\\frac{\\theta}{2}\\right) & -i\\sin\\left(\\frac{\\theta}{2}\\right) \\\\
-i\\sin\\left(\\frac{\\theta}{2}\\right) & \\cos\\left(\\frac{\\theta}{2}\\right)
\\end{bmatrix}
$$

Maticový zápis brány $R_y(\\theta)$ je:

$$
R_y(\\theta) =
\\begin{bmatrix}
\\cos\\left(\\frac{\\theta}{2}\\right) & -\\sin\\left(\\frac{\\theta}{2}\\right) \\\\
\\sin\\left(\\frac{\\theta}{2}\\right) & \\cos\\left(\\frac{\\theta}{2}\\right)
\\end{bmatrix}
$$

Maticový zápis brány $R_z(\\theta)$ je:

$$
R_z(\\theta) =
\\begin{bmatrix}
e^{-i\\frac{\\theta}{2}} & 0 \\\\
0 & e^{i\\frac{\\theta}{2}}
\\end{bmatrix}
$$

---

### Brány X, Y, Z ako špeciálny prípad rotačných brán

Brány **X**, **Y** a **Z** môžeme chápať ako špeciálny prípad rotačných brán.

Konkrétne ide o rotáciu o: $\\theta = 180^\\circ = \\pi$

Preto môžeme intuitívne povedať:

| Brána | Interpretácia |
|---|---|
| **X** | rotácia o $180^\\circ$ okolo osi X |
| **Y** | rotácia o $180^\\circ$ okolo osi Y |
| **Z** | rotácia o $180^\\circ$ okolo osi Z |




Teda brány $R_x(\\pi)$, $R_y(\\pi)$, $R_z(\\pi)$ - zodpovedajú bránam **X**, **Y** a **Z**  ak $\\theta = 180^\\circ = \\pi$

Ale, tieto brány sú veľmi dôležité, pretože umožňujú jemne meniť stav qubitu o zvolený uhol, a umožnujú tzv. univerzálne výpočty.

---

## Dvojqubitové brány

Doteraz sme pracovali hlavne s **jednokubitovými bránami**, teda bránami, ktoré pôsobia iba na jeden qubit.

V kvantových obvodoch však často používame aj **dvojqubitové brány**. Tie pôsobia naraz na dva qubity.

Jednou z najdôležitejších dvojqubitových brán je brána **CNOT**.

---

## Brána CNOT

Brána **CNOT** znamená **Controlled-NOT**, teda riadená NOT brána.

Táto brána pracuje s dvoma qubitmi:

- prvý qubit je **riadiaci qubit**, po anglicky **control qubit**,
- druhý qubit je **cieľový qubit**, po anglicky **target qubit**.

Brána CNOT funguje takto:

- ak je riadiaci qubit v stave $|0\\rangle$, cieľový qubit sa nezmení,
- ak je riadiaci qubit v stave $|1\\rangle$, na cieľový qubit sa aplikuje brána **X**.

Inými slovami:

> CNOT preklopí druhý qubit iba vtedy, keď je prvý qubit v stave $|1\\rangle$.



### Zápis pôsobenia brány CNOT

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

Pri tomto zápise berieme prvý qubit ako **control** a druhý qubit ako **target**.


### Maticový zápis brány CNOT

Ak používame poradie stavov:
$
|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle
$

tak maticový zápis brány CNOT je:

$$
\\text{CNOT} =
\\begin{bmatrix}
1 & 0 & 0 & 0 \\\\
0 & 1 & 0 & 0 \\\\
0 & 0 & 0 & 1 \\\\
0 & 0 & 1 & 0
\\end{bmatrix}
$$



Bránu CNOT si môžeme predstaviť ako podmienenú verziu brány **X**.

Brána **X** vždy preklopí qubit:
$
|0\\rangle \\rightarrow |1\\rangle
$
a
$
|1\\rangle \\rightarrow |0\\rangle
$. Brána **CNOT** však preklopí cieľový qubit iba vtedy, keď je riadiaci qubit rovný $|1\\rangle$. Zaujímavá je situácia, kedy control qubit je vo superpozíí stavo $|0\\rangle$ a $|1\\rangle$. V tedy sa ten CNOT aj vykoná aj nevykoná zároveň, a druhý qubit bude vo superpozicí. Vznikne tak entanglemet medzi týmito dvoma qubitmi, a už ich nemôžno považovať za samostatné qubity, majú jeden spoločný stav.

Brána **CNOT** však preklopí cieľový qubit iba vtedy, keď je riadiaci qubit rovný $|1\\rangle$. Zaujímavá situácia nastáva vtedy, keď je **riadiaci qubit** v superpozícii stavov $|0\\rangle$ a $|1\\rangle$.
V takom prípade sa dá zjednodušene povedať, že brána **CNOT** sa **zároveň vykoná aj nevykoná**. Cieľový qubit sa teda dostane do stavu, ktorý závisí od stavu riadiaceho qubitu, ktorý je však vo superpozícíí.
To znamená, že tieto dva qubity už nemôžeme úplne považovať za samostatné nezávislé qubity. Namiesto toho majú jeden spoločný kvantový stav.

Preto je CNOT veľmi dôležitá pri práci s viacerými qubitmi a používa sa napríklad na vytváranie previazanosti, teda **entanglementu**.

---

## Výsledné stavy po aplikovaní jednokubitových brán

V tejto tabuľke vidíme, čo sa stane s qubitom, ak je vstupný stav $|0\\rangle$ alebo $|1\\rangle$ a aplikujeme naň danú bránu.

| Brána | Vstupný stav | Výsledný stav |
|---|---|---|
| **X** | $\\lvert 0 \\rangle$ | $\\lvert 1 \\rangle$ |
| **X** | $\\lvert 1 \\rangle$ | $\\lvert 0 \\rangle$ |
| **Y** | $\\lvert 0 \\rangle$ | $i\\lvert 1 \\rangle$ |
| **Y** | $\\lvert 1 \\rangle$ | $-i\\lvert 0 \\rangle$ |
| **Z** | $\\lvert 0 \\rangle$ | $\\lvert 0 \\rangle$ |
| **Z** | $\\lvert 1 \\rangle$ | $-\\lvert 1 \\rangle$ |

---

## 12. Výsledné stavy po aplikovaní brány CNOT

Brána CNOT je dvojqubitová, preto pri nej nemáme iba vstupy $|0\\rangle$ a $|1\\rangle$, ale dvojqubitové vstupy:
$\\lvert 1 \\rangle$
$$
|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle
$$

| Brána | Vstupný stav | Výsledný stav |
|---|---|---|
| **CNOT** | $\\lvert00\\rangle$ | $\\lvert00\\rangle$ |
| **CNOT** | $\\lvert01\\rangle$ | $\\lvert01\\rangle$ |
| **CNOT** | $\\lvert10\\rangle$ | $\\lvert11\\rangle$ |
| **CNOT** | $\\lvert11\\rangle$ | $\\lvert10\\rangle$ |

Pri tejto tabuľke platí:

- prvý qubit je **control**,
- druhý qubit je **target**.

To znamená, že druhý qubit sa preklopí iba vtedy, keď je prvý qubit v stave $|1\\rangle$.


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
    type: "short-answer",
    prompt: "Zápis ∣0⟩ a ∣1⟩ sa volá Diracova __________.",
    correctAnswer: ["notácia", "notacia"],
    explanation: "",
  },

  {
    id: "q2",
    type: "multiple-choice",
    prompt: "Qubit môže byť:",
    options: [
      "iba v stave ∣0⟩",
      "iba v stave ∣1⟩",
      "v stave ∣0⟩, ∣1⟩ alebo v ich superpozícii",
      "iba klasická nula alebo jednotka",
    ],
    correctAnswer: "v stave ∣0⟩, ∣1⟩ alebo v ich superpozícii",
    explanation: "",
  },

  {
    id: "q3",
    type: "multiple-choice",
    prompt: "Hodnoty α a β určujú:",
    options: [
      "pravdepodobnosti výsledkov merania",
      "počet kvantových brán",
      "typ Blochovej sféry",
      "počet klasických bitov",
    ],
    correctAnswer: "pravdepodobnosti výsledkov merania",
    explanation: "",
  },

  {
    id: "q4",
    type: "short-answer",
    prompt: "Kvantové operácie sa častejšie nazývajú kvantové __________.",
    correctAnswer: ["brány", "brany"],
    explanation: "",
  },

  {
    id: "q5",
    type: "multiple-choice",
    prompt: "Kvantová brána mení:",
    options: [
      "stav qubitu",
      "farbu qubitu",
      "názov qubitu",
      "počet osí v priestore",
    ],
    correctAnswer: "stav qubitu",
    explanation: "",
  },

  {
    id: "q6",
    type: "multiple-choice",
    prompt: "Pravda alebo nepravda: Kvantové brány sa často zapisujú ako matice.",
    options: [
      "Pravda",
      "Nepravda",
    ],
    correctAnswer: "Pravda",
    explanation: "",
  },

  {
    id: "q7",
    type: "multiple-choice",
    prompt: "Stav qubit môžeme matematicky chápať ako:",
    options: [
      "vektor",
      "tabuľku",
      "obyčajné celé číslo",
      "klasickú logickú bránu",
    ],
    correctAnswer: "vektor",
    explanation: "",
  },

  {
    id: "q8",
    type: "multiple-choice",
    prompt: "Na Blochovej sfére si kvantové brány môžeme intuitívne predstaviť ako:",
    options: [
      "rotácie stavu qubitu",
      "mazanie stavu qubitu",
      "meranie qubitu",
      "kopírovanie qubitu",
    ],
    correctAnswer: "rotácie stavu qubitu",
    explanation: "",
  },

  {
    id: "q9",
    type: "multiple-choice",
    prompt: "Brány X, Y a Z zodpovedajú rotáciám o:",
    options: [
      "90°",
      "180°",
      "270°",
      "360°",
    ],
    correctAnswer: "180°",
    explanation: "",
  },

  {
    id: "q10",
    type: "short-answer",
    prompt: "Rotácia o 180° zodpovedá uhlu __________ radiánov.",
    correctAnswer: ["π", "pi"],
    explanation: "",
  },

  {
    id: "q11",
    type: "multiple-choice",
    prompt: "Rotačné brány Rx(θ), Ry(θ), Rz(θ) umožňujú:",
    options: [
      "rotáciu o ľubovoľný uhol θ",
      "iba rotáciu o 180°",
      "iba meranie qubitu",
      "iba vytvorenie dvoch qubitov",
    ],
    correctAnswer: "rotáciu o ľubovoľný uhol θ",
    explanation: "",
  },

  {
    id: "q12",
    type: "multiple-choice",
    prompt: "Stav ∣0⟩ je reprezentovaný ako stĺpcový vektor:",
    options: [
      "[1, 0]ᵀ",
      "[0, 1]ᵀ",
      "[1, 1]ᵀ",
      "[0, 0]ᵀ",
    ],
    correctAnswer: "[1, 0]ᵀ",
    explanation: "",
  },

  {
    id: "q13",
    type: "multiple-choice",
    prompt: "Na Blochovej sfére stav ∣1⟩ smeruje:",
    options: [
      "hore na severný pól",
      "dole na južný pól",
      "na kladnú os X",
      "mimo sféru",
    ],
    correctAnswer: "dole na južný pól",
    explanation: "",
  },

  {
    id: "q14",
    type: "multiple-choice",
    prompt: "Brána X je kvantová verzia klasickej brány:",
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
    prompt: "Čo urobí brána Z so stavom ∣1⟩?",
    options: [
      "zmení ho na -∣1⟩",
      "zmení ho na ∣0⟩",
      "zmení ho na ∣1⟩ + ∣0⟩",
      "zničí qubit",
    ],
    correctAnswer: "zmení ho na -∣1⟩",
    explanation: "",
  },

  {
    id: "q16",
    type: "multiple-choice",
    prompt: "Pravda alebo nepravda: Brána Hadamard sa používa najmä na vytvorenie superpozície.",
    options: [
      "Pravda",
      "Nepravda",
    ],
    correctAnswer: "Pravda",
    explanation: "",
  },

  {
    id: "q17",
    type: "short-answer",
    prompt: "Pre imaginárnu jednotku i platí i² = __________.",
    correctAnswer: ["-1"],
    explanation: "",
  },

  {
    id: "q18",
    type: "multiple-choice",
    prompt: "Brána CNOT pôsobí na:",
    options: [
      "jeden qubit",
      "dva qubity",
      "iba klasické bity",
      "tri qubity",
    ],
    correctAnswer: "dva qubity",
    explanation: "",
  },

  {
    id: "q19",
    type: "multiple-choice",
    prompt: "CNOT preklopí cieľový qubit vtedy, keď je riadiaci qubit v stave:",
    options: [
      "∣0⟩",
      "∣1⟩",
    ],
    correctAnswer: "∣1⟩",
    explanation: "",
  },

  {
    id: "q20",
    type: "multiple-choice",
    prompt: "Pravda alebo nepravda: CNOT môže vytvárať entanglement medzi qubitmi.",
    options: [
      "Pravda",
      "Nepravda",
    ],
    correctAnswer: "Pravda",
    explanation: "",
  },


  
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
    print(circuit)
except Exception as error:
    print("Qiskit import failed:", error)
`,
};


export default qiskitFirstCircuitLesson;
