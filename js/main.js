let count = 0;

const counterDisplay = document.getElementById('counter');
const catText = document.getElementById('catText');
const button = document.getElementById('helloButton');

button.onclick = function() {
    count += 1;
    counterDisplay.textContent = count;

    if (count > 5) {
        counterDisplay.classList.add('text-danger');
    }
};