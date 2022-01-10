let currentYear = new Date().getFullYear();
yearDisplay = document.querySelector('#date');
yearDisplay.textContent = currentYear;

const container = document.querySelectorAll('.container div');

container.forEach((child) => child.classList.add('buttons'));
