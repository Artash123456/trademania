import { FC } from 'react';
import { TickerTape } from 'charts';
import { translation } from 'context';
import { DashboardElement } from 'types';
import { ChartContainer } from 'assets/styles';

const DashboardTickerTape: FC<{ elem: DashboardElement; add?: boolean }> = ({
  elem,
  add,
}) => {
  return (
    <ChartContainer overflow={add}>
      <div className="head">{translation(elem.head)}</div>
      <TickerTape chart_props={elem.data} />
    </ChartContainer>
  );
};

export default DashboardTickerTape;
