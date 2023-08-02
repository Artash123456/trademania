import { FC } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { BalanceChartDataItemType } from 'types';
const ResponsiveAreaChart: FC<{
  data?: BalanceChartDataItemType[];
}> = ({ data }) => {
  if (!data?.length) return <></>;
  return (
    <StyledChart>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3 " />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#2BDB93"
            fill="#2bdb935e"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledChart>
  );
};

const StyledChart = styled.div`
  width: 100%;
  height: 100%;
  min-height: 300px;
  overflow: hidden;
`;
export default ResponsiveAreaChart;
