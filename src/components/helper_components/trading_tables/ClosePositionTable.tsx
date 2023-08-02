import { FC } from 'react';
import { ClosedPositionData } from 'types';
import { FaDownload } from 'react-icons/fa';
import { DateC, translation, useAppSelector } from 'context';
import { Table } from 'components';

const ClosePositionTable: FC<{
  closedTbody: Array<ClosedPositionData>;
  dashboard?: boolean;
  loading?: boolean;
  pair?: string;
}> = ({ closedTbody = [], loading, pair }) => {
  return (
    <Table
      progressPending={loading}
      columns={[
        {
          name: translation('symbol'),
          selector: (elem) => (
            <span>
              <span>{elem.symbol}</span>
              <span>{elem.currency}</span>
            </span>
          ),
        },
        {
          name: translation('size'),
          selector: (elem) => (
            <span
              className={elem.side?.toLowerCase() === 'sell' ? 'pl' : 'min'}
            >
              {elem.side.toLowerCase() === 'sell' ? '-' : ''}
              {elem.size}
            </span>
          ),
        },
        {
          name: translation('entry_price'),
          selector: (elem) => <>{elem.entry_price}</>,
        },
        {
          name: translation('exit_price'),
          selector: (elem) => <>{elem.exit_price}</>,
        },
        {
          name: translation('closedIncome'),
          selector: (elem) => (
            <span className={elem.closed_pnl < 0 ? 'pl' : 'min'}>
              {Number(elem.closed_pnl)?.toFixed(3)}
            </span>
          ),
        },
        {
          name: translation('exchange_fee'),
          selector: (elem) => <>{elem.exchange_fee}</>,
        },
        {
          name: translation('funding_fee'),
          selector: (elem) => <>{elem.funding_fee}</>,
        },
        {
          name: translation('realised_pnl'),
          selector: (elem) => (
            <span className={Number(elem.realized_pnl) < 0 ? 'pl' : 'min'}>
              {Number(elem.realized_pnl).toFixed(4)}
            </span>
          ),
        },
        {
          name: translation('roi'),
          selector: (elem) => <>{elem.roi}%</>,
        },
        {
          name: translation('open_time'),
          selector: (elem) => (
            <span title={elem.open_time}>{DateC.DateMYD(elem.open_time)}</span>
          ),
        },
        {
          name: translation('close_time'),
          selector: (elem) => (
            <span title={elem.close_time}>
              {DateC.DateMYD(elem.close_time)}
            </span>
          ),
        },
      ]}
      additional_no_data_info={pair ? `\n for ${pair} pair` : ''}
      rows={closedTbody}
    />
  );
};

export default ClosePositionTable;
