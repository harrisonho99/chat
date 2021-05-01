import Cookie from 'js-cookie';
const TOKEN = 'persistToken';
function setTokenIntoCookie(token) {
  Cookie.set(TOKEN, 'Bearer ' + token, { expires: 1 });
}

function getTokenFromCookie() {
  return Cookie.get(TOKEN);
}

export { setTokenIntoCookie, getTokenFromCookie };
