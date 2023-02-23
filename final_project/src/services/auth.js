import axios from "axios";

const BASE_URL = "https://final-project-server-production.up.railway.app";
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

// Check if the user is already authenticated and retrieve the access token
const accessT = window.localStorage.getItem(ACCESS_TOKEN)
  ? `Bearer ${window.localStorage.getItem(ACCESS_TOKEN)}`
  : null;

// Create an instance of axios with headers for the authentication token
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: accessT,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Create an instance of axios for token requests
const tokenRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Log in the user and store the access and refresh tokens in local storage
const loginUser = (username, password) => {
  const loginBody = { username: username, password: password };

  return tokenRequest
    .post(`/api/token/`, loginBody)
    .then((response) => {
      window.localStorage.setItem(ACCESS_TOKEN, response.data.access);
      window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

// Refresh the user's access token using the refresh token
const refreshToken = () => {
  const refreshBody = { refresh: window.localStorage.getItem(REFRESH_TOKEN) };
  return tokenRequest
    .post(`/api/token/refresh/`, refreshBody)
    .then((response) => {
      window.localStorage.setItem(ACCESS_TOKEN, response.data.access);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

// Check if the error is a 401 Unauthorized error
const isUnauthorizedError = (status) => {
  return status === 401;
};

// Create an instance of axios for authenticated requests
const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: accessT,
    "Content-Type": "application/json",
  },
});

// Intercept any 401 Unauthorized errors and attempt to refresh the access token
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const status = error.response.status;
    if (isUnauthorizedError(status)) {
      return refreshToken()
        .then((data) => {
          const headerAuthorization = `Bearer ${window.localStorage.getItem(
            ACCESS_TOKEN
          )}`;
          authApi.defaults.headers["Authorization"] = headerAuthorization;
          originalRequest.headers["Authorization"] = headerAuthorization;
          return authApi(originalRequest);
        })
        .catch((error) => {
          logoutUser();
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

// Log out the user and remove the access and refresh tokens from local storage
const logoutUser = () => {
  window.localStorage.removeItem(ACCESS_TOKEN);
  window.localStorage.removeItem(REFRESH_TOKEN);
  authApi.defaults.headers["Authorization"] = null;
};

export { tokenRequest, loginUser, logoutUser, refreshToken, authApi };
export default api;
