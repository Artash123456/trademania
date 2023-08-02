import { FC } from 'react';
import { TradingViewChart } from 'charts';
import styled from 'styled-components';
import { DashboardElement } from 'types';

const DashboardChart: FC<{ element: DashboardElement }> = ({ element }) => {
  return (
    <StyledChart>
      <div className="head">{element.name}</div>
      <TradingViewChart symbol={element.symbol} market={element.market} />
    </StyledChart>
  );
};
const StyledChart = styled.div`
  position: relative;
  height: 100%;
  background-color: ${({ theme }) => theme.background_color};
  padding: 1.6vmin;
  overflow: hidden;
  .head {
    justify-content: flex-start;
  }
  .body {
    position: relative;
    height: calc(100% - 38px);
  }
`;

export default DashboardChart;
