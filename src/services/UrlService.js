export const toObjectFromURL = (search) => {
  let obj = {};
  let arr = search.slice(1).split("&");
  arr.forEach((el) => {
    let arrFrom = el.split("=");
    obj[arrFrom[0]] = arrFrom[1];
  });
  return obj;
};
export const generateSearchURL = (obj) => {
  let path = "?";
  for (let key in obj) {
    obj[key] && (path += `${key}=${obj[key]}&`);
  }
  return path.slice(0, -1);
};
