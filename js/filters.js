import {removeAdsMarkers} from './map.js';

const filtersForm = document.querySelector('.map__filters');
const typeFilter = filtersForm.querySelector('#housing-type');
const priceFilter = filtersForm.querySelector('#housing-price');
const roomsFilter = filtersForm.querySelector('#housing-rooms');
const guestsFilter = filtersForm.querySelector('#housing-guests');
const featuresSet = document.querySelectorAll('[name="features"]');

const MIDDLE_PRICE = 10000;
const HIGH_PRICE = 50000;
const MAX_OFFERS_COUNT = 10;

const resetFilters = () => {
  filtersForm.reset();
  removeAdsMarkers();
};

const setFiltersChangedHandler = (cb) => {
  filtersForm.addEventListener('change', ()=>{
    removeAdsMarkers();
    cb();
  });
};

const filterByType = (offer, type) => type === 'any' || offer.offer.type === type;

const filterByPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < MIDDLE_PRICE;
    case 'middle':
      return offer.offer.price < HIGH_PRICE && offer.offer.price > MIDDLE_PRICE;
    case 'high':
      return offer.offer.price >= HIGH_PRICE;
  }
};

const filterByRooms = (offer, rooms) => rooms === 'any' || offer.offer.rooms === Number(rooms);

const filterByGuests = (offer, guests) => guests === 'any' || offer.offer.guests === Number(guests);

const filterByFeatures = (offer, features) => {
  if (!features.length){
    return true;
  }

  if (!offer.offer.features){
    return false;
  }

  return features.every((feature) => offer.offer.features.includes(feature));
};


const filterOffers = (offers) => {
  const selectedType = typeFilter.value;
  const selectedPrice = priceFilter.value;
  const selectedRooms = roomsFilter.value;
  const selectedGuests = guestsFilter.value;

  const selectedFeatuers = [];
  featuresSet.forEach((feature) => {
    if(feature.checked){
      selectedFeatuers.push(feature.value);
    }
  });

  const filteredOffers = [];
  for(const offer of offers){
    if (filteredOffers.length >= MAX_OFFERS_COUNT){
      break;
    }
    if (
      filterByType(offer, selectedType) &&
       filterByPrice(offer, selectedPrice) &&
       filterByGuests(offer, selectedGuests) &&
       filterByRooms(offer, selectedRooms) &&
       filterByFeatures(offer, selectedFeatuers)
    ){
      filteredOffers.push(offer);
    }
  }

  return filteredOffers;
};

export {filterOffers,
  resetFilters,
  setFiltersChangedHandler,
  MAX_OFFERS_COUNT
};
