import { FC } from 'react';
import { MarketOverview } from 'charts';
import { translation } from 'context';
import { DashboardElement } from 'types';
import { ChartContainer } from 'assets/styles';

const DashboardMarketOverview: FC<{
  elem: DashboardElement;
  add?: boolean;
}> = ({ elem, add }) => {
  return (
    <ChartContainer overflow={add}>
      <div className="head">{translation(elem.head)}</div>
      <MarketOverview chart_props={elem.data} />
    </ChartContainer>
  );
};

export default DashboardMarketOverview;
