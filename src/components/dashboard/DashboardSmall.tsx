import { FC, useEffect, useState, useMemo } from 'react';
import { getMarketLeverage } from 'redux/actions/dashboard_actions';
import styled from 'styled-components';
import { DashboardSmallData, DashboardSmallLogos } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { DashboardElement } from 'types';

interface Props {
  element: DashboardElement;
  addItem?: boolean;
  has_credential?: boolean;
  zoomed?: string;
}

const DashboardSmall: FC<Props> = ({ element, addItem, has_credential }) => {
  const dispatch = useAppDispatch();
  const { editable } = useAppSelector(({ dashboard }) => dashboard);
  const [data, setData] = useState<any>({});
  const smallBody = useMemo(() => {
    const market_id = element.market_id;
    if (!market_id || addItem || !element || !has_credential || editable) {
      return undefined;
    } else {
      const is_spot = element?.is_spot;
      const formData = new FormData();
      formData.append('market_id', market_id.toString());
      formData.append(
        'symbol',
        market_id === 1 || market_id === 3
          ? 'BTCUSD'
          : market_id === 2 || market_id === 5
          ? 'BTCUSDT'
          : ''
      );
      return { data: formData, is_spot: is_spot, market_id: element.market_id };
    }
  }, [addItem, element, has_credential, editable]);
  useEffect(() => {
    let mounted = true;
    if (smallBody)
      dispatch(
        getMarketLeverage({
          values: smallBody?.data,
          is_spot: smallBody.is_spot,
          market_id: smallBody.market_id,
        })
      ).then(({ payload }: any) => {
        if (mounted && payload) {
          setData(payload?.data);
        }
      });
    return () => {
      mounted = false;
    };
  }, [dispatch, smallBody]);
  if (!element) return <></>;
  return (
    <StyledSmall>
      <div className="flacjsb">
        <span className="head" title={translation(element.head)}>
          {translation(element.head)} {element?.name}
        </span>
        <DashboardSmallLogos
          elem={element}
          isTotal={element.head === 'totalIncome'}
        />
      </div>
      {has_credential || element.head === 'totalIncome' ? (
        <div className="body">
          {element.head === 'totalIncome' ? (
            <DashboardSmallData totalIncome={true} />
          ) : (
            <DashboardSmallData
              dayPerc={data?.daily?.percent ? +data?.daily?.percent : 0}
              dayPrice={data?.daily?.sum_usd ? +data?.daily?.sum_usd : 0}
              monthPerc={data?.monthly?.percent ? +data?.monthly?.percent : 0}
              monthPrice={data?.monthly?.sum_usd ? +data?.monthly?.sum_usd : 0}
              yearPerc={data?.total_percent ? +data?.total_percent : 0}
              yearPrice={data?.total_pnl ? +data?.total_pnl : 0}
            />
          )}
        </div>
      ) : !has_credential && addItem ? (
        <div>
          <DashboardSmallData addItem={true} />
        </div>
      ) : (
        <p>{translation('add_credentials')}</p>
      )}
    </StyledSmall>
  );
};

const StyledSmall = styled.div`
  padding: 2.4vmin;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background_color};
  height: 100%;

  > div:first-child {
    margin-bottom: 28px;
    .head {
      margin-bottom: 0;
    }
    div:first-child {
      display: flex;
      align-items: center;
    }

    > .total {
      background-color: transparent !important;
      width: 75px !important;
      border: none !important;
      border-radius: 0 !important;
    }
  }
  .flacjsb {
    overflow: auto;
  }
  > p {
    font-size: 1.6rem;
    text-align: center;
  }
`;
export default DashboardSmall;
