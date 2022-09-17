const mainPad = document.querySelector("#sketchpad");
const colorPicker = document.querySelector("#options #pick-color input");
const modeButtons = document.querySelectorAll("#options .mode-button");
const clearBtn = document.querySelector("#options #clear");
const sizePicker = document.querySelector("#options #adjust-size input");
const sizeLabel = document.querySelector("#options #adjust-size label");

const mainPadSizeWidth = mainPad.offsetWidth - 1;
const mainPadSizeHeight = mainPad.offsetHeight;

var currentMode = modeButtons[0];
var boxStorage = [];

colorPicker.value = "#454545";
var selectedColor = colorPicker.value;

var boxSize = 10;
sizePicker.value = boxSize;
sizeLabel.textContent = boxSize;

const bgColor = "#F0F8FF";


// At the starting
createNewBoxes();
changeMode(currentMode);

colorPicker.addEventListener('input', () => {
    selectedColor = colorPicker.value;
});

sizePicker.addEventListener('input', () => {
    boxSize = sizePicker.value;
    sizeLabel.textContent = sizePicker.value;

    createNewBoxes();
    changeMode(currentMode);
});

modeButtons.forEach((button) => {

    button.addEventListener('click', () => {
        currentMode = button;
        changeMode(currentMode);
    });
});

clearBtn.addEventListener('click', () => {
    boxStorage.forEach((box) => {
        box.style.backgroundColor = "white";
    });
});

function createNewBoxes() {
    
    const arr = [];

    if (boxStorage.length !== 0) {
        boxStorage.forEach((box) => {
            mainPad.removeChild(box);
        });
    }

    for (let i = 0; i < (boxSize * boxSize); i++) {
        const newBox = document.createElement("div");
        newBox.setAttribute("class", "box");

        newBox.style.width = (mainPadSizeWidth / boxSize).toString() + "px";
        newBox.style.height = (mainPadSizeHeight / boxSize).toString() + "px";
        
        mainPad.appendChild(newBox);
        arr.push(newBox);
    }
    
    boxStorage = arr;
}

function changeMode(button) {

    modeButtons.forEach((revertButton) => {
        revertButton.style.backgroundColor = bgColor;
        revertButton.style.color = "black";
    });

    button.style.backgroundColor = "black";
    button.style.color = "white";


    boxStorage.forEach((box) => {
        box.addEventListener('mouseenter', () => {

            switch (button.getAttribute("id")) {
                
                case "color":
                    box.style.backgroundColor = selectedColor;
                    break;

                case "rainbow":

                    const red = Math.floor(Math.random() * 256);
                    const green = Math.floor(Math.random() * 256);
                    const blue = Math.floor(Math.random() * 256);

                    const newColor = `rgb(${red}, ${green}, ${blue})`;
                    box.style.backgroundColor = newColor;
                    break;

                case "eraser":

                    box.style.backgroundColor = "white";
                    break;
            }
        });
    });
}