// Function to copy text
const copyText = () => {
    /* Get the text field */
    let copyText = document.getElementById("password");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  };
  // Copy password to clipboard
  generateBtn.addEventListener("click", copyText);