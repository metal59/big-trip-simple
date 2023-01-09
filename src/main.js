import {render} from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import PointCommonModel from './model/point-common-model.js';
import FilterModel from './model/filter-model.js';

const mainContentElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const siteHeaderElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const pointCommonModel = new PointCommonModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: mainContentElement,
  pointsModel,
  pointCommonModel,
  filterModel,
});
const filterPresenter = new FilterPresenter({
  filterContainer: filterContainerElement,
  filterModel,
  pointsModel
});

render(new NewPointButtonView(), siteHeaderElement);

filterPresenter.init();
boardPresenter.init();
