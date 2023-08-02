import { FC } from 'react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import styled from 'styled-components'
import { BalanceChartDataItemType } from 'types'

interface Props {
  data?: BalanceChartDataItemType[]
}

const SimpleLineChart: FC<Props> = ({ data }) => {
  if (!data) return <></>
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
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2BDB93"
            fill="#2bdb935e"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledChart>
  )
}

const StyledChart = styled.div`
  width: 100%;
  height: 100%;
  height: 50px;
  overflow: hidden;
`
export default SimpleLineChart
