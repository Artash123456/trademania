import { FC } from 'react';
import {
  ClosedPositions,
  OpenPositions,
  ActiveOrders,
  ConditionalOrders,
  Filled,
  OrderHistory,
} from 'components';
import { useAppSelector } from 'context';
import { MarketAsProps } from 'types';
import { Scroll } from 'assets/styles';
const ManualFooterTable: FC<MarketAsProps> = ({ market }) => {
  const { activeFooter } = useAppSelector(({ manual }) => manual);
  return (
    <Scroll height="200px">
      {activeFooter === 'open_positions' && <OpenPositions market={market} />}
      {activeFooter === 'closed_positions' &&
        market.slug !== 'binance' &&
        market.slug !== 'okx' &&
        market.slug !== 'bitget' && <ClosedPositions market={market} />}
      {activeFooter === 'active_orders' && <ActiveOrders market={market} />}
      {activeFooter === 'conditional_orders' && (
        <ConditionalOrders market={market} />
      )}
      {activeFooter === 'fills' && <Filled market={market} />}
      {activeFooter === 'order_history' && <OrderHistory market={market} />}
    </Scroll>
  );
};

export default ManualFooterTable;
