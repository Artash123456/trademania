import { useAppSelector } from 'context';
import { FC } from 'react';
import styled from 'styled-components';
interface Props {
  onClickBuy: (name: string) => void;
  onClickSell: (name: string) => void;
  type?: 'submit' | 'button';
}
const BuySellButtons: FC<Props> = ({
  onClickBuy,
  onClickSell,
  type = 'submit',
}) => {
  const { pending } = useAppSelector(({ loading }) => loading);
  return (
    <StyledGroup>
      <button type={type} disabled={pending} onClick={() => onClickBuy('Buy')}>
        Buy/Long
      </button>
      <button
        type={type}
        disabled={pending}
        onClick={() => onClickSell('Sell')}
      >
        Sell/Short
      </button>
    </StyledGroup>
  );
};

const StyledGroup = styled.div`
  height: 35px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 16px;
  margin-top: 24px;
  margin-bottom: 4px;
  > button {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 19px;
    color: #fff;
    border-radius: 8px;
    border: none;
    outline: none;
  }
  > button:first-child {
    background-color: #18d690;
  }
  > button:last-child {
    background-color: #e03131;
  }
`;
export default BuySellButtons;
