import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #points = null;
  #pointCommonData = null;

  #pointListComponent = new PointListView();

  constructor({ boardContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#points = [...pointsModel.points];
    this.#pointCommonData = {
      offers: [...pointsModel.offers],
      offersByType: [...pointsModel.offersByType],
      destinations: [...pointsModel.destinations],
    };
  }

  init() {
    this.#renderBoard();
  }

  #getPointViewData(point = null) {
    return Object.assign({}, { point }, this.#pointCommonData);
  }

  #renderSort() {
    render(new SortView(), this.#boardContainer);
  }

  #renderNoPoints() {
    render(new NoPointView(), this.#boardContainer);
  }

  #renderPoint(point = null) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
    });
    const data = this.#getPointViewData(point);
    pointPresenter.init(data);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#boardContainer);
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard() {
    if (this.#points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
