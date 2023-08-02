import { FC } from 'react';
import { ForexHeatMap } from 'charts';
import { translation } from 'context';
import { DashboardElement } from 'types';
import { ChartContainer } from 'assets/styles';

const DashboardForexHeatMap: FC<{ elem: DashboardElement; add?: boolean }> = ({
  elem,
  add,
}) => {
  return (
    <ChartContainer overflow={add}>
      <div className="head">{translation(elem.head)}</div>
      <ForexHeatMap chart_props={elem.data} />
    </ChartContainer>
  );
};

export default DashboardForexHeatMap;
