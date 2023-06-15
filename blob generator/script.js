// Get the CSS code output element
let outputCode = document.getElementById("css-code");

// Get all range sliders and add an input event listener to each one
let sliders = document.querySelectorAll("input[type='range']");
sliders.forEach(function (slider) {
  slider.addEventListener("input", createBlob);
});

// Get all number inputs and add a change event listener to each one
let inputs = document.querySelectorAll("input[type='number']");
inputs.forEach(function (inp) {
  inp.addEventListener("change", createBlob);
});

// This function updates the blob based on the values of the sliders and inputs
function createBlob() {
  // Get the values of the four range sliders
  let radiusOne = sliders[0].value;
  let radiusTwo = sliders[1].value;
  let radiusThree = sliders[2].value;
  let radiusFour = sliders[3].value;

  // Get the values of the two number inputs
  let blobHeight = inputs[0].value;
  let blobWidth = inputs[1].value;

  // Create the CSS border-radius property value based on the slider values
  let borderRadius = `${radiusOne}% ${100 - radiusOne}% ${
    100 - radiusThree
  }% ${radiusThree}% / ${radiusFour}% ${radiusTwo}% ${100 - radiusTwo}% ${
    100 - radiusFour
  }%`;

  // Set the CSS style of the blob element based on the updated border-radius and size values
  document.getElementById(
    "blob"
  ).style.cssText = `border-radius: ${borderRadius}; height: ${blobHeight}px; width: ${blobWidth}px`;

  // Update the CSS code output element with the updated border-radius value
  outputCode.value = `border-radius: ${borderRadius};`;
}

// Add a click event listener to the "Copy" button
document.getElementById("copy").addEventListener("click", function () {
  // Select the CSS code output element
  outputCode.select();
  // Copy the selected text to the clipboard
  document.execCommand("copy");
  // Alert the user that the code has been copied
  alert("Code Copied");
});

// Call the createBlob function once on page load to set the initial blob style
createBlob();
