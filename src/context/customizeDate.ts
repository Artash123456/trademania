export const customizeDate = (date: string | null) => {
  if (!date) return '';
  const myDate = new Date(new Date(date).getTime() + 14400000);
  const obj = {
    month: '',
    day: '',
    year: 0,
  };
  const day = myDate.getDate();
  const month = myDate.getMonth() + 1;
  obj.day = day < 10 ? '0' + day : String(day);
  obj.month = month < 10 ? '0' + month : String(month);
  obj.year = myDate.getFullYear();
  return `${obj.day}-${obj.month}-${obj.year}`;
};
