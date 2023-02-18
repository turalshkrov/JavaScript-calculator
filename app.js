const calculatorDiv = document.getElementById('calculator');
const themeToggle = document.getElementById('theme-checkbox');
const themeSwitcher = document.getElementById('theme-switcher');
const buttonsDiv = document.getElementById('buttons')


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

themeToggle.addEventListener('click', () => switchTheme());