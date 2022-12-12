import { getRandomPoint } from '../mock/point.js';
import { getDestinationById } from '../mock/destination.js';
import { getOfferById } from '../mock/offer.js';

const POINT_COUNT = 3;

export default class PointsModel {
  constructor() {
    this.points = Array.from({ length: POINT_COUNT }, () => ({ ...getRandomPoint() }));
    this.points.forEach((point) => {
      point.destination = getDestinationById(point.destination);
      point.offers = point.offers.map((offer) => getOfferById(offer));
    });
  }

  getPoints() {
    return this.points;
  }
}
