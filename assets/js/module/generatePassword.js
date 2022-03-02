// Create prompts to provide criteria for user to create a desired password.
const createPromts = {

  // Request number of characters to use for password and save response to variable.
  numberOfCharsGiven: 0,
  // Feedback for user selection
  numberConfirmation: `${this.numberOfCharsGiven} + "characters"`,
  numRange: /\b([8-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8])\b/g,
  requestNumOfChars: function() {
    let numOfChars = prompt("How many characters should there be? Between 8 and 128");
    this.numberOfCharsGiven = numOfChars;
    // Cancel condition
    if (this.numberOfCharsGiven === null) {
      return;
    } 
    // Incorrect value condition - Check number range and special characters
    if (!this.numberOfCharsGiven.match(this.numRange) || this.numberOfCharsGiven.split("").filter(element => this.specialRange.includes(element)).length > 0) {
      do {
        this.numberOfCharsGiven = prompt("Please enter a number ranging from 8 to 128");
        // Cancel condition
        if (this.numberOfCharsGiven === null) {
          return;
        }
      // Incorrect value condition - Check number range and special characters
      } while (!this.numberOfCharsGiven.match(this.numRange) || this.numberOfCharsGiven.split("").filter(element => this.specialRange.includes(element)).length > 0);
    }
  },

  // Check if user wishes to use lowercase characters and save response to variable.
  confirmedLowerCase: false,
  // Feedback for user selection
  lowercaseConfirmation: undefined,
  requestLowerCase: function() {
    let lowerCase = confirm("Include lowercase letters?");
    if (lowerCase) {
      this.confirmedLowerCase = true;
      this.lowercaseConfirmation = "Lowercase [\u2713]";
    } else {
      this.confirmedLowerCase = false;
      this.lowercaseConfirmation = "Lowercase: None";
    }
  },
  // Check if user wishes to use uppercase characters and save response to variable.
  confirmedUpperCase: false,
  // Feedback for user selection
  uppercaseConfirmation: undefined,
  requestUpperCase: function() {
    let upperCase = confirm("Include uppercase letters?");
    if (upperCase) {
      this.confirmedUpperCase = true;
      this.uppercaseConfirmation = "Uppercase [\u2713]";
    } else {
      this.confirmedUpperCase = false;
      this.uppercaseConfirmation = "Uppercase: None";
    }
  },
  // Check if user wishes to use numeric characters and save response to variable.
  confirmedNumeric: false,
  // Feedback for user selection
  numericConfirmation: undefined,
  requestNumeric: function () {
    let numeric = confirm("Include numeric characters?");
    if (numeric) {
      this.confirmedNumeric = true;
      this.numericConfirmation = "Numeric [\u2713]";
    } else {
      this.confirmedNumeric = false;
      this.numericConfirmation = "Numeric: None";
    }
  },
  // Check if user wishes to use special characters and save response to variable.
  confirmedSpecial: false,
  // Feedback for user selection
  specialConfirmation: undefined,
  specialRange: " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~".split(""),
  requestSpecial: function () {
    let special = confirm("Include special characters? (#, $, %, etc)");
    if (special) {
      this.confirmedSpecial = true;
      this.specialConfirmation = "Special [\u2713]";
    } else {
      this.confirmedSpecial = false;
      this.specialConfirmation = "Special: None";
    }
  }
}

// Collect user responses as an array.
const runPrompts = () => {
  let returnedCriteria = [];

  // Run each criteria prompt and save new variables in array.
  createPromts.requestNumOfChars();
  returnedCriteria.push(createPromts.numberOfCharsGiven);
  let numberSelected = createPromts.numberOfCharsGiven;
  // Cancel condition - Cancel value return.
  if (numberSelected === null) {
    return;
  }
  createPromts.requestLowerCase();
  returnedCriteria.push(createPromts.confirmedLowerCase);
  createPromts.requestUpperCase();
  returnedCriteria.push(createPromts.confirmedUpperCase);
  createPromts.requestNumeric();
  returnedCriteria.push(createPromts.confirmedNumeric);
  createPromts.requestSpecial();
  returnedCriteria.push(createPromts.confirmedSpecial);

  // Save number of criteria user requested plus remainder of number of characters user selected.
  let allowedCriteria = 0;
  returnedCriteria.forEach(item => {
    if (item === true) {
      allowedCriteria++;
    }
  })
  let remainder = numberSelected % allowedCriteria;
  // Save conditions to array.
  returnedCriteria.push(numberSelected % allowedCriteria);
  returnedCriteria.push((numberSelected - remainder) / allowedCriteria);
  return returnedCriteria;
}

// Create an unformatted password as an array based on selection criteria.
const generatePassword = () => {

  // Get selection information from user.
  let criteria = runPrompts();
  let noCriteriaSelected = [];

  // Notify visitor if no criteria is selected.
  if (criteria != undefined) {
    noCriteriaSelected = criteria.filter(function (val) {
      return val === false;
    })
  };
  if (noCriteriaSelected.length === 4 || criteria == undefined) {
    document.querySelector("#password").setAttribute("placeholder", "You have selected no characters. Please select at least one character type for your password to be generated here."  );
  };

  // Reset or create a password array to save selected character criteria as a password.
  let passWordArray = [];

  // Create variables to add to password.
  const availableNumbers = [];
  for (let i = 0; i <= 9; i++) {
    availableNumbers.push(i);
  }
  const charactersArray = "abcdefghijklmnopqrstuvwxyz".split("");

  // Randomise an input value
  const createRandomIndex = (input) => {
    let randomIndex = Math.floor(Math.random() * input);
    return randomIndex;
  }

  if (criteria != undefined) {
    // Add lowercase letters to string if permitted. 
    const addLowerCase = (criteriaCheck, remainder, divisionAllowance) => {
      if (criteriaCheck === true) {
        for (let i = 0; i < divisionAllowance + remainder; i++) {
          passWordArray.push(charactersArray[createRandomIndex(charactersArray.length)]);
        }
      }
    }
    addLowerCase(criteria[1], criteria[5], criteria[6]);

    // Add uppercase letters to string if permitted. 
    const addUpperCase = (lowercaseSelected, criteriaCheck, remainder, divisionAllowance) => {
      if (lowercaseSelected === true) {
        remainder = 0;
      }
      if (criteriaCheck === true) {
        for (let i = 0; i < divisionAllowance + remainder; i++) {
          passWordArray.push(charactersArray[createRandomIndex(charactersArray.length)].toUpperCase());
        }
      }
    }
    addUpperCase(criteria[1], criteria[2], criteria[5], criteria[6]);

    // Add numbers to string if permitted. 
    const addNumericValues = (lowercaseSelected, uppercaseSelected, criteriaCheck, remainder, divisionAllowance) => {
      if (lowercaseSelected === true || uppercaseSelected === true) {
        remainder = 0;
      }
      if (criteriaCheck === true) {
        for (let i = 0; i < divisionAllowance + remainder; i++) {
          passWordArray.push(availableNumbers[createRandomIndex(availableNumbers.length)]);
        }
      }
    }
    addNumericValues(criteria[1], criteria[2], criteria[3], criteria[5], criteria[6]);

    // Add special characters to string if permitted.
    const addSpecialCharacters = (lowercaseSelected, uppercaseSelected, numericSelected, criteriaCheck, remainder, divisionAllowance) => {
      if (lowercaseSelected === true || uppercaseSelected === true || numericSelected === true) {
        remainder = 0;
      }
      if (criteriaCheck === true) {
        for (let i = 0; i < divisionAllowance + remainder; i++) {
          passWordArray.push(createPromts.specialRange[createRandomIndex(createPromts.specialRange.length)]);
        }
      }
    }
    addSpecialCharacters(criteria[1], criteria[2], criteria[3], criteria[4], criteria[5], criteria[6]);

    // Alert user to options selected.
    alert(`Characters selected: ${createPromts.numberOfCharsGiven}\n ${createPromts.lowercaseConfirmation}\n ${createPromts.uppercaseConfirmation}\n ${createPromts.numericConfirmation}\n ${createPromts.specialConfirmation}`);
  }
  return passWordArray;
}

// Add randomised password string to html document for user.
function writePassword() {

  // Generate unshuffled password
  let unShuffledPassword = generatePassword();
  // Shuffle the password.
  let shuffledPassword = unShuffledPassword
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value).join("");

  const passwordText = document.querySelector("#password");
  // Change innerHTML of #password to the provided password.
  passwordText.value = shuffledPassword;
}

// HTML SELECTORS
// Grab 'generate password' button variable.
const generateBtn = document.querySelector("#generate");

// EVENT LISTENERS
// Response for generate id on the textarea when clicked.
generateBtn.addEventListener("click", writePassword);
