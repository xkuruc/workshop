import qubitIllustration from "../../assets/qubit-superposition.svg";


const qubitFoundationsLesson = {
  id: "qubit-foundations",
  title: "Lekcia 1: Základy qubitu",
  summary: "bla bla bla.",
  theory: `


# Quantum computing

## Základná definícia

**Quantum computing**, je výpočtový prístup založený na princípoch kvantovej mechaniky.  

Klasický počítač pracuje s bitmi, ktoré môžu nadobúdať hodnotu **0 alebo 1**. Kvantový počítač používa na výpočty kvantové častice, ktoré sa správajú podľa kvantovej fyziky, čo nám umožňuje robiť výpočty pomocou kvantovej mechaniky. V kvantovom počítaní sa využíva viacero kvantových javov, no medzi najdôležitejšie patria **superpozícia** a **entanglement**.  

---

## Superpozícia a qubity

**Superpozícia** = je jav, kedy sa kvantový systém nenachádza iba v jednom presne určenom stave, ale vo viacerých stavoch naraz. (napr. jedna kvantová častica môže byť na viacerých miestach naraz, môže mať viacero hodnôt energií a pod.).  

V Quantum computingu to využívame na vytvorenie **Qubitu**.  



**Qubit** = kvantový bit. Qubit sa môže správať tak, akoby obsahoval 0 aj 1 naraz. To znamená, že kvantový počítač nemusí pri výpočte pracovať iba s jednou konkrétnou kombináciou núl a jednotiek, ale vie naraz pracovať s viacerými možnými kombináciami.

Ak máme 1 qubit, vieme ním reprezentovať možnosti 0 aj 1. Ak máme 2 qubity, vieme naraz reprezentovať kombinácie 00, 01, 10, 11 - spolu 4 možnosti. Všeobecne platí, že ak máme N qubitov, kvantový počítač vie pracovať s 2^N možnými kombináciami núl a jednotiek naraz.

> **Výpočtová sila kvantového počítača rastie exponenciálne so každým pridaným qubitom.**

Pre porovnanie, stačilo by nám iba **280 qubitov**, aby sme vedeli pracovať so viac číslami ako je atómov vo pozorovateľnom vesmíre.  

---

## Entanglement

**Entanglement** = je jav, kedy stav jedného qubitu ovplyvní stav na druhom qubite, bez priamej fyzickej interakcie. Jednoducho povedané: ak máme dva previazané qubity, nemôžeme ich chápať ako dva úplne nezávislé bity. Ich hodnoty sú medzi sebou prepojené.
Napríklad môžem previazať dva qubity tak, aby mali rovnakú hodnotu - ak prvý bude mat hodnotu **1** tak aj druhý bude mat hodnotu **1**. Ak  prvý bude mať hodnotu **0** tak aj druhý mať hodnotu **0**.
Správajú sa ako jeden spoločný systém.

Tento jav nazval Einstein ako **“Spooky action at the distance”**, pretože sa zdalo že informácia vie cestovať  rýchlejšie ako svetlo (v podstate okamžite).  

Za formálne dokázanie tohto javu sa v roku **2022** udelila **Nobelová cena za fyziku**.  

---

## Efekt merania

**Efekt merania** v kvantovej mechanike meranie zásadne ovplyvňuje stav systému.  

Pokiaľ qubit nemeriame, môže sa nachádzať v superpozícii stavov **0 a 1** a spolu s ďalšími qubitmi vytvárať zložitý kvantový stav, ktorý kvantový algoritmus využíva na výpočty.  

Ak by sme ale systém zmerali (pozreli sa so akými hodnotami pracuje) celý kvantový systém sa zničí, (“skolabuje”) a nameriame iba jednu možnosť zo všetkých superpozícií - napríklad číslo **10111** ak by sme mali **5 qubitov**.  

Dôležité je, že pri entanglemente meranie jedného qubitu ovplyvní to, ako môžeme opísať druhý qubit, s ktorým je previazaný. Neznamená to, že by sme mu priamo nastavili hodnotu 0 alebo 1, ale že výsledok merania prvého qubitu zmení pravdepodobnosti výsledkov, ktoré môžeme dostať pri meraní druhého qubitu.  

---

## Zjednodušené prirovnanie ku klasickému počítaču

Veľmi zjednodušene si to môžeme predstaviť ako snahu pozrieť sa do registra počas výpočtu.  

V klasickom počítači by obyčajné \`print(x)\` hodnotu iba zobrazilo a výpočet by tým nezmenilo.  

V kvantovom počítači je však meranie aktívny zásah do systému: qubit prestane byť v superpozícii a zredukuje sa na jednu nameranú hodnotu.  

Ak bol previazaný s ďalšími qubitmi, meranie zmení aj spoločný kvantový stav celej previazanosti. 

---

## Čo kvantový počítač nie je

Dôležité je zdôrazniť, že **kvantový počítač nie je iba rýchlejšia verzia bežného počítača**.  

Nie je primárne určený na efektívnejšie spúšťanie bežných aplikácií, operačných systémov alebo webových služieb.  

Jeho význam spočíva v tom, že pri určitých špecifických triedach problémov dokáže využiť kvantové javy spôsobom, ktorý je pre klasické počítače extrémne náročný alebo prakticky nedosiahnuteľný.  

> Kvantové počítanie preto predstavuje **odlišný výpočtový model**, nie univerzálne zrýchlenie všetkého.

Hoci kvantový počítač je teoreticky výpočtovo ekvivalentný klasickému Turingovmu stroju, teda vie realizovať všeobecný výpočet, neznamená to, že bude pri každej úlohe rýchlejší.  

Výhoda kvantových počítačov sa očakáva najmä pri úlohách, ako sú **simulácie kvantových systémov**,  **optimalizačné problémy** alebo špecifické algoritmy, napríklad **Shorov algoritmus na faktorizáciu**.




Na konci tejto lekcie si skús všimnúť, že superpozícia ešte nie je meranie. Meranie nastane až vtedy, keď stav **pozorujeme**.
`,
  questions: [
    {
      id: "q1",
      type: "multiple-choice",
      prompt: "Čím sa najzásadnejšie líši klasický bit od qubitu?",
      options: [
        "Bit môže mať viacero hodnôt naraz, qubit iba jednu",
        "Bit je vždy fyzická častica, qubit je iba matematická hodnota ",
        "Bit má hodnotu 0 alebo 1, zatiaľ čo qubit môže byť v superpozícii stavov 0 a 1",
        "Qubit je iba rýchlejší typ klasického bitu",
      ],
      correctAnswer: "Bit má hodnotu 0 alebo 1, zatiaľ čo qubit môže byť v superpozícii stavov 0 a 1",
      explanation: "",
    },

    {
      id: "q2",
      type: "short-answer",
      prompt: "Jav, pri ktorom sa kvantový systém nenachádza iba v jednom presne určenom stave, ale v kombinácii viacerých stavov naraz, sa nazýva ________",

      correctAnswer: ["superpozicia"],
      explanation: "",
    },


    {
      id: "q3",
      type: "multiple-choice",
      prompt: "Ktoré dva kvantové javy sú v texte označené ako najdôležitejšie pre kvantové výpočty? ",
      options: [
        "Gravitácia a elektromagnetizmus",
        "Superpozícia a entanglement",
        "Rádioaktivita a fúzia",
        "Dekoherencia a termodynamika ",
      ],
      correctAnswer: "Superpozícia a entanglement",
      explanation: "",
    },

    {
      id: "q4",
      type: "short-answer",
      prompt: "Kvantový bit sa nazýva __________.",

      correctAnswer: ["qubit"],
      explanation: "",
    },


    {
      id: "q5",
      type: "multiple-choice",
      prompt: "Čo sa stane pri meraní qubitu v superpozícii?",
      options: [
        "Qubit zostane vo všetkých stavoch naraz ",
        "Qubit sa zredukuje na jednu nameranú hodnotu",
        "Qubit vráti všetky hodnoty naraz",
        "Qubit začne prenášať informáciu rýchlejšie ako svetlo",
      ],
      correctAnswer: "Qubit sa zredukuje na jednu nameranú hodnotu",
      explanation: "",
    },

    {
      id: "q6",
      type: "multiple-choice",
      prompt: "Čo znamená entanglement?",
      options: [
        "Jav, pri ktorom qubit stratí všetku energiu ",
        "Jav, pri ktorom stav jedného qubity ovplyvní druhý qubit",
        "Proces, pri ktorom sa kvantový počítač mení na klasický",
        "Metóda chladenia kvantového procesora ",
      ],
      correctAnswer: "Jav, pri ktorom stav jedného qubity ovplyvní druhý qubit",
      explanation: "",
    },

    {
      id: "q7",
      type: "short-answer",
      prompt: "Pri meraní sa superpozícia často opisuje tak, že kvantový stav s__________.",

      correctAnswer: ["skolabuje "],
      explanation: "",
    },

    {
      id: "q8",
      type: "multiple-choice",
      prompt: "Prečo sa kvantové výpočty robia pred meraním a nie po ňom?",
      options: [
        "Pretože po meraní už qubit nemôže byť v pôvodnej superpozíci",
        "Pretože kvantový počítač po meraní prestane existovať",
        "Pretože meranie vždy vráti všetky možné výsledky naraz ",
        "Pretože meranie je možné iba na klasických bitoch ",
      ],
      correctAnswer: "Pretože po meraní už qubit nemôže byť v pôvodnej superpozíci",
      explanation: "",
    },

    {
      id: "q9",
      type: "multiple-choice",
      prompt: "Kvantový počítač je zaujímavý hlavne preto, že: ",
      options: [
        "Zrýchli všetky bežné aplikácie",
        "Nahradí operačné systémy ",
        "Vie pri určitých typoch problémov využiť kvantové javy na efektívnejšie výpočty než klasický počítač",
        "Funguje bez fyzikálnych zákonov",
      ],
      correctAnswer: "Vie pri určitých typoch problémov využiť kvantové javy na efektívnejšie výpočty než klasický počítač",
      explanation: "",
    },


    {
      id: "q10",
      type: "multiple-choice",
      prompt: "Ktoré tvrdenie je chyták a je nesprávne?",
      options: [
        "Kvantový počítač nie je univerzálne rýchlejší vo všetkom ",
        "Kvantový počítač môže byť výhodný pri špecifických algoritmoch ",
        "Kvantový počítač je iba výkonnejšia verzia klasického počítača na bežné aplikácie",
        "Kvantový počítač využíva javy kvantovej mechaniky",
      ],
      correctAnswer: "Kvantový počítač je iba výkonnejšia verzia klasického počítača na bežné aplikácie",
      explanation: "",
    },











    
    {
      id: "normalization",
      type: "multiple-choice",
      prompt: "Ktorá rovnica musí platiť pre platný stav jedného qubitu?",
      options: [
        "|α|² + |β|² = 1",
        "|α| + |β| = 1",
        "α + β = 0",
        "|α|² - |β|² = 1",
      ],
      correctAnswer: "|α|² + |β|² = 1",
      explanation: "Normalizácia zaručuje, že súčet pravdepodobností všetkých výsledkov je rovný 1.",
    },
    {
      id: "superposition-word",
      type: "short-answer",
      prompt: "Ako nazývame stav, keď qubit obsahuje kombináciu \\(|0\\rangle\\) a \\(|1\\rangle\\)?",
      correctAnswer: ["superpozicia", "superpozícia"],
      explanation: "Správny pojem je **superpozícia**.",
      placeholder: "Napíš krátku odpoveď",
    },
  ],
  showEditor: false,
};


export default qubitFoundationsLesson;
