import { FC } from 'react';
import {
  SpotTradingChart,
  ChartLoading,
  SpotMenu,
  SpotActiveOrders,
  SpotFilled,
  SpotWallet,
} from 'components';
import { SpotMarket } from 'types';
import { useAppSelector } from 'context';

interface Props {
  type?: string;
  market?: SpotMarket;
  addItem?: boolean;
}

const TradingItems: FC<Props> = ({
  type,
  market = { name: '', id: '' },
  addItem,
}) => {
  const { pairs } = useAppSelector(({ spot }) => spot);

  return (
    <>
      {type === 'chart' && (
        <>
          {pairs.length || addItem ? (
            <SpotTradingChart
              market={addItem ? { name: 'phemex', id: 0 } : market}
            />
          ) : (
            <ChartLoading />
          )}
        </>
      )}
      {type === 'menu' && <SpotMenu market={market} addItem={addItem} />}
      {type === 'active_orders' && (
        <SpotActiveOrders
          market={market}
          addItem={addItem}
          loading={!market && !addItem}
        />
      )}
      {type === 'filled' && <SpotFilled addItem={addItem} />}
      {type === 'wallet' && <SpotWallet addItem={addItem} />}
    </>
  );
};

export default TradingItems;
