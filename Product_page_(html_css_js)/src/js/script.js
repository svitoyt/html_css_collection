const button = document.querySelector('.add_btn_text'), 
      inputName = document.getElementById('good_name'),
      inputDescr = document.getElementById('good_descr'),
      inputLink = document.getElementById('good_link'),
      inputPrice = document.getElementById('good_price'),
      errorName = document.querySelector('.error_input_name'),
      errorLink = document.querySelector('.error_input_link'),
      errorPrice = document.querySelector('.error_input_price');

let removeBtn = document.querySelectorAll('.delete'),
    cardsList = document.querySelector('.cards__wrapper'),
    filterList = document.querySelector('.nav_menu__filter_block'),
    rememberList,
    rememberFilter;
      
function btnRedColour() {
    if (button.classList.contains('btn-succ')) {
        button.classList.remove('btn-succ');
    }
    button.classList.add('btn-err');
}

function btnGreenColour() {
    if (button.classList.contains('btn-err')) {
        button.classList.remove('btn-err');
    }
    button.classList.add('btn-succ');
}

function removeClass(block, classRemove) {
    if (block.classList.contains(classRemove)) {
        block.classList.remove(classRemove);
    }
    return;
}

function sendCard(e) {
    e.preventDefault();
    btnGreenColour();
    if(inputName.value && inputLink.value && (+inputPrice.value > 0)) {
        let newCard = document.createElement('div'),
            newCardDelete = document.createElement('div'),
            newCardPhotoDiv = document.createElement('div'),
            newCardPhoto = document.createElement('img'),
            newCardName = document.createElement('div'),
            newCardDescr = document.createElement('div'),
            newCardPrice = document.createElement('div');
        
        removeClass(inputName, 'error_blank_name');
        removeClass(errorName, 'error_input');
        removeClass(inputLink, 'error_blank_link');
        removeClass(errorLink, 'error_input');
        removeClass(inputPrice, 'error_blank_price');
        removeClass(errorPrice, 'error_input');

        newCardDelete.classList.add('delete');
        newCardPhotoDiv.classList.add('cards__card_img');
        newCardPhoto.classList.add('cards__card_img_foto');
        newCardPhoto.src = inputLink.value;
        newCardName.classList.add('cards__card_header');
        newCardName.textContent = inputName.value[0].toUpperCase() + inputName.value.slice(1);
        newCardPrice.classList.add('cards__card_price');
        newCardPrice.textContent = `${(+inputPrice.value).toLocaleString()} руб.`;
        newCard.classList.add('cards__card');

        if (inputDescr.value) {
            inputDescr.value = inputDescr.value[0].toUpperCase() + inputDescr.value.slice(1);
            if (inputDescr.value.length > 21) {
                inputDescr.value = `${inputDescr.value.substring(0, 130)} ...`;
            }
            newCardDescr.classList.add('cards__card_descr');
            newCardDescr.textContent = inputDescr.value;
        } else {
            newCardDescr.classList.add('cards__card_descr');
            newCardDescr.textContent = `Описание отсутствует`;
        }
            
        newCardPhotoDiv.appendChild(newCardPhoto);
        newCard.appendChild(newCardDelete);
        newCard.appendChild(newCardPhotoDiv);
        newCard.appendChild(newCardName);
        newCard.appendChild(newCardDescr);
        newCard.appendChild(newCardPrice);

        cardsList.append(newCard);
        rememberFunc();
        filterList.value = 1;
        inputName.value = '';
        inputDescr.value = '';
        inputLink.value = '';
        inputPrice.value = '';
        
    
    } else if (inputName.value=='') {
        inputName.classList.add('error_blank_name');
        errorName.classList.add('error_input');

        removeClass(inputLink, 'error_blank_link');
        removeClass(errorLink, 'error_input');
        removeClass(inputPrice, 'error_blank_price');
        removeClass(errorPrice, 'error_input');
        btnRedColour();
        return;

    } else if (inputLink.value=='') {
        inputLink.classList.add('error_blank_link');
        errorLink.classList.add('error_input');

        removeClass(inputName, 'error_blank_name');
        removeClass(errorName, 'error_input');
        removeClass(inputPrice, 'error_blank_price');
        removeClass(errorPrice, 'error_input');
        btnRedColour();
        return;

    } else if (inputPrice.value=='' || +inputPrice.value < 0) {
        inputPrice.classList.add('error_blank_price');
        errorPrice.classList.add('error_input');

        removeClass(inputName, 'error_blank_name');
        removeClass(errorName, 'error_input');
        removeClass(inputLink, 'error_blank_link');
        removeClass(errorLink, 'error_input');
        btnRedColour();
        return;
    }
}
button.addEventListener('click', sendCard);

function removeCard() {
    document.querySelectorAll('.delete').forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
        });
    });
    rememberFunc();
}

addEventListener('click', removeCard);

function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

filterList.addEventListener('change', function() {
    if (this.value == 4) {
        for (let i = 0; i < cardsList.children.length; i++) {
            for (let j = i; j < cardsList.children.length; j++) {
                if (cardsList.children[i].children[2].textContent > cardsList.children[j].children[2].textContent) {
                    replacedNode = cardsList.replaceChild(cardsList.children[j], cardsList.children[i]);
                    insertAfter(replacedNode, cardsList.children[i]);
                }
            }
        }

    } else if (this.value == 3) {
        for (let i = 0; i < cardsList.children.length; i++) {
            for (let j = i; j < cardsList.children.length; j++) {
                if (+cardsList.children[i].children[4].textContent.replace(/[^0-9]/g, '') > +cardsList.children[j].children[4].textContent.replace(/[^0-9]/g, '')) {
                    replacedNode = cardsList.replaceChild(cardsList.children[j], cardsList.children[i]);
                    insertAfter(replacedNode, cardsList.children[i]);
                }
            }
        }
    } else if (this.value == 2) {
        for (let i = 0; i < cardsList.children.length; i++) {
            for (let j = i; j < cardsList.children.length; j++) {
                if (+cardsList.children[i].children[4].textContent.replace(/[^0-9]/g, '') < +cardsList.children[j].children[4].textContent.replace(/[^0-9]/g, '')) {
                    replacedNode = cardsList.replaceChild(cardsList.children[j], cardsList.children[i]);
                    insertAfter(replacedNode, cardsList.children[i]);
                }
            }
        }
    }
    rememberFunc();
});

function rememberFunc() {
    rememberList = document.querySelector('.cards__wrapper').innerHTML;
    localStorage.setItem('rememberList', rememberList);
    rememberFilter = filterList.value;
    localStorage.setItem('rememberFilter', rememberFilter);
}

if (localStorage.getItem('rememberList')) {
    document.querySelector('.cards__wrapper').innerHTML = localStorage.getItem('rememberList');
}

if (localStorage.getItem('rememberFilter')) {
    filterList.value = localStorage.getItem('rememberFilter');
}
