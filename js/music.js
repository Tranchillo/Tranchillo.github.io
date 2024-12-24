(() => {
    let currentAudio = null;
    let progressInterval = null;

    // Funzione per aggiornare la barra di progresso
    function updateProgress(audio, progressBar, timeInfo) {
        progressInterval = setInterval(() => {
            const currentTime = audio.currentTime;
            const duration = audio.duration || 0; // Durata calcolata dinamicamente
            const progressPercent = (currentTime / duration) * 100;

            // Aggiorna la barra e il timer
            if (progressBar) progressBar.style.width = `${progressPercent}%`;
            if (timeInfo) {
                timeInfo.textContent = formatTime(currentTime) + " / " + formatTime(duration);
            }
        }, 100);
    }

    // Funzione per formattare il tempo in minuti:secondi
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    // Gestione pulsanti Play
    document.querySelectorAll('.play-btn').forEach(button => {
        button.addEventListener('click', () => {
            const src = button.getAttribute('data-src');
            const parent = button.closest('li');
            const progressBar = parent ? parent.querySelector('.progress-bar') : null;
            const progressContainer = parent ? parent.querySelector('.progress-container') : null;
            const timeInfo = parent ? parent.querySelector('.time-info') : null;

            // Ferma audio corrente
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                clearInterval(progressInterval);

                // Nascondi la barra di progresso precedente
                document.querySelectorAll('.progress-container').forEach(bar => {
                    if (bar !== progressContainer) bar.style.display = 'none';
                });
            }

            // Crea un nuovo audio
            currentAudio = new Audio(src);

            // Mostra e resetta la barra di progresso
            if (progressContainer) {
                progressContainer.style.display = 'block';
                if (progressBar) progressBar.style.width = '0%';
            }

            // Calcola e mostra la durata dinamicamente
            currentAudio.onloadedmetadata = () => {
                const duration = currentAudio.duration || 0;
                if (timeInfo) {
                    timeInfo.textContent = "0:00 / " + formatTime(duration);
                }
            };

            // Riproduci e aggiorna la barra
            currentAudio.play();
            updateProgress(currentAudio, progressBar, timeInfo);
        });
    });

    // Gestione pulsanti Stop
    document.querySelectorAll('.stop-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                clearInterval(progressInterval);

                // Nascondi la barra di progresso
                const parent = button.closest('li');
                const progressContainer = parent ? parent.querySelector('.progress-container') : null;
                if (progressContainer) progressContainer.style.display = 'none';
            }
        });
    });
})();
