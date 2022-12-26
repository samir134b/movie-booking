import { userInfoKey } from "../constants/local-storage-keys.js";
import {
  get as getFromLocalStorage,
  set as setInLocalStorage,
} from "../utils/local-storage.js";

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
