import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'context';
import { fetchSpotChartBalance } from 'redux/actions/spot_actions';
import styled from 'styled-components';
import { PieChart3D, ResponsiveAreaChart } from 'charts';
import { changeChartFilter } from 'redux/reducers/spot';
import { Styled } from 'components';

const SpotStats = () => {
  const dispatch = useAppDispatch();
  const {
    balance_chart_data,
    activeMarket,
    balance_chart_default,
    chart_filter,
    pie_chart_data,
  } = useAppSelector(({ spot }) => spot);
  useEffect(() => {
    if (activeMarket?.id) {
      dispatch(fetchSpotChartBalance(activeMarket));
    }
  }, [dispatch, activeMarket]);
  return (
    <StyledStats>
      <div>
        <div>
          <div className="head">
            Spot Graph <span />
          </div>
          <PieChart3D
            data={pie_chart_data.map((item) => ({
              value: String(item.value),
              label: String(item.title),
            }))}
            numberPrefix="$"
          />
        </div>
        <div>
          <div className="head flacjsb">
            balance history
            <div className="button-navigation">
              {chart_filter.map((item) => (
                <span
                  onClick={() => dispatch(changeChartFilter(item.name))}
                  key={item.name}
                  className={item.active ? 'active' : ''}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
          {balance_chart_default?.length ? (
            <ResponsiveAreaChart data={balance_chart_data} />
          ) : (
            <Styled.NoData message="The chart will be activated after a while" />
          )}
        </div>
      </div>
    </StyledStats>
  );
};
const StyledStats = styled.div`
  .head {
    width: 100%;
  }
  > div:last-child {
    width: 100%;
    display: grid;
    grid-template-columns: 350px auto;
    grid-column-gap: 24px;
    align-items: center;
    min-height: 350px;
    > div {
      height: 100%;
      padding: 2.4vmin;
      background-color: ${({ theme }) => theme.background_color};
      display: grid;
      place-items: flex-start center;
      position: relative;
      overflow: hidden;
    }
  }

  @media (max-width: 950px) {
    > div:last-child {
      grid-template-columns: auto;
      grid-row-gap: 16px;
    }
  }
`;
export default SpotStats;
