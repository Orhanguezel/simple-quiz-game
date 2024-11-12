
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
        this.timer = 60;
        this.timerInterval = null;
    }

    starteQuiz() {
        this.ladeFrage();
        this.starteTimer();
    }

    ladeFrage() {
        const aktuelleFrage = this.fragen[this.aktuelleFrageIndex];
        aktuelleFrage.anzeigenFrage();
    }

    waehleAntwort(gewaehlterIndex) {
        clearInterval(this.timerInterval);
        const aktuelleFrage = this.fragen[this.aktuelleFrageIndex];
        if (aktuelleFrage.pruefeAntwort(gewaehlterIndex)) {
            this.punktestand += this.punkteProFrage;
            this.richtigZaehler++;
        } else {
            this.falschZaehler++;
        }
        this.aktuelleFrageIndex++;

        if (this.aktuelleFrageIndex < this.fragen.length) {
            this.starteQuiz();
        } else {
            this.zeigeErgebnis();
        }
    }

    zeigeErgebnis() {
        document.getElementById("quiz-container").style.display = "none"; 
    
        const ergebnisContainer = document.getElementById("ergebnis-container");
        ergebnisContainer.classList.remove("hidden");
    
        document.getElementById("frage-text").style.display = "none";
    

        const punktestandText = document.getElementById("punktestand-text");
        punktestandText.textContent = `Gesamtpunktzahl: ${this.punktestand}`;
    
        const richtigFalschText = document.getElementById("richtig-falsch-text");
        richtigFalschText.textContent = `Richtige Antworten: ${this.richtigZaehler}, Falsche Antworten: ${this.falschZaehler}`;
    }

    quizZuruecksetzen() {
        this.aktuelleFrageIndex = 0;
        this.punktestand = 0;
        this.richtigZaehler = 0;
        this.falschZaehler = 0;
    

        document.getElementById("quiz-container").style.display = "block";
        document.getElementById("frage-text").style.display = "block";
        document.getElementById("ergebnis-container").classList.add("hidden");
    
        this.starteQuiz();
    }
    

    starteTimer() {
        this.timer = 10;
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
