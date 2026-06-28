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
let wordCompare = "";
let numAttempts = 6;
let currentBoxIndex = 0;

const keyRow = document.querySelectorAll(".keyboard-row");
const board = document.querySelector(".board-guess");
const boxes = document.querySelectorAll(".sqr");
const message = document.querySelector(".message");

keyRow.forEach(row => {
    const buttons = row.querySelectorAll(".keyboard-key");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            if(btn.id === "del") {
                if(currentBoxIndex === 0) return;

                currentBoxIndex--;
                boxes[currentBoxIndex].textContent = "";
                userGuess = userGuess.slice(0, -1);
                return
            }

            if(btn.id === "enter") {
                return // Logic insert will be here
            }

            if(currentBoxIndex === 5) return;

            userGuess += btn.textContent
            boxes[currentBoxIndex].textContent = btn.textContent
            currentBoxIndex++;
        });
    });
});