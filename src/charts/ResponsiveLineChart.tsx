import { useAppSelector } from 'context';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import { FC } from 'react';
import ReactFusioncharts from 'react-fusioncharts';
charts(FusionCharts);

const LineChart: FC<{
  dataset: { data: { value: string | number }[] }[];
  category: { label: string }[];
}> = ({ category, dataset }) => {
  const styles = useAppSelector(({ styles }) => styles);

  const dataSource = {
    chart: {
      showhovereffect: '1',
      drawcrossline: '1',
      plottooltext: '<b>$dataValue</b> $seriesName',
      theme: 'fusion',
      bgColor: styles[styles.theme].body_color,
      captionFontColor: styles[styles.theme].font_gray,
      labelFontColor: styles[styles.theme].font_gray,
      use3DLighting: '1',
    },
    categories: [
      {
        category: category,
      },
    ],
    dataset: dataset,
  };
  return (
    <ReactFusioncharts
      type="msline"
      width="100%"
      height="100%"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};
export default LineChart;
