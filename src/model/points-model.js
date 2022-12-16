import { getPoints } from '../mock/point.js';
import { getOffers } from '../mock/offer.js';
import { getOffersByType } from '../mock/offers-by-type.js';
import { getDestinations } from '../mock/destination.js';

export default class PointsModel {
  #points = [...getPoints()];
  #offers = getOffers();
  #offersByType = getOffersByType();
  #destinations = getDestinations();

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get offersByType() {
    return this.#offersByType;
  }

  get destinations() {
    return this.#destinations;
  }
}
