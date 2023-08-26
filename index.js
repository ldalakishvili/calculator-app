const screen = document.querySelector(`.screen`);
const button = document.querySelectorAll(`.button`);
const del = document.querySelector(`.del`);
const reset = document.querySelector(`.reset`);
const equal = document.querySelector(`.equal`);
let currentInput = ``;
let previousInput = ``;
let currentOperator = ``;
let numArr = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `0`, `.`];
let operatorArr = [`+`, `-`, `x`, `/`];

button.forEach((btn) => {
	btn.addEventListener(`click`, (e) => {
		let key = e.currentTarget.textContent;
		if (currentInput === `` && key === `.`) {
			currentInput = `0${key}`;
			update();
		} else if (currentInput === `0` && numArr.includes(key)) {
			if (key === `.`) {
				currentInput += `${key}`;
				update();
			} else {
				currentInput = `${key}`;
				update();
			}
		} else if (numArr.includes(key)) {
			currentInput += `${e.currentTarget.textContent}`;
			update();
		} else if (key === reset.textContent) {
			currentInput = ``;
			previousInput = ``;
			currentOperator = ``;
			update();
		} else if (key === del.textContent) {
			currentInput = screen.textContent.slice(0, -1);
			update();
		} else if (operatorArr.includes(key)) {
			if (currentInput !== ``) {
				currentOperator = key;
				previousInput = currentInput;
				currentInput = ``;
				update();
			}
		} else if (key === `=`) {
			if (currentInput !== "" && previousInput !== "") {
				const num1 = parseFloat(previousInput);
				const num2 = parseFloat(currentInput);
				let result = 0;

				switch (currentOperator) {
					case "+":
						result = num1 + num2;
						break;
					case "-":
						result = num1 - num2;
						break;
					case "x":
						result = num1 * num2;
						break;
					case "/":
						result = num1 / num2;
						break;
				}
				currentInput = result.toString();
				currentOperator = ``;
				previousInput = ``;
				update();
			}
		}
	});
});

function update() {
	screen.textContent = currentInput;
}
// themecolor change////
const list = document.querySelectorAll(`li`);
const theme = document.querySelector(`#range`);
const buttons = document.querySelector(`.buttons`);
const body = document.querySelector(`body`);
let themeValue;
list.forEach((btn) =>
	btn.addEventListener(`click`, (e) => {
		themeValue = e.currentTarget.textContent;
		theme.value = themeValue;

		steps();
	})
);
theme.addEventListener(`click`, () => {
	themeValue = theme.value;
	steps();
});
function steps(e) {
	let elementArr = [screen, theme, buttons, reset, equal, del];
	let classArr = [
		`screencolor`,
		`range-line`,
		`buttons`,
		`reset`,
		`equal`,
		`del`,
	];
	elementArr.forEach((e, i) => {
		changeThemeColor(e, classArr[i]);
	});
	button.forEach((e) => changeThemeColor(e, `page`));
	if (themeValue == 1) {
		body.style.backgroundColor = `#3a4663`;
		body.style.color = `white`;
	} else if (themeValue == 2) {
		body.style.backgroundColor = `#E6E6E6`;
		body.style.color = `#36362C`;
	} else if (themeValue == 3) {
		body.style.backgroundColor = `#17062A`;
		body.style.color = `#FFE53D`;
	}
}

function changeThemeColor(element, className) {
	const classNamePattern = new RegExp(`${className}\\d+`);
	console.log(classNamePattern);
	element.className = element.className.replace(
		classNamePattern,
		`${className}${themeValue}`
	);
}
