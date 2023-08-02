import { FC } from 'react';

const Account: FC<{ color?: string }> = ({ color = '#868E96' }) => (
  <svg
    width="20"
    height="19"
    viewBox="0 0 20 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.7396 17.8749C18.3402 15.4642 16.1001 13.6548 13.449 12.7937C14.7198 12.038 15.7073 10.886 16.2598 9.5147C16.8124 8.14338 16.8994 6.62856 16.5076 5.20297C16.1158 3.77737 15.2667 2.51986 14.0909 1.62361C12.915 0.727355 11.4775 0.241943 9.99899 0.241943C8.52052 0.241943 7.08295 0.727355 5.90711 1.62361C4.73128 2.51986 3.88222 3.77737 3.49038 5.20297C3.09853 6.62856 3.18558 8.14338 3.73815 9.5147C4.29071 10.886 5.27823 12.038 6.54899 12.7937C3.89783 13.6548 1.6578 15.4642 0.258366 17.8749C0.189658 17.9879 0.15332 18.1177 0.15332 18.2499C0.15332 18.3822 0.189658 18.5119 0.258366 18.6249C0.322469 18.7398 0.416399 18.8353 0.53025 18.9013C0.6441 18.9673 0.773652 19.0014 0.905241 18.9999H19.0927C19.2243 19.0014 19.3539 18.9673 19.4677 18.9013C19.5816 18.8353 19.6755 18.7398 19.7396 18.6249C19.8083 18.5119 19.8447 18.3822 19.8447 18.2499C19.8447 18.1177 19.8083 17.9879 19.7396 17.8749Z"
      fill={color}
    />
  </svg>
);

export default Account;