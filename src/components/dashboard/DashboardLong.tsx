import { FC, useState, useCallback } from 'react';
import { tableInitalHeader } from 'redux/actions/dashboard_actions';
import {
  TradingDataHeader,
  TradingDataTable,
  DashboardMockLong,
} from 'components';
import styled from 'styled-components';
import { deepCopy, translation, useAppSelector } from 'context';
import { DashboardElement, PairTypes } from 'types';
interface Props {
  elem: DashboardElement;
  addItem?: boolean;
  zoomed?: boolean;
  has_credential?: boolean;
}
const DashboardLong: FC<Props> = ({ elem, addItem, has_credential }) => {
  const { pending, editable, tableHead } = useAppSelector(
    ({ loading, dashboard }) => ({
      pending: loading.pending,
      editable: dashboard.editable,
      tableHead: dashboard.tableHead,
    })
  );
  const [refresh, setRefresh] = useState(0);
  const [tableHeader, setTableHeader] = useState(
    tableInitalHeader(deepCopy(tableHead), elem, addItem)
  );
  const [pair, setPair] = useState<PairTypes>({
    base: 'BTC',
    value: 'BTSUSD',
    is_spot: 0,
    name: '',
    label: '',
    market_id: 0,
    order: '',
    id: '',
    quote: '',
    status: '',
    currency: '',
    value_charts: '',
  });
  const handleChangeMenu = useCallback(
    (name: string) => {
      const arr = [...tableHeader];
      for (let i of arr) {
        if (i.name === name) {
          i.active = true;
        } else {
          i.active = false;
        }
      }
      setTableHeader(arr);
    },
    [tableHeader]
  );
  return (
    <StyledLong>
      <div className="flacjsb">
        <div className="head">
          {translation(elem?.head ? elem?.head : '')}{' '}
          {elem?.name ? elem?.name : ''}
        </div>
        {!addItem && (
          <TradingDataHeader
            onRefresh={() => !pending && setRefresh((p) => p + 1)}
            onChangePair={(elem) => {
              if (elem) setPair(elem);
            }}
            tableHeader={tableHeader}
            elem={has_credential && !addItem && elem ? elem : undefined}
            has_credential={has_credential}
            is_all={Boolean(elem?.data)}
          />
        )}
        <div className="button-navigation">
          {tableHeader?.map((elem) => {
            return (
              <span
                key={elem.id}
                className={elem.active ? 'active' : ''}
                id={elem.name}
                onClick={() => {
                  if (!pending) handleChangeMenu(elem.name);
                }}
              >
                {translation(elem.text)}
              </span>
            );
          })}
        </div>
      </div>
      {(has_credential || elem.data) && !addItem && !editable ? (
        <TradingDataTable
          is_spot={elem?.is_spot}
          market_id={elem?.market_id}
          has_credential={has_credential}
          tableHead={tableHeader}
          refresh={refresh}
          pair={pair}
          is_all={Boolean(elem.data)}
        />
      ) : (
        <DashboardMockLong no_credentials={has_credential} modal={addItem} />
      )}
    </StyledLong>
  );
};

const StyledLong = styled.div`
  background-color: ${({ theme }) => theme.background_color};
  padding: 1.6vmin;
  height: 100%;
  .flacjsb {
    white-space: nowrap;
    margin-bottom: 24px;
  }
  .head {
    margin-bottom: 0;
  }
  @media (max-width: 769px) {
    .flacjsb {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-row-gap: 15px;

      .head {
        grid-area: 1/1;
      }
      > div:nth-child(2) {
        grid-area: 1/2/2/4;
        > svg,
        > div {
          margin-right: 5px;
        }
        .drop-down {
          margin-right: 0;
        }
      }
      .button-navigation {
        grid-area: 2/1/2/7;
        margin: 0;
      }
    }
  }
  @media (max-width: 530px) {
    .flacjsb {
      > div:nth-child(2) {
        grid-area: 2/1/2/1;
      }
      .button-navigation {
        grid-area: 3/1/3/7;
      }
    }
  }
`;

export default DashboardLong;
