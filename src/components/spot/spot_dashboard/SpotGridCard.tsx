import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getImage } from 'context';
import { TableLineChart } from 'charts';

const SpotGridCard: FC<any> = ({ elem }) => {
  const navigate = useNavigate();

  const chartData = elem.kline_week?.length
    ? elem.kline_week.map((elem: Record<string, number>) => Number(elem.value))
    : [];

  return (
    <StyledCard>
      <div
        onClick={() =>
          navigate(`/spot/marketplace?market=${elem.market.toLowerCase()}`, {
            state: elem.base,
          })
        }
        className="coin"
      >
        <div
          style={{
            backgroundImage: getImage(elem.base),
          }}
        />
        <span className="s-bold">
          {elem.currency} ({elem.base})
        </span>
      </div>
      <div className="flacjsb overall">
        <span className="s-bold">{elem.displaySymbol}</span>
        <span className="s-bold">{Number(elem.change_24h).toFixed(2)}</span>
      </div>
      <div className="flacjsb market-cap">
        <span>Market Cap:</span>
        <span>{elem.market_cap} USD</span>
      </div>
      <div className="flacjsb market-cap">
        <span>Price</span>
        <span>{elem.price} USD</span>
      </div>
      <TableLineChart data={chartData} width="310" height="150" />;
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 1.6vmin;
  border: 1px solid ${({ theme }) => theme.light_gray};
  max-height: 450px;
  overflow: hidden;
  .s-bold {
    font-weight: 700;
    font-size: 2rem;
    line-height: 27px;
    color: ${({ theme }) => theme.font_gray};
  }
  > .coin {
    display: grid;
    place-items: center;
    cursor: pointer;
    margin-bottom: 16px;
    > div {
      width: 82px;
      height: 82px;
      background-size: contain;
      background-repeat: no-repeat;
      margin-bottom: 16px;
    }
  }
  .market-cap {
    margin-top: 16px;
    margin-bottom: 16px;
    > span {
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 22px;
      color: ${({ theme }) => theme.light_gray};
    }
  }
`;
export default SpotGridCard;
