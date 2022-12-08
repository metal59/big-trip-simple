import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import { render } from './render.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const mainContentElement = document.querySelector('.trip-events');

render(new FilterView(), filterContainerElement);
render(new SortView(), mainContentElement);
