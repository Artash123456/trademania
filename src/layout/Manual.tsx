import { useSearchParams } from 'react-router-dom';
import {
  ManualChart,
  ManualMenu,
  ManualFooter,
  ChartLoading,
  TradingTableLoading,
  ManualLeverageMenu,
} from 'components';
import { StyledTrading } from 'assets/styles';
import { useAppSelector } from 'context';

const Manual = () => {
  const [search] = useSearchParams();
  const { market, pairs } = useAppSelector(({ manual, markets }) => ({
    market: markets.markets.find((i) => i.name === search.get('market')),
    pairs: manual.pairs,
  }));
  return (
    <div className="container">
      <h1>Manual Trading</h1>
      <StyledTrading>
        <>
          {pairs?.length && market ? (
            <ManualChart market={market} />
          ) : (
            <ChartLoading />
          )}
        </>
        <>
          <ManualMenu>
            {market && <ManualLeverageMenu market={market} />}
          </ManualMenu>
        </>
        <>
          {!market ? <TradingTableLoading /> : <ManualFooter market={market} />}
        </>
      </StyledTrading>
    </div>
  );
};

export default Manual;
