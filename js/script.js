const container = document.querySelectorAll('.container div');
let screenMiddle = document.querySelector('.middle');
let screenTop = document.querySelector('.top');
let frame = document.querySelector('.calc-frame');

const setDate = () => {
  let currentYear = new Date().getFullYear();
  yearDisplay = document.querySelector('#date');
  yearDisplay.textContent = currentYear;
};

function addButtonStyle() {
  container.forEach((child) => child.classList.add('buttons'));
}

function addHoverEffect() {
  container.forEach((child) => {
    child.addEventListener('mouseover', () =>
      child.classList.toggle('button-changer')
    );

    child.addEventListener('mouseout', () =>
      child.classList.toggle('button-changer')
    );
  });
}

let num1 = '';
let num2 = '';
let temp = '';
let operator = '';
let opMem = '';
let resMem = '';
let array = [];

function getNumber() {
  for (const button of container) {
    button.addEventListener('click', () => {
      if (button.classList.contains('num')) {
        console.log('Type of num1: ', typeof button.innerHTML);
        screenMiddle.textContent = '';
        num1 += button.textContent;
        screenMiddle.textContent = num1;
        console.log('Num1: ', num1);
      }
    });
  }
}

function getOperation() {
  for (const button of container) {
    button.addEventListener('click', () => {
      if (
        button.classList.contains('operator') ||
        button.classList.contains('equal')
      ) {
        operator = button.textContent;
        if (num1 == '') {
          num1 = temp;
        }

        if (operator !== '=') {
          opMem = operator;
        }
        console.log('Operator: ', operator);
        console.log('Operator memory: ', opMem);
        num2 = num1;
        array.push(Number(num2));
        let res = operate(array, operator);
        let resFixed = Number(res);
        console.log('Num1: ', num1);
        if (operator !== '=') {
          screenTop.textContent = `${operator} | ${resFixed}`;
        } else if (operator == '=') {
          operator = opMem;

          let res = operate(array, operator);
          let resFixed = Number(res);
          screenMiddle.textContent = `Total: ${resFixed}`;

          screenTop.textContent = '';
          num1 = '';
          num2 = '';
          temp = '';
          operator = '';
          opMem = '';
          resMem = '';
          array = [];
        }

        temp = num1;
        num1 = '';
      }
    });
  }
}

function operate(array, operator) {
  switch (operator) {
    case '+':
      let add = array.reduce((total, current) => total + current);
      array.length = 0;
      array.push(add);
      console.log('New Array add:', array);
      return array;

    case '-':
      let sub = array.reduce((total, current) => total - current);
      array.length = 0;
      array.push(sub);
      console.log('New Array sub:', array);
      return array;

    case '×':
      let mul = array.reduce((total, current) => total * current);
      array.length = 0;
      array.push(mul);
      console.log('New Array sub:', array);
      return array;

    case '÷':
      let div = array.reduce((total, current) =>
        current != 0 ? total / current : 'error'
      );
      array.length = 0;
      if (Number(div)) {
        array.push(div);
      } else {
        frame.classList.toggle('error');
      }
      console.log('New Array sub:', array);
      return array;

    case '%':
      let per = array.reduce((total, current) => (current / total) * 100);
      array.length = 0;
      array.push(per);
      console.log('New Array sub:', array);
      return array;
  }
}

function clearAll() {
  screenTop.textContent = '';
  screenMiddle.textContent = '0';
  num1 = '';
  num2 = '';
  temp = '';
  operator = '';
  opMem = '';
  resMem = '';
  array = [];
}

function clearButtonPress() {
  for (const button of container) {
    button.addEventListener('click', () => {
      if (button.classList.contains('clear')) {
        clearAll();
      }
    });
  }
}

function backSpaceButtonPress() {
  for (const button of container) {
    button.addEventListener('click', () => {
      if (button.classList.contains('backspace')) {
        console.log('backspace: ', button.textContent);
        num1 = num1.substring(0, num1.length - 1);
        screenMiddle.textContent = num1;
        if (num1.length <= 0) {
          num1 = '0';
          screenMiddle.textContent = num1;
        }
      }
    });
  }
}

function addFloat() {
  for (const button of container) {
    button.addEventListener('click', () => {
      if (button.classList.contains('float')) {
        if (!num1.includes('.')) {
          num1 = num1 + '.';
          screenMiddle.textContent = num1;
        }
      }
    });
  }
}

//---------------------------------------------------------------------------------------------------------//
function main() {
  addButtonStyle();
  addHoverEffect();
  setDate();
  getNumber();
  getOperation();
  clearButtonPress();
  backSpaceButtonPress();
  addFloat();
}

main();
