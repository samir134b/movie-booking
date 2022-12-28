import { bookingKey, userInfoKey } from "../constants/local-storage-keys.js";
import {
  get as getFromLocalStorage,
  set as setInLocalStorage,
} from "../utils/local-storage.js";
import movies from "../data/movies.js";

const userInfo = getFromLocalStorage(userInfoKey);

if (!userInfo) {
  window.location.href = "../";
}

const movieId = 2;

const bookingInfo = getFromLocalStorage(bookingKey);
const movieBookingInfo = bookingInfo[movieId] || {};

const logoutButton = document.querySelector("#logout_button");

const logout = () => {
  setInLocalStorage(userInfoKey, null);
  window.location.href = "../";
};

logoutButton.addEventListener("click", logout);

const movie = movies.find((movie) => movie.id === movieId);

const heading = document.querySelector("#heading");
heading.textContent = `You are booking tickets for ${movie.name}`;

const seatsContainer = document.querySelector("#seats");

let selectedSeats = [];

const renderSeats = () => {
  for (let i = 0; i < 4; i++) {
    const seatImage = document.createElement("img");

    const isSeatBooked = Boolean(movieBookingInfo[i]);

    seatImage.src = isSeatBooked
      ? "/icons/seat-solid-red.svg"
      : "/icons/seat-outlined.svg";

    seatImage.width = 50;
    seatImage.height = 50;
    seatImage.onclick = () => {
      if (selectedSeats.includes(i)) {
        selectedSeats = selectedSeats.filter((seatID) => seatID !== i);
        seatImage.src = "/icons/seat-outlined.svg";
        return;
      }

      selectedSeats.push(i);
      seatImage.src = "/icons/seat-solid-black.svg";
    };

    seatsContainer.appendChild(seatImage);
  }
};

renderSeats();

const successAlert = document.querySelector("#success_alert");

const bookSeats = () => {
  const bookingMovieObject = {};

  selectedSeats.forEach((seatID) => {
    bookingMovieObject[seatID] = userInfo.userName;
  });

  const bookingObject = {
    [movieId]: bookingMovieObject,
  };

  setInLocalStorage(bookingKey, bookingObject);

  successAlert.classList.remove("d-none");
};

const bookButton = document.querySelector("#book_button");
bookButton.addEventListener("click", bookSeats);
