import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointAddView from '../view/point-add-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  tripListComponent = new TripListView();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);
    render(new PointAddView(), this.tripListComponent.getElement());
    render(new PointEditView(), this.tripListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.tripListComponent.getElement());
    }
  }
}
