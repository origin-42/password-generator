# password-generator
# Generate a random password for use anywhere.

Here you can generate a password from 8 to 128 characters in length and check criteria to allow for a more customiseable and secure password for use in applications. The password can be generated based off 5 criteria; number of characters and four character types (alphabetic (uppercase and lowercase), numbers, and special keyboard characters). The password is then randomised via the [Schwartzian transform](https://en.wikipedia.org/wiki/Schwartzian_transform) methodology. 

Further implementation
User input is customised for the user experience only limited by the basic access of prompts and alerts API until further customized, meaning a user can cancel prior to beginning to close the alert boxes but must provide valid input until the program has terminated thereafter, even when reloading the page. However, a user will be given valid feedback based off the response and also clip the password afterwards directly to the keyboard with the click of the mouse.
Keyboard accessibility is limited in this sense. Accessibility features have been added for keyboard only users for supplementation. 

## Installation
Simply initialize a directory and pull from github. 
```
git init
git remote add origin main
git branch -M main
git pull
```

## Credits
[Password Generator](https://origin-42.github.io/password-generator/)

[Origin 42](https://github.com/origin-42)

Dave Plummer

[Stack Overflow: The Schwartzian transform](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)

## Extras

[Password Generator](https://origin-42.github.io/password-generator/)

![snippet](./assets/images/Password%20generator.png)

Updated as of 27/02/2022.
