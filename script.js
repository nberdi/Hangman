"use strict";

import {popularCountries, flags} from './countries.js'          // IMPORT COUNTRIES AND FLAGS

const newGame = document.getElementById('newGame')              // FOR NEW GAME BUTTON
const test = document.getElementById('test');                   // FOR A RANDOM COUNTRY
const flag = document.getElementById('flag');                   // FOR OF A RANDOM COUNTRY

const stickAppear = document.getElementById('stickAppear')      // FOR THE FIRST HIDDEN STICK
stickAppear.style.visibility = 'hidden'

const person = document.getElementById('person')                // FOR THE VICTIM 

let deathStep = [                                               // IMGS THAT WILL BE DISPLAYED WHEN YOU HAVE 2 AND 1 LIFE
    './IMG_actions/lastPerson.png',
    './IMG_actions/stickAnd.png'
] 

// winner
const result = document.getElementById('result')                // FOR THE PHRASE IF YOU DIE OR WIN
const jsConfetti = new JSConfetti();                            // FIREWORKS

let count = 3                                                   // FOUR LIVES THAT YOU HAVE IN THE BEGINNING
let dead = 0

let randomIndex = Math.floor(Math.random() * popularCountries.length);
let randomChoice = popularCountries[randomIndex]
let lengthWord = randomChoice.length;
let newArray = Array(lengthWord).fill('_ ');
flag.src = flags[randomIndex]                                   // FLAG OF A RANDOM COUNTRY 

test.innerHTML = newArray.join('')                              // A RANDOM COUNTRY IS DISPLAYED

const buttons = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'TAB'];
    buttons.forEach(buttonId => {
    const button = document.getElementById('button' + buttonId);
    const image = document.getElementById('image' + buttonId);
    image.style.display = 'none';                               // BAN IMAGES HIDDEN

    image.style.width = button.offsetWidth + 'px';              // SIZE OF BAN IMGS IS EQUAL TO SIZE OF BUTTON
    image.style.height = button.offsetHeight + 'px';

    button.addEventListener('click', ()=> {
        const letter = button.value;
        let letterFound = false;
        for (let i = 0; i < lengthWord; i++) {                  // CHECKS THE CLICKED LETTER 
            if (randomChoice[i] === letter) {
                newArray[i] = letter;                           // CHANGES THE UNDERLINE WITH THE FOUND LETTER
                letterFound = true;
            } 
        }
        if (!letterFound) {
            count--;
            image.style.display = "";                           // Show the image if the letter is not found
            button.disabled = true;                             // Disable the button to prevent further clicks
        }
        test.innerHTML = newArray.join('');
    
        checkCount()
    
        if (checkUnderLine()) {
            win()
        }
    })
}); 

newGame.addEventListener('click', ()=> {                         // RELOAD THE WEBPAGE
    location.reload()
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// If you run out of lives, this function will display the dead victim and the second will stop
function death() {
    stickAppear.style.display = 'none'
    person.style.cssText += `width: 40vh; height: 30vh; margin-left: -10vh; transition: transform 5s ease; transform: translateY(-5vh); margin-top: 0vh;`;
    person.src = './IMG_actions/dead.png'
    result.style.cssText += "text-align: center; margin-top: 30vh; font-family: 'Pacifico', cursive;";  
    result.innerHTML = 'You are dead!'
    test.innerHTML = randomChoice
    jsConfetti.addConfetti({
        emojis: ['💀'],
    })
    clearInterval(intervalId);
    timer.innerHTML = "The Game Is Over";
}
// 

// If you find all letters in the word, this function will display the winner with fireworks
function win() {
    stickAppear.style.display = 'none'
    person.style.cssText = "width: 40vh; min-height: 30vh; margin-left: -10vh; margin-top: 0vh;`";
    person.src = './IMG_actions/winner.png'
    result.style.cssText = "text-align: center; margin-top: 30vh; font-family: 'Pacifico', cursive;";
    result.innerHTML = 'The victim is saved!'
    jsConfetti.addConfetti()
    jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸', '🦄'],
    })
    clearInterval(intervalId);
    timer.innerHTML = "Good Job!";
}
// 

// This function checks if there is still an underline in the displayed word
function checkUnderLine() {
    let noUnderscoresRemaining = true;
    for (let i = 0; i < newArray.length; i++) {
    if (newArray[i] === '_ ') {
        noUnderscoresRemaining = false;
        break;
        } 
    }
    return noUnderscoresRemaining;
}
// 

// When buttons are clicked, this function will check how many lives you have left
function checkCount() {
    if (count < dead) {
        death()
    } else if (count == 2) {
        stickAppear.style.visibility = "visible"
    } else if (count == 1) {
        stickAppear.src = deathStep[count]              //  if you have two life left, this function will display full tree and scare the victim
        person.src = './IMG_actions/scaredMan.png'
    } else if (count == 0){
        person.style.cssText = 'transition: transform 5s ease; transform: translateY(-2vh);'    // if you have one life left, this function will hang the victim
        person.src = deathStep[count]
    }
}
// 

// 15 seconds displayed
const timer = document.getElementById('countDown')
let seconds = 20;
const intervalId = setInterval(updateSec, 1000)         // calls updateSec() every second
function updateSec() {
    timer.innerHTML = seconds
    seconds--;

    if (seconds < 0) {                                  // if the second is less than 0, you lose
        clearInterval(intervalId)                       // it will stop the interval
        timer.innerHTML = "The Game Is Over";
        death()
    }
}
// 
