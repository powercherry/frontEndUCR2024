const words = ['camion', 'futbol', 'laptop', 'bosque'];

let selectedWord = '';
let selectedWordArray = [];
let remainingAttempts = 6;
let guessedLetters = [];
let wrongGuesses = 0;

const hangmanImage = document.getElementById('hangman-image');
const word = document.getElementById('word');
const input = document.getElementById('input');
const tryBtn = document.getElementById('tryBtn');
const remaining = document.getElementById('remaining');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    // Inicializar el array con guiones bajos para cada letra
    selectedWordArray = Array(selectedWord.length).fill('_');
    word.textContent = selectedWordArray.join(' ');
    remainingAttempts = 6;
    wrongGuesses = 0;
    guessedLetters = [];
    hangmanImage.src = '/media/00.png';
    remaining.textContent = `Intentos restantes: ${remainingAttempts}`;
    message.textContent = '';
    input.value = '';
    input.focus();
    resetBtn.style.display = 'none';
}

function checkLetter() {

    const guessedLetter = input.value.toLowerCase();
    message.textContent = '';
    // Validación de entrada
    if (!guessedLetter || guessedLetter.length !== 1 || guessedLetters.includes(guessedLetter)) {
        message.textContent = 'Letra no válida o ya adivinada.';
        input.value = ''; // Limpiar el campo de entrada
        return;
    }

    guessedLetters.push(guessedLetter);
    input.value = ''; // Limpiar el campo de entrada

    // Verificar si la letra está en la palabra
    if (selectedWord.includes(guessedLetter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guessedLetter) {
                selectedWordArray[i] = guessedLetter;
            }
        }
        word.textContent = selectedWordArray.join(' ');

        // Verificar si se completó la palabra
        if (!selectedWordArray.includes('_')) {
            message.textContent = '¡Ganaste!';
            resetBtn.style.display = 'inline';
        }
    } else {
        wrongGuesses++;
        remainingAttempts--;
        remaining.textContent = `Intentos restantes: ${remainingAttempts}`;
        hangmanImage.src = `/media/0${wrongGuesses}.png`;

        if (remainingAttempts === 0) {
            message.textContent = '¡Perdiste!';
            word.textContent = selectedWord;
            resetBtn.style.display = 'inline';
        }
    }
}

tryBtn.addEventListener('click', checkLetter);
resetBtn.addEventListener('click', startGame);

startGame();
