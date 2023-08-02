import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'context';
import { fetchPortfolioChange, countSpot } from 'redux/actions/spot_actions';
import card_image from 'assets/images/green-card.svg';
const SpotOverview = () => {
  const dispatch = useAppDispatch();
  const {
    totalBalance,
    portfolio_change,
    activeMarket,
    spot_list,
    spot_overview,
  } = useAppSelector(({ spot }) => spot);
  useEffect(() => {
    if (activeMarket?.id) {
      dispatch(fetchPortfolioChange(activeMarket));
    }
  }, [dispatch, activeMarket]);

  const totalPnl = useMemo(() => {
    let total = 0;
    if (spot_overview && spot_list?.[activeMarket.name]?.length)
      for (let i of spot_list[activeMarket.name])
        total += +countSpot(i, spot_overview);

    return total;
  }, [spot_list, spot_overview, activeMarket.name]);
  return (
    <StyledOverView card={card_image}>
      <div className="total balance flex-column">
        <span>${Number(totalBalance).toLocaleString()}</span>
        <span>Total Balance</span>
      </div>
      <div className="total pnl flex-column">
        <span>${Number(totalPnl).toLocaleString()}</span>
        <span>Total profit loss</span>
      </div>

      <div className="portfolio-change">
        <div className="flex-column">
          <span>$ {Number(portfolio_change?.day).toLocaleString()}</span>
          <span>24 Hours</span>
        </div>
        <div className="flex-column">
          <span>$ {Number(portfolio_change?.week).toLocaleString()}</span>
          <span>7 Days</span>
        </div>
        <div className="flex-column">
          <span>$ {Number(portfolio_change?.month).toLocaleString()}</span>
          <span>1 Month</span>
        </div>
        <div className="flex-column">
          <span>$ {Number(portfolio_change?.year).toLocaleString()}</span>
          <span>1 Year</span>
        </div>
      </div>
    </StyledOverView>
  );
};

const StyledOverView = styled.div<{ card?: string }>`
  display: grid;
  grid-template-columns: 20% 20% auto;
  grid-column-gap: 32px;
  min-height: 160px;

  .flex-column {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: space-between;
    padding: 2.4vmin;
  }
  .total {
    > span:first-child {
      font-weight: 700;
      font-size: 3.2rem;
      line-height: 44px;
    }
    > span:last-child {
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 25px;
      text-transform: uppercase;
    }
  }

  .balance {
    background-image: url(${({ card }) => card});
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 61%;
  }
  .pnl {
    background: #3968fc;
    color: #fff;
  }
  .portfolio-change {
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.background_color};
    overflow: auto;
    > div {
      white-space: nowrap;
      > span:first-child {
        color: ${({ theme }) => theme.font_gray};
        font-weight: 500;
        font-size: 2.4rem;
        line-height: 33px;
      }
      > span:last-child {
        color: ${({ theme }) => theme.font_light_gray};
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 22px;
      }
    }
  }
  @media (max-width: 1150px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    min-height: auto;
    > div {
      height: 130px;
    }
    .portfolio-change {
      grid-area: 2/1/2/3;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 16px;
      height: auto;
      background-color: transparent;
      .flex-column {
        background-color: ${({ theme }) => theme.background_color};
      }
    }
  }
  @media (max-width: 530px) {
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    > .balance,
    .pnl,
    .portfolio-change {
      height: auto;
    }
    .portfolio-change {
      display: flex;
      flex-direction: column;
      grid-gap: 8px;
    }
  }
`;
export default SpotOverview;
