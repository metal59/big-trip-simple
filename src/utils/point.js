import dayjs from 'dayjs';

const getWeightForNullParam = (a, b) => {
  if (a === null && b === null) {
    return 0;
  }

  if (a === null) {
    return 1;
  }

  if (b === null) {
    return -1;
  }

  return null;
};

const sortDate = (pointA, pointB) => {
  const weight = getWeightForNullParam(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPrice = (pointA, pointB) => {
  const weight = getWeightForNullParam(pointA.basePrice, pointB.basePrice);

  return weight ?? pointB.basePrice - pointA.basePrice;
};

const pointAvaliableOfferIds = (point, pointCommon) => pointCommon.offersByType.find((o) => o.type === point.type).offers;

const calculateTotalPrice = (point, pointCommon) => {
  let price = point.basePrice;
  point.selectedOffers.map((selectedOfferId) => {
    const offer = pointCommon.allOffers.find((o) => o.id === selectedOfferId);
    price += offer.price;
  });
  return price;
};

export { sortDate, sortPrice, pointAvaliableOfferIds, calculateTotalPrice };
