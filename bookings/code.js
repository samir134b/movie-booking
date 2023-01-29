import {
  get as getFromLocalStorage,
  set as setInLocalStorage,
} from "../utils/local-storage.js";
import { bookingKey, userInfoKey } from "../constants/local-storage-keys.js";
import movies from "../data/movies.js";

const userInfo = getFromLocalStorage(userInfoKey);

if (!userInfo) {
  window.location.href = "../";
}

const logoutButton = document.querySelector("#logout_button");

const logout = () => {
  setInLocalStorage(userInfoKey, null);
  window.location.href = "../";
};

logoutButton.addEventListener("click", logout);

const renderTable = () => {
  const bookingInfo = getFromLocalStorage(bookingKey) || {};

  const movieIds = Object.keys(bookingInfo);

  movieIds.forEach((movieId, index) => {
    const movieBooking = bookingInfo[movieId];

    const bookedSeats = Object.keys(movieBooking);
    const seatsUserHasBooked = bookedSeats.filter(
      (seat) => movieBooking[seat] === userInfo.userName
    );

    const movie = movies.find((movie) => movie.id === parseInt(movieId));

    const row = document.createElement("tr");

    const rowNumberCell = document.createElement("td");
    rowNumberCell.textContent = index + 1;

    const movieNameCell = document.createElement("td");
    movieNameCell.textContent = movie.name;

    const seatsBookedCell = document.createElement("td");
    seatsBookedCell.textContent = seatsUserHasBooked.join(', ');

    row.appendChild(rowNumberCell);
    row.appendChild(movieNameCell);
    row.appendChild(seatsBookedCell);

    const tableBody = document.querySelector("#table_body");
    tableBody.appendChild(row);
  });
};

renderTable();
