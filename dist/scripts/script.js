// Taken from https://andy-bell.design/wrote/create-a-user-controlled-dark-or-light-mode/

document.documentElement.classList.remove("no-js");

const STORAGE_KEY = "user-color-scheme";
const COLOR_MODE_KEY = "--color-mode";

let modeToggleButton;
let modeStatusElement;
let dna;

function getCSSCustomProp(propKey) {
  let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

  if (response.length) {
    response = response.replace(/\"/g, "").trim();
  }

  return response;
}

function applySetting(passedSetting) {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);
  if (currentSetting) {
    document.documentElement.setAttribute("data-user-color-scheme", currentSetting);
    setButtonLabelAndStatus(currentSetting);
  } else {
    setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
  }
}

function setButtonLabelAndStatus(currentSetting) {
  console.log(currentSetting);
  modeStatusElement.innerText = currentSetting;

  checkDnaColor();
}

function toggleSetting() {
  let currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === "dark" ? "light" : "dark";
      break;
    case "light":
      currentSetting = "dark";
      break;
    case "dark":
      currentSetting = "light";
      break;
  }

  localStorage.setItem(STORAGE_KEY, currentSetting);

  return currentSetting;
}

function checkDnaColor() {
  let currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case "light":
      dna.setAttribute("src", "/src/assets/images/dna.svg");
      break;
    case "dark":
      dna.setAttribute("src", "/src/assets/images/dna-night.svg");
      break;
  }
}

document.addEventListener("DOMContentLoaded", function (_) {
  modeToggleButton = document.querySelector(".js-mode-toggle");
  modeStatusElement = document.querySelector(".js-mode-status");
  dna = document.getElementById("dna");

  modeToggleButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    applySetting(toggleSetting());
  });

  applySetting();
  checkDnaColor();
});
