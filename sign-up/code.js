import { get, set } from "../utils/local-storage.js";
import { userInfoKey, usersKey } from "../constants/local-storage-keys.js";

const userInfo = get(userInfoKey);
if (userInfo) {
  // window.location.href = "/home.html";
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

  let isValid = true;

  if (userName === "") {
    userNameInput.classList.add("is-invalid");
    invalidFeedbackForUserName.innerText = "Username is required";
    isValid = false;
  }

  if (password === "") {
    passwordInput.classList.add("is-invalid");
    invalidFeedbackForPassword.innerText = "Password is required";
    isValid = false;
    return;
  }

  if (password.length < 6) {
    passwordInput.classList.add("is-invalid");
    invalidFeedbackForPassword.innerText =
      "Password must be at least 6 characters";
    isValid = false;
    return;
  }

  if (password !== confirmPassword) {
    passwordInput.classList.add("is-invalid");
    confirmPasswordInput.classList.add("is-invalid");

    invalidFeedbackForPassword.innerText = "Password does not match";
    invalidFeedbackForConfirmPassword.innerText = "Password does not match";

    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const users = get(usersKey) || [];

  const isUserNameTaken = users.some((user) => user.userName === userName);

  if (isUserNameTaken) {
    userNameInput.classList.add("is-invalid");
    invalidFeedbackForUserName.innerText = "Username is already taken";
    return;
  }

  const userObj = {
    userName,
    password,
  };

  set(usersKey, [...users, userObj]);
  window.location.href = "/";
};

const signupButton = document.querySelector("#signup_button");
signupButton.addEventListener("click", onSignUpClick);
