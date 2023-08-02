import { useEffect } from 'react';
import styled from 'styled-components';
import { FiUsers } from 'react-icons/fi';
import { BiBot } from 'react-icons/bi';
import { ResponsiveLineChart } from 'charts';
import { getDashboardStatistics } from 'redux/actions/admin_actions';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import { FaAffiliatetheme } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import Card from './DashboardCard';
import TopTradersCard from './TopTradersCard';
import { createRequestBody } from 'redux/reducers/admin';
import { BsCashCoin } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from 'context';

const AdminDashboard = () => {
  const { request_body } = useAppSelector(({ admin }) => admin);
  const {
    affiliates_count,
    cash_flow_bots_count,
    deletions_count,
    open_traders_count,
    registrations_count,
    spot_grid_bots_count,
    leverage_cash_turnover,
    spot_cash_turnover,
    spot_income,
    leverage_income,
    income_and_turnover_per_day,
  } = useAppSelector(({ admin }) => admin.statistics);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(createRequestBody('dashboard'));
    dispatch(getDashboardStatistics(JSON.parse(request_body)));
  }, [dispatch, request_body]);
  return (
    <StyledContainer>
      <div className="cards">
        <Card
          heading="Users"
          count={`Active ${registrations_count}`}
          count2={`Deletions ${deletions_count}`}
          icon={<FiUsers />}
          icon2={<IoPersonRemoveOutline />}
          icon_2_color="#a70000"
          icon_color="#a700ff"
          total={registrations_count + deletions_count}
        />
        <Card
          heading="Affiliate"
          count={`Active ${affiliates_count}`}
          icon={<FaAffiliatetheme />}
          icon_color="#2cff00"
        />
        <Card
          heading="Money Turnover"
          count={`Leverage ${
            leverage_cash_turnover ? leverage_cash_turnover?.toFixed(2) : 0
          }`}
          count2={`Spot ${
            spot_cash_turnover ? spot_cash_turnover?.toFixed(2) : 0
          }`}
          icon={<RiMoneyDollarCircleFill />}
          icon2={<RiMoneyDollarCircleFill />}
          icon_color="#ff7600"
          icon_2_color="#00c4ff"
          total={Number(+leverage_cash_turnover + +spot_cash_turnover)?.toFixed(
            2
          )}
        />
        <Card
          heading="Open Traders"
          count={`Active ${open_traders_count}`}
          icon={<FiUsers />}
          icon_color="#a700ff"
        />

        <Card
          heading="Bots"
          count={`Cash Flow ${cash_flow_bots_count}`}
          count2={`Grid ${spot_grid_bots_count}`}
          icon={<BiBot />}
          icon_color="#4b6bef"
          icon2={<BiBot />}
          icon_2_color="#4b6bef"
          total={cash_flow_bots_count + spot_grid_bots_count}
        />
        <Card
          heading="Total Income"
          count={`Leverage ${Number(leverage_income).toFixed(3)}`}
          count2={`Spot ${Number(spot_income).toFixed(3)}`}
          icon={<BsCashCoin />}
          icon_color="#4b6bef"
          icon2={<BsCashCoin />}
          icon_2_color="#4b6bef"
          total={Number(leverage_income + spot_income).toFixed(3)}
        />
      </div>
      <div className="line-chart">
        <ResponsiveLineChart
          dataset={[
            {
              data: income_and_turnover_per_day.map((item) => ({
                value: item.turnover,
              })),
            },
            {
              data: income_and_turnover_per_day.map((item) => ({
                value: item.income,
              })),
            },
          ]}
          category={income_and_turnover_per_day.map((item) => ({
            label: item.date,
          }))}
        />
      </div>
      <TopTradersCard />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: grid;
  .cards {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 10px;
  }
  .line-chart {
    width: 100%;
    overflow: hidden;
  }

  @media (max-width: 1600px) {
    .cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 769px) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 500px) {
    .cards {
      grid-template-columns: auto;
    }
  } ;
`;

export default AdminDashboard;
