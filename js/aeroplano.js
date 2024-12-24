
// Script per l'interazione con l'aeroplano

// Riferimenti agli elementi dell'aeroplano e dell'audio
const audioAnnuncio = document.getElementById("annuncio-aereo");
const aeroplanino = document.getElementById("aeroplanino-container");

// Aggiungere un evento al clic sull'aeroplano
aeroplanino.addEventListener("click", () => {
    if (audioAnnuncio.paused) {
        audioAnnuncio.play(); // Riproduce l'annuncio
    } else {
        audioAnnuncio.pause(); // Ferma l'audio
        audioAnnuncio.currentTime = 0; // Riporta l'audio all'inizio
    }
});
