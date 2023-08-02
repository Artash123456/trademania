import { FC } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { useSelector } from 'react-redux';
import { StylesState } from 'types';
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const PieChart3D: FC<{
  data: { label: string; value: string }[];
  caption?: string;
  numberPrefix?: string;
}> = ({ data, caption, numberPrefix }) => {
  const styles = useSelector(({ styles }: { styles: StylesState }) => styles);
  const chartConfigs = {
    type: 'Pie3D',
    dataFormat: 'json',
    width: '100%',
    dataSource: {
      chart: {
        caption,
        showValues: '1',
        showPercentInTooltip: '0',
        numberPrefix,
        enableMultiSlicing: '0',
        theme: 'fusion',
        bgColor: styles[styles.theme].body_color,
        captionFontColor: styles[styles.theme].font_gray,
        labelFontColor: styles[styles.theme].font_gray,
        use3DLighting: '1',
        width: '100%',
      },
      data,
    },
  };

  return <ReactFC {...chartConfigs} className="fusion-chart-pie" />;
};
export default PieChart3D;
