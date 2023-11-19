const calculatorDiv = document.getElementById('calculator');
const themeSwitcher = document.getElementById('theme-switcher');

// Buttons
const themeToggle = document.getElementById('theme-checkbox');
const buttonsDiv = document.getElementById('buttons');
const clrearAllBtn = document.getElementById('clear-all');
const clearBtn = document.getElementById('clear');
const decimalBtn = document.getElementById('decimal');
const squareBtn = document.getElementById('square-btn');
const squareRootBtn = document.getElementById('square-root-btn');
const equalsBtn = document.getElementById('equals');


// Display
const resultDiv = document.getElementById('result');
const formulaDiv = document.getElementById('formula');

let lastOperator = false;
let formula = [];

// Theme Switcher
const switchTheme = () => {
    if (themeToggle.checked) {
        calculatorDiv.className = 'calc-light';
        themeSwitcher.className = 'theme-switcher-light';
        buttonsDiv.className = 'buttons-light';
    } else {
        calculatorDiv.className = 'calc-dark';
        themeSwitcher.className = 'theme-switcher-dark';
        buttonsDiv.className = 'buttons-dark';
    }
}

const numberClick = (text) => {
    if (resultDiv.innerText.length < 10) {
        resultDiv.innerText === '0'
            ? resultDiv.innerText = text
            : resultDiv.innerText += text
        lastOperator = false;
    }
}
const operatorClick = (operator) => {
    if (!lastOperator) {
        formula.push(
            resultDiv.innerText[resultDiv.innerText.length - 1] === '.' 
            ? Number(resultDiv.innerText.slice(0, -1))
            : Number(resultDiv.innerText))
        formulaDiv.innerHTML += 
            resultDiv.innerText[resultDiv.innerText.length - 1] === '.' 
            ? resultDiv.innerText.slice(0, -1)
            : resultDiv.innerText
        resultDiv.innerText = 0;
    } else {
        formula.pop();
        formulaDiv.lastElementChild.remove();
    }
    formula.push(operator);
    formulaDiv.innerHTML += 
        operator === 'add'  ? '<i class="fa-solid fa-plus"></i>'
        : operator === 'subtract'  ? '<i class="fa-solid fa-minus"></i>'
        : operator === 'multiply'  ? '<i class="fa-solid fa-xmark"></i>'
        : operator === 'divide'  ? '<i class="fa-solid fa-divide"></i>'
        : null
    lastOperator = true;
}

const clearAll = () => {
    formulaDiv.innerHTML = '';
    resultDiv.innerText = 0;
    lastOperator = false;
    formula = [];
}

const clear = () => {
    if (resultDiv.innerText.length === 1) {
        resultDiv.innerText = 0;
        lastOperator = true;
    }
    resultDiv.innerText.length === 1 
        ? resultDiv.innerText = 0
        : resultDiv.innerText = resultDiv.innerText.slice(0, -1);
}

const decimal = () => {
    if (resultDiv.innerText.length < 10) {
        if (resultDiv.innerText.indexOf('.') < 0) {
            resultDiv.innerText += '.';
        }
    }
}

const square = () => {
    String(Math.pow(resultDiv.innerText, 2)).length > 10 
    ? resultDiv.innerText = Math.pow(resultDiv.innerText, 2).toExponential(4)
    : resultDiv.innerText = Math.pow(resultDiv.innerText, 2)
}

const squareRoot = () => {
    resultDiv.innerText = Math.pow(resultDiv.innerText, 0.5).toFixed(6);
}

const calculate = () => {
    let newFormula = [];
    if (!lastOperator) {
        formulaDiv.innerHTML = '';
        formula.push(Number(resultDiv.innerText));
        formula.forEach((elm,i) => {
            if (typeof elm === 'number') {
                newFormula.push(elm);
                if (formula[i-1] === 'multiply' || formula[i-1] === 'divide') {
                    newFormula.pop();
                }
            } else {
                if (elm === 'multiply' || elm === 'divide') {
                    if (elm === 'multiply') newFormula[newFormula.length-1] = (newFormula[newFormula.length-1] * formula[i + 1])
                    if (elm === 'divide') newFormula[newFormula.length-1] = (newFormula[newFormula.length-1] / formula[i + 1])

                } else newFormula.push(elm);
            }
        })
        let result = newFormula[0];
        newFormula.forEach((elm, i) => {
            if(elm === 'add') result += newFormula[i+1]
            if(elm === 'subtract') result -= newFormula[i+1]
        })
        resultDiv.innerText = String(result - Math.floor(result)).length > 8
        ? result.toFixed(8)
        : result;
        resultDiv.innerText = String(result).length > 9 
        ? resultDiv.innerText = result.toExponential(4) 
        :  result;
        formula = [];
    }
}

const addEventListeners = () => {
    themeToggle.addEventListener('click', () => switchTheme());
    buttonsDiv.addEventListener('click', (e) => {
        if (e.target.className === 'number-btn') {
            numberClick(e.target.innerText);
        } else if(e.target.className === 'math-operator') {
            operatorClick(e.target.id);
        } else if(e.target.parentElement.className === 'math-operator') {
            operatorClick(e.target.parentElement.id);
        }
    });
    clrearAllBtn.addEventListener('click', () => clearAll());
    clearBtn.addEventListener('click', () => clear());
    decimalBtn.addEventListener('click', () => decimal());
    squareBtn.addEventListener('click', () => square());
    squareRootBtn.addEventListener('click', () => squareRoot());
    equalsBtn.addEventListener('click', () => calculate());

    document.addEventListener('keydown', (e) => {
        if (/^\d+$/.test(e.key)) {
            numberClick(e.key);
        }
        switch (e.key) {
            case '.':
                decimal();
                break;
            case 'Backspace':
                clear();
                break;
            case '+':
                operatorClick('add');
                break;
            case '-':
                operatorClick('subtract');
                break;
            case '*':
                operatorClick('multiply');
                break;
            case '/':
                operatorClick('divide');
                break;
            case '=':
                calculate();
                break;
            case 'Enter':
                calculate();
                break;
            default:
                break;
        }
    });
}

addEventListeners();