const secretWords = [
  "apple",
  "grape",
  "chair",
  "table",
  "plant",
  "water",
  "bread",
  "house",
  "light",
  "sound",
  "music",
  "green",
  "black",
  "white",
  "brown",
  "smile",
  "dream",
  "cloud",
  "stone",
  "river",
  "beach",
  "heart",
  "world",
  "night",
  "smart",
  "happy",
  "sweet",
  "tiger",
  "zebra",
  "train"
];

let userGuess = "";
let randomPicker = Math.floor(Math.random() * secretWords.length)
let wordCompare = secretWords[randomPicker];
let numAttempts = 6;
let currentBoxIndex = 0;

const keyRow = document.querySelectorAll(".keyboard-row");
const boxes = document.querySelectorAll(".sqr");
const message = document.querySelector(".message");

keyRow.forEach(row => {
    const buttons = row.querySelectorAll(".keyboard-key");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
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
        });
    });
});

function deleteLetter() {
    if(currentBoxIndex === 0) return;
    
    currentBoxIndex--;
    boxes[currentBoxIndex].textContent = "";
    userGuess = userGuess.slice(0, -1);
}

function insertWord(guess) {

    // if(currentBoxIndex !== 5) return;

    // if (guess !== wordCompare) {
    //     numAttempts--;
    //     message.textContent = "Invalid Guess Try again"
    // }

    // if(numAttempts === 0) {
    //     message.textContent = "You loose"
    // }

    // if(guess === wordCompare)
    //     message.textContent = "You win!"
}