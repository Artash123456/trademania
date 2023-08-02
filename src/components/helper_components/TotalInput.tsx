import { useMemo, FC } from 'react';
import styled from 'styled-components';
import { translation, MarketSocketPrice } from 'context';
import { calcTotalPrice } from 'redux/actions/trading_actions';
import { PairTypes } from 'types';

interface Props {
  label: string;
  input_price: number | string;
  qty: number | string;
  market: {
    name: string;
    id: string | number;
  };
  symbol: PairTypes;
  isMarket?: boolean;
}

const TotalInput: FC<Props> = ({
  label,
  input_price,
  qty = 0,
  market,
  symbol,
  isMarket = false,
}) => {
  const pr = useMemo(() => {
    let pair = ' ';
    if (!market || !symbol) return '';
    if (symbol.base) pair = symbol.base;
    let num: number | string = 0;
    if (isMarket) {
      const { price } = MarketSocketPrice(market.name, symbol);
      if (!qty) return '';
      if (price) {
        num = calcTotalPrice(+qty, price);
        return num + ' ' + pair;
      } else if (input_price) {
        num = calcTotalPrice(+qty, input_price);
        return num + ' ' + pair;
      } else {
        return 'Loading...';
      }
    } else {
      num = calcTotalPrice(+qty, input_price);
      return num + ' ' + pair;
    }
  }, [market, symbol, input_price, isMarket, qty]);

  return (
    <StyledLabel>
      <span>{translation(label)}</span>
      <div>{pr || 0}</div>
    </StyledLabel>
  );
};
const StyledLabel = styled.label`
  > span {
    color: ${({ theme }) => theme.light_gray};
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  }
  > div {
    margin-top: 8px;
    width: 100%;
    min-height: 56px;
    padding-right: 15px;
    background: ${({ theme }) => theme.dark_input};
    color: ${({ theme }) => theme.light_gray};
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    padding-left: 16px;

    > div {
      padding-left: 16px;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 22px;
      position: relative;
      &:before {
        content: '';
        display: block;
        position: absolute;
        width: 1px;
        background-color: ${({ theme }) => theme.light_gray};
        height: 56px;
        left: 0;
        top: 50%;
        transform: translatey(-50%);
      }
    }
  }
`;
export default TotalInput;
