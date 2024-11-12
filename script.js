
class Frage{
    constructor(text, optionen, richtigeIndex) {
        this.text = text;
        this.optionen = optionen;
        this.richtigeIndex = richtigeIndex;
    }

    anzeigenFrageText() {
        const frageText = document.getElementById("frage-text");
        frageText.textContent = this.text;
    }

    pruefeAntwort(index) {
        return index === this.richtigeIndex;
    }

    anzeigenFrage() {
        this.anzeigenFrageText();

        const optionenContainer = document.getElementById("optionen");
        optionenContainer.innerHTML = "";

        this.optionen.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => quiz.waehleAntwort(index);
            optionenContainer.appendChild(button);
        });
    }
}
class Quiz {
    constructor(fragen) {
        this.fragen = fragen;
        this.aktuelleFrageIndex = 0;
        this.punktestand = 0;
        this.richtigZaehler = 0;
        this.falschZaehler = 0;
        this.punkteProFrage = 20;
        this.timer = 10;
        this.timerInterval = null;
        this.benutzerAntworten = []; 
    }

    starteQuiz() {
        this.ladeFrage();
        this.starteTimer();
    }

    ladeFrage() {
        clearInterval(this.timerInterval);
        this.timer = 10;
        this.starteTimer();
        const aktuelleFrage = this.fragen[this.aktuelleFrageIndex];
        aktuelleFrage.anzeigenFrage();
    }

    waehleAntwort(gewaehlterIndex) {
        clearInterval(this.timerInterval);
        const aktuelleFrage = this.fragen[this.aktuelleFrageIndex];

       
        this.benutzerAntworten[this.aktuelleFrageIndex] = gewaehlterIndex !== null ? gewaehlterIndex : "Keine Antwort";

        if (gewaehlterIndex !== null && aktuelleFrage.pruefeAntwort(gewaehlterIndex)) {
            this.punktestand += this.punkteProFrage;
            this.richtigZaehler++;
        } else if (gewaehlterIndex !== null) {
            this.falschZaehler++;
        }
        
        this.aktuelleFrageIndex++;

        if (this.aktuelleFrageIndex < this.fragen.length) {
            this.ladeFrage();
        } else {
            this.zeigeErgebnis();
        }
    }

    zeigeErgebnis() {
        document.getElementById("quiz-container").style.display = "none";

        const ergebnisContainer = document.getElementById("ergebnis-container");
        ergebnisContainer.classList.remove("hidden");

        const punktestandText = document.getElementById("punktestand-text");
        punktestandText.textContent = `Gesamtpunktzahl: ${this.punktestand}`;

        const richtigFalschText = document.getElementById("richtig-falsch-text");
        richtigFalschText.textContent = `Richtige Antworten: ${this.richtigZaehler}, Falsche Antworten: ${this.falschZaehler}`;

        const detaillierteErgebnisListe = document.getElementById("detaillierte-ergebnis-liste");
        detaillierteErgebnisListe.innerHTML = ""; 
        detaillierteErgebnisListe.style.display = "none"; 

      
        this.fragen.forEach((frage, index) => {
            const listItem = document.createElement("li");

            const frageText = document.createElement("p");
            frageText.textContent = `Frage ${index + 1}: ${frage.text}`;

            const benutzerAntwort = document.createElement("p");
            benutzerAntwort.textContent = `Ihre Antwort: ${
                this.benutzerAntworten[index] !== "Keine Antwort"
                    ? frage.optionen[this.benutzerAntworten[index]]
                    : "Antwort nicht gegeben"
            }`;

            const richtigeAntwort = document.createElement("p");
            richtigeAntwort.textContent = `Richtige Antwort: ${frage.optionen[frage.richtigeIndex]}`;

            benutzerAntwort.style.color = this.benutzerAntworten[index] === frage.richtigeIndex ? "green" : "red";

            listItem.appendChild(frageText);
            listItem.appendChild(benutzerAntwort);
            listItem.appendChild(richtigeAntwort);
            detaillierteErgebnisListe.appendChild(listItem);
        });

        const detaillierteErgebnisButton = document.getElementById("detaillierte-ergebnis-button");
        detaillierteErgebnisButton.onclick = () => {
            detaillierteErgebnisListe.style.display =
                detaillierteErgebnisListe.style.display === "none" ? "block" : "none";
        };
    }

    starteTimer() {
        const timerText = document.getElementById("timer");
        timerText.textContent = `Zeit: ${this.timer}s`;
        clearInterval(this.timerInterval);

        this.timerInterval = setInterval(() => {
            this.timer--;
            timerText.textContent = `Zeit: ${this.timer}s`;

            if (this.timer === 0) {
                clearInterval(this.timerInterval);
                this.waehleAntwort(null); 
            }
        }, 1000);
    }

    quizZuruecksetzen() {
        clearInterval(this.timerInterval);
        this.aktuelleFrageIndex = 0;
        this.punktestand = 0;
        this.richtigZaehler = 0;
        this.falschZaehler = 0;
        document.getElementById("quiz-container").style.display = "block";
        document.getElementById("ergebnis-container").classList.add("hidden");
        this.starteQuiz();
    }
}




const fragen = [
    new Frage("Was ist die Hauptstadt von Deutschland?", ["Berlin", "München", "Hamburg", "Köln"], 0),
    new Frage("Welches ist die kleinste Primzahl?", ["0", "1", "2", "3"], 2),
    new Frage("Welcher Planet ist der Erde am nächsten?", ["Mars", "Venus", "Jupiter", "Saturn"], 1),
    new Frage("In welchem Jahr begann der Erste Weltkrieg?", ["1912", "1914", "1918", "1920"], 1),
    new Frage("Welche Farbe entsteht, wenn man Blau und Gelb mischt?", ["Grün", "Lila", "Braun", "Orange"], 0),
];

const quiz = new Quiz(fragen);

document.getElementById("neu-starten-button").onclick = () => quiz.quizZuruecksetzen();

quiz.starteQuiz();
