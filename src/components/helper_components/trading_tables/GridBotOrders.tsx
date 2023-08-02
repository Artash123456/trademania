import { FC } from 'react';
import Table from '../Table';
import { Styled } from 'components';

const GridBotOrders: FC<{ data: any[] }> = ({ data }) => {
  if (!data || !data?.length) return <Styled.NoData />;
  return (
    <Table
      columns={[
        { name: 'Symbol', selector: (elem) => elem.symbol },
        {
          name: 'Side',
          selector: (elem) => (
            <span
              className={elem?.side?.toLowerCase() === 'sell' ? 'pl' : 'min'}
            >
              {elem.side}
            </span>
          ),
        },
        { name: 'Qty', selector: (elem) => elem.qty },
        { name: 'Price', selector: (elem) => elem.price },
        { name: 'Start Price', selector: (elem) => elem.startPrice },
        { name: 'Order Type', selector: (elem) => elem.order_type },
        { name: 'Date', selector: (elem) => elem.date },
      ]}
      rows={data}
    />
  );
};

export default GridBotOrders;
