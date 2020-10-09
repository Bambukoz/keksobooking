'use strict';

const TITLES = [
  `Пустой сруб`,
  `Кирпичный завод`,
  `Просторная улица`,
  `Крыша небоскреба`,
  `Подвал с бомжами`,
  `Кабинет министров`,
  `Буддийский храм`,
  `Социальное дно`
];
const DESCRIPTIONS = [
  `Прекрасный вид из единственного окна на самого себя`,
  `Сдам срочно! Дешево! Без посредников!`,
  `Я мимо проходил`,
  `Го ко мне, я создал`
];
const PHOTOS_LINK = `http://o0.github.io/assets/images/tokyo/`;
const PHOTOS = [
  `hotel1.jpg`,
  `hotel2.jpg`,
  `hotel3.jpg`
];
const TIMES = [
  `12:00`,
  `13:00`,
  `14:00`
];
const ROOMS = [
  1,
  2,
  3,
  100
];
const Pin = {
  AMOUNT: 8,
  WIDTH: 50,
  HEIGHT: 70
};
const Price = {
  MIN: 1000,
  MAX: 10000
};
const Coordinate = {
  X_MIN: 0,
  X_MAX: 980,
  Y_MIN: 130,
  Y_MAX: 630,
};
const Guest = {
  MIN: 1,
  MAX: 3
};
const FEATURE_CLASS = `popup__feature`;
const features = {
  wifi: FEATURE_CLASS + `--wifi`,
  dishwasher: FEATURE_CLASS + `--dishwasher`,
  parking: FEATURE_CLASS + `--parking`,
  washer: FEATURE_CLASS + `--washer`,
  elevator: FEATURE_CLASS + `--elevator`,
  conditioner: FEATURE_CLASS + `--conditioner`
};
const typesOfHousing = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
const KeyButtons = {
  MOUSE_LEFT: 0,
  ENTER: `Enter`,
  ESCAPE: `Escape`
};

const map = document.querySelector(`.map`);
const pinList = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const photoTemplate = document.querySelector(`#photo`).content;
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

const getRandomNumber = (number) => Math.floor(Math.random() * number);
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArr = (arr, number, string) => {
  const randomArr = [];
  for (let i = 0; i < number; i++) {
    if (string === undefined) {
      randomArr.push(arr[getRandomNumber(arr.length)]);
    } else {
      randomArr.push(string + arr[getRandomNumber(arr.length)]);
    }
  }
  return Array.from(new Set(randomArr));
};

const getCards = (quantity) => {
  const cards = [];
  for (let i = 0; i < quantity; i++) {
    const locationX = getRandomRange(Coordinate.X_MIN, Coordinate.X_MAX);
    const locationY = getRandomRange(Coordinate.Y_MIN, Coordinate.Y_MAX);
    cards.push(
        {
          author: {
            avatar: `img/avatars/user0${i + 1}.png`,
          },
          offer: {
            title: TITLES[i],
            address: `${locationX}, ${locationY}`,
            price: getRandomRange(Price.MIN, Price.MAX),
            type: getRandomElement(Object.keys(typesOfHousing)),
            rooms: getRandomElement(ROOMS),
            guests: getRandomRange(Guest.MIN, Guest.MAX),
            checkin: getRandomElement(TIMES),
            checkout: getRandomElement(TIMES),
            features: getRandomArr(Object.keys(features), getRandomNumber(Object.keys(features).length)),
            description: getRandomElement(DESCRIPTIONS),
            photos: getRandomArr(PHOTOS, getRandomNumber(PHOTOS.length), PHOTOS_LINK)
          },
          location: {
            x: locationX,
            y: locationY
          }
        }
    );
  }
  return cards;
};

const getRenderPin = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = `${pin.location.x + Pin.WIDTH / 2}px`;
  pinElement.style.top = `${pin.location.y + Pin.HEIGHT}px`;
  pinElement.querySelector(`img`).src = pin.author.avatar;
  pinElement.querySelector(`img`).alt = pin.offer.title;
  return pinElement;
};

const createPins = (pins) => {
  const fragment = document.createDocumentFragment();
  for (let pin of pins) {
    const renderPin = getRenderPin(pin);
    fragment.append(renderPin);
    renderPin.addEventListener(`click`, () => {
      createCard(pin);
    });
  }
  pinList.append(fragment);
};

const getWordsEndings = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

const getRenderFeature = (featureData) => {
  const newFeature = document.createElement(`li`);
  newFeature.className = `${FEATURE_CLASS} ${features[featureData]}`;
  return newFeature;
};

const getRenderPhoto = (photoData) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector(`img`).src = photoData;
  return photoElement;
};

const getRenderCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const featuresList = cardElement.querySelector(`.popup__features`);
  const photosList = cardElement.querySelector(`.popup__photos`);
  document.addEventListener(`keydown`, onEscBtnClick);
  cardElement.querySelector(`.popup__close`).addEventListener(`click`, onCloseBtnClick);
  cardElement.querySelector(`.popup__avatar`).src = cardData.author.avatar;
  cardElement.querySelector(`.popup__title`).textContent = cardData.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = cardData.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${cardData.offer.price} ₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = typesOfHousing[cardData.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${cardData.offer.rooms} ${getWordsEndings(cardData.offer.rooms, [`комната`, `комнаты`, `комнат`])} для ${cardData.offer.guests} ${getWordsEndings(cardData.offer.guests, [`гостя`, `гостей`])}`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;

  for (let i = 0; i < cardData.offer.features.length; i++) {
    featuresList.append(getRenderFeature(cardData.offer.features[i]));
  }

  for (let i = 0; i < cardData.offer.photos.length; i++) {
    photosList.append(getRenderPhoto(cardData.offer.photos[i]));
  }

  cardElement.querySelector(`.popup__description`).textContent = cardData.offer.description;
  return cardElement;
};

const onEscBtnClick = (evt) => {
  if (evt.key === KeyButtons.ESCAPE) {
    evt.preventDefault();
    map.querySelector(`.popup`).remove();
    document.removeEventListener(`keydown`, onEscBtnClick);
  }
};

const onCloseBtnClick = (evt) => {
  evt.target.parentElement.remove();
  evt.target.removeEventListener(`click`, onCloseBtnClick);
};

const createCard = (card) => {
  const popup = map.querySelector(`.popup`);
  if (map.contains(popup)) {
    popup.remove();
  }
  map.append(getRenderCard(card));
};

const mainPin = map.querySelector(`.map__pin--main`);
const form = document.querySelector(`.ad-form`);
const formFieldset = form.querySelectorAll(`fieldset`);
const RoomsForGuests = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};
const MinPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const disabledForm = (bool) => {
  formFieldset.forEach((element) => {
    element.disabled = bool;
  });
};

disabledForm(true);

const getMainAddressX = () => parseInt(mainPin.style.left, 10) + Pin.WIDTH / 2;
const getMainAddressY = () => parseInt(mainPin.style.top, 10) + Pin.HEIGHT;

const setMainAddress = () => {
  form.address.value = `${getMainAddressX()}, ${getMainAddressY()}`;
};
// ###########

const onTypeChange = () => {
  form.price.min = `${MinPrices[form.type.value]}`;
  form.price.placeholder = `${MinPrices[form.type.value]}`;
};

const onCapacityChange = () => {
  const validationMessage = !RoomsForGuests[form.rooms.value].includes(form.capacity.value) ?
    `Несоответствие количества комнат количеству гостей` :
    ``;
  form.capacity.setCustomValidity(validationMessage);
  form.capacity.reportValidity();
};

const onTimeChange = (evt) => {
  if (evt.target === form.timein) {
    form.timeout.value = evt.target.value;
  } else {
    form.timein.value = evt.target.value;
  }
};
// ###########

const onMainPinClick = (evt) => {
  if (evt.button === KeyButtons.MOUSE_LEFT || evt.key === KeyButtons.ENTER) {
    map.classList.remove(`map--faded`);
    createPins(getCards(Pin.AMOUNT));
    activateForm();
    setMainAddress();
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinClick);
  }
};

const activateForm = () => {
  form.classList.remove(`ad-form--disabled`);
  disabledForm(false);
  form.addEventListener(`change`, onFormElementChange);
};

const onFormElementChange = (evt) => {
  switch (evt.target) {
    case form.type:
      onTypeChange();
      break;
    case form.rooms:
    case form.capacity:
      onCapacityChange();
      break;
    case form.timein:
    case form.timeout:
      onTimeChange(evt);
      break;
  }
};

mainPin.addEventListener(`mousedown`, onMainPinClick);
mainPin.addEventListener(`keydown`, onMainPinClick);
