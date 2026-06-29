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

keyRow.forEach(row => {
    const buttons = row.querySelectorAll(".keyboard-key");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            gameLogic();
        });

        btn.addEventListener("keydown", e => {

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
        box.textContent = "";
    });
}