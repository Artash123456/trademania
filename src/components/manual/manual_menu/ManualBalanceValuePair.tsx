import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { translation, useAppSelector } from 'context';
import { calcTotalPrice } from 'redux/actions/trading_actions';
import { MarketSocketPrice } from 'context';
import { PairTypes } from '../../../types';

interface Props {
  symbol?: PairTypes;
  qty: string | number;
  input_price: number | string;
  market?: { name: string };
  isMarket?: boolean;
}

const ManualBalanceValuePair: FC<Props> = ({
  symbol,
  qty,
  input_price,
  market,
  isMarket = false,
}) => {
  const { balance } = useAppSelector(({ manual }) => manual);
  const pr = useMemo(() => {
    let pair = ' ';
    if (!market || !symbol) return '';
    if (symbol.base) pair = symbol.base;
    let num: string | number = 0;
    if (isMarket) {
      const { price } = MarketSocketPrice(market.name, symbol);
      if (!qty) return '';
      if (price) {
        num = calcTotalPrice(+qty, price, symbol.base?.startsWith('USD'));
        return num + ' ' + pair;
      } else if (input_price) {
        num = calcTotalPrice(+qty, input_price, symbol.base?.startsWith('USD'));
        return num + ' ' + pair;
      } else {
        return 'Loading...';
      }
    } else {
      num = calcTotalPrice(+qty, input_price, symbol.base?.startsWith('USD'));
      return num + ' ' + pair;
    }
  }, [market, symbol, input_price, isMarket, qty]);
  return (
    <>
      <StyledRow>
        <span>{translation('order_value')}</span>
        <span>{pr} </span>
      </StyledRow>
      <StyledRow>
        <span>{translation('available_balance')}</span>
        <span>
          {Number(balance?.coin)?.toFixed(8)} {symbol?.base}
        </span>
      </StyledRow>
    </>
  );
};

const StyledRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  span {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    color: ${({ theme }) => theme.font_gray} !important;
    margin-bottom: 16px;
  }
`;
export default ManualBalanceValuePair;
