import {enableFilters, makeActive, resetFormElemenements} from './form.js';
import {createCardsFragment} from './similar-list.js';
import {getData} from './api.js';
import {showRecieveDataError} from './messages.js';
import {filterOffers, MAX_OFFERS_COUNT, resetFilters, setFiltersChangedHandler} from './filters.js';
import {debounce, DEBOUNCE_DELAY} from './utils.js';


const addressElement = document.querySelector('#address');
const resetElement = document.querySelector('.ad-form__reset');

const TOKIO_LATITUDE = 35.7197;
const TOKIO_LONGITDE = 139.779;
const MAP_ZOOM_FACTOR = 11;


const map = L.map('map-canvas');
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);
const markerGroup = L.layerGroup().addTo(map);

const removeAdsMarkers = () => markerGroup.clearLayers();

const createAdsMarkers = (cards) => {
  const markerIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    anchor: [20, 40]
  });

  const cardsFragment = createCardsFragment(cards);
  for(let i = 0; i < cards.length; i++){
    const marker = L.marker(
      {
        lat: cards[i].location.lat,
        lng: cards[i].location.lng
      },
      {
        draggable: false,
        icon: markerIcon
      }
    );

    marker
      .addTo(markerGroup)
      .bindPopup(cardsFragment.children[i]);
  }
};

let mainMarker = null;
const createMainMarker = () => {
  const mainMarkerIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    anchor: [26, 52]
  });

  mainMarker = L.marker(
    {
      lat: TOKIO_LATITUDE,
      lng: TOKIO_LONGITDE
    },
    {
      draggable: true,
      icon: mainMarkerIcon
    });

  mainMarker.on('move', (evt)=> {
    const coordinates = evt.target.getLatLng();
    addressElement.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });

  mainMarker.addTo(map);
};

const setTokioCenterAddress = () => {
  mainMarker.setLatLng([TOKIO_LATITUDE, TOKIO_LONGITDE]);
  addressElement.value = `${TOKIO_LATITUDE}, ${TOKIO_LONGITDE}`;
};

const mapLoadHandler = () => {
  makeActive();
  createMainMarker();
  setTokioCenterAddress();
  getData(
    (cards) => {
      createAdsMarkers(cards.slice(0, MAX_OFFERS_COUNT));
      setFiltersChangedHandler(
        debounce(()=> {
          removeAdsMarkers();
          createAdsMarkers(filterOffers(cards));
        }, DEBOUNCE_DELAY)
      );
      enableFilters();
    },
    showRecieveDataError
  );
};

const createInitialMarkers = () =>{
  getData((cards) => createAdsMarkers(cards.slice(0, MAX_OFFERS_COUNT)));
};

const initMap = () => {
  map.on('load', mapLoadHandler);

  map.setView({
    lat: TOKIO_LATITUDE,
    lng: TOKIO_LONGITDE
  }, MAP_ZOOM_FACTOR);

  resetElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    resetFormElemenements();
    setTokioCenterAddress();
    resetFilters();
    createInitialMarkers();

    map.setView({
      lat: TOKIO_LATITUDE,
      lng: TOKIO_LONGITDE
    }, MAP_ZOOM_FACTOR);
  });
};


export {initMap,
  setTokioCenterAddress,
  removeAdsMarkers,
  createInitialMarkers};
