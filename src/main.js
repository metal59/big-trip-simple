import FilterView from './view/filter-view.js';
import { render } from './render.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');

render(new FilterView(), filterContainerElement);
