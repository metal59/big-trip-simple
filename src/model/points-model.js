import { getPoints } from '../mock/point.js';
// import { getRandomPoint } from '../mock/point.js';
import { getOffers } from '../mock/offer.js';
import { getOffersByType } from '../mock/offers-by-type.js';
import { getDestinations } from '../mock/destination.js';

// const POINT_COUNT = 3;

export default class PointsModel {
  // points = Array.from({ length: POINT_COUNT }, () => ({ ...getRandomPoint() }));
  points = [...getPoints()];
  offers = getOffers();
  offersByType = getOffersByType();
  destinations = getDestinations();

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getOffersByType() {
    return this.offersByType;
  }

  getDestinations() {
    return this.destinations;
  }
}
