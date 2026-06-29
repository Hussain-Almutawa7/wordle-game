const secretWords = [
  "APPLE",
  "GRAPE",
  "HOUSE",
  "LIGHT",
  "SOUND",
  "MUSIC",
  "GREEN",
  "BLACK",
  "WHITE",
  "BROWN",
  "SMILE",
  "DREAM",
  "CLOUD",
  "STONE",
  "RIVER",
  "BEACH",
  "HEART",
  "WORLD",
  "NIGHT",
  "SMART",
  "HAPPY",
  "SWEET",
  "TIGER",
  "ZEBRA",
  "TRAIN"
];

let userGuess = "";
let randomPicker = Math.floor(Math.random() * secretWords.length)
let wordCompare = secretWords[randomPicker];
let numAttempts = 6;

let currentBoxIndex = 0;
let currentRow = 0;
let rowStart = currentRow * 5;
let rowEnd = rowStart + 5;

const keyRow = document.querySelectorAll(".keyboard-row");
const boxes = document.querySelectorAll(".sqr");
const message = document.querySelector("#message");
const resetBtn = document.querySelector("#reset-btn");
const keyboard = document.querySelectorAll(".keyboard-key");

console.log(wordCompare)

keyRow.forEach(row => {
    const buttons = row.querySelectorAll(".keyboard-key");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            gameLogic();
            btn.blur();
        });

        function gameLogic() {
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
            currentBoxIndex++;
        }

    });
});

resetBtn.addEventListener("click", () => {
    resetGame();
});

document.addEventListener("keydown", e => {
    if(numAttempts === 0) return

    let key = String(e.key);

    if(key === "Backspace") {
        deleteLetter()
        return
    }

    if(key === "Enter") {
        insertWord(userGuess);
        e.preventDefault() // btn.blur is enough but just for guard
        return;
    }

    if(key === " ") e.preventDefault(); // btn.blur is enough but just for guard

    let found = key.match(/[A-Z]/gi)

    if(!found || found.length > 1) {
        return
    } else {
        if(currentBoxIndex === rowEnd) return;
        userGuess += key.toUpperCase()
        boxes[currentBoxIndex].textContent = key.toUpperCase()
        currentBoxIndex++;
    }
});

function deleteLetter() {
    if(currentBoxIndex === rowStart) return;
    
    currentBoxIndex--;
    boxes[currentBoxIndex].textContent = "";
    userGuess = userGuess.slice(0, -1);
}


function insertWord(guess) {
    let arrCount = secretWords.length;

    if(currentBoxIndex !== rowEnd) return;

    for (const word of secretWords) {
        if (guess !== word) {
            arrCount --;
        }

        if(arrCount === 0) {
            message.textContent = "Invalid word, does not contain in the list";
            return
        }
    }

    checkWordAndColor(guess, wordCompare);
    
    if (guess !== wordCompare) {
        numAttempts--;
        message.textContent = "Invalid Guess Try again"

        currentRow++;
        rowStart = currentRow * 5;
        rowEnd = rowStart + 5;

        currentBoxIndex = rowStart;
        userGuess = "";
    }

    if(numAttempts === 0) {
        message.textContent = "You loose"
    }

    if(guess === wordCompare)
        message.textContent = "You win!"
}

function resetGame() {
    numAttempts = 6
    currentBoxIndex = 0
    userGuess = ""
    currentRow = 0;
    rowStart = currentRow * 5;
    rowEnd = rowStart + 5;

    randomPicker = Math.floor(Math.random() * secretWords.length)
    wordCompare = secretWords[randomPicker];
    message.textContent = "";

    boxes.forEach(box => {
        box.classList.remove("correct-letter-place", "correct-letter", "wrong");
    });

    keyboard.forEach(btn => {
        btn.classList.remove("correct-letter-place", "correct-letter", "wrong");
    })

    boxes.forEach(box => {
        box.textContent = "";
    });
}

function checkWordAndColor(word, correctWord) {
    for(let i = 0; i<word.length; i++) {
        let letter = word[i]
        let boxIndex = rowStart + i;

        if(correctWord[i] === letter) {
            boxes[boxIndex].classList.add("correct-letter-place");
            checkKeyboardColor(letter, "correct-letter-place")
        } else if(correctWord.includes(letter)) {
            boxes[boxIndex].classList.add("correct-letter")
            checkKeyboardColor(letter, "correct-letter")
        } else {
            boxes[boxIndex].classList.add("wrong");
            checkKeyboardColor(letter, "wrong")
        }
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