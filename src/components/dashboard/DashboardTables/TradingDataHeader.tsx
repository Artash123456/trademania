import { MouseEventHandler, FC, useState, useEffect, memo } from 'react';
import { fetchPairs } from 'redux/actions/trading_actions';
import styled from 'styled-components';
import { RiRefreshLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from 'context';
import { DashboardElement, PairTypes, TableHead } from 'types';
import { Select } from 'components';
import { PayloadAction } from '@reduxjs/toolkit';

interface Props {
  onRefresh: MouseEventHandler<HTMLOrSVGElement>;
  tableHeader: TableHead;
  has_credential?: boolean;
  onChangePair: (e: PairTypes | null) => void;
  elem?: DashboardElement;
  is_all?: boolean;
}

const TradingDataHeader: FC<Props> = ({
  onRefresh,
  has_credential,
  onChangePair,
  elem,
  is_all = false,
  tableHeader,
}) => {
  const { zoomed, editable } = useAppSelector(({ dashboard }) => dashboard);
  const active_table_navigation = tableHeader?.find((elem) =>
    elem.active ? elem.name : ''
  )?.name;
  const show_pair_dropdown =
    active_table_navigation === 'fills' ||
    active_table_navigation === 'order_history';
  const dispatch = useAppDispatch();
  const [pairs, setPairs] = useState<PairTypes[]>([]);
  useEffect(() => {
    if (elem && !editable && show_pair_dropdown) {
      const formData = new FormData();
      formData.append('market_id', `${elem?.market_id}`);
      formData.append('slug', elem?.logo);
      formData.append('is_spot', `${elem?.is_spot}`);
      dispatch(fetchPairs({ formData, market: elem.logo })).then(
        ({ payload }: PayloadAction<any>) => {
          setPairs(payload?.data);
          onChangePair(payload?.data[0]);
        }
      );
    }
    //eslint-disable-next-line
  }, [dispatch, elem, editable, show_pair_dropdown]);
  return (
    <StyledHeaderCont has_credential={has_credential}>
      <RiRefreshLine onClick={onRefresh} />
      {!is_all && (
        <>
          <div className="bt">
            API-Status:
            <div className="st" />
          </div>
          {show_pair_dropdown ? (
            <Select
              classNameWrapper="drop-down"
              placeholder={pairs?.length ? pairs?.[0].name : ''}
              onChange={(e) => onChangePair(e)}
              options={pairs}
              maxMenuHeight={150}
              isDisabled={zoomed ? true : false}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </StyledHeaderCont>
  );
};
const StyledHeaderCont = styled.div<{ has_credential?: boolean }>`
  display: flex;
  align-items: center;
  overflow: auto;
  margin-left: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  > .bt {
    background-color: ${({ theme }) => theme.dark_input};
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 19px;
    color: ${({ theme }) => theme.font_gray};
    &:not(:last-child) {
      margin-right: 24px;
    }
    > .st {
      width: 8px;
      height: 8px;
      background: ${({ has_credential }) =>
        has_credential ? '#36d121' : '#AF2F56'};
      padding: 0;
      border: none;
      margin-left: 2px;
    }
  }

  .drop-down {
    margin-right: 24px;
    margin-bottom: 0;
    .react-select {
      min-width: 124px;
    }
    .react-select__control {
      height: 34px;
      min-height: 34px;
      margin-top: 0;
    }
    .err {
      display: none;
    }
  }

  > svg {
    font-size: 23px;
    margin-right: 24px;
    cursor: pointer;
    color: ${({ theme }) => theme.font_gray};
  }
`;
export default memo(TradingDataHeader);
