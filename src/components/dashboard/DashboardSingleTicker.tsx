import { FC } from 'react';
import { SingleTicker } from 'charts';
import { translation } from 'context';
import { DashboardElement } from 'types';
import { ChartContainer } from 'assets/styles';

const DashboardSingleTicker: FC<{ elem: DashboardElement; add?: boolean }> = ({
  elem,
  add,
}) => {
  return (
    <ChartContainer overflow={add}>
      <div className="head">{translation(elem.head)}</div>
      <SingleTicker chart_props={elem.data} />
    </ChartContainer>
  );
};

export default DashboardSingleTicker;
