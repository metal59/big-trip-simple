import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointCommonModel extends Observable {
  #pointCommonApiService = null;
  #pointCommon = null;

  constructor({ pointCommonApiService }) {
    super();
    this.#pointCommonApiService = pointCommonApiService;
  }

  get pointCommon() {
    return this.#pointCommon;
  }

  async init() {
    let allOffers, allDestinations;
    try {
      [allOffers, allDestinations] = await Promise.all([
        this.#pointCommonApiService.offers,
        this.#pointCommonApiService.destinations
      ]);
    } catch (err) {
      allOffers = [];
      allDestinations = [];
    }
    this.#pointCommon = { allOffers, allDestinations };

    this._notify(UpdateType.INIT_POINT_COMMON);
  }
}
