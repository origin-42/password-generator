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
        this.numberOfCharsGiven = prompt("Please enter a number ranging from 8 to 128");
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
// when called, prompts will be run.
// An array with the number of characters for the password, the criteria selected, and the number to be distributed amonst the criteria
const runPrompts = () => {
  let criteria = [];

  createPromts.requestNumOfChars();
  criteria.push(createPromts.numberOfCharsGiven);
  let numberSelected = createPromts.numberOfCharsGiven;

  createPromts.requestLowerCase();
  criteria.push(createPromts.confirmedLowerCase);

  createPromts.requestUpperCase();
  criteria.push(createPromts.confirmedUpperCase);

  createPromts.requestNumeric();
  criteria.push(createPromts.confirmedNumeric);

  createPromts.requestSpecial();
  criteria.push(createPromts.confirmedSpecial);

  // Math for allowance to add to array.
  let allowedCriteria = 0;
  criteria.forEach(item => {
    if (item === true) {
      allowedCriteria++
    }
  })
  criteria.push(numberSelected % allowedCriteria);
  let remainder = numberSelected % allowedCriteria;
  criteria.push((numberSelected - remainder) / allowedCriteria);

  // Save user input input, division allowance, and remainder to array
  return criteria;
}

// Create an array and random value for the password.
const createRandomIndex = (input) => {
  let randomIndex = Math.floor(Math.random() * input);
  return randomIndex;
}
let passWordString = [];

// Add criteria allowance to string
const addLowerCase = (boolean, remainder, divisionAllowance) => {
  if (boolean) {
    for (let i = 0; i < divisionAllowance + remainder; i++) {
      passWordString.push(charactersArray[createRandomIndex(charactersArray.length)]);
    }
  }
}
const addUpperCase = (boolean, divisionAllowance) => {
  if (boolean) {
    for (let i = 0; i < divisionAllowance; i++) {
      passWordString.push(charactersArray[createRandomIndex(charactersArray.length)].toUpperCase());
    }
  }
}
const addSpecialCharacters = (boolean, divisionAllowance) => {
  if (boolean) {
    for (let i = 0; i < divisionAllowance; i++) {
      passWordString.push(specialArry[createRandomIndex(specialArry.length)]);
    }
  }
}
const addNumericValues = (boolean, divisionAllowance) => {
  if (boolean) {
    for (let i = 0; i < divisionAllowance; i++) {
      passWordString.push(availableNumbers[createRandomIndex(availableNumbers.length)]);
    }
  }
}

let criteria = runPrompts();
  // Check criteria and add to array
  addLowerCase(criteria[1], criteria[5], criteria[6]);
  addUpperCase(criteria[2], criteria[6]);
  addSpecialCharacters(criteria[3], criteria[6]);
  addNumericValues(criteria[4], criteria[6]);

  console.log(passWordString);

// Shuffle and present password
const generatePassword = () => {

  runPrompts();
  // Check criteria and add to array
  addLowerCase();
  addUpperCase();
  addSpecialCharacters();
  addNumericValues();

  console.log(passWordString);

  let unshuffled = passWordString;
  let shuffled = unshuffled
  // map each element randomly and return a new array
  .map(value => ({ value, sort: Math.random() }))
  // relocate each element
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);
  
  return shuffled;
}


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

