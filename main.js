// DOM elements
const upperCaseEl = document.getElementById('uppercase');
const lowerCaseEl = document.getElementById('lowercase');
const numberCaseEl = document.getElementById('numbers');
const symbolCaseEl = document.getElementById('symbols');
const lengthEl = document.getElementById('length');
const clipboardEl = document.getElementById('clipboard');
const generateEl = document.getElementById('generate');
const resultEl = document.getElementById('result');


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// generate event listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = upperCaseEl.checked;
    const hasLower = lowerCaseEl.checked;
    const hasNumber = numberCaseEl.checked;
    const hasSymbol = symbolCaseEl.checked;

    resultEl.innerText = generatePassword(
        hasUpper, 
        hasLower, 
        hasNumber, 
        hasSymbol, 
        length 
    );
})

//Generate Password
function generatePassword(upper, lower, number, symbol, length) {
    // 1. Init pw var
    // 2. Filter out checked types
    // 3. Loop over the length, call generator functions for each type
    // 4. Add final pw to the pw var and return

    let generatedPw = '';

    const typesCount = lower + upper + number + symbol;
    
    //console.log('typesCount', typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    //console.log('typesArr: ', typesArr);

    if (typesCount === 0 ) {
        return '';
    }

    for (let i = 0; i < length; i+= typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            //console.log('funcName: ', funcName);
            generatedPw += randomFunc[funcName]();
            
        })
    }
    
    //Shuffle the password
    let arrPw = generatedPw.split("");
    let finalPw = [];
    while(arrPw.length > 0) {
        let index = Math.floor(Math.random() * arrPw.length);
        finalPw.push(arrPw.splice(index,1));
    }
    
    return finalPw.join("");
}


//Clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');


})

// Generator functions 
//Upper Case
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 25) + 65);
}
//Lower Case
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 25) + 97);
}
//Number
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'

    return symbols[Math.floor(Math.random() * symbols.length)];
}
