import { useState, FC } from 'react';
import styled from 'styled-components';

const PercentSelector: FC<{
  arr: number;
  onClick?: (elem: number) => void;
}> = ({ arr, onClick }) => {
  const [active, setActive] = useState<null | number>(null);
  const values: { [key: number]: number[] } = {
    1: [25, 50, 75, 100, 150, 200],
    2: [5, 10, 15, 25, 30, 50],
  };
  const handleClick = (elem: number) => {
    setActive(elem);
    if (onClick) return onClick(elem);
  };
  return (
    <StyledSlider>
      {values[arr].map((elem) => (
        <div
          key={elem}
          className={active === elem ? 'active' : ''}
          onClick={() => handleClick(elem)}
        >
          {elem}%
        </div>
      ))}
    </StyledSlider>
  );
};
const StyledSlider = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  background: ${({ theme }) => theme.dark_input};
  margin-top: 6px;
  > div {
    color: ${({ theme }) => theme.font_gray};
    cursor: pointer;
    width: 100%;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    text-align: center;
    border-radius: 0;
    &:not(:last-child) {
      border-right: 1px solid ${({ theme }) => theme.font_gray};
    }
  }
  > .active {
    background: ${({ theme }) => theme.background_color};
    color: ${({ theme }) => theme.light_gray};
  }
`;
export default PercentSelector;
