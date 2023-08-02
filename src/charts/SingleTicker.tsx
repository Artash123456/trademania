import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { SingleTicker } from 'react-tradingview-embed';
import { StylesState } from 'types';

const SingleTickerComp: FC<any> = ({ chart_props }) => {
  const { theme } = useSelector(
    ({ styles }: { styles: StylesState }) => styles
  );

  return (
    <SingleTicker
      widgetProps={{
        colorTheme: theme === 'dark_mode' ? 'dark' : 'light',
        width: '100%',
        height: '100%',
        autosize: true,
        isTransparent: true,
        ...JSON.parse(chart_props),
      }}
    />
  );
};

export default memo(SingleTickerComp);
