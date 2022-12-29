const HousingTypeMap = {
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
    createElement(offerItem.querySelector('.popup__type'), HousingTypeMap[card.offer.type]);
    createElement(offerItem.querySelector('.popup__text--time'), `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`);
    createElement(offerItem.querySelector('.popup__text--capacity'), buildCapacityString(card.offer.guests, card.offer.rooms));

    const featuresElement = offerItem.querySelector('.popup__features');
    featuresElement.innerHTML = '';
    for(const feature of card.offer.features){
      const liElement = document.createElement('li');
      liElement.classList.add('popup__feature');
      liElement.classList.add(`popup__feature--${feature}`);
      featuresElement.append(liElement);
    }

    createElement(offerItem.querySelector('.popup__description'), card.offer.description);
    const picturesContainer = offerItem.querySelector('.popup__photos');
    picturesContainer.innerHTML = '';
    for(const photo of card.offer.photos){
      const picture = document.createElement('img');
      picture.classList.add('popup__photo');
      picture.width = 45;
      picture.height = 40;
      picture.alt = 'Фотография жилья';
      picture.src = photo;
      picturesContainer.append(picture);
    }

    offerItem.querySelector('.popup__avatar').src = card.author.avatar;
    cardsFragment.append(offerItem);
  }
  return cardsFragment;
};

const createCardsLayout = (offers) =>{
  const cardContainer = document.querySelector('.map__canvas');
  const cardsFragment = createCardsFragment(offers);
  cardContainer.append(cardsFragment);
};

export {createCardsLayout, createCardsFragment};
