const input = document.querySelector(".text-input");
const output = document.querySelector(".text-output");

const buttonEncode = document.getElementById("button-encode");
const buttonDecode = document.getElementById("button-decode");
const buttonCopy = document.getElementById("button-copy");
const buttonClose = document.getElementById("button-close");
const buttonClean = document.getElementById("button-clean-all");

const buttonAboutMe = document.getElementById("button-about-me");
const buttonCloseAboutMe = document.getElementById("button-close-about-me");

const alertContainer = document.querySelector(".custom-alert-container");
const alertBubble = document.querySelector(".custom-alert-bubble");
const alertText = document.querySelector(".custom-alert-text");

const aboutMeContainer = document.querySelector(".about-me-container");
const aboutMeBubble = document.querySelector(".about-me-bubble");


const cryptoKeys = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o","ober"],
    ["u","ufat"]
];


// *** WINDOW EVENTS HANDLE ***
window.onload = () => {
    input.focus();
}

window.ontransitionend = () => {
    input.focus();
}

allowedInput();


// *** ENCODE CTA ***
buttonEncode.onclick = (event) => {
    event.preventDefault();

    if (input.value.length === 0) {
        showCustomAlert("¡Error! el mensaje no puede estar vacío");
    }
    else {
        output.value = encode(input.value);
        clearValue(input);
    }
}


// *** DECODE CTA ***
buttonDecode.onclick = (event) => {
    event.preventDefault();

    if (input.value.length === 0) {
        showCustomAlert("¡Error! el mensaje no puede estar vacío");
    }
    else {
        output.value = decode(input.value);
        clearValue(input);
    }
}


// *** COPY CTA ***
buttonCopy.onclick = (event) => {
    event.preventDefault();

    if (output.value.length === 0) {
        showCustomAlert("¡Error! no se encontró ningún mensaje");
    }
    else {
        output.select();
        navigator.clipboard.writeText(output.value);
        clearValue(output);
        showCustomAlert("¡Mensaje copiado correctamente! Ahora puede utilizar Ctrl-V para pegar");
    }
}


// *** CLEAN ALL TEXT AREAS CTA ***
buttonClean.onclick = (event) => {
    event.preventDefault();
    clearValue(input);
    clearValue(output);
}


// *** ABOUT ME CTA ***
buttonAboutMe.onclick = (event) => {
    event.preventDefault();
    showAboutMe();
}

buttonCloseAboutMe.onclick = (event) => {
    event.preventDefault();
    closeAboutMe();
}


// *** CLOSE ALERT BUTTON ***
buttonClose.onclick = (event) => {
    event.preventDefault();
    closeCustomAlert();
}


// *** ENCODE FUNCTION
function encode(enteredString) {
    enteredString = enteredString.toLowerCase();

    for (let i = 0; i < cryptoKeys.length; i++) {
        if (enteredString.includes(cryptoKeys[i][0])) {
            enteredString = enteredString.replaceAll(
                cryptoKeys[i][0],
                cryptoKeys[i][1]
            );
        }
    }
    return enteredString;
}


// *** DECODE FUNCTION ***
function decode(encodedString) {
    encodedString = encodedString.toLowerCase();

    for (let i = 0; i < cryptoKeys.length; i++) {
        // add already decrypted verification
        if (encodedString.includes(cryptoKeys[i][1])) {
            encodedString = encodedString.replaceAll(
                cryptoKeys[i][1],
                cryptoKeys[i][0]
            );
        }
    }
    return encodedString;
}


// *** CLEAN FIELDS ****
function clearValue(element) {
    element.value = "";
}


// *** CUSTOM ALERT ***
function showCustomAlert(message) {
    alertContainer.style.opacity = "1";
    alertContainer.style.visibility = "visible";
    alertBubble.classList.toggle("close-custom-alert");
    alertText.textContent =`${message}`;
}

function closeCustomAlert() {
    alertBubble.classList.toggle("close-custom-alert");

    setTimeout(() => {
        alertContainer.style.opacity = "0";
        alertContainer.style.visibility = "hidden";
    }, 200);
}


// *** ABOUT ME ***
function showAboutMe() {
    aboutMeContainer.style.opacity = "1";
    aboutMeContainer.style.visibility = "visible";
    aboutMeBubble.classList.toggle("close-about-me");
}

function closeAboutMe() {
    aboutMeBubble.classList.toggle("close-about-me");

    setTimeout(() => {
        aboutMeContainer.style.opacity = "0";
        aboutMeContainer.style.visibility = "hidden";
    }, 200);
}


// *** VALIDATE IF A USER ENTERS NUMBER, ACCENTUATED CHARACTER OR CAPITAL LETTER ***
function allowedInput() {
    input.addEventListener("keypress", function (event) {
        let capturedKeyCode = (event.keyCode ? event.keyCode : event.which);

        if (capturedKeyCode > 47 && capturedKeyCode < 65 ||
            capturedKeyCode > 64 && capturedKeyCode < 91 ||
            capturedKeyCode === 209 ||
            capturedKeyCode === 255 ||
            capturedKeyCode === 233 ||
            capturedKeyCode === 237 ||
            capturedKeyCode === 243 ||
            capturedKeyCode === 250 ||
            capturedKeyCode === 193 ||
            capturedKeyCode === 201 ||
            capturedKeyCode === 205 ||
            capturedKeyCode === 211 ||
            capturedKeyCode === 218 ) {
            event.preventDefault();
            showCustomAlert("¡No permitido! Sólo letras minúsculas y sin acentos");
        }
    });
}