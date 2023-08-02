import { FC, useMemo } from 'react';
import { ActiveOrdersData } from 'types';
import { DateC, translation, useAppSelector } from 'context';
import { Styled, Table } from 'components';

interface Props {
  activeTbody: Array<ActiveOrdersData>;
  onCancelClick?: Function;
  dashboard?: boolean;
  is_all?: boolean;
  loading?: boolean;
  pair?: string;
  is_spot?: boolean;
}

const ActiveOrderTable: FC<Props> = ({
  activeTbody = [],
  onCancelClick = () => {},
  dashboard,
  is_all,
  loading,
  pair,
  is_spot,
}) => {
  const { images } = useAppSelector(({ dashboard }) => dashboard);
  const { pending } = useAppSelector(({ loading }) => loading);
  const { isDemo } = useAppSelector(({ markets }) => markets);
  const data = useMemo(() => {
    if (activeTbody?.length) {
      if (isDemo) return activeTbody.filter((item) => item.market === 'Demo');
      return activeTbody.filter((item) => item.market !== 'Demo');
    }
    return [];
  }, [isDemo, activeTbody]);

  return (
    <Table
      progressPending={loading}
      last_button
      columns={[
        {
          name: 'Market',
          selector: (elem) => <Styled.MarketLogo name={elem.market} />,
          omit: !is_all,
        },
        {
          name: translation('symbol'),
          selector: (elem) => (
            <>
              <div>
                <span>
                  {elem.displaySymbol ? elem.displaySymbol : elem.symbol}
                </span>
                {!is_spot && <span>Perpetual</span>}
              </div>
            </>
          ),
        },
        {
          name: translation('size'),
          selector: (elem) => (
            <span
              className={
                +elem.size < 0 || elem.trade_type?.toLowerCase() === 'sell'
                  ? 'pl'
                  : 'min'
              }
            >
              {' '}
              {elem.trade_type?.toLowerCase() === 'sell' ? '-' : ''}
              {elem.size}
              {elem?.tp ? (
                <>
                  <br />
                  <span>{elem?.tp?.orderQty}</span>
                </>
              ) : (
                ''
              )}
              {elem?.sl ? (
                <>
                  <br />
                  <span>{elem.sl?.orderQty}</span>
                </>
              ) : (
                ''
              )}
            </span>
          ),
        },
        {
          name: translation('price'),
          selector: (elem) => (
            <>
              {' '}
              <span>{elem.price}</span>
              {elem?.tp || elem?.sl ? (
                <>
                  <span>-</span>
                  <span>-</span>
                </>
              ) : (
                ''
              )}
            </>
          ),
        },
        {
          name: translation('filled'),
          selector: (elem) => (
            <>
              {' '}
              <span>{elem.filled}</span>
              {elem?.tp ? (
                <>
                  <br />
                  <span>{elem?.tp?.leavesValueEv / 100000000}</span>
                </>
              ) : (
                ''
              )}
              {elem?.sl ? (
                <>
                  <br />
                  <span>{elem?.sl?.leavesValueEv / 100000000}</span>
                </>
              ) : (
                ''
              )}
            </>
          ),
        },
        {
          name: 'Type',
          selector: (elem) => (
            <>
              <span>{elem.trade_type}</span>
              {elem.tp ? (
                <>
                  <br />
                  <span>{elem.tp.side}</span>
                </>
              ) : (
                ''
              )}
              {elem.sl ? (
                <>
                  <br />
                  <span>{elem.sl.side}</span>
                </>
              ) : (
                ''
              )}
            </>
          ),
        },

        {
          name: translation('order_type'),
          selector: (elem) => (
            <>
              {' '}
              <span>{elem.order_type}</span>
              {elem.tp ? (
                <>
                  <br />
                  <span>{elem.tp.orderType}</span>
                </>
              ) : (
                ''
              )}
              {elem.sl ? (
                <>
                  <br />
                  <span>{elem.sl.orderType}</span>
                </>
              ) : (
                ''
              )}
            </>
          ),
        },
        {
          name: 'Created At',
          selector: (elem) => (
            <span>{DateC.DateDYMHM(elem.created_at) || '-'}</span>
          ),
        },
        {
          name: !dashboard ? translation('action') : '',
          selector: (elem) => (
            <>
              {!dashboard && (
                <button
                  className="unfollow canc"
                  disabled={pending}
                  onClick={() => onCancelClick(elem)}
                >
                  Cancel
                </button>
              )}
            </>
          ),
        },
      ]}
      additional_no_data_info={pair ? `\n for ${pair} pair` : ''}
      rows={data}
    />
  );
};

export default ActiveOrderTable;
