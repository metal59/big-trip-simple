import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { sortDate, sortPrice } from '../utils/point.js';
import { SortType } from '../const.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = null;

  #boardPoints = [];
  #pointCommon = null;
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor({ boardContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = this.#pointsModel.points;
    this.#pointCommon = {
      allOffers: this.#pointsModel.allOffers,
      offersByType: this.#pointsModel.offersByType,
      allDestinations: this.#pointsModel.allDestinations,
    };

    this.#renderBoard();
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#pointCommon);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortDate);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
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
    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#sortPoints(this.#currentSortType);
    this.#renderSort();
    this.#renderPointList();
  }
}
