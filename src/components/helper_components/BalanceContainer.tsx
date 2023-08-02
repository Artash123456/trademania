import { FC } from 'react';
import styled from 'styled-components';

const BalanceContainer: FC<{
  elem: {
    balance: string;
    capital: string;
    reinvest: boolean;
    lower_price?: string;
    upper_price?: string;
    grids?: string;
    investment?: string;
    trigger_price?: string;
    take_profit?: string;
    stop_loss?: string;
  };
  showReinvest?: boolean;
}> = ({
  elem = {
    balance: 0,
    capital: 0,
    reinvest: false,
    lower_price: undefined,
    upper_price: undefined,
    grids: undefined,
    investment: undefined,
    trigger_price: undefined,
    take_profit: undefined,
    stop_loss: undefined,
  },
  showReinvest = true,
}) => {
  return (
    <StyledContainer>
      <div>{elem.balance}</div>
      <span>{elem.capital}</span>
      {elem.lower_price && <span>Lower price: {elem.lower_price}</span>}
      {elem.upper_price && <span>Upper price: {elem.upper_price}</span>}
      {elem.grids && <span>Grids: {elem.grids}</span>}
      {elem.investment && <span>Capital: {elem.investment}</span>}
      {elem.trigger_price && <span>Trigger price: {elem.trigger_price}</span>}
      {elem.take_profit && <span>Take profit: {elem.take_profit}</span>}
      {elem.stop_loss && <span>Stop loss: {elem.stop_loss}</span>}
      {showReinvest && (
        <span>{elem.reinvest ? 'Reinvest enabled' : 'Reinvest disabled'}</span>
      )}
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  display: grid;
  place-items: center;
  margin-top: 25px;
  > div {
    background: ${({ theme }) => theme.submit_button_background} 0% 0% no-repeat
      padding-box;
    font-size: 1.8rem;
    line-height: 3.3rem;
    font-weight: bold;
    letter-spacing: 0.9px;
    color: #ffffff;
    width: 80%;
    text-align: center;
    padding: 5px;
    min-height: 33px;
    margin-bottom: 5px;
  }
  > span {
    font: normal normal 500 1.4rem/21px Raleway;
    letter-spacing: 0.7px;
    color: ${({ theme }) => theme.submit_button_background};

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`;

export default BalanceContainer;
