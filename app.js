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

let userGuess;
let wordCompare;
let numAttempts = 6;

const keyRow = document.querySelectorAll(".keyboard-row");
const board = document.querySelector(".board-guess");
const message = document.querySelector(".message");

