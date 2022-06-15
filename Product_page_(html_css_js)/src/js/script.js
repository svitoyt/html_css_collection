const button = document.querySelector('.add_btn_text'), 
      cardsList = document.querySelector('.cards__wrapper'),
      inputName = document.getElementById('.cards__good_name'),
      inputDescr = document.getElementById('.cards__good_descr'),
      inputLink = document.getElementById('.cards__good_link'),
      inputPrice = document.getElementById('.cards__good_price');




function sendCard() {
    if(inputName.value && inputLink.value && inputPrice.value) {
        let newCard = document.createElement('div'),
            newCardDelete = document.createElement('div'),
            newCardPhotoDiv = document.createElement('div'),
            newCardPhoto = document.createElement('img'),
            newCardName = document.createElement('div'),
            newCardDescr = document.createElement('div'),
            newCardPrice = document.createElement('div');
        
        newCardDelete.classList.add('delete');
        newCardPhotoDiv.classList.add('cards__card_img');
        newCardPhoto.classList.add('cards__card_img_foto');
        newCardPhoto.src = inputLink.value;
        newCardName.classList.add('cards__card_header');
        newCardName.textContent = inputName.value;
        newCardPrice.classList.add('cards__card_price');
        newCardPrice.textContent = `${(+inputName.value).toLocaleString()} руб.`;
        newCard.classList.add('cards__card');

        if (inputDescr.value) {
            newCardDescr.classList.add('cards__card_descr');
            newCardDescr.textContent = inputDescr.value;
        } else (newCardDescr.textContent = `Описание отсутствует`);

        newCardPhotoDiv.appendChild(newCardPhoto);
        newCard.appendChild(newCardDelete);
        newCard.appendChild(newCardPhotoDiv);
        newCard.appendChild(newCardName);
        newCard.appendChild(newCardDescr);
        newCard.appendChild(newCardPrice);

        cardsList.append(newCard);

        inputName.value = '';
        inputDescr.value = '';
        inputLink.value = '';
        inputPrice.value = '';
    }
}

button.addEventListener('click', sendCard);