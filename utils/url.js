export const getQueryValue = (key) => {
  var query = location.search.substring(1);
  var vars = query.split("&");

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == key) {
      return decodeURIComponent(pair[1]);
    }
  }

  return null;
};
