import { FC } from 'react';
import styled from 'styled-components';
import {
  DashboardActiveOrders,
  DashboardConditionalOrders,
  DashboardFilled,
  DashboardOpenPositions,
  DashboardOrderHistory,
  DashboardClosedPositions,
} from 'components';
import { DashboardTableProps } from 'types';

const TradingDataTable: FC<DashboardTableProps> = ({
  is_spot,
  market_id,
  has_credential,
  tableHead,
  refresh,
  pair,
  is_all,
}) => {
  const active = tableHead?.find((elem) =>
    elem.active ? elem.name : ''
  )?.name;

  return (
    <StyledTable>
      {active === 'open_positions' && !is_spot && (
        <DashboardOpenPositions
          market_id={market_id}
          has_credential={has_credential}
          refresh={refresh}
          pair={pair}
          is_all={is_all}
        />
      )}
      {active === 'closed_positions' && !is_spot && (
        <DashboardClosedPositions
          market_id={market_id}
          has_credential={has_credential}
          refresh={refresh}
          pair={pair}
        />
      )}
      {(active === 'active_orders' || !active) && (
        <DashboardActiveOrders
          market_id={market_id}
          has_credential={has_credential}
          refresh={refresh}
          pair={pair}
          is_spot={is_spot}
          is_all={is_all}
        />
      )}
      {active === 'conditional_orders' && (
        <DashboardConditionalOrders
          market_id={market_id}
          has_credential={has_credential}
          refresh={refresh}
          pair={pair}
          is_spot={is_spot}
        />
      )}
      {active === 'fills' && (
        <DashboardFilled
          market_id={market_id}
          has_credential={has_credential}
          refresh={refresh}
          pair={pair}
          is_spot={is_spot}
        />
      )}
      {active === 'order_history' && (
        <DashboardOrderHistory
          market_id={market_id}
          has_credential={has_credential}
          refresh={refresh}
          pair={pair}
          is_spot={is_spot}
        />
      )}
    </StyledTable>
  );
};

const StyledTable = styled.div`
  height: calc(100% - 120px);
  overflow: auto;
  width: 100%;
`;
export default TradingDataTable;
