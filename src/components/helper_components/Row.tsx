import { translation } from 'context';
import { FC } from 'react';
import styled from 'styled-components';

const Row: FC<{
  price?: string | number;
  percent?: string | number;
  type?: string;
}> = ({ price, percent = 0, type }) => (
  <StyledRow percent={Number(percent)}>
    <span>{translation(type)}</span>
    <span>${price ? Number(price)?.toFixed(3) : 0}</span>
    <span>{percent ? Number(percent)?.toFixed(3) : 0}%</span>
  </StyledRow>
);

const StyledRow = styled.div<{ percent: number }>`
  display: grid;
  grid-template-columns: 20% 40% auto;
  grid-gap: 7px;
  margin-bottom: 24px;
  align-items: center;
  background: transparent;

  > span:nth-child(1) {
    font-weight: 500;
  }
  > span:nth-child(2) {
    font-weight: 600;
  }
  > span:nth-child(2),
  > span:nth-child(1) {
    font-size: 1.6rem;
    line-height: 22px;
    color: ${({ theme }) => theme.light_gray};
  }
  > span:nth-child(3) {
    color: ${({ percent, theme }) =>
      percent === 0 ? theme.light_gray : +percent > 0 ? '#11A267' : '#E03131'};
    background-color: ${({ percent, theme }) =>
      percent === 0
        ? `${theme.light_gray}40`
        : percent > 0
        ? 'rgba(24, 214, 144, 0.3)'
        : 'rgba(224, 49, 49, 0.3)'};
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
    width: fit-content;
    padding: 0.4vmin 0.8vmin;
    border-radius: 8px;
  }
  > span:not(:first-child) {
    justify-self: end;
  }
  @media (max-width: 769px) {
    margin-bottom: 8px;
  }
`;

export default Row;
