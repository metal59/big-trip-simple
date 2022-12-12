import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  tripListComponent = new TripListView();

  constructor({ boardContainer, pointsModel }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);
    render(new PointEditView(), this.tripListComponent.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointView(), this.tripListComponent.getElement());
    }
  }
}
