const urlExists = url => {
  const http = new XMLHttpRequest();
  try {
    http.open('HEAD', url, false);
    http.send();
  } catch (error) {
    return false;
  }
  return http.status !== 404;
};

export default urlExists;
