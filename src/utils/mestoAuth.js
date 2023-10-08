import { setToken } from "./token";

export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      //   'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    // .then((data) => {data})
  //   .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data.token)
      //return setToken(data.jwt)
      if (data.token) {
        // console.log(data.token)
        //setToken(data.jwt);
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        return;
      }
    });
  //   .catch(err => console.log(err))
};

export const getContent = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      //   'Accept': 'application/json',
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
