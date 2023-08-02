import { FC } from 'react';
import { CryptocurrencyMarket } from 'charts';
import { translation } from 'context';
import { DashboardElement } from 'types';
import { ChartContainer } from 'assets/styles';

const DashboardCryptoMarket: FC<{ elem: DashboardElement; add?: boolean }> = ({
  elem,
  add,
}) => {
  return (
    <ChartContainer overflow={add}>
      <div className="head">{translation(elem.head)}</div>
      <CryptocurrencyMarket chart_props={elem.data} />
    </ChartContainer>
  );
};

export default DashboardCryptoMarket;
