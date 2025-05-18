document.getElementById('ingredient-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const mixTime = e.target.mixTime.value;
    const mixSpeed = e.target.mixSpeed.value;
    const colorValue = e.target.colorValue.value;
    const texture = e.target.texture.value;

    const ingredient = document.createElement('div');
    ingredient.classList.add('ingredient');
    ingredient.dataset.mixTime = mixTime;
    ingredient.dataset.mixSpeed = mixSpeed;
    ingredient.dataset.texture = texture;

    // Genereer uniek ID voor tracking tijdens drag & drop
    const uniqueId = `ingredient-${Date.now()}`;
    ingredient.dataset.id = uniqueId;

    // Zet kleur in CSS custom property
    ingredient.style.setProperty('--ingredient-color', colorValue);
    ingredient.title = hexToHSL(colorValue);
    ingredient.classList.add(`texture-${texture}`);

    // Drag functionaliteit
    ingredient.setAttribute('draggable', true);
    ingredient.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', JSON.stringify({
            id: uniqueId,
            mixSpeed: mixSpeed
        }));
        ingredient.classList.add('dragging');
    });
    ingredient.addEventListener('dragend', function () {
        ingredient.classList.remove('dragging');
    });

    // Label
    const label = document.createElement('span');
    label.classList.add('ingredient-label');
    label.innerText = `${mixSpeed}x - ${mixTime}ms\n${texture}`;
    ingredient.appendChild(label);

    document.getElementById('ingredients-container').appendChild(ingredient);
    e.target.reset();
});

function hexToHSL(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
            case g: h = ((b - r) / d + 2); break;
            case b: h = ((r - g) / d + 4); break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}
