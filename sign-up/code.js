import {
  get as getFromLocalStorage,
  set as setInLocalStorage,
} from "../utils/local-storage.js";
import { userInfoKey, usersKey } from "../constants/local-storage-keys.js";

const userInfo = getFromLocalStorage(userInfoKey);

if (userInfo) {
  window.location.href = "../home";
}

const userNameInput = document.querySelector("#user_name_input");
const passwordInput = document.querySelector("#password_input");
const confirmPasswordInput = document.querySelector("#confirm_password_input");

const invalidFeedbackForUserName = document.querySelector(
  ".user-name-invalid-feedback"
);
const invalidFeedbackForPassword = document.querySelector(
  ".password-invalid-feedback"
);
const invalidFeedbackForConfirmPassword = document.querySelector(
  ".confirm-password-invalid-feedback"
);

const onSignUpClick = () => {
  const userName = userNameInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  userNameInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");
  confirmPasswordInput.classList.remove("is-invalid");

  let isFormValid = true;

  if (userName === "") {
    userNameInput.classList.add("is-invalid");
    invalidFeedbackForUserName.innerText = "Username is required";
    isFormValid = false;
  }

  if (password === "") {
    passwordInput.classList.add("is-invalid");
    invalidFeedbackForPassword.innerText = "Password is required";
    isFormValid = false;
    return;
  }

  const users = getFromLocalStorage(usersKey) || [];

  const isUserNameTaken = users.some((user) => user.userName === userName);

  if (isUserNameTaken) {
    userNameInput.classList.add("is-invalid");
    invalidFeedbackForUserName.innerText = "Username is already taken";
    isFormValid = false;
  }

  if (password.length < 6) {
    passwordInput.classList.add("is-invalid");
    invalidFeedbackForPassword.innerText =
      "Password must be at least 6 characters";
    isFormValid = false;
    return;
  }

  if (password !== confirmPassword) {
    passwordInput.classList.add("is-invalid");
    confirmPasswordInput.classList.add("is-invalid");

    invalidFeedbackForPassword.innerText = "Password does not match";
    invalidFeedbackForConfirmPassword.innerText = "Password does not match";

    isFormValid = false;
  }

  if (!isFormValid) {
    return;
  }

  const userObj = {
    userName,
    password,
  };

  setInLocalStorage(usersKey, [...users, userObj]);
  window.location.href = "../";
};

const signupButton = document.querySelector("#signup_button");
signupButton.addEventListener("click", onSignUpClick);
