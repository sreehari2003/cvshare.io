// import axiosClient from "axios";
// import Cookie from "js-cookie";
// import type { AxiosRequestConfig } from "axios";

const BASE = "http://localhost:3001/"

// POST request
export const CREATEUSER = BASE + "auth/users";
// PATCH REQUEST
export const UPDATESOCIAL = BASE + "auth/users/social";
// PATCH REQUEST
export const EDUCATION = BASE + "auth/users/education";
// POST request
export const COMPANY = BASE + "auth/users/company";




// const cookie = Cookie.get("jwtID") as string;

// const instance = axiosClient.create({
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json; charset=utf-8",
//         authorization: `Bearer ${cookie}`

//     },
// });

// instance.interceptors.request.use(
//     config => {
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );
