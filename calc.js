const add = (a, b) => {
    return a + b;
}

const sub = (a, b) => {
    return b - a;
}

const mult = (a, b) => {
    return a * b;
}

const div = (a, b) => {
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

const container = document.querySelector('#container');
const ops = ['+', '-', '*', '/', '='];

for(let i=0; i<=9; i++) {
    let btn = document.createElement('button');
    btn.id = 'btn-' + i.toString();
    btn.textContent = i;
    container.appendChild(btn);
}

for(let i=0; i<ops.length; i++) {
    let btn = document.createElement('button');
    btn.className = 'btn-op';
    btn.textContent = ops[i];
    container.appendChild(btn);
}
