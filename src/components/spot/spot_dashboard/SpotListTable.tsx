import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { Table } from 'components';
import { TableLineChart } from 'charts';
import {
  countSpot,
  addOrRemoveFromFavorites,
} from 'redux/actions/spot_actions';
import { getImage, translation, useAppDispatch, useAppSelector } from 'context';
import styled from 'styled-components';

const SpotListTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    spot_list,
    market,
    global_pending,
    spot_list_loading,
    spot_overview,
  } = useAppSelector(({ spot, loading }) => ({
    spot_list: spot.spot_list,
    market: spot.activeMarket,
    spot_overview: spot.spot_overview,
    global_pending: loading.pending,
    spot_list_loading: loading.spot_list_loading,
  }));

  return (
    <>
      <Table
        pagination
        paginationPerPage={10}
        progressPending={spot_list_loading}
        columns={[
          {
            name: '#',
            selector: (elem) => (
              <Rating
                fillColor="gold"
                ratingValue={elem.isFavorite ? 100 : 0}
                size={30}
                iconsCount={1}
                onClick={() => {
                  if (!global_pending && !elem.isStableCoin)
                    dispatch(
                      addOrRemoveFromFavorites({
                        base: elem.base,
                        market: market.name,
                      })
                    );
                }}
              />
            ),
          },
          {
            name: translation('coin'),
            selector: (elem) => (
              <StyledCoin
                onClick={() => {
                  if (!elem.isStableCoin) {
                    navigate(
                      `/spot/marketplace?market=${elem.market.toLowerCase()}`,
                      {
                        state: elem.base,
                      }
                    );
                  }
                }}
              >
                <div
                  style={{
                    backgroundImage: getImage(elem.base),
                  }}
                />
                <span>{elem.base}</span>
              </StyledCoin>
            ),
          },
          {
            name: translation('price'),
            selector: (elem) => (
              <span>{Number(elem.last_price)?.toFixed(2)} USD</span>
            ),
          },
          {
            name: '24h',
            selector: (elem) => (
              <span className={+elem.change_24h < 0 ? 'pl' : 'min'}>
                {Number(elem.change_24h)?.toFixed(2)}%
              </span>
            ),
          },
          {
            name: 'Mkt Cap',
            selector: (elem) => Number(elem.market_cap)?.toFixed(1),
          },
          {
            name: 'Last 7 days',
            selector: (elem) => {
              const chartData = elem.kline_week?.length
                ? elem.kline_week.map((elem: Record<string, number>) =>
                    Number(elem.value)
                  )
                : [];
              return <TableLineChart data={chartData} />;
            },
          },
          {
            name: translation('holdings'),
            selector: (elem) => (
              <>
                <span>
                  {elem.total_balance
                    ? Number(elem.total_balance)?.toFixed(2)
                    : Number(elem.balance)?.toFixed(2)}{' '}
                  {elem.base}
                  <br /> ≈
                  {elem.total_balance
                    ? (
                        Number(elem.total_balance) * Number(elem.last_price)
                      )?.toFixed(2)
                    : (Number(elem.balance) * Number(elem.last_price))?.toFixed(
                        2
                      )}{' '}
                  USD
                </span>
              </>
            ),
          },
          {
            name: 'PNL',
            selector: (elem) => {
              let pnl = countSpot(elem, spot_overview);
              return <span>{pnl?.toFixed(4)} USD</span>;
            },
          },
        ]}
        rows={spot_list?.[market.name]}
      />
    </>
  );
};

const StyledCoin = styled.div`
  display: flex;
  cursor: pointer;
  > div {
    background-size: cover;
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
`;

export default memo(SpotListTable);
