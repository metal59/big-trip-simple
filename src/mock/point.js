import { getRandomArrayElement } from '../utils.js';
import { getOffersByType } from './offers-by-type.js';

const mockPoints = [
  {
    basePrice: 1000,
    dateFrom: new Date('2022-01-01'),
    dateTo: new Date('2022-01-02'),
    destination: 0,
    type: 'taxi'
  },
  {
    basePrice: 2000,
    dateFrom: new Date('2022-02-02'),
    dateTo: new Date('2022-03-03'),
    destination: 1,
    type: 'bus'
  },
  {
    basePrice: 3000,
    dateFrom: new Date('2022-10-10'),
    dateTo: new Date('2022-11-11'),
    destination: 2,
    type: 'train'
  },
  {
    basePrice: 4000,
    dateFrom: new Date('2022-12-01'),
    dateTo: new Date('2023-01-11'),
    destination: 3,
    type: 'ship'
  },
];

function getRandomPoint() {
  const point = getRandomArrayElement(mockPoints);
  point.offers = getOffersByType(point.type);
  return point;
}

export { getRandomPoint };
