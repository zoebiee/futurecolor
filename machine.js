let machineCount = 0;

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('machine-form');
    const container = document.getElementById('machine-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        machineCount++;

        const speed = form.mixSpeed.value;
        const time = form.mixTime.value;

        const machine = document.createElement('div');
        machine.classList.add('machine');
        machine.dataset.mixSpeed = speed;
        machine.dataset.mixTime = time;

        const label = document.createElement('div');
        label.classList.add('machine-label');
        label.innerText = `Machine ${machineCount}\n${speed}x – ${time}ms`;

        machine.appendChild(label);
        container.appendChild(machine);

        form.reset();
    });
});
