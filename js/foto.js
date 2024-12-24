document.addEventListener('DOMContentLoaded', () => {
    let currentlyOpenStack = null; // Memorizza il mazzo attualmente aperto

    document.querySelectorAll('.photo-group').forEach((group) => {
        const stack = group.querySelector('.photo-stack');

        // Quando il mazzo viene cliccato
        group.addEventListener('click', () => {
            const images = Array.from(stack.querySelectorAll('img'));

            if (currentlyOpenStack && currentlyOpenStack !== stack) {
                // Chiudi il mazzo precedentemente aperto
                closeStack(currentlyOpenStack);
            }

            if (stack.classList.contains('closed')) {
                // Apri il mazzo se è chiuso
                stack.classList.remove('closed');
                stack.classList.add('open');
                currentlyOpenStack = stack; // Aggiorna il mazzo aperto
                updateStackStyles(stack, images, 10); // Sfalsamento maggiore
            } else {
                // Sposta la prima immagine in fondo
                if (images.length > 1) {
                    const firstImage = images[0];
                    stack.appendChild(firstImage); // Sposta la prima immagine in fondo
                    updateStackStyles(stack, images, 10); // Mantieni sfalsamento maggiore
                }
            }
        });

        // Imposta lo stile iniziale del mazzo come "chiuso"
        stack.classList.add('closed');
        const initialImages = Array.from(stack.querySelectorAll('img'));
        updateStackStyles(stack, initialImages, 5); // Sfalsamento minore per mazzi chiusi
    });

    // Aggiorna la disposizione sfalsata delle immagini
    function updateStackStyles(stack, images, offset) {
        images.forEach((img, index) => {
            img.style.transform = `translate(${index * offset}px, ${index * offset}px)`;
            img.style.zIndex = images.length - index; // Mantiene l'ordine visivo
        });
    }

    // Funzione per chiudere un mazzo
    function closeStack(stack) {
        const images = Array.from(stack.querySelectorAll('img'));
        stack.classList.remove('open');
        stack.classList.add('closed');
        updateStackStyles(stack, images, 5); // Ripristina sfalsamento minore
        currentlyOpenStack = null; // Resetta il mazzo aperto
    }
});
