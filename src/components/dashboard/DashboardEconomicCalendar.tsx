import { FC } from 'react';
import { EconomicsCalendar } from 'charts';
import { translation } from 'context';
import { DashboardElement } from 'types';
import { ChartContainer } from 'assets/styles';

const DashboardEconomicCalendar: FC<{
  elem: DashboardElement;
  add?: boolean;
}> = ({ elem, add }) => {
  return (
    <ChartContainer overflow={add}>
      <div className="head">{translation(elem.head)}</div>
      <EconomicsCalendar chart_props={elem.data} />
    </ChartContainer>
  );
};

export default DashboardEconomicCalendar;
