import {makeActive, resetFormElemenements} from './form.js';
import {createCardsFragment} from './similar-list.js';
import {getData} from './api.js';
import {showRecieveDataError} from './messages.js';

const addressElement = document.querySelector('#address');
const resetElement = document.querySelector('.ad-form__reset');

const TOKIO_LATITUDE = 35.7197;
const TOKIO_LONGITDE = 139.779;
const MAP_ZOOM_FACTOR = 11;


const setTokioCenterAddress = () => {addressElement.value = `${TOKIO_LATITUDE}, ${TOKIO_LONGITDE}`;};

const map = L.map('map-canvas');

const createAdsMarkers = (cards) => {
  cards = cards.slice(0, 10);

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
      .addTo(map)
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

const initMap = () => {
  setTokioCenterAddress();

  map.on('load', () => {
    makeActive();
  })
    .setView({
      lat: TOKIO_LATITUDE,
      lng: TOKIO_LONGITDE
    }, MAP_ZOOM_FACTOR);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map);

  getData(
    (cards) => {
      createAdsMarkers(cards);
    },
    () => showRecieveDataError()
  );

  createMainMarker();

  resetElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    resetFormElemenements();
    setTokioCenterAddress();

    map.setView({
      lat: TOKIO_LATITUDE,
      lng: TOKIO_LONGITDE
    }, MAP_ZOOM_FACTOR);

    mainMarker.setLatLng([TOKIO_LATITUDE, TOKIO_LONGITDE]);
  });

};

export {initMap, setTokioCenterAddress};
