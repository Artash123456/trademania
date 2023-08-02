import { useEffect } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { fetchSpotOverview } from 'redux/actions/spot_actions';
import { SpotDashboard, SpotTrading } from 'components';
import { useAppDispatch, useAppSelector } from 'context';

const Spot = () => {
  const dispatch = useAppDispatch();
  const [search] = useSearchParams();
  const { market, activeMarket } = useAppSelector(({ spot, markets }) => ({
    market: markets.markets.find((i) => i.name === search.get('market')),
    activeMarket: spot.activeMarket,
  }));
  useEffect(() => {
    if (activeMarket.name) {
      dispatch(fetchSpotOverview(activeMarket));
    }
  }, [dispatch, activeMarket]);

  return (
    <Routes>
      <Route path="/dashboard" element={<SpotDashboard />} />
      {market && (
        <Route path="/marketplace" element={<SpotTrading market={market} />} />
      )}
    </Routes>
  );
};

export default Spot;
