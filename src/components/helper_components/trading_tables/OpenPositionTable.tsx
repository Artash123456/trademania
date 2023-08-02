import { FC, useMemo } from 'react';
import { openModal } from 'redux/actions/other_actions';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { storeTpslData } from 'redux/reducers/manual';
import { Styled, Table } from 'components';
import { OpenPositionData } from 'types';
import { FaDownload } from 'react-icons/fa';
import useSocketPrice from './useSocketPrice';
interface Props {
  openTbody: Array<OpenPositionData>;
  market_id?: number | string;
  onLimitClick?: Function;
  onMarketClick?: Function;
  onDownload?: Function;
  manual?: boolean;
  is_all?: boolean;
  is_copy?: boolean;
  loading?: boolean;
  pair?: string;
}

const OpenPositionTable: FC<Props> = ({
  openTbody = [],
  onLimitClick = () => {},
  onMarketClick = () => {},
  onDownload = () => {},
  manual,
  is_copy,
  loading,
  pair,
  is_all,
}) => {
  const { isDemo } = useAppSelector(({ markets }) => markets);
  const { download_position } = useAppSelector(({ loading }) => loading);
  const data = useMemo(() => {
    if (openTbody?.length) {
      if (isDemo) {
        return openTbody.filter((item) => item.market === 'Demo');
      }
      return openTbody.filter((item) => item.market !== 'Demo');
    }
    return [];
  }, [isDemo, openTbody]);
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
          selector: (elem) => elem.symbol,
        },
        {
          name: translation('size'),
          selector: (elem) => (
            <span
              className={elem.side?.toLowerCase() === 'sell' ? 'pl' : 'min'}
            >
              {' '}
              {elem.side?.toLowerCase() === 'sell' && Number(elem.size) > 0
                ? '-'
                : ''}
              {elem.size}
            </span>
          ),
        },
        {
          name: translation('entry_price'),
          selector: (elem) => Number(elem.entry_price)?.toFixed(2),
        },
        {
          name: translation('mark_price'),
          selector: (elem) => Number(elem.market_price)?.toFixed(2),
        },
        {
          name: translation('liq_price'),
          selector: (elem) => Number(elem.liquidation_price)?.toFixed(2),
        },
        {
          name: translation('margin'),
          selector: (elem) => <WithSocket elem={elem} ret="position_margin" />,
        },
        {
          name: translation('unrealised_pnl'),
          selector: (elem) => <WithSocket elem={elem} ret="unrealized_pnl" />,
        },
        {
          name: translation('realised_pnl'),
          selector: (elem) => <WithSocket elem={elem} ret="realised_pnl" />,
        },
        {
          name: !is_copy && !manual ? '' : translation('close_position'),
          selector: (elem) =>
            !is_copy && (
              <>
                {manual ? (
                  <div className="button-navigation">
                    <span onClick={() => onLimitClick(elem)} className="active">
                      {translation('Limit')}
                    </span>
                    <span onClick={() => onMarketClick(elem)}>
                      {translation('Market')}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="svg-actions">
                      <FaDownload
                        style={{
                          opacity: download_position ? 0.3 : 1,
                          pointerEvents: download_position ? 'none' : 'all',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          if (!download_position) {
                            const unrealized_pnl = document.getElementById(
                              `unrealized_pnl_${elem.market_id}_${elem.symbol}`
                            );
                            const data = {
                              ...elem,
                              unrealize_pnl: unrealized_pnl?.ariaValueText,
                            };
                            onDownload(data);
                          }
                        }}
                      />
                    </div>
                  </>
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

const WithSocket: FC<any> = ({ elem, ret }) => {
  const { position_margin, unrealized_pnl, realized_pnl } = useSocketPrice({
    elem,
    market_id: elem.market_id,
  });
  if (ret === 'position_margin') return <>{position_margin || '-'}</>;
  if (ret === 'unrealized_pnl') return <>{unrealized_pnl || '-'}</>;
  return <>{realized_pnl || '-'}</>;
};

export default OpenPositionTable;
