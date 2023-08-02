import { useAppDispatch, useAppSelector } from 'context';
import { useEffect, useMemo } from 'react';
import { fetchSpotList } from 'redux/actions/spot_actions';
import { changeSpotActiveHeader } from 'redux/reducers/spot';

const SpotMarketsHeader = () => {
  const dispatch = useAppDispatch();
  const { activeMarket, markets, spot_list } = useAppSelector(
    ({ spot }) => spot
  );
  const { pending } = useAppSelector(({ loading }) => loading);
  const alreadyHasData = useMemo(() => {
    return Object.keys(spot_list).find((item) => item === activeMarket.name);
  }, [spot_list, activeMarket.name]);
  useEffect(() => {
    if (markets.length && !alreadyHasData) {
      dispatch(
        fetchSpotList({ ids: activeMarket.id, name: activeMarket.name })
      );
    }
  }, [dispatch, markets.length, activeMarket, alreadyHasData]);

  return (
    <div className="button-navigation">
      {markets.map((elem) => (
        <span
          key={elem.id}
          onClick={() => {
            if (!pending) {
              dispatch(
                changeSpotActiveHeader({ id: elem.id, name: elem.name })
              );
            }
          }}
          className={elem.id === activeMarket.id ? 'active' : ''}
        >
          {elem.name}
        </span>
      ))}
    </div>
  );
};

export default SpotMarketsHeader;
