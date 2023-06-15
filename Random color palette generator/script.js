// Define an array of possible hex characters
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

// Get the "Generate" button and all elements with the class "hexValue" and "rect-box"
const btnGenerate = document.getElementById("btn");
const hexValues = document.querySelectorAll(".hexValue");
const rectBoxes = document.querySelectorAll(".rect-box");

// Add an event listener to the "Generate" button
btnGenerate.addEventListener("click", function () {
  // For each "rect-box" element, generate a random color and set its background color
  rectBoxes.forEach((rectBox) => {
    let randomColor = getRandomNumber();
    rectBox.style.backgroundColor = randomColor;

    // Set the text content of the next element (with the class "hexValue") to the generated color
    rectBox.nextElementSibling.textContent = randomColor;
  });
});

// Generate a random hex color by selecting 6 random hex characters and concatenating them
function getRandomNumber() {
  let randomNumber = "#";
  for (let i = 0; i < 6; i++) {
    randomNumber += hex[Math.floor(Math.random() * hex.length)];
  }
  return randomNumber;
}
