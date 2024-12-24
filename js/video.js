function toggleVideo(container) {
    const videoSrc = container.getAttribute('data-video-src');
    const isVideoPlaying = container.querySelector('video');

    // Chiudi eventuali altri video attivi
    const allContainers = document.querySelectorAll('.skill-card');
    allContainers.forEach((otherContainer) => {
        const otherVideo = otherContainer.querySelector('video');
        if (otherVideo && otherContainer !== container) {
            // Ferma e chiudi il video attivo
            otherVideo.pause();
            otherVideo.currentTime = 0;
            otherVideo.src = ""; // Scarica il video
            otherVideo.load(); // Forza il reset
            const thumbnail = otherContainer.getAttribute('data-thumbnail');
            const altText = otherContainer.getAttribute('data-alt');
            otherContainer.innerHTML = `<img src="${thumbnail}" alt="${altText}" class="card-thumbnail">`;
        }
    });

    // Gestisci il container corrente
    if (isVideoPlaying) {
        // Ferma il video e rimuovilo dal container
        const video = isVideoPlaying;
        video.pause();
        video.currentTime = 0;
        video.src = ""; // Scarica il video
        video.load(); // Forza il reset
        const thumbnail = container.getAttribute('data-thumbnail');
        const altText = container.getAttribute('data-alt');
        container.innerHTML = `<img src="${thumbnail}" alt="${altText}" class="card-thumbnail">`;
    } else {
        // Aggiungi un nuovo video al container
        const video = document.createElement('video');
        video.src = videoSrc;
        video.controls = true;
        video.autoplay = true;
        video.style.width = '100%';
        container.innerHTML = '';
        container.appendChild(video);

        // Trasforma nuovamente in card quando il video termina
        video.addEventListener('ended', () => {
            const thumbnail = container.getAttribute('data-thumbnail');
            const altText = container.getAttribute('data-alt');
            container.innerHTML = `<img src="${thumbnail}" alt="${altText}" class="card-thumbnail">`;
        });
    }
}