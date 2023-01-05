import { filter } from '../utils/filter.js';

const generateFilter = (points) => Object.entries(filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    isEmpty: filterPoints(points).length === 0,
  }),
);

export { generateFilter };
