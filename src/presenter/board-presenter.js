import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { sortDate, sortPrice } from '../utils/point.js';
import { SortType } from '../const.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #pointCommonModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = null;

  #pointCommon = null;
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor({ boardContainer, pointsModel, pointCommonModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#pointCommonModel = pointCommonModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        this.#pointsModel.points.sort(sortDate);
        break;
      case SortType.PRICE:
        this.#pointsModel.points.sort(sortPrice);
        break;
    }

    return this.#pointsModel.points;
  }

  init() {
    this.#pointCommon = this.#pointCommonModel.pointCommon;

    this.#renderBoard();
  }

  #handlePointChange = (updatedPoint) => {
    // Здесь будем вызывать обновление модели
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#pointCommon);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #renderNoPoints() {
    render(new NoPointView(), this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, this.#pointCommon);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#boardContainer);
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard() {
    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
