import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { MarketOverview } from 'react-tradingview-embed';
import { StylesState } from 'types';

const MarketOverviewComp: FC<any> = ({ chart_props }) => {
  const { theme } = useSelector(
    ({ styles }: { styles: StylesState }) => styles
  );

  return (
    <MarketOverview
      widgetProps={{
        colorTheme: theme === 'dark_mode' ? 'dark' : 'light',
        width: '100%',
        height: '100%',
        autosize: true,
        isTransparent: true,
        ...JSON.parse(chart_props),
        dateRange: '1M',
        tabs: [
          {
            title: 'Futures',
            symbols: [
              {
                s: 'BINANCE:BTCUSD',
              },
              {
                s: 'BINANCE:ETHUSD',
              },
              {
                s: 'BINANCE:XRPUSD',
              },
              {
                s: 'BINANCE:ADAUSD',
              },
            ],
            originalTitle: 'Futures',
          },
          {
            title: 'Spot',
            symbols: [
              {
                s: 'BINANCE:BTCUSDT',
              },
              {
                s: 'BINANCE:ETHUSDT',
              },
              {
                s: 'BINANCE:XRPUSDT',
              },
              {
                s: 'BINANCE:ADAUSDT',
              },
            ],
          },
        ],
      }}
    />
  );
};

export default memo(MarketOverviewComp);
