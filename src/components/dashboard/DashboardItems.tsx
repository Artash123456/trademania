import { FC } from 'react';
import {
  DashboardSmall,
  DashboardLong,
  DashboardChart,
  DashboardEconomicCalendar,
  DashboardTickerTape,
  DashboardForexHeatMap,
  DashboardSingleTicker,
  DashboardTechnicalAnalysis,
  DashboardCryptoMarket,
  DashboardMarketOverview,
} from 'components';
import { DashboardElement } from 'types';
import { useAppSelector } from 'context';
interface Props {
  element: DashboardElement;
  zoomed?: string;
  addItem?: boolean;
}

const DashboardItems: FC<Props> = ({ element, zoomed, addItem }) => {
  const { markets } = useAppSelector(({ markets }) => markets);
  const has_credential = markets.some(
    (item) => item?.has_credential?.market_id === element?.market_id
  );
  return (
    <>
      {element.type === 'chart' && <DashboardChart element={element} />}
      {element.type === 'small' && (
        <DashboardSmall
          element={element}
          addItem={addItem}
          zoomed={zoomed}
          has_credential={has_credential}
        />
      )}
      {element.type === 'long' && (
        <DashboardLong
          elem={element}
          addItem={addItem}
          has_credential={has_credential}
        />
      )}
      {element.type === 'economic_calendar' && (
        <DashboardEconomicCalendar elem={element} add={addItem} />
      )}

      {element.type === 'ticker_tape' && (
        <DashboardTickerTape elem={element} add={addItem} />
      )}
      {element.type === 'forex_heat_map' && (
        <DashboardForexHeatMap elem={element} add={addItem} />
      )}
      {element.type === 'single_ticker' && (
        <DashboardSingleTicker elem={element} add={addItem} />
      )}
      {element.type === 'technical_analysis' && (
        <DashboardTechnicalAnalysis elem={element} add={addItem} />
      )}
      {element.type === 'cryptocurrency_market' && (
        <DashboardCryptoMarket elem={element} add={addItem} />
      )}
      {element.type === 'market_overview' && (
        <DashboardMarketOverview elem={element} add={addItem} />
      )}
    </>
  );
};

export default DashboardItems;
