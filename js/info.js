document.addEventListener("DOMContentLoaded", () => {
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");

        header.addEventListener("click", () => {
            // Chiudi tutte le altre sezioni aperte
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherContent = otherItem.querySelector(".accordion-content");
                    otherContent.classList.remove("active");
                }
            });

            // Alterna visibilità della sezione corrente
            const content = item.querySelector(".accordion-content");
            content.classList.toggle("active");
        });
    });
});
