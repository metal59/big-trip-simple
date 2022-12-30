import { render, replace } from '../framework/render.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #data = null;

  constructor({ pointListContainer }) {
    this.#pointListContainer = pointListContainer;
  }

  init(data) {
    this.#data = data;

    this.#pointComponent = new PointView({
      data: this.#data,
      onEditClick: this.#handleEditClick,
    });

    this.#pointEditComponent = new PointEditView({
      data: this.#data,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onCloseClick: this.#handleCloseClick,
    });

    render(this.#pointComponent, this.#pointListContainer);
  }

  #replaceEventToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceFormToEvent() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #closeEditForm() {
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = () => {
    this.#closeEditForm();
  };

  #handleDeleteClick = () => {
    this.#closeEditForm();
  };

  #handleCloseClick = () => {
    this.#closeEditForm();
  };
}
