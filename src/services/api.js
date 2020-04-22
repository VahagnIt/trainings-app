const url = "https://frontapi.inkin.com/getContests.php";

export const getCards = (search) => {
  return fetch(url + search).then((resp) => resp.json());
};
