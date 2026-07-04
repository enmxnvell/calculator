let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(op) {
    if (expression !== '' && !isOperator(expression.slice(-1))) {
        expression += op;
        updateDisplay();
    }
}

function appendDecimal() {
    const lastNumber = getLastNumber();
    if (!lastNumber.includes('.')) {
        if (expression === '' || isOperator(expression.slice(-1))) {
            expression += '0.';
        } else {
            expression += '.';
        }
        updateDisplay();
    }
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        if (expression === '') return;
        
        // Replace display operators with JavaScript operators
        let calculation = expression
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/−/g, '-');
        
        let result = eval(calculation);
        
        // Round to avoid floating point errors
        result = Math.round(result * 100000000) / 100000000;
        
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '×', '÷', '−'].includes(char);
}

function getLastNumber() {
    const operators = ['+', '-', '*', '/', '×', '÷', '−'];
    let lastIndex = -1;
    
    for (let op of operators) {
        let index = expression.lastIndexOf(op);
        if (index > lastIndex) {
            lastIndex = index;
        }
    }
    
    return lastIndex === -1 ? expression : expression.slice(lastIndex + 1);
}

function updateDisplay() {
    display.value = expression;
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/\d/.test(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key === '/' ? '÷' : key === '*' ? '×' : key === '-' ? '−' : key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});