// Create an array between 8 and 128 characters long.
const availableNumbers = [];
for (let i = 8; i <= 128; i++) {
  availableNumbers.push(i);
}
// Create an array with a series of special characters.
const specialCharacters = "/[!@#$%^&*()_+\-=\[\]{};':\"\|,.<>\/?]+/";
const specialArry = specialCharacters.split("");
// Create array of characters
const regularCharacters = "abcdefghijklmnopqrstuvwxyz";
const charactersArray = regularCharacters.split("");

// Variables to create response to user input as a string.
const variableCriteria = {
  // Input is changed to lowercase if it is a string.
  toLowerCase: function(character) {
    character = character.toLowerCase();
    return character;
  },
  // Input is changed to an uppercase if it is a string.
  toUpperCase: function(character) {
    character = character.toUpperCase();
    return character;
  },
  // Input is changed to a number from the availableNumbers array.
  createNumber: function(character) {
    character = availableNumbers[Math.floor(Math.random() * availableNumbers.length - 1)];
    return character;
  },
  // Input is changed to a special character.
  makeSpecial: function(character) {
    character = specialArry[Math.floor(Math.random() * specialArry.length - 1)];
    if (character !== undefined) {
      return character;
    } else {
      return ".";
    }
  }
}

// Create several prompts to play when button is pressed to gather user selection criteria.
const createPromts = {
  // Returns user number of characters if user input is valid.
  numberOfCharsGiven: 0,
  requestNumOfChars: function() {
    let numOfChars = prompt("How many characters should there be? Between 8 and 128");
    this.numberOfCharsGiven = numOfChars;
    if (this.numberOfCharsGiven < 8 || this.numberOfCharsGiven > 128) {
      do {
        this.requestNumOfChars();
      } while (this.numberOfCharsGiven < 8 || this.numberOfCharsGiven > 128);
    }
  },
  // Changes confirmedLowerCase to true if user presses 'ok'.
  confirmedLowerCase: false,
  requestLowerCase: function() {
    let lowerCase = confirm("Include lowercase letters?");
    if (lowerCase) {
      this.confirmedLowerCase = true;
    }
  },
  // Changes confirmedUpperCase to true if user presses 'ok'.
  confirmedUpperCase: false,
  requestUpperCase: function() {
    let upperCase = confirm("Include uppercase letters?");
    if (upperCase) {
      this.confirmedUpperCase = true;
    }
  },
  // Changes confirmedNumeric to true if user presses 'ok'.
  confirmedNumeric: false,
  requestNumeric: function () {
    let numeric = confirm("Include numeric characters?");
    if (numeric) {
      this.confirmedNumeric = true;
    }
  },
  // Changes confirmedSpecial to true if user presses 'ok'.
  confirmedSpecial: false,
  requestSpecial: function () {
    let special = confirm("Include special characters? (#, $, %, etc)");
    if (special) {
      this.confirmedSpecial = true;
    }
  }
}
const runPrompts = () => {
  createPromts.requestNumOfChars();
  createPromts.requestLowerCase();
  createPromts.requestUpperCase();
  createPromts.requestNumeric();
  createPromts.requestSpecial();
}
runPrompts();
// Save user input to variables.
let numberSelected = createPromts.numberOfCharsGiven;
let lowerCaseSelected = createPromts.confirmedLowerCase;
let upperCaseSelected = createPromts.confirmedUpperCase;
let numericSelected = createPromts.confirmedNumeric;
let specialSelected = createPromts.confirmedSpecial;

// Variable to create a random index
let remainder = numberSelected % 4;
let divisionAllowance = numberSelected / 4;

// Create an array and random value for the password.
const createRandomIndex = (input) => {
  let randomIndex = Math.floor(Math.random() * input);
  return randomIndex;
}
let passWordString = [];

// Add criteria allowance to string
const addLowerCase = () => {
  let randomLowerCaseIndex = createRandomIndex(charactersArray.length);
  if (lowerCaseSelected) {
    for (let i = 0; i < divisionAllowance + remainder; i++) {
      passWordString.push(charactersArray[randomLowerCaseIndex]);
    }
  }
}
const addUpperCase = () => {
  let randomUpperCaseIndex = createRandomIndex(charactersArray.length);
  if (upperCaseSelected) {
    for (let i = 0; i < divisionAllowance; i++) {
      passWordString.push(charactersArray[randomUpperCaseIndex].toUpperCase);
    }
  }
}
const addSpecialCharacters = () => {
  let randomSpecialIndex = createRandomIndex(specialArry.length);
  if (specialSelected) {
    for (let i = 0; i < divisionAllowance; i++) {
      passWordString.push(specialArry[randomSpecialIndex]);
    }
  }
}
const addNumericValues = () => {
  let randomNumberIndex = createRandomIndex(availableNumbers.length);
  if (numericSelected) {
    for (let i = 0; i < divisionAllowance; i++) {
      passWordString.push(availableNumbers[randomNumberIndex]);
    }
  }
}


// Create functions for each criteria to add to password array
const generatePassword = () => {
  
  
}
generatePassword();


  // Code to print response generated from selection criteria.
// The generate button
const generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
}


// Awaiting generate button to be clicked to do something.
generateBtn.addEventListener("click", writePassword);
