import { FC } from 'react';
import { TechnicalAnalysis } from 'charts';
import { translation } from 'context';
import { DashboardElement } from 'types';
import { ChartContainer } from 'assets/styles';

const DashboardTechnicalAnalysis: FC<{
  elem: DashboardElement;
  add?: boolean;
}> = ({ elem, add }) => {
  return (
    <ChartContainer overflow={add}>
      <div className="head">{translation(elem.head)}</div>
      <TechnicalAnalysis chart_props={elem.data} />
    </ChartContainer>
  );
};

export default DashboardTechnicalAnalysis;
