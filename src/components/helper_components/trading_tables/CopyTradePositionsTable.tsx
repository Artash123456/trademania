import { FC } from 'react';
import { DateC, translation } from 'context';
import { CopyPositionTable } from 'types';
import { Table } from 'components';

const CopyTradePositionsTable: FC<{
  data: Array<CopyPositionTable>;
  loading?: boolean;
  pair?: string;
}> = ({ data = [], loading, pair }) => {
  return (
    <Table
      progressPending={loading}
      columns={[
        {
          name: translation('symbol'),
          selector: (item) => (
            <span>
              {item.symbol} <br /> {item.currency}
            </span>
          ),
        },
        { name: translation('size'), selector: (item) => item.size },
        {
          name: translation('entry_price'),
          selector: (item) => Number(item.entry_price)?.toFixed(2),
        },
        {
          name: translation('mark_price'),
          selector: (item) => Number(item.market_price)?.toFixed(2),
        },
        {
          name: translation('liq_price'),
          selector: (item) => Number(item.liquidation_price)?.toFixed(2),
        },
        {
          name: translation('margin'),
          selector: (item) => item.position_margin,
        },
        {
          name: translation('unrealised_pnl'),
          selector: (item) => Number(item.unrealize_pnl)?.toFixed(8),
        },
        {
          name: translation('date'),
          selector: (item) => DateC.DateMYD(item?.created_at),
        },
      ]}
      additional_no_data_info={pair ? `\n for ${pair} pair` : ''}
      rows={data}
    />
  );
};

export default CopyTradePositionsTable;
