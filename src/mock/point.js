import { getRandomArrayElement } from '../utils.js';

const mockPoints = [
  {
    basePrice: 1000,
    dateFrom: new Date('2022-01-01T05:30'),
    dateTo: new Date('2022-01-02T21:45'),
    destination: 0,
    offers: [1, 2],
    type: 'taxi'
  },
  {
    basePrice: 2000,
    dateFrom: new Date('2022-02-02T01:15'),
    dateTo: new Date('2022-03-03T02:20'),
    destination: 1,
    offers: [1],
    type: 'bus'
  },
  {
    basePrice: 3000,
    dateFrom: new Date('2022-10-10T15:30'),
    dateTo: new Date('2022-11-11T17:30'),
    destination: 2,
    offers: [2, 3],
    type: 'train'
  },
  {
    basePrice: 4000,
    dateFrom: new Date('2022-12-01T18:00'),
    dateTo: new Date('2023-01-11T06:30'),
    destination: 3,
    offers: [3, 4],
    type: 'ship'
  },
];

function getRandomPoint() {
  const point = getRandomArrayElement(mockPoints);
  return point;
}

function getPoints() {
  return mockPoints;
}

export { getPoints, getRandomPoint };
