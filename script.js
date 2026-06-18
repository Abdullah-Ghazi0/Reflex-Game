
const button = document.querySelector("#start");
const display = document.querySelector("#display");
const input = document.querySelector("#input");

const scoreBox = document.querySelector("#currentScore");
const highScoreBox = document.querySelector("#highScore");
const timerBox = document.querySelector("#timer");
const timerContainer = document.querySelector('.timerBox');

const overlay = document.querySelector(".modal-overlay");
const modalTimer = document.querySelector('.modal-text');
const modalTitle = document.querySelector('#modalTitle');
const modalFeedback = document.querySelector("#modalFb");

let hiddenField;

const easyList = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G",
              "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];

const hardList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const hardestList = ["`", "-", "=", "/", "\\", ".", ",", ";", "[", "]"]

const timerLimit = 31000;

const unsupportedDevices = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i

let list = [];
let state;
let timerInterval;
let charTimeout;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let currentCharater;
let readKey = false;
let stopTime;
let timeDiff;
let charCount = 0;

function startModalTimer() {
    let time = Number(modalTimer.textContent) - 1

    setTimeout(()=> {
        if (time === 0) {
            modalTimer.textContent = "GO!";
            hiddenField && hiddenField.focus();
            setTimeout(endModal, 800);
        } else {
            modalTimer.textContent = time;
            modalTimer.classList.add('load');
            setTimeout(()=> {
                modalTimer.classList.remove('load')
            }, 700)
            startModalTimer();
        }
    }, 800)
}

function startModal() {
    overlay.classList.add('show');
    modalTimer.classList.add('modal-text');
    modalTimer.textContent = 3;
    modalTimer.classList.add('load');
    setTimeout(()=> {
        modalTimer.classList.remove('load')
    }, 700)
    startModalTimer();
}

function endModal() {
    closeModal()
    startGame();
}

function closeModal() {
    overlay.classList.remove('show');
    modalTitle.textContent = "";
    modalFeedback.textContent = "";
}

function startGame() {
    state = true;
    list = [...easyList]
    startTimer();
    setTimeout(giveRandom, 300)

    display.textContent = "";
    input.textContent = "";

}

function stopingModal() {
    let accuracy = Math.floor((score / charCount) * 100)

    overlay.classList.add('show')
    modalTitle.textContent = "Time Over!"
    modalFeedback.textContent = "Give Feedback"
    modalTimer.textContent = `Score: ${score}\nAccuracy: ${accuracy}%`;

    modalTimer.classList.remove('modal-text');
    modalTimer.classList.add('modal-info');

    overlay.addEventListener('click', closeModal, {once: true})
}

function stopGame() {
    clearTimeout(charTimeout)
    clearInterval(timerInterval)
    stopingModal();

    button.textContent = "Play Again";
    input.textContent = "";
    display.textContent = "";
    button.classList.add('clickable');
    hiddenField && hiddenField.blur();

    state = false;
    readKey = false;
    score = 0;
    stopTime = 0;
    charCount = 0;
    list = [];
    updateScore();
}

function getIndex() {
    let i = Math.floor(Math.random() * (list.length));
    return i;
}

function giveRandom() {
    let next;

    do {
        next = list[getIndex()];
    } while(next === currentCharater)

    currentCharater = next;
    charCount++;
    showCharater();
    readKey = true;

    if (state) {
        getNewChar()
    }
}

function changeTimeDiff() {
    if (score <= 3) {
        timeDiff = 1800;
    } else if (score <= 5) {
        timeDiff = 1600;
    } else if (score <= 7) {
        timeDiff = 1400;
    } else if (score <= 9) {
        timeDiff = 1200;
    } else if  (score <= 12) {
        list.length <= 26 && list.push(...hardList)
        timeDiff = 1000;
    } else if (score <= 15) {
        timeDiff = 800;
    } else if (score <= 18){
        timeDiff = 650;
    } else {
        list.length <= 36 && list.push(...hardestList)
        timeDiff = 500;
    }
}

function getNewChar() {
    changeTimeDiff();
    charTimeout = setTimeout(giveRandom, timeDiff)
}

function showCharater() {
    display.textContent = currentCharater;
}

function showMistake() {
    input.classList.add('mistake');
    setTimeout(()=> {
        input.classList.remove('mistake')
    }, 200)
}

function updateScore() {
    
    if (score >= highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }

    scoreBox.textContent = score;
    highScoreBox.textContent = highScore;
}


function showInput(keyPressed) {
    if (list.includes(keyPressed)) input.textContent = keyPressed;
    
}


function startTimer() {
    let currentTime = Date.now();
    stopTime = currentTime + timerLimit;
    timerInterval = setInterval(updateTimer, 500)
}

function updateTimer() {
    let displayTime = stopTime - Date.now()
    displayTime = Math.floor(displayTime / 1000);

    if (displayTime <= 0) {
        stopGame();
    }
    timerBox.textContent = displayTime;
}

function createSupport() {
    hiddenField = document.createElement('input');
    hiddenField.type = 'text';
    hiddenField.classList.add('hidden');
    document.body.appendChild(hiddenField);

    input.before(timerContainer);

    hiddenField.addEventListener('input', () => {
        if (!readKey) return;
        let charEntered = hiddenField.value.slice(-1).toUpperCase();
        console.log(charEntered)

        if (charEntered === currentCharater) {
            score++;
            updateScore();
        }
        readKey = false;
        })
}

function checkSupport() {
    const unsupported = unsupportedDevices.test(navigator.userAgent);

    if (unsupported) {
        createSupport()   
    }
}

button.addEventListener('click', e => {
    if (!state) {
        startModal();
        button.textContent = "Press the shown Key";
        button.classList.remove('clickable');

        button.blur();
    }
})

window.addEventListener('keydown', e => {
    if (!readKey) return;
    if (hiddenField) return;

    let keyPressed = e.key.toUpperCase();
    showInput(keyPressed);

    if (keyPressed === currentCharater) {
        score++;
        updateScore();
    } else {
        showMistake();
    }

    readKey = false;
})

updateScore();
checkSupport();