// Script completo per gestire l'UFO, la mucca e i suoni

document.addEventListener("DOMContentLoaded", () => {
    const cowVideo = document.getElementById("cow-video");
    const cowContainer = document.getElementById("cow-container");

    // Audio separati
    const cowAudio = new Audio("assets/ufo-cow-abduction/mucca1.mp3");
    const cowAudioBruca = new Audio("assets/ufo-cow-abduction/mucca2.mp3");
    const cowAudioDialogo = new Audio("assets/ufo-cow-abduction/mucca3.mp3");
    const ufoAudioIn = new Audio("assets/ufo-cow-abduction/spacecraft-in.mp3");
    const ufoAudioStay = new Audio("assets/ufo-cow-abduction/spacecraft-stay.mp3");
    const ufoAudioOut = new Audio("assets/ufo-cow-abduction/spacecraft-out.mp3");

    // Elemento UFO (creato dinamicamente)
    const ufoVideo = document.createElement("video");
    ufoVideo.id = "ufo-video";
    ufoVideo.src = "assets/ufo-cow-abduction/ufo.webm";
    ufoVideo.style.position = "absolute";
    ufoVideo.style.top = "-300px"; // Partenza fuori schermo
    ufoVideo.style.left = "50%";
    ufoVideo.style.transform = "translate(-50%, 0)";
    ufoVideo.style.width = "200px";
    ufoVideo.style.display = "none"; // Nascondi fino all'attivazione
    ufoVideo.loop = true; // Assicura il loop del video
    document.body.appendChild(ufoVideo); // Aggiungi l'UFO al DOM

    // Elemento Raggio (creato dinamicamente)
    const beamVideo = document.createElement("video");
    beamVideo.id = "beam-video";
    beamVideo.src = "assets/ufo-cow-abduction/beam.webm";
    beamVideo.style.position = "absolute";
    beamVideo.style.left = "50%";
    beamVideo.style.transform = "translate(-50%, 0)"; // Centra il raggio rispetto all'UFO
    beamVideo.style.width = "200px";
    beamVideo.style.display = "none"; // Nascondi fino al click
    document.body.appendChild(beamVideo); // Aggiungi il raggio al DOM

    // Stato iniziale
    let clickCount = 0;
    let isAnimating = false; // Blocca i clic durante l'animazione
    let isBeamActive = false; // Stato del raggio traente

    // Funzione per resettare la mucca al loop iniziale
    const resetCowToInitial = (playAudio = true) => {
        cowVideo.src = "assets/ufo-cow-abduction/mucca1.webm";
        cowVideo.loop = true;
        cowVideo.load();
        cowVideo.play();
        if (playAudio) {
            cowAudio.currentTime = 0;
            cowAudio.play();
        }
        isAnimating = false; // Sblocca i clic
    };

    // Funzione per centrare la mucca sotto il raggio
    const centerCowUnderBeam = () => {
        const beamRect = beamVideo.getBoundingClientRect();
        const cowWidth = cowContainer.offsetWidth;

        // Calcola il centro del raggio e allinea la mucca
        const beamCenterX = beamRect.left + beamRect.width / 2;
        const cowLeft = beamCenterX - cowWidth / 2;

        cowContainer.style.left = `${cowLeft}px`;
        cowContainer.style.transform = `translateY(-200px)`; // Rimuove scaling accidentali
    };

    // Gestione dei clic sulla mucca
    cowContainer.addEventListener("click", () => {
        if (isAnimating) return; // Ignora i clic durante l'animazione
        isAnimating = true;

        clickCount++;

        if (clickCount === 1) {
            // Primo clic: Mucca bruca con audio
            cowVideo.src = "assets/ufo-cow-abduction/mucca2.webm";
            cowVideo.loop = false;
            cowVideo.load();
            cowVideo.play();
            cowAudioBruca.currentTime = 0;
            cowAudioBruca.play();

            // Torna al video iniziale al termine
            cowVideo.onended = () => resetCowToInitial(true);

        } else if (clickCount === 2) {
            // Secondo clic: Mucca dialoga con audio
            cowVideo.src = "assets/ufo-cow-abduction/mucca3.webm";
            cowVideo.loop = false;
            cowVideo.load();
            cowVideo.play();
            cowAudioDialogo.currentTime = 0;
            cowAudioDialogo.play();

            // Torna al video iniziale al termine
            cowVideo.onended = () => resetCowToInitial(true);

        } else if (clickCount === 3) {
            // Terzo clic: UFO entra in scena
            cowVideo.src = "assets/ufo-cow-abduction/mucca1.webm";
            cowVideo.loop = false;
            cowVideo.load();
            cowVideo.play();

            // UFO si posiziona sopra la mucca durante il video
            ufoVideo.style.display = "block";
            ufoVideo.style.top = "-300px"; // Partenza fuori schermo

            // Avvia il video e l'audio spacecraft-in subito
            ufoVideo.play().catch(error => console.error("Errore riproduzione video UFO:", error));
            ufoAudioIn.currentTime = 0;
            ufoAudioIn.play().catch(error => console.error("Errore riproduzione audio spacecraft-in:", error));

            // Inizia l'animazione dell'UFO
            setTimeout(() => {
                ufoVideo.style.top = "65%"; // Posizione finale sopra la mucca
                console.log("UFO inizia la discesa");
            }, 0);

            // Cambia audio a spacecraft-stay al termine dell'animazione di discesa
            setTimeout(() => {
                ufoAudioIn.pause(); // Ferma spacecraft-in
                ufoAudioStay.currentTime = 0;
                ufoAudioStay.loop = true; // Assicura il loop
                ufoAudioStay.play().catch(error => console.error("Errore riproduzione spacecraft-stay:", error));
                console.log("Riproduzione spacecraft-stay avviata");
            }, 5000); // Durata della discesa (5 secondi)
        }
    });

    // Interazione con l'UFO per mostrare il raggio
    ufoVideo.addEventListener("click", () => {
        if (isAnimating || isBeamActive) return; // Blocca clic se già in corso o raggio attivo
        isAnimating = true;
        isBeamActive = true;

        // Calcola la posizione del raggio in base alla base dell'UFO
        const ufoRect = ufoVideo.getBoundingClientRect();
        const beamTop = ufoRect.bottom; // Base dell'UFO
        beamVideo.style.top = `${beamTop}px`;

        // Mostra il raggio
        beamVideo.style.display = "block";
        beamVideo.load();
        beamVideo.play();
        console.log("Raggio traente attivato!");

        // Dopo 5 secondi, avvia l'animazione della mucca
        setTimeout(() => {
            console.log("Mucca inizia a salire verso l'UFO.");
            centerCowUnderBeam();
            cowContainer.style.transition = "transform 3s ease, opacity 3s ease";
            cowContainer.style.transform = "translateY(-200px) scale(0)";
            cowContainer.style.opacity = "0";
        }, 5000); // Al 5° secondo del raggio

        // Nasconde il raggio e termina l'animazione
        setTimeout(() => {
            beamVideo.style.display = "none"; // Nasconde il raggio
            cowContainer.style.display = "none"; // Nasconde la mucca
            isBeamActive = false; // Raggio disattivato
            console.log("Raggio traente terminato.");
        }, 9000); // Durata totale

        // UFO esce al successivo clic
        ufoVideo.addEventListener("click", () => {
            if (isBeamActive) return; // Blocca l'uscita se il raggio è ancora attivo

            ufoAudioStay.pause(); // Ferma l'audio dell'UFO
            ufoAudioOut.play().catch(error => console.error("Errore riproduzione spacecraft-out:", error));
            ufoVideo.style.top = "-300px";

            setTimeout(() => {
                ufoVideo.style.display = "none";
                resetCowToInitial(false); // Ripristina la mucca senza audio
                isAnimating = false;
                clickCount = 0; // Resetta il conteggio
            }, 3000);
        });
    });

    // Aggiorna la posizione della mucca al ridimensionamento della finestra
    window.addEventListener("resize", centerCowUnderBeam);
});
