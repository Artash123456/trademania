const createUrl = (name: string, asImgSrc?: boolean) => {
  if (!name) return '';
  const url = `${import.meta.env.VITE_PAIR_LOGOS}${name.toLowerCase()}.png`;
  if (asImgSrc) return url;
  return `url(${url})`;
};

function doesFileExist(urlToFile: string) {
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', createUrl(urlToFile, true), false);
  xhr.send();
  return xhr.status !== 404;
}
export const getImage = (
  name: string,
  asImgSrc?: boolean,
  withRequest?: boolean
) => {
  if (withRequest) {
    return createUrl(name, asImgSrc);
  }
  if (doesFileExist(name)) {
    return createUrl(name, asImgSrc);
  } else {
    return createUrl('no_image', asImgSrc);
  }
};
