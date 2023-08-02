import { Table, Warning } from 'components';
import { FC } from 'react';
import { ConditionalOrderData } from 'types';
import { toast } from 'react-toastify';
import { DateC, translation } from 'context';

interface Props {
  conditionalTbody: Array<ConditionalOrderData>;
  onCancelClick?: Function;
  dashboard?: boolean;
  loading?: boolean;
  pair?: string;
}

const ConditionalOrderTable: FC<Props> = ({
  conditionalTbody = [],
  onCancelClick = () => {},
  dashboard,
  loading,
  pair,
}) => {
  return (
    <Table
      progressPending={loading}
      columns={[
        {
          name: translation('symbol'),
          selector: (elem) => (
            <>{elem.displaySymbol ? elem.displaySymbol : elem.symbol}</>
          ),
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
          name: translation('trigger_price'),
          selector: (elem) => (
            <>
              {elem.trigger_price} {elem.trigger ? elem.trigger : ''}
            </>
          ),
        },
        {
          name: translation('order_type'),
          selector: (elem) => elem.order_type,
        },
        { name: translation('status'), selector: (elem) => elem.status },
        {
          name: translation('time'),
          selector: (elem) => DateC.DateDYMHM(elem.time),
        },
        {
          name: '',
          selector: (elem) => (
            <>
              {!dashboard && (
                <button
                  className="canc unfollow"
                  onClick={() => {
                    toast.warn(
                      <Warning
                        message="Are you sure you want to cancel this order?"
                        onConfirm={() => onCancelClick(elem)}
                      />
                    );
                  }}
                >
                  Cancel
                </button>
              )}
            </>
          ),
        },
      ]}
      additional_no_data_info={pair ? `\n for ${pair} pair` : ''}
      rows={conditionalTbody}
    />
  );
};

export default ConditionalOrderTable;
