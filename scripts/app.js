import { WORDS } from "./words.js";

const secretWords = WORDS.map(word => {
    return word.toUpperCase()
})

let userGuess = "";
let randomPicker = Math.floor(Math.random() * secretWords.length)
let wordCompare = secretWords[randomPicker];
let numAttempts = 6;

let currentBoxIndex = 0;
let currentRow = 0;
let rowStart = currentRow * 5;
let rowEnd = rowStart + 5;

let gameFlag = false;

const keyRows = document.querySelectorAll(".keyboard-row");
const boxes = document.querySelectorAll(".sqr");
const message = document.querySelector("#message");
const popMessage = document.querySelector("#message-pop");
const resetBtn = document.querySelector(".reset-btn");
const playAgainBtn = document.querySelector(".play-again");
const keyboard = document.querySelectorAll(".keyboard-key");
const popUp = document.querySelector(".pop-up");

const defeatSound = new Audio("./sounds/defeat-sound.mp3");
const errorSound =  new Audio("./sounds/error-sound.mp3");
const keyboardSound =  new Audio("./sounds/keyboard-click.mp3");
const successSound = new Audio("./sounds/success-sound.mp3");
const victorySound = new Audio("./sounds/victory-sound.mp3");

keyRows.forEach(row => {
    const buttons = row.querySelectorAll(".keyboard-key");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            if(numAttempts === 0 || gameFlag) return;
            
            if(btn.id === "del") {
                deleteLetter()
                return
            }

            if(btn.id === "enter") {
                insertWord(userGuess)
                return
            }

            if(currentBoxIndex === rowEnd) return;

            userGuess += btn.textContent
            boxes[currentBoxIndex].textContent = btn.textContent
            addLetterStyle(boxes[currentBoxIndex])
            animate(boxes[currentBoxIndex], "pop")
            currentBoxIndex++;
            btn.blur();
            playSound(keyboardSound)
        });
    });
});

document.addEventListener("keydown", e => {
    if(numAttempts === 0 || gameFlag) return

    let key = String(e.key);

    if(key === "Backspace") {
        deleteLetter()
        return
    }

    if(key === "Enter") {
        insertWord(userGuess);
        e.preventDefault() // btn.blur is enough but just for extra guard
        playSound(keyboardSound)
        return;
    }

    if(key === " ") e.preventDefault(); // the same goes here

    let found = /^[A-Z]$/i.test(key);

    if(!found) return;
    if(currentBoxIndex === rowEnd) return;

    userGuess += key.toUpperCase()
    boxes[currentBoxIndex].textContent = key.toUpperCase()
    addLetterStyle(boxes[currentBoxIndex])
    animate(boxes[currentBoxIndex], "pop")
    currentBoxIndex++;
    playSound(keyboardSound)
});

resetBtn.addEventListener("click", () => {
    resetGame();
});

playAgainBtn.addEventListener("click", () => {
    resetGame();
    popUp.classList.add("hidden");
})

function deleteLetter() {
    if(currentBoxIndex === rowStart) return;
    
    currentBoxIndex--;
    boxes[currentBoxIndex].textContent = "";
    removeLetterStyle(boxes[currentBoxIndex])
    removeAnimation(boxes[currentBoxIndex], "pop")
    userGuess = userGuess.slice(0, -1);
    playSound(keyboardSound)
}


function insertWord(guess) {
    let arrCount = secretWords.length;

    if(currentBoxIndex !== rowEnd) return;

    for (const word of secretWords) {
        if (guess !== word) {
            arrCount --;
        }

        if(arrCount === 0) {
            message.textContent = "Invalid, word is not in list";
            shakeRow()
            return
        }
    }

    checkWordAndColor(guess, wordCompare);
    
    if (guess !== wordCompare) {
        numAttempts--;
        message.textContent = `Invalid guess ${numAttempts} attempts left`

        currentRow++;
        rowStart = currentRow * 5;
        rowEnd = rowStart + 5;

        currentBoxIndex = rowStart;
        userGuess = "";
        playSound(keyboardSound)
    }

    if(numAttempts === 0 || gameFlag) {
        popMessage.textContent = `You've lost, Word: ${wordCompare}`;
        popUp.classList.remove("hidden");
        gameFlag = true;
        playSound(defeatSound)
        return
    }

    if(guess === wordCompare) {
        popMessage.textContent = "You've Won!"
        popUp.classList.remove("hidden");
        playSound(victorySound);
        gameFlag = true;
        return
    }
}

function resetGame() {
    numAttempts = 6
    currentBoxIndex = 0
    userGuess = ""
    currentRow = 0;
    rowStart = currentRow * 5;
    rowEnd = rowStart + 5;
    gameFlag = false;

    randomPicker = Math.floor(Math.random() * secretWords.length)
    wordCompare = secretWords[randomPicker];
    message.textContent = "";
    popMessage.textContent = "";
    popUp.classList.add("hidden")

    boxes.forEach(box => {
        box.classList.remove("correct-letter-place", "correct-letter", "wrong", "box-style");
        box.textContent = ""
    });

    keyboard.forEach(btn => {
        btn.classList.remove("correct-letter-place", "correct-letter", "wrong");
    });
}

function checkWordAndColor(word, correctWord) {
    const currentRow = rowStart;
    
    for(let i = 0; i<word.length; i++) {
        setTimeout(() => {
            let letter = word[i]
            let boxIndex = currentRow + i;

            animate(boxes[boxIndex], "flip")

            if(correctWord[i] === letter) {
                boxes[boxIndex].classList.add("correct-letter-place");
                checkKeyboardColor(letter, "correct-letter-place")
                playSound(successSound)
            } else if(correctWord.includes(letter)) {
                boxes[boxIndex].classList.add("correct-letter")
                checkKeyboardColor(letter, "correct-letter")
            } else {
                boxes[boxIndex].classList.add("wrong");
                checkKeyboardColor(letter, "wrong")
            }
            
        }, i*300)
    }
}

function checkKeyboardColor(letter, style) {
    keyboard.forEach(btn => {
        if(btn.textContent === letter) {
            if(btn.classList.contains("correct-letter-place")) return;

            if(style === "correct-letter-place") {
                btn.classList.remove("correct-letter");
                btn.classList.add(style)
            }

            btn.classList.remove("correct-letter");
            btn.classList.add(style)
        }
    });
}

function addLetterStyle(box) {
    box.classList.add("box-style")
}

function removeLetterStyle(box) {
    box.classList.remove("box-style");
}

function animate(box, animation) {
    box.classList.add(animation)

    box.addEventListener("animationend", () => {
        box.classList.remove(animation);
    }, {once: true})
}

function removeAnimation(box, animation) {
    box.classList.remove(animation); // Maybe will change it to toggle instead of add and remove more optimal
}

function shakeRow() {
    for(let i = rowStart; i<rowEnd; i++) {
        animate(boxes[i], "shake")
    }
    playSound(errorSound)
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}