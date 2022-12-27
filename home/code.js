import { userInfoKey } from "../constants/local-storage-keys.js";
import {
  get as getFromLocalStorage,
  set as setInLocalStorage,
} from "../utils/local-storage.js";
import movies from "../data/movies.js";

const userInfo = getFromLocalStorage(userInfoKey);

if (!userInfo) {
  window.location.href = "/";
}

const logoutButton = document.querySelector("#logout_button");

const logout = () => {
  setInLocalStorage(userInfoKey, null);
  window.location.href = "/";
};

logoutButton.addEventListener("click", logout);

const moviesContainer = document.querySelector("#movies_container");

const renderMovies = () => {
  movies.forEach((movie) => {
    const container = document.createElement("div");
    container.classList.add("col-4");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.src = movie.imageURL;
    cardImage.alt = "Movie Cover";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.textContent = movie.title;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = movie.description;

    const cardLink = document.createElement("a");
    cardLink.classList.add("btn", "btn-dark");
    cardLink.href = `/movie?movieId=${movie.id}`;
    cardLink.textContent = "Book now";

    moviesContainer.appendChild(container);

    container.appendChild(card);

    card.appendChild(cardImage);
    card.appendChild(cardBody);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardLink);
  });
};

renderMovies();
