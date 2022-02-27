// Function to copy text
const copyText = () => {

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(passwordField.value);
};

// Function to confirm copy
const changetext = () => {
  if (passwordField.value) {
    copy.innerHTML = "Copied!";
    setTimeout(() => {
      copy.innerHTML = "Copy";
    }, 1500);
  }
}

// Document selectors
const copy = document.getElementById('copy');
let passwordField = document.getElementById("password");
// Event listeners
copy.addEventListener("click", copyText);
copy.addEventListener("click", changetext);