import { Table } from 'components';
import { copy, translation } from 'context';
import { FC } from 'react';
import { FilledOrderData } from 'types';

interface Props {
  filledTbody: Array<FilledOrderData>;
  market_id: string | number;
  loading?: boolean;
  pair?: string;
}

const FilledTable: FC<Props> = ({
  filledTbody = [],
  market_id,
  loading,
  pair,
}) => {
  return (
    <Table
      progressPending={loading}
      columns={[
        {
          name: translation('symbol'),
          selector: (elem) => elem.symbol,
        },
        {
          name: market_id === 2 ? '' : translation('executed'),
          selector: (elem) => <>{market_id !== 2 && elem.exec_qty}</>,
        },
        {
          name: market_id === 2 ? '' : translation('exec_price'),
          selector: (elem) => <>{market_id !== 2 && elem.exec_price}</>,
        },
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
          name: translation('closedIncome'),
          selector: (elem) => (
            <span className={elem.pnl < 0 ? 'pl' : 'min'}>{elem.pnl}</span>
          ),
        },
        {
          name: market_id === 2 ? '' : translation('fee'),
          selector: (elem) => <>{market_id !== 2 && elem.fee}</>,
        },
        {
          name: market_id === 2 ? '' : translation('type'),
          selector: (elem) => <>{market_id !== 2 && elem.order_type}</>,
        },
        {
          name: translation('order_no'),
          selector: (elem) => (
            <span onClick={() => copy(elem.order_id)}>{elem.order_id}</span>
          ),
        },
      ]}
      additional_no_data_info={pair ? `\n for ${pair} pair` : ''}
      rows={filledTbody}
    />
  );
};

export default FilledTable;
