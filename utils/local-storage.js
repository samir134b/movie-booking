export const get = (key) => {
  const jsonString = localStorage.getItem(key);

  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
};

export const set = (key, value) => {
  const jsonString = JSON.stringify(value);
  localStorage.setItem(key, jsonString);
};
