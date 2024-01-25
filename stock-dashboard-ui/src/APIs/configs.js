
const API_BASE_URL = 'http://localhost:5000/api/v1';

const API_PATHS = {
  STOCKS_SEARCH: `${API_BASE_URL}/stocks/search/`,
  WATCH_LIST: `${API_BASE_URL}/watchlist/`
};

const getAuthKey = () => {
    localStorage.setItem("AUTH_KEY", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiaWF0IjoxNzA2MDMwNzU3LCJleHAiOjE3MTQ2NzA3NTd9.7h47RR-d3wRzTZDAxMBmRxrnueymd1Qych4KLtZ61Yo');
    return localStorage.getItem("AUTH_KEY")
};

const getUserId = () => {
    localStorage.setItem("USER_ID", "9657bac4-39b0-4d66-b954-38b9fa55bdcd");
    return localStorage.getItem("USER_ID")
};

const AUTH_STORAGE_KEY = getAuthKey()
const USER_ID = getUserId()

export { API_PATHS, AUTH_STORAGE_KEY, USER_ID };
