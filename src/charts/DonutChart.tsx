import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { useAppSelector } from 'context';
import styled from 'styled-components';
const DonutChart = () => {
  const { pie_chart_data } = useAppSelector(({ spot }) => spot);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <>
        <PieChart width={320} height={350}>
          <Pie
            dataKey="value"
            data={pie_chart_data}
            innerRadius={50}
            outerRadius={100}
          >
            {pie_chart_data.map((item) => (
              <Cell key={item.value} horizAdvX={item.title} fill={item.color} />
            ))}
          </Pie>
        </PieChart>
        <StyledLabels>
          {pie_chart_data.map((item) => (
            <div key={item.title}>
              <span className="sp1" style={{ background: item.color }} />
              <span className="sp2"> {item.title}</span>
            </div>
          ))}
        </StyledLabels>
      </>
    </ResponsiveContainer>
  );
};
const StyledLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  width: 85%;
  > div {
    display: inline-flex;
    align-items: center;
    > .sp1 {
      width: 24px;
      height: 24px;
      border-radius: 8px;
      margin-right: 8px;
    }
    > .sp2 {
      color: ${({ theme }) => theme.light_gray};
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 22px;
    }
  }
`;
export default DonutChart;
