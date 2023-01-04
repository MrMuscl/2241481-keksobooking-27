import { getRandomArrayElement, getRandomPositiveInteger, getRandomPositiveFloat, createIdGenerator } from './utils.js';

const HOUSING_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const HOUSING_DESCRIPTION = [
  'Квартира эконом класса',
  'Центр города, транспортная доступность, развитая ифраструктура',
  'Элитный район города',
  'Аппартаменты для ивестиций'
];

const TITLES = [
  'Бюджетная квартира',
  'Лучший вариант для отпуска',
  'Жильё для семьи с ребёнком',
  'Берлога для холостяка',
  'Отличный дом для большой семьи',
  'Если нужно перекантоваться на несколько дней',
  'Шикарный вариант для медового месяца'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const TIME_VALUES = [
  '12:00',
  '13:00',
  '14:00',
];

const MAX_OFFERS_COUNT = 10;
const MIN_LATITUDE = 35.65;
const MAX_LATITUDE = 35.7;
const MIN_LONGITUDE = 139.7;
const MAX_LONGITUDE = 139.8;
const MIN_PRICE = 0;
const MAX_PRICE = 100000;

const idGenerator = createIdGenerator(1);

const getAvatar = () => {
  let num = String(idGenerator());

  if (num.length === 1){
    num = `0${num}`;
  }

  return `img/avatars/user${num}.png`;
};

const createOffer = () => {
  const latitude = getRandomPositiveFloat(MIN_LATITUDE, MAX_LATITUDE, 5);
  const longitude = getRandomPositiveFloat(MIN_LONGITUDE, MAX_LONGITUDE, 5);
  const offer = {
    author: {
      avatar: getAvatar()
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      adress: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(HOUSING_TYPE),
      rooms: getRandomPositiveInteger(1, 3),
      guests: getRandomPositiveInteger(1, 3),
      checkin: getRandomArrayElement(TIME_VALUES),
      checkout: getRandomArrayElement(TIME_VALUES),
      features: FEATURES.slice(0, getRandomPositiveInteger(0, FEATURES.length)),
      description: getRandomArrayElement(HOUSING_DESCRIPTION),
      photos: PHOTOS.slice(0, getRandomPositiveInteger(1, PHOTOS.length))
    },
    location: {
      lat: latitude,
      lng: longitude,
    }
  };
  return offer;
};

const generateOffers = () =>{
  const offers = [];

  for(let i = 1; i <= MAX_OFFERS_COUNT; i++){
    offers.push(createOffer());
  }

  return offers;
};

export {generateOffers};
