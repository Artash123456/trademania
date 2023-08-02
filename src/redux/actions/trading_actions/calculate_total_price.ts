export const calcTotalPrice = (
  qty: number,
  price: string | number,
  isUsd?: boolean
) => {
  if (!qty || !price) return 0;
  let num: number = 0;
  if (isUsd) {
    return qty;
  }
  num = qty / Number(price);
  return Number(num).toFixed(5);
};
