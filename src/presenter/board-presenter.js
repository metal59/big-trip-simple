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
    this.points = [...this.pointsModel.getPoints()];
    this.pointViewCommonData = {
      offers: [...this.pointsModel.getOffers()],
      offersByType: [...this.pointsModel.getOffersByType()],
      destinations: [...this.pointsModel.getDestinations()],
    };
  }

  getPointViewData(point = null) {
    return Object.assign({}, { point }, this.pointViewCommonData);
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);
    render(new PointEditView(this.getPointViewData()), this.tripListComponent.getElement());
    render(new PointEditView(this.getPointViewData(this.points[0])), this.tripListComponent.getElement());
    for (let i = 1; i < this.points.length; i++) {
      render(new PointView(this.getPointViewData(this.points[i])), this.tripListComponent.getElement());
    }
  }
}
