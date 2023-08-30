import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "d797451f-0da2-4c45-979e-cf3570954901",
  },
});

export const instanceSearch = axios.create({
  withCredentials: false,
  baseURL: "https://api.github.com/search/",
});
