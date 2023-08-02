import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AdvancedChart } from 'react-tradingview-embed';
import { StylesState } from 'types';

interface Props {
  symbol?: string;
  market?: string;
}
const TradingViewChart: FC<Props> = ({ symbol = 'BTCUSD', market }) => {
  const { theme } = useSelector(
    ({ styles }: { styles: StylesState }) => styles
  );

  return (
    <StyledChart>
      <AdvancedChart
        widgetProps={{
          width: '100%',
          theme: theme === 'dark_mode' ? 'dark' : 'light',
          toolbar_bg: theme === 'dark_mode' ? 'dark' : 'light',
          container_id: `${market === 'demo' ? 'binance' : market}`,
          height: '100%',
          autosize: true,
          interval: 'D',
          timezone: 'Etc/UTC',
          symbol: `${market}:${symbol}`,
          enable_publishing: false,
          hide_side_toolbar: true,
          withdateranges: false,
          allow_symbol_change: false,
          hide_top_toolbar: true,
          locale: 'en',
          save_image: false,
        }}
      />
    </StyledChart>
  );
};
const StyledChart = styled.div`
  height: 100%;
  div {
    height: 100%;
  }
`;
export const CustomAdvancedChart =  memo(TradingViewChart);
