const HOUSING_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const buildCapacityString = (guestNumber, roomNumber) => {
  let roomWord = 'комнаты';
  let guestWord = 'гостей';

  if (guestNumber === 1){
    guestWord = 'гостя';
  }

  if (roomNumber === 1){
    roomWord = 'комната';
  }

  return `${roomNumber} ${roomWord} для ${guestNumber} ${guestWord}`;

};

const createElement = (element, value) =>{
  if (!value){
    element.remove();
  } else {
    element.textContent = value;
  }
};


const createCardsFragment = (offers) =>{
  const cardsFragment = document.createDocumentFragment();
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  for(const card of offers){
    const offerItem = cardTemplate.cloneNode(true);

    createElement(offerItem.querySelector('.popup__title'), card.offer.title);
    createElement(offerItem.querySelector('.popup__text--address'), card.offer.address);
    createElement(offerItem.querySelector('.popup__text--price'), `${card.offer.price} ₽/ночь`);
    createElement(offerItem.querySelector('.popup__type'), HOUSING_TYPE[card.offer.type]);
    createElement(offerItem.querySelector('.popup__text--time'), `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`);
    createElement(offerItem.querySelector('.popup__text--capacity'), buildCapacityString(card.offer.guests, card.offer.rooms));

    const featuresElement = offerItem.querySelector('.popup__features');
    featuresElement.innerHTML = '';
    if (card.offer.features){
      for(const feature of card.offer.features){
        const liElement = document.createElement('li');
        liElement.classList.add('popup__feature');
        liElement.classList.add(`popup__feature--${feature}`);
        featuresElement.append(liElement);
      }
    }

    createElement(offerItem.querySelector('.popup__description'), card.offer.description);
    const picturesContainer = offerItem.querySelector('.popup__photos');
    picturesContainer.innerHTML = '';
    if (card.offer.photos){
      for(const photo of card.offer.photos){
        const picture = document.createElement('img');
        picture.classList.add('popup__photo');
        picture.width = 45;
        picture.height = 40;
        picture.alt = 'Фотография жилья';
        picture.src = photo;
        picturesContainer.append(picture);
      }
    }


    offerItem.querySelector('.popup__avatar').src = card.author.avatar;
    cardsFragment.append(offerItem);
  }
  return cardsFragment;
};

export {createCardsFragment};
