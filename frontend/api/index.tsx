import Axios from 'axios';

export const BASE = 'http://localhost:3001';
// GET REQ WITH BEARER TOKEN
export const VERIFYJWT = `${BASE}auth/me`;

// POST request
export const CREATEUSER = `/auth/users`;
// PATCH REQUEST
export const UPDATESOCIAL = `/auth/users/social`;
// PATCH REQUEST
export const EDUCATION = '/auth/users/education';
// POST request
export const COMPANY = '/auth/users/company';
// PATCH REQUEST
export const USERNAME = '/auth/users/username';

const urls = {
  test: `http://localhost:3001/`,
  development: 'http://localhost:3001/',
};
export const api = Axios.create({
  baseURL: urls.development,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
