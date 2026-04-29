import deutsch from "../../assets/deutsch.png";

const qiskitFirstCircuitLesson = {
  id: "qiskit-first-circuit",
  title: "Lekcia 2: Prvý obvod v Qiskite",
  summary: "Praktická lekcia s editorom a jednoduchým kvantovým obvodom.",
  theory: `


# Deutsch-Jozsa algoritmus

Teraz si ukážeme prvý jednoduchý kvantový algoritmus: **Deutsch-Jozsa algoritmus**.

Tento algoritmus je dobrý na pochopenie toho, prečo môže byť kvantový výpočet v niektorých prípadoch efektívnejší ako klasický výpočet.

Nebudeme sa sústrediť na veľa matematiky. Dôležitá je hlavne intuícia.

Dôležitá je myšlienka. Kvantové výpočty sú univerzálne výpočty, to znamená, že ľubovoľnú funkciu \`f(x)=y\` vieme zapísať do kvantovej podoby, potom a pomocou superpopozície vieme spustiť tú funkciu so všetkými možnými vstupmi \`x\` v jednom kroku, a získať superpozíciu všetkých možných \`f(x)=y\` naraz vo jednom zavolaní \`f(x)\`.

Tú kvantovú podobo funkcie \`f(x)\` voláme \`oracle\`

To znamená, že \`oracle\` sa v istom zmysle aplikuje na všetky vstupy naraz, a získa superpozíciu všetkých výstupov \`y\`. Ale, ak by sme zmerali výstup, tak dostaneme iba jeden z možných výsledkov (lebo meranie zniči kvantovú informáciu ). Vieme ale využiť chytré "triky" kde spravíme že zlé výsledky sa "vykratia" (inferencia), a zostanú iba dobré výsledky.


Dôležitá je hlavne myšlienka. Kedže kvanotvé operácie sú univerzálne, v kvantovom výpočte vieme každú funkciu $f(x) = y$ reprezentovať v kvantovej podobe. Túto kvantovú podobu funkcie nazývame **oracle**.
Pomocou superpozície vieme pripraviť stav, ktorý reprezentuje všetký možné vstupy $x$ naraz. Keď potom na tento stav aplikujeme oracle, funkcia sa v istom zmysle aplikuje na všetky tieto vstupy naraz. Výsledkom je kvantový stav, ktorý **je superpozícia všetkých možných výstupoch** $y = f(x)$.
Dôležité však je, že tieto výstupy nevieme jednoducho všetky naraz prečítať. Ak by sme stav hneď zmerali, dostali by sme iba jeden z možných výsledkov, pretože meranie zničí superpozíciu.
Sila kvantových algoritmov je preto v tom, že využívajú **interferenciu**. Pomocou vhodných kvantových brán vieme zariadiť, aby sa niektoré možnosti vyrušili a iné sa zosilnili.
Deutsch-Jozsa algoritmus práve toto využíva. Nesnaží sa prečítať všetky hodnoty $f(x)$, ale pomocou superpozície, oracle a interferencie zistí nejakú vlastnosť funkcie.

---

## Problém

Predstavme si, že máme nejakú funkciu, ktorú nevidíme priamo. Môžeme si ju predstaviť ako **čiernu skrinku**, po anglicky **oracle**.

Do tejto čiernej skrinky vložíme vstup a ona nám vráti výsledok.

Napríklad:

- vstup: \`000\`
- výstup: \`0\`

alebo:

- vstup: \`101\`
- výstup: \`1\`

Funkcia teda berie binárny vstup a vracia iba jeden bit:

- **0**,
- alebo **1**.

---

## Akú otázku chceme zodpovedať?

Deutsch-Jozsa algoritmus rieši túto otázku: **Je funkcia konštantná alebo vyvážená?**

---

## Konštantná funkcia

Funkcia je **konštantná**, ak pre každý vstup vracia rovnaký výsledok.

Napríklad stále vracia \`0\`:

| Vstup | Výstup |
|---|---|
| 000 | 0 |
| 001 | 0 |
| 010 | 0 |
| 011 | 0 |
| 100 | 0 |
| 101 | 0 |
| 110 | 0 |
| 111 | 0 |

Alebo stále vracia \`1\`:

| Vstup | Výstup |
|---|---|
| 000 | 1 |
| 001 | 1 |
| 010 | 1 |
| 011 | 1 |
| 100 | 1 |
| 101 | 1 |
| 110 | 1 |
| 111 | 1 |

V oboch prípadoch je funkcia **konštantná**, pretože výstup je vždy rovnaký.

---

## Vyvážená funkcia

Funkcia je **vyvážená**, ak pre polovicu vstupov vracia \`0\` a pre druhú polovicu vstupov vracia \`1\`.

Napríklad:

| Vstup | Výstup |
|---|---|
| 000 | 0 |
| 001 | 1 |
| 010 | 0 |
| 011 | 1 |
| 100 | 0 |
| 101 | 1 |
| 110 | 0 |
| 111 | 1 |

Tu máme:

- štyri výstupy sú **0**,
- štyri výstupy sú **1**.

Preto je funkcia **vyvážená**.

---

## Dôležitý predpoklad

Pri Deutsch-Jozsa algoritme máme sľúbené, že funkcia je iba jedného z týchto dvoch typov:

- buď je **konštantná**,
- alebo je **vyvážená**.

Nemusíme riešiť iné prípady.

Našou úlohou je zistiť, ktorý z týchto dvoch prípadov nastal.

---

## Ako by to riešil klasický počítač?

Klasický počítač by skúšal vstupy postupne. Nie je iný spôsob vyriešenia tejto úlohy, ako skúšať všetky vstupy, a kontrolovať výstupy. 

Napríklad by sa opýtal:

- aký je výstup pre \`000\`?
- aký je výstup pre \`001\`?
- aký je výstup pre \`010\`?
- a tak ďalej.

Ak nájde dva rôzne výstupy, napríklad raz \`0\` a raz \`1\`, vie, že funkcia je **vyvážená**.

Problém je, že ak stále dostáva rovnaký výsledok, nevie hneď, či je funkcia naozaj konštantná.

Musí skontrolovať dosť veľa vstupov, aby si bol istý.

---

## Klasická zložitosť

Ak má funkcia \`n\` vstupných bitov, počet možných vstupov je:

$$
2^n
$$

Klasický počítač môže v najhoršom prípade potrebovať skontrolovať viac ako polovicu všetkých vstupov.

Presnejšie:

$$
2^{n-1} + 1
$$

volaní funkcie.

Napríklad:

| Počet vstupných bitov | Počet všetkých vstupov | Klasicky v najhoršom prípade |
|---|---:|---:|
| 1 | 2 | 2 volania |
| 2 | 4 | 3 volania |
| 3 | 8 | 5 volaní |
| 4 | 16 | 9 volaní |
| 10 | 1024 | 513 volaní |

Čím viac vstupných bitov máme, tým viac volaní funkcie môže klasický počítač potrebovať.

---

## Ako to rieši kvantový počítač?

Kvantový počítač využije superpozíciu.

Namiesto toho, aby skúšal vstupy jeden po druhom, pripraví si superpozíciu všetkých možných vstupov naraz.

To znamená, že ak máme napríklad 3 vstupné qubity, kvantový počítač vie naraz pracovať so stavmi:

$$
|000\\rangle, |001\\rangle, |010\\rangle, |011\\rangle, |100\\rangle, |101\\rangle, |110\\rangle, |111\\rangle
$$

Potom sa na túto superpozíciu aplikuje oracle, a získa superpozíciu všetkých možných výsledkov.  Dôležité je, že kvantový algoritmus nepotrebuje čítať každý výstup osobitne- využije **interferenciu**, aby sa jednotlivé superpozície vykrátili, a ostala iba relevantná informácia.


---

## Hlavná myšlienka algoritmu

Deutsch-Jozsa algoritmus funguje takto:

1. pripravíme qubity,
2. vytvoríme superpozíciu pomocou Hadamardových brán,
3. aplikujeme oracle,
4. znova použijeme Hadamardove brány,
5. zmeriame vstupné qubity,
6. podľa výsledku rozhodneme, či je funkcia konštantná alebo vyvážená.

---

## Kvantový obvod

Zjednodušený tvar obvodu vyzerá takto:

![Môj obrázok](${deutsch})

Vstupné qubity používame na reprezentáciu všetkých možných vstupov.

Pomocný qubit pomáha oracle zapísať informáciu o funkcii do kvantového stavu.

---

## Čo sa deje krok za krokom?

### 1. Začíname so vstupnými qubitmi

Najprv začíname so vstupnými qubitmi v stave:

$$
|000\\rangle
$$

Ak máme viac vstupných bitov, začíname podobne so samými nulami.

---

### 2. Pomocný qubit nastavíme na stav $|1\\rangle$

Použijeme ešte jeden pomocný qubit.

Ten nastavíme na stav:

$$
|1\\rangle
$$

Tento qubit je potrebný na to, aby oracle vedel správne zapísať informáciu o funkcii do kvantového stavu.

---

### 3. Použijeme Hadamardove brány

Na vstupné qubity aplikujeme Hadamardove brány.

Tým vytvoríme superpozíciu všetkých možných vstupov.

Zjednodušene:

> Kvantový počítač sa pripraví tak, aby naraz reprezentoval všetky vstupy.

Hadamardovu bránu aplikujeme aj na pomocný qubit.

---

### 4. Aplikujeme oracle

Oracle je časť obvodu, ktorá reprezentuje našu funkciu.

Nevieme sa pozrieť dovnútra oracle, ale vieme ho použiť.

Oracle spôsobí, že informácia o funkcii sa zapíše do fázy kvantového stavu.

To je dôležité:  
nejde len o to, že oracle vráti klasický výsledok \`0\` alebo \`1\`.

V kvantovom výpočte sa informácia môže zapísať aj do **fázy**.

---

### 5. Znova použijeme Hadamardove brány

Po oracle znova aplikujeme Hadamardove brány na vstupné qubity.

Tým spôsobíme interferenciu.

Niektoré možnosti sa navzájom zosilnia a niektoré sa vyrušia.

Práve tu vzniká kvantová výhoda.

---

### 6. Meriame vstupné qubity

Nakoniec zmeriame vstupné qubity.

Podľa výsledku vieme rozhodnúť, či bola funkcia konštantná alebo vyvážená.

---

## Ako čítame výsledok?

Výsledok je veľmi jednoduchý.

Ak po meraní dostaneme samé nuly:

$$
|000...0\\rangle
$$

funkcia je **konštantná**.

Ak dostaneme čokoľvek iné:

$$
|001\\rangle, |010\\rangle, |101\\rangle, ...
$$

funkcia je **vyvážená**.

Teda:

| Výsledok merania | Záver |
|---|---|
| samé nuly | funkcia je konštantná |
| niečo iné ako samé nuly | funkcia je vyvážená |

---

## Prečo to funguje?

Intuitívne si to môžeme predstaviť takto:

Hadamardove brány najprv vytvoria superpozíciu všetkých vstupov.

Oracle potom pridá informáciu o funkcii do fázy kvantového stavu.

Potom ďalšie Hadamardove brány spôsobia interferenciu.

Ak je funkcia **konštantná**, všetky možnosti sa zložia tak, že výsledok bude späť stav so samými nulami.

Ak je funkcia **vyvážená**, niektoré možnosti sa vyrušia a výsledok nebude stav so samými nulami.

Inými slovami:

- pri konštantnej funkcii interferencia vráti výsledok **000...0**,
- pri vyváženej funkcii interferencia spôsobí iný výsledok.

---

## Prečo je to zaujímavé?

Deutsch-Jozsa algoritmus je zaujímavý preto, že kvantový počítač potrebuje iba **jedno volanie oracle**.

Klasický počítač môže v najhoršom prípade potrebovať:

$$
2^{n-1} + 1
$$

volaní oracle.

Kvantový počítač potrebuje:

$$
1
$$

volanie oracle.

---

## Porovnanie

| Typ počítača | Počet volaní oracle v najhoršom prípade |
|---|---:|
| Klasický počítač | $2^{n-1} + 1$ |
| Kvantový počítač | $1$ |

To znamená, že kvantový počítač vie v tomto konkrétnom probléme rozhodnúť odpoveď výrazne efektívnejšie.

---

## Dôležitá poznámka

Deutsch-Jozsa algoritmus nerieši každý problém rýchlejšie.

Je to špeciálny problém so špeciálnym predpokladom:

> funkcia je buď konštantná, alebo vyvážená.

Napriek tomu je tento algoritmus veľmi dôležitý, pretože pekne ukazuje základnú silu kvantového výpočtu:

- superpozíciu,
- fázu,
- interferenciu,
- meranie,
- a efektívnejšie získanie informácie.

---

## Jednoduché zhrnutie

Deutsch-Jozsa algoritmus zisťuje, či je skrytá funkcia **konštantná** alebo **vyvážená**.

Klasický počítač musí v najhoršom prípade skúšať veľa vstupov.

Kvantový počítač vytvorí superpozíciu všetkých vstupov, použije oracle a pomocou interferencie zistí odpoveď po jednom použití oracle.

Ak po meraní dostaneme samé nuly, funkcia je **konštantná**.

Ak dostaneme iný výsledok, funkcia je **vyvážená**.

Deutsch-Jozsa algoritmus je preto dobrý prvý príklad toho, ako môže kvantový algoritmus využiť kvantové vlastnosti na efektívnejší výpočet.



`,
  questions: [
    


  
  ],
  showEditor: true,
  starterCode: `from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit.visualization import plot_histogram

# Deutsch-Jozsa algoritmus
# 5 vstupných qubitov + 1 pomocný qubit
n = 5
helper = 5
# 6 qubitov spolu: q0, q1, q2, q3, q4 sú vstupné qubity

circuit = QuantumCircuit(6, 5)
circuit.x(helper)
circuit.h(range(6))
circuit.barrier()

# -------------------------------
# ORACLE
# -------------------------------
# Toto je vyvážená funkcia.
# Oracle závisí od qubitov q0, q2 a q4.
# Teda skrytý vzor je 10101.

circuit.cx(0, helper)
circuit.cx(2, helper)
circuit.cx(4, helper)

# toto je balanced funkcia, ktorá stále vracia 1
# circuit.x(helper)

# toto je balanced funkcia, ktorá stále vracia 0
# nic



# -------------------------------
# KONIEC ORACLE
# -------------------------------
circuit.barrier()
# Na vstupné qubity znova aplikujeme Hadamardovu bránu
circuit.h(range(n))

# Meriame iba vstupné qubity q0 až q4
# Pomocný qubit nemeriame
circuit.barrier()
circuit.measure(range(n), range(n))

# Zobrazíme kvantový obvod
display(circuit.draw("mpl"))

# Spustíme simuláciu
simulator = AerSimulator()
compiled_circuit = transpile(circuit, simulator)
job = simulator.run(compiled_circuit, shots=1000)
result = job.result()
counts = result.get_counts()

# Zobrazíme výsledky ako histogram
display(plot_histogram(counts))

`,
};


export default qiskitFirstCircuitLesson;
