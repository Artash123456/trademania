export const deepCopy = (value: any) => {
  if (!value) return;
  return JSON.parse(JSON.stringify(value));
};
