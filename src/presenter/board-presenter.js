import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #points = null;
  #pointViewCommonData = null;

  #tripListComponent = new TripListView();

  constructor({ boardContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#points = [...pointsModel.points];
    this.#pointViewCommonData = {
      offers: [...pointsModel.offers],
      offersByType: [...pointsModel.offersByType],
      destinations: [...pointsModel.destinations],
    };
  }

  getPointViewData(point = null) {
    return Object.assign({}, { point }, this.#pointViewCommonData);
  }

  init() {
    render(new SortView(), this.#boardContainer);
    render(this.#tripListComponent, this.#boardContainer);
    render(new PointEditView(this.getPointViewData()), this.#tripListComponent.element);
    render(new PointEditView(this.getPointViewData(this.#points[0])), this.#tripListComponent.element);
    for (let i = 1; i < this.#points.length; i++) {
      render(new PointView(this.getPointViewData(this.#points[i])), this.#tripListComponent.element);
    }
  }
}
