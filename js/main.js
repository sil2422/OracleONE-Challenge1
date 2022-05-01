// Seleccionar Elementos:
const userInput = document.querySelector("#userInput");
const encriptBtn = document.querySelector("#btnEncriptado");
const decriptBtn = document.querySelector("#btnDesencriptado");
const imgContainer = document.querySelectorAll(".img-container");
const validationContainer = document.querySelector(".validation-container");
const resultDisplay = document.querySelectorAll(".result-display");
const resultDisplayP = document.querySelectorAll(".result-display > p");
const resultDisplayBtn = document.querySelectorAll(".result-display > button");
const copyBtn = document.querySelectorAll(".copyBtn");
const restartBtn = document.querySelectorAll(".restartBtn");

// Reemplazos:
const encripter = {
	a: "ai",
	e: "enter",
	i: "imes",
	o: "ober",
	u: "ufat",
};
const remaker = {
	ai: "a",
	enter: "e",
	imes: "i",
	ober: "o",
	ufat: "u",
};

// Utils:
const replaceVowels = (myString) => {
	myString = myString.replace(/a|e|i|o|u/gi, function (matched) {
		return encripter[matched];
	});
	return myString;
};

const remakeVowels = (myString) => {
	myString = myString.replace(/ai|enter|imes|ober|ufat/gi, function (matched) {
		return remaker[matched];
	});
	return myString;
};

const validar = (myString) => {
	const noPermitido = /[^a-z ]/;
	return !noPermitido.test(myString);
};

// === Main Functions ===

const encriptado = (e) => {
	e.preventDefault();
	var myInput = userInput.value;

	// Validations:
	if (myInput.length <= 0) {
		alert("Debes ingresar al menos una palabra");
		return;
	}
	if (!validar(myInput)) {
		validationContainer.lastElementChild.style.color = "crimson";
		setTimeout(() => {
			validationContainer.lastElementChild.style.color = "#AAB2D5";
		}, 2500);
		return;
	}

	// Encript:
	let response = replaceVowels(myInput);

	// Display Handle:
	imgContainer.forEach((i) => {
		i.style.display = "none";
	});
	resultDisplay.forEach((i) => {
		i.style.display = "block";
		i.firstElementChild.value = response;
	});
};

const desencriptado = (e) => {
	e.preventDefault();
	let myInput = userInput.value;

	// Validations:
	if (myInput.length <= 0) {
		alert("Debes ingresar al menos una palabra");
		return;
	}
	if (!validar(myInput)) {
		validationContainer.lastElementChild.style.color = "crimson";
		setTimeout(() => {
			validationContainer.lastElementChild.style.color = "#AAB2D5";
		}, 2500);
		return;
	}

	// Decript:
	let response = remakeVowels(myInput);

	// Display Handle:
	imgContainer.forEach((i) => {
		i.style.display = "none";
	});
	resultDisplay.forEach((i) => {
		i.style.display = "block";
		i.firstElementChild.value = response;
	});
};

const clearBoard = () => {
	window.location.reload();
};

const copyResult = (e) => {
	e.preventDefault();
	let resultCopy;
	resultDisplay.forEach((i) => {
		resultCopy = i.firstElementChild;
	});
	resultCopy.select();
	resultCopy.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(resultCopy.value).then(() => {
		alert("'" + resultCopy.value + "' copiado con éxito.");
	});
};

// Events:
encriptBtn.addEventListener("click", encriptado);
decriptBtn.addEventListener("click", desencriptado);
restartBtn.forEach((i) => {
	i.addEventListener("click", clearBoard);
});
copyBtn.forEach((i) => {
	i.addEventListener("click", copyResult);
});
