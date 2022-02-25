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
    } else {
      this.confirmedLowerCase = false;
    }
  },
  // Changes confirmedUpperCase to true if user presses 'ok'.
  confirmedUpperCase: false,
  requestUpperCase: function() {
    let upperCase = confirm("Include uppercase letters?");
    if (upperCase) {
      this.confirmedUpperCase = true;
    } else {
      this.confirmedUpperCase = false;
    }
  },
  // Changes confirmedNumeric to true if user presses 'ok'.
  confirmedNumeric: false,
  requestNumeric: function () {
    let numeric = confirm("Include numeric characters?");
    if (numeric) {
      this.confirmedNumeric = true;
    } else {
      this.confirmedNumeric = false;
    }
  },
  // Changes confirmedSpecial to true if user presses 'ok'.
  confirmedSpecial: false,
  requestSpecial: function () {
    let special = confirm("Include special characters? (#, $, %, etc)");
    if (special) {
      this.confirmedSpecial = true;
    } else {
      this.confirmedSpecial = false;
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
const addLowerCase = (criteriaCheck, remainder, divisionAllowance) => {
  if (criteriaCheck === true) {
    for (let i = 0; i < divisionAllowance + remainder; i++) {
      passWordString.push(charactersArray[createRandomIndex(charactersArray.length)]);
    }
  }
}
const addUpperCase = (lowercaseSelected, criteriaCheck, remainder, divisionAllowance) => {
  if (lowercaseSelected === true) {
    remainder = 0;
  }
  if (criteriaCheck === true) {
    for (let i = 0; i < divisionAllowance + remainder; i++) {
      passWordString.push(charactersArray[createRandomIndex(charactersArray.length)].toUpperCase());
    }
  }
}
const addNumericValues = (lowercaseSelected, uppercaseSelected, criteriaCheck, remainder, divisionAllowance) => {
  if (lowercaseSelected === true && uppercaseSelected === true) {
    remainder = 0;
  }
  if (criteriaCheck === true) {
    for (let i = 0; i < divisionAllowance + remainder; i++) {
      passWordString.push(availableNumbers[createRandomIndex(availableNumbers.length)]);
    }
  }
}
const addSpecialCharacters = (lowercaseSelected, uppercaseSelected, numericSelected, criteriaCheck, remainder, divisionAllowance) => {
  if (lowercaseSelected === true && uppercaseSelected === true && numericSelected === true) {
    remainder = 0;
  }
  if (criteriaCheck === true) {
    for (let i = 0; i < divisionAllowance + remainder; i++) {
      passWordString.push(specialArry[createRandomIndex(specialArry.length)]);
    }
  }
}

// Shuffle and present password
const generatePassword = () => {
  
  let criteria = runPrompts();
  // Check criteria and add to array
  addLowerCase(criteria[1], criteria[5], criteria[6]);
  addUpperCase(criteria[1], criteria[2], criteria[5], criteria[6]);
  addNumericValues(criteria[1], criteria[2], criteria[3], criteria[5], criteria[6]);
  addSpecialCharacters(criteria[1], criteria[2], criteria[3], criteria[4], criteria[5], criteria[6]);
  console.log(criteria);

  let unshuffled = passWordString;
  passWordString = [];
  let shuffled = unshuffled
  // map each element randomly and return a new array
  .map(value => ({ value, sort: Math.random() }))
  // relocate each element within array
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);
  
  return shuffled.join("");
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

