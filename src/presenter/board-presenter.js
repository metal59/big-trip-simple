import { render } from '../render.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-point-view.js';

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

  init() {
    this.#renderBoard();
  }

  #getPointViewData(point = null) {
    return Object.assign({}, { point }, this.#pointViewCommonData);
  }

  #renderPoint(point = null) {
    const pointComponent = new PointView(this.#getPointViewData(point));
    const pointEditComponent = new PointEditView(this.#getPointViewData(point));

    const replaceEventToForm = () => {
      this.#tripListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToEvent = () => {
      this.#tripListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEventToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('.event__reset-btn').addEventListener('click', () => {
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#tripListComponent.element);
  }

  #renderBoard() {
    if (this.#points.length === 0) {
      render(new NoPointView(), this.#boardContainer);
      return;
    }

    render(new SortView(), this.#boardContainer);
    render(this.#tripListComponent, this.#boardContainer);
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }
}
