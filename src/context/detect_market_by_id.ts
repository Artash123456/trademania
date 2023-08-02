import bybit from 'assets/images/bybit.svg';
import binance from 'assets/images/binance.svg';
import phemex from 'assets/images/phemex.svg';
export const detectMarketById = (id: number) => {
  if (id === 1) {
    return {
      name: 'Bybit',
      img: bybit,
    };
  }
  if (id === 2) {
    return {
      name: 'Binace',
      img: binance,
    };
  }
  if (id === 3) {
    return {
      name: 'Phemex',
      img: phemex,
    };
  }
  return {
    name: '',
    img: '',
  };
};
