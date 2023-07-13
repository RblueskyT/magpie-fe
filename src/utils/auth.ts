const TOKEN_KEY = 'token';
const GROUP_KEY = 'group';

const isLogon = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const getGroup = () => {
  return localStorage.getItem(GROUP_KEY);
};

const setGroup = (group: string) => {
  localStorage.setItem(GROUP_KEY, group);
};

const clearGroup = () => {
  localStorage.removeItem(GROUP_KEY);
};

export {
  isLogon,
  getToken,
  setToken,
  clearToken,
  getGroup,
  setGroup,
  clearGroup,
};
