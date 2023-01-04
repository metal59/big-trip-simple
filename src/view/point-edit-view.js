import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../const.js';
import dayjs from 'dayjs';
import { capitalizeFirstLetter } from '../utils/common.js';

const BLANK_POINT = {
  basePrice: null,
  dateFrom: new Date('2022-01-01T00:00'),
  dateTo: new Date('2022-01-01T00:00'),
  offers: [],
  type: POINT_TYPES[0],
};

function createPointEditEventTypeItemsTemplate() {
  return POINT_TYPES.map((pointType, i) => `
    <div class="event__type-item">
      <input id="event-type-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}">
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${i}">${capitalizeFirstLetter(pointType)}</label>
    </div>
    `)
    .join('');
}

function createPointEditOffersDestinationTemplate(point, destination) {
  if (point.pointOffers.length === 0 && destination.name === '') {
    return '';
  }
  return (`
    <section class="event__details">
    ${(point.pointOffers.length > 0) ? `${createPointEditOffersTemplate(point)}` : ''}
    ${(destination.name !== '') ? `${createPointEditDestinationTemplate(destination)}` : ''}
    </section>
`);
}

function createPointEditOffersTemplate(point) {
  const pointAvaliableOfferIds = point.offersByType.find((o) => o.type === point.type).offers;

  const offersMarkup = pointAvaliableOfferIds.map((pointAvaliableOfferId, i) => {
    const offer = point.allOffers.find((o) => o.id === pointAvaliableOfferId);
    const checked = point.pointOffers.includes(offer.id) ? 'checked' : '';
    const eventInputName = `event-offer-${offer.title.toLowerCase().replaceAll(' ', '-')}`;
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i}" type="checkbox" name="${eventInputName}" ${checked}>
        <label class="event__offer-label" for="event-offer-${i}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
  }).join('');

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersMarkup}
      </div>
    </section>
  `);
}

function createPointEditDestinationTemplate(destination) {
  const photosTape = destination.pictures.length === 0 ? '' : `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`)}
      </div>
    </div>
  `;
  return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${photosTape}
    </section>
  `);
}

function createPointEditTemplate(point) {
  const isNewPoint = !('id' in point);
  if (isNewPoint) {
    point = { ...point, ...BLANK_POINT };
  }
  const { basePrice, dateFrom, dateTo, type } = point;
  const destination = isNewPoint ? { name: '' } : point.allDestinations.find((dest) => dest.id === point.destination);

  return (
    `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createPointEditEventTypeItemsTemplate(point)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice !== null ? basePrice : ''}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          ${isNewPoint ? `
          <button class="event__reset-btn" type="reset">Cancel</button>
          ` : `
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
          `}
        </header>
        ${createPointEditOffersDestinationTemplate(point, destination)}
      </form>
    </li>
    `
  );
}

export default class PointEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleCloseClick = null;

  constructor({ point, onFormSubmit, onDeleteClick, onCloseClick }) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCloseClick = onCloseClick;

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
  }

  get template() {
    return createPointEditTemplate(this._state);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #deleteClickHandler = () => {
    this.#handleDeleteClick();
  };

  #closeClickHandler = () => {
    this.#handleCloseClick();
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
