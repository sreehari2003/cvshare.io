import Axios from "axios";

const BASE = "http://localhost:3001/";
// GET REQ WITH BEARER TOKEN
export const VERIFYJWT = BASE + "auth/me";

// POST request
export const CREATEUSER = BASE + "auth/users";
// PATCH REQUEST
export const UPDATESOCIAL = BASE + "auth/users/social";
// PATCH REQUEST
export const EDUCATION = BASE + "auth/users/education";
// POST request
export const COMPANY = BASE + "auth/users/company";
// PATCH REQUEST
export const USERNAME = BASE + "auth/users/username";

let urls = {
  test: `http://localhost:3001/`,
  development: "http://localhost:3001/",
};
export const api = Axios.create({
  baseURL: urls.development,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
