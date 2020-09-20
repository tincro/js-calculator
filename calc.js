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

const updateDisplay = (num) => {

    let display = document.querySelector('#display');
    if(num1 && !num2 && currentOperation) clearDisplay();

    if (display.textContent === 0) {
        display.textContent = num;
    } else {
        display.textContent += num;
    }
    displayValue = display.textContent;
    console.log(num1, num2, currentOperation);
}

const clearDisplay = () => {
    let display = document.querySelector('#display');
    display.textContent = '';
}

const grabNum = (operator) => {
    let display = document.querySelector('#display');

    if(operator === '=') {
        num2 = parseInt(display.textContent)
        res = operate(currentOperation, num1, num2);
        updateDisplay(res);
        reset(clear=false);
        num1 = res;
    } else {
        
        if (num1 && currentOperation) {
            num2 = parseInt(display.textContent);
            res = operate(currentOperation, num1, num2);
            reset();
            updateDisplay(res);
            num1 = res;
            currentOperation = operator;
            
        } else{
            currentOperation = operator;

            num1 = parseInt(display.textContent);
        }
    }
    console.log(num1, num2, currentOperation);
}

const reset = (clear=true) => {
    num1 = null;
    num2 = null;
    currentOperation = '';
    if (clear) clearDisplay();
    console.log(num1, num2, currentOperation);
}

var num1 = null;
var num2 = null;
var currentOperation = '';

let displayValue = '';
const container = document.querySelector('#btns-container');
const opsContainer = document.querySelector('#ops-container');
const ops = ['+', '-', '*', '/', '='];
const clearBtn = document.createElement('button');

for(let i=0; i<=9; i++) {
    let btn = document.createElement('button');
    btn.className = "btn";
    btn.id = 'btn-' + i.toString();
    btn.textContent = i;
    btn.addEventListener('click', function() {updateDisplay(btn.textContent)});
    container.appendChild(btn);
}

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




