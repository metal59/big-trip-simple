import Observable from '../framework/observable.js';
import { getOffers } from '../mock/offer.js';
import { getDestinations } from '../mock/destination.js';

export default class PointCommonModel extends Observable {
  #allOffers = getOffers();
  #allDestinations = getDestinations();

  get pointCommon() {
    return {
      allOffers: this.#allOffers,
      allDestinations: this.#allDestinations,
    };
  }
}
