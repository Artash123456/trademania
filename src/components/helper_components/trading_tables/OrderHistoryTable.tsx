import { Table } from 'components';
import { translation } from 'context';
import { FC } from 'react';
import { OrderHistoryData } from 'types';

const OrderHistoryTable: FC<{
  orderHistoryTbody: Array<OrderHistoryData>;
  loading?: boolean;
  pair?: string;
}> = ({ orderHistoryTbody = [], loading, pair }) => {
  return (
    <Table
      progressPending={loading}
      columns={[
        { name: translation('symbol'), selector: (elem) => elem.symbol },
        {
          name: translation('size'),
          selector: (elem) => (
            <span className={elem.side.toLowerCase() === 'sell' ? 'pl' : 'min'}>
              {elem.side.toLowerCase() === 'sell' ? '-' : ''}
              {elem.size}
            </span>
          ),
        },
        { name: translation('price'), selector: (elem) => elem.price },
        {
          name: translation('filled_total'),
          selector: (elem) => elem.filled,
        },
        {
          name: translation('type'),
          selector: (elem) => elem.order_type,
        },
        { name: translation('status'), selector: (elem) => elem.status },
      ]}
      additional_no_data_info={pair ? `\n for ${pair} pair` : ''}
      rows={orderHistoryTbody}
    />
  );
};

export default OrderHistoryTable;
