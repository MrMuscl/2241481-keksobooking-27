import {generateOffers} from './data.js';
import {makeActive, makeInactive} from './form.js';
import {createCardsLayout} from './similar-list.js';
import {initValidation} from './validate.js';

const offers = generateOffers();
createCardsLayout(offers);
initValidation();
makeInactive();


setTimeout(makeActive, 1000);
