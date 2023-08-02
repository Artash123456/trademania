import { FC } from 'react';

const Burger: FC<{ color?: string }> = ({ color = '#868E96' }) => (
  <svg
    id="Component_17_1"
    data-name="Component 17 – 1"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="13.75"
    viewBox="0 0 20 13.75"
  >
    <rect
      id="Rectangle_397"
      data-name="Rectangle 397"
      width="20"
      height="2.5"
      rx="1.25"
      transform="translate(0 5.625)"
      fill={color}
    />
    <rect
      id="Rectangle_398"
      data-name="Rectangle 398"
      width="20"
      height="2.5"
      rx="1.25"
      fill={color}
    />
    <rect
      id="Rectangle_399"
      data-name="Rectangle 399"
      width="20"
      height="2.5"
      rx="1.25"
      transform="translate(0 11.25)"
      fill={color}
    />
  </svg>
);

export default Burger;
