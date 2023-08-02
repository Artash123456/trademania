import { FC } from 'react';
import styled from 'styled-components';
import { TradingViewChart } from 'charts';
import { ChartLoading } from 'components';
import { SpotMarket } from 'types';
import { useAppSelector } from 'context';
interface Props {
  market: SpotMarket;
  addItem?: boolean;
}

const SpotTradingChart: FC<Props> = ({ market, addItem }) => {
  const { pending, symbol } = useAppSelector(({ spot }) => spot);
  return (
    <>
      {market && (
        <StyledChart>
          <div className="head">Chart ({market.name})</div>
          <div className="body">
            {!symbol || pending ? (
              <ChartLoading />
            ) : (
              <TradingViewChart
                symbol={addItem ? 'BTCUSDT' : symbol.base + symbol.quote}
                market={market.name !== 'demo' ? market.name : 'binance'}
              />
            )}
          </div>
        </StyledChart>
      )}
    </>
  );
};
const StyledChart = styled.div`
  overflow: hidden;
  height: 100%;
  padding: 1.6vmin;
  .body {
    width: 100%;
    height: 100%;
    > article {
      height: 92% !important;
    }
  }
`;
export default SpotTradingChart;
