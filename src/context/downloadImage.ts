export const downloadImage = (url: string, name: string) => {
  const aTag = document.createElement("a");
  aTag.href = url;
  aTag.download = name;
  aTag.click();
};
