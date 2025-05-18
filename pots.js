let potCount = 0;

document.addEventListener('DOMContentLoaded', function () {
    const pottenContainer = document.getElementById('potten-container');

    document.getElementById('add-pot').addEventListener('click', function () {
        potCount++;

        // Maak hoofddiv voor de pot
        const pot = document.createElement('div');
        pot.classList.add('pot');
        pot.dataset.potId = `pot-${potCount}`;

        // Titel/header van de pot
        const header = document.createElement('div');
        header.classList.add('pot-header');
        header.innerText = `Pot ${potCount}`;
        pot.appendChild(header);

        // Inhoudsgebied voor ingrediënten
        const content = document.createElement('div');
        content.classList.add('pot-content');
        pot.appendChild(content);

        // Maak de pot droppable
        pot.addEventListener('dragover', (e) => e.preventDefault());

        pot.addEventListener('drop', (e) => {
            e.preventDefault();

            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            const ingredient = document.querySelector(`[data-id='${data.id}']`);
            const content = pot.querySelector('.pot-content');

            if (!ingredient || !content) return;

            const currentIngredients = content.querySelectorAll('.ingredient');
            if (currentIngredients.length >= 3) {
                alert('Maximaal 3 ingrediënten per pot.');
                return;
            }

            const sameSpeed = Array.from(currentIngredients).every(el => el.dataset.mixSpeed === data.mixSpeed);
            if (currentIngredients.length > 0 && !sameSpeed) {
                alert('Alle ingrediënten in deze pot moeten dezelfde mengsnelheid hebben.');
                return;
            }

            // Verplaats het ingrediënt naar de inhoudscontainer
            content.appendChild(ingredient);
        });

        pottenContainer.appendChild(pot);
    });
});
