import { FC, memo } from 'react';
import { ForexHeatMap } from 'react-tradingview-embed';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { StylesState } from 'types';

const ForexHeatMapComp: FC<any> = ({ chart_props }) => {
  const { theme } = useSelector(
    ({ styles }: { styles: StylesState }) => styles
  );

  return (
    <StyledChart>
      <ForexHeatMap
        widgetProps={{
          colorTheme: theme === 'dark_mode' ? 'dark' : 'light',
          width: '100%',
          height: '100%',
          autosize: true,
          isTransparent: true,
          ...chart_props,
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
export default memo(ForexHeatMapComp);
