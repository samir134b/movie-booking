import { get, set } from "./utils/local-storage.js";
import { usersKey, userInfoKey } from "./constants/local-storage-keys.js";

const userNameInput = document.querySelector("#user_name_input");
const passwordInput = document.querySelector("#password_input");

const invalidFeedbackForUserName = document.querySelector(
  ".user-name-invalid-feedback"
);
const invalidFeedbackForPassword = document.querySelector(
  ".password-invalid-feedback"
);

const loginButton = document.querySelector("#login_button");

const login = () => {
  const userName = userNameInput.value;
  const password = passwordInput.value;

  userNameInput.classList.remove("is-invalid");
  passwordInput.classList.remove("is-invalid");

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
  }

  if (!isValid) {
    return;
  }

  const users = get(usersKey) || [];

  const user = users.find(
    (user) => user.userName === userName && user.password === password
  );

  if (!user) {
    userNameInput.classList.add("is-invalid");
    invalidFeedbackForUserName.innerText = "Username or password is invalid";

    passwordInput.classList.add("is-invalid");
    invalidFeedbackForPassword.innerText = "Username or password is invalid";

    return;
  }

  set(userInfoKey, user);
};

loginButton.addEventListener("click", login);
