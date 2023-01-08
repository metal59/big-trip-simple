import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import PointCommonModel from './model/point-common-model.js';
import FilterModel from './model/filter-model.js';

const filters = [
  {
    type: 'everything',
    name: 'EVERYTHING',
    count: 0,
  },
];

const filterContainerElement = document.querySelector('.trip-controls__filters');
const mainContentElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const pointCommonModel = new PointCommonModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: mainContentElement,
  pointsModel,
  pointCommonModel,
});

render(new FilterView({
  filters,
  currentFilterType: 'everything',
  onFilterTypeChange: () => { }
}), filterContainerElement);
boardPresenter.init();
