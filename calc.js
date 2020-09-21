const add = (a, b) => {
    return a + b;
}

const sub = (a, b) => {
    return a - b;
}

const mult = (a, b) => {
    return a * b;
}

const div = (a, b) => {
    if(b === 0){
        alert("Cannot divide by Zero...");
        return;
    }
    return a / b;
}

const operate = (operator, num1, num2) => {
    let result = null;

    switch (operator){
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = sub(num1, num2);
            break;
        case "*":
            result = mult(num1, num2);
            break;
        case "/":
            result = div(num1, num2);
            break;
        default:
            alert("Enter a valid number and/or operation.");
            break;
    }
    return result;
}

const updateDisplay = (input) => {
    let display = document.querySelector('#display');

    if (!isComputing) clearDisplay();

    if (input === '.') {
        if(decimalBtn.disabled === false){
            decimalBtn.disabled = true;
            display.textContent += input;
        }
        return;
    }

    if (input === '<--') {
        let backup = display.textContent.slice(0, -1);
        let dec = document.querySelector('#btn-dec');
        display.textContent = backup;

        if (!display.textContent.includes('.')){
            dec.disabled = false;
        }
        return;
    }
    
    if (display.textContent === 0) {
        display.textContent = input;
    } else {
        display.textContent += input;
        isComputing = true;
    }
    displayValue = display.textContent;
}

const clearDisplay = () => {
    let display = document.querySelector('#display');
    let decBtn = document.querySelector('#btn-dec');
    
    display.textContent = '';
    decBtn.disabled = false;
}

const reset = (clear=true) => {
    let decBtn = document.querySelector('#btn-dec');
    decBtn.disabled = false;
    num1 = null;
    num2 = null;
    currentOperation = null;
    if (clear) clearDisplay();
}

const grabNum = (operator) => {
    let display = document.querySelector('#display');
    let res;

    isComputing = false;

    if(!num1) {
        num1 = parseFloat(display.textContent);
    } else {
        num2 = parseFloat(display.textContent);
    }

    if (operator === '=') {
        res = operate(currentOperation, num1, num2);
        reset(clear=false);
    } else {
        if(!currentOperation)currentOperation = operator;
        
        if (num1 && num2) {
            res = operate(currentOperation, num1 ,num2);
            currentOperation = operator;
            num1 = res;
            num2 = null;
        } else {
            res = num1;
        }
    }

    clearDisplay();
    display.textContent = res;
}

var num1 = null;
var num2 = null;
var currentOperation = null;
var isComputing = true;

let displayValue = '';
const container = document.querySelector('#btns-container');
const opsContainer = document.querySelector('#ops-container');
const ops = ['+', '-', '*', '/', '='];
const clearBtn = document.createElement('button');
const decimalBtn = document.createElement('button');
const backBtn = document.createElement('button');

for(let i=0; i<=9; i++) {
    let btn = document.createElement('button');
    btn.className = "btn";
    btn.id = 'btn-' + i.toString();
    btn.textContent = i;
    btn.addEventListener('click', function() {updateDisplay(btn.textContent)});
    container.appendChild(btn);
}

decimalBtn.className = 'btn';
decimalBtn.id = 'btn-dec';
decimalBtn.textContent = '.'
decimalBtn.addEventListener('click', function(){
    updateDisplay(decimalBtn.textContent);
    
});
container.appendChild(decimalBtn);

for(let i=0; i<ops.length; i++) {
    let btn = document.createElement('button');
    btn.className = 'btn-op';
    btn.classList.add('btn');
    btn.textContent = ops[i];
    btn.addEventListener('click',function(){
        grabNum(btn.textContent);
    });
    opsContainer.appendChild(btn);
}


clearBtn.textContent = 'C';
clearBtn.className = 'btn';
clearBtn.addEventListener('click', reset);
opsContainer.appendChild(clearBtn);

backBtn.className = 'btn';
backBtn.id = 'btn-undo';
backBtn.textContent = '<--'
backBtn.addEventListener('click', function(){updateDisplay(backBtn.textContent) });
opsContainer.appendChild(backBtn);

document.addEventListener('keydown', function(e){
    var numReg = /[0-9.]/;
    var opReg = /[//]|[*=+-]/;
    var editReg = /[cC]/;
    let enterKey = 'Enter';
    let backKey = 'ArrowLeft';
    if (e.key.match(numReg)){
        updateDisplay(e.key);
    } else if (e.key.match(opReg) || e.key === enterKey){
        if(e.key === enterKey) {
            grabNum('=');
        } else {
            grabNum(e.key);
        }
    } else if (e.key.match(editReg)) {
        reset();
    } else {
        if (e.key === backKey) {
            updateDisplay('<--');
        }
    }
    
    
});