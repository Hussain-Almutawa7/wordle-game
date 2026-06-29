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

const keyRow = document.querySelectorAll(".keyboard-row");
const boxes = document.querySelectorAll(".sqr");
const message = document.querySelector("#message");

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

            if(currentBoxIndex === 5) return;

            userGuess += btn.textContent
            boxes[currentBoxIndex].textContent = btn.textContent
            currentBoxIndex++;
        }

    });
});

function deleteLetter() {
    if(currentBoxIndex === 0) return;
    
    currentBoxIndex--;
    boxes[currentBoxIndex].textContent = "";
    userGuess = userGuess.slice(0, -1);
}

function insertWord(guess) {
    let arrCount = secretWords.length;

    if(currentBoxIndex !== 5) return;

    for (const word of secretWords) {
        if (guess !== word) {
            arrCount --;
        }

        if(arrCount === 0) {
            message.textContent = "Invalid word, does not contain in the list";
            break;
        }

        console.log(wordCompare)
        console.log(guess)

        if (guess !== wordCompare) {
            numAttempts--;
            message.textContent = "Invalid Guess Try again"
            console.log(numAttempts)
            break;
        }
    }

    if(numAttempts === 0) {
        message.textContent = "You loose"
    }

    if(guess === wordCompare)
        message.textContent = "You win!"
}