const input = document.querySelector('.block header input');
const addButton = document.querySelector('.block header .add');
const clearButton = document.querySelector('.block header .clear');
const itemBlock = document.querySelector('.block .items');
const placeholHtml = input.placeholder;

let storageArray = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
function AddStorage(value) {
    this.value = value;
    storageArray.push(this.value);
    localStorage.setItem('data', JSON.stringify(storageArray));
}
clearButton.addEventListener('click', () => {
    input.value = '';
    clearButton.style.display = 'none';
    placehol();
});
let callPlaceholFunc = true;
function placehol() {
    let replacePlacehol = '';
    let count = 0;
    input.placeholder = '';
    let intervalPlace = setInterval(() => {
        replacePlacehol += placeholHtml[count];
        input.placeholder = replacePlacehol;
        if (count < (placeholHtml.length - 1)) {
            count++;
        } else if (count >= (placeholHtml.length - 1)) clearInterval(intervalPlace);
        input.value ? clearInterval(intervalPlace) : '';
    }, 100);
}
window.onload = () => placehol();
input.addEventListener('input', () => {
    if (input.value.length <= 0) {
        placehol();
        clearButton.style.display = 'none';
    } else {
        clearButton.style.display = 'block';
    }
});
class AddItem {
    constructor(val) {
        this.val = val;
        this.createItem();
    }
    createItem() {
        let item = document.createElement('div');
        item.classList.add('item');
        let p = document.createElement('p');
        p.innerText = this.val;
        let img = document.createElement('img');
        img.src = 'img/pen.png';
        img.title = 'The text will be replaced with the text of the input field';
        let removeButton = document.createElement('button');
        removeButton.innerText = 'X';
        // add item
        item.append(p, img, removeButton);
        itemBlock.appendChild(item);
        // after add
        img.addEventListener('click', () => {
            if (input.value != '') {
                storageArray[storageArray.indexOf(p.innerText)] = input.value;
                localStorage.setItem('data', JSON.stringify(storageArray));
                p.innerText = input.value;
            }
        });
        removeButton.addEventListener('click', () => {
            this.removeItem(item);
        });
        input.value = '';
    }
    removeItem(item) {
        delete storageArray[storageArray.indexOf(item.children[0].innerText)];
        storageArray = storageArray.filter((elem) => elem);
        localStorage.setItem('data', JSON.stringify(storageArray));
        item.remove();
    }
}
if (localStorage.getItem('data')) {
    storageArray.forEach((elem) => {
        if (elem) new AddItem(elem);
    });
}
addButton.addEventListener('click', () => {
    if (input.value != '') {
        new AddStorage(input.value);
        new AddItem(input.value);
        placehol();
    }
    if (input.value.length <= 0) {
        clearButton.style.display = 'none';
    } else {
        clearButton.style.display = 'block';
    }
});
input.addEventListener('keydown', (e) => {
    if (e.keyCode == 13 && input.value != '') {
        new AddStorage(input.value);
        new AddItem(input.value);
        placehol();
    }
    if (input.value.length <= 0) {
        clearButton.style.display = 'none';
    } else {
        clearButton.style.display = 'block';
    }
});












