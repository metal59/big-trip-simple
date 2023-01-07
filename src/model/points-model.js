import Observable from '../framework/observable.js';
import { getPoints } from '../mock/point.js';

export default class PointsModel extends Observable{
  #points = getPoints();

  get points() {
    return this.#points;
  }
}
