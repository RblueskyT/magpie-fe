const defaultNavbarBtnStyle = {
  borderColor: '#ffffff',
  color: '#4e5969',
  fontSize: '24px',
};
const hoverNavbarBtnStyle = {
  borderColor: '#ffffff',
  color: '#4e5969',
  fontSize: '26px',
};
const homeDefaultNavbarBtnStyle = {
  borderColor: '#f73131',
  color: '#ffffff',
  fontSize: '24px',
};
const homeHoverNavbarBtnStyle = {
  borderColor: '#f73131',
  color: '#ffffff',
  fontSize: '26px',
};

export function changeBtnStyle(hoverFlag: boolean) {
  if (hoverFlag === false) {
    return defaultNavbarBtnStyle;
  }
  return hoverNavbarBtnStyle;
}

export function changeBtnStyleHome(hoverFlag: boolean) {
  if (hoverFlag === false) {
    return homeDefaultNavbarBtnStyle;
  }
  return homeHoverNavbarBtnStyle;
}
