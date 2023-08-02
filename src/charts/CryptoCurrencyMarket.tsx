import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { CryptocurrencyMarket } from 'react-tradingview-embed';
import styled from 'styled-components';
import { StylesState } from 'types';

const CryptocurrencyMarketComp: FC<any> = ({ chart_props }) => {
  const { theme } = useSelector(
    ({ styles }: { styles: StylesState }) => styles
  );
  return (
    <StyledChart>
      <CryptocurrencyMarket
        widgetProps={{
          colorTheme: theme === 'dark_mode' ? 'dark' : 'light',
          width: '100%',
          height: '100%',
          autosize: true,
          isTransparent: true,
          ...JSON.parse(chart_props),
        }}
      />
    </StyledChart>
  );
};
const StyledChart = styled.div`
  height: 100%;
  > div {
    height: 100%;
  }
`;
export default memo(CryptocurrencyMarketComp);
