import { FC, useCallback, Fragment, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  CopyModalStepErrors,
  CopyModalStepValues,
  DashboardElement,
  PairTypes,
} from 'types';
import { ExchangesContainer, ExchangesPairs } from 'components';
import { FormikErrors } from 'formik';
import { fetchCopyCurrentPositions } from 'redux/actions/copy_actions';
import { deepCopy, useAppDispatch, useAppSelector } from 'context';
import { MultiValue } from 'react-select';

interface Props {
  values: CopyModalStepValues;
  setFieldValue: Function;
  errors: FormikErrors<CopyModalStepErrors>;
}

const CopyFollowStep2: FC<Props> = ({ values, setFieldValue, errors }) => {
  const dispatch = useAppDispatch();

  const { exchanges, user_data, pending } = useAppSelector(
    ({ copy, markets, loading }) => ({
      exchanges: markets.markets,
      user_data: copy.user_data,
      pending: loading.pending,
    })
  );
  const [positions, setPositions] = useState<{
    [key: string]: DashboardElement[];
  }>({ '': [] });
  const markets = useMemo(() => {
    if (!user_data || !exchanges?.[0]?.name) return;
    const arr = [];
    for (let user_market in user_data?.open_trader?.market_pairs) {
      for (let item of exchanges) {
        if (+user_market === item.id) {
          arr.push(item);
        }
      }
    }
    return arr;
  }, [user_data, exchanges]);

  const selectMarket = useCallback(
    (id: number, isActive: boolean) => {
      if (isActive) {
        const obj = values.market_pairs;
        delete obj[id];
        setFieldValue('market_pairs', obj);
      } else {
        if (!Object.hasOwn(positions, id.toString()) && !pending)
          dispatch(
            fetchCopyCurrentPositions({
              trade_id: user_data?.id,
              market_id: id,
            })
          ).then(({ payload }) =>
            setPositions((p) => ({ ...p, [id]: payload }))
          );
        setFieldValue('market_pairs', {
          ...values.market_pairs,
          [id]: [],
        });
      }
    },
    [
      values.market_pairs,
      setFieldValue,
      dispatch,
      user_data?.id,
      positions,
      pending,
    ]
  );
  const selectPair = async (
    pairs: MultiValue<PairTypes>,
    market_id: number
  ) => {
    let arr = deepCopy(pairs);
    for (let pair of arr) {
      if (
        positions.hasOwnProperty(pair.market_id) &&
        positions[pair.market_id]?.length
      )
        for (let position of [...positions[pair.market_id.toString()]]) {
          if (pair.value === position.symbol) {
            pair.has_position = 1;
          }
        }
    }
    setFieldValue('market_pairs', {
      ...values.market_pairs,
      [market_id]: arr,
    });
  };
  if (!markets) return <></>;
  return (
    <StyledExchanges pending={pending}>
      {markets.map((elem, index: number) => {
        const isActive = Object.keys(values.market_pairs).some(
          (item) => String(item) === String(elem.id)
        );
        let pairs = user_data?.open_trader?.market_pairs?.[+elem.id];
        if (values.trade_type === 'spot') {
          pairs = pairs.filter((item: PairTypes) => item.is_spot);
        } else if (values.trade_type === 'leverage') {
          pairs = pairs.filter((item: PairTypes) => !item.is_spot);
        }
        return (
          <Fragment key={index}>
            {elem.name && pairs.length ? (
              <div>
                <span onClick={() => selectMarket(elem.id, isActive)}>
                  <ExchangesContainer
                    elem={elem}
                    key={index}
                    width="100%"
                    bot={true}
                    className={isActive ? 'active-selected' : ''}
                  />
                </span>
                {isActive && (
                  <ExchangesPairs
                    follow_step
                    values={values.market_pairs}
                    trade_type={values.trade_type}
                    data={pairs}
                    onChange={(value) => {
                      selectPair(
                        value.map((item) => item.value),
                        elem.id
                      );
                    }}
                    id={elem.id}
                    slug={elem.slug}
                    onFocus={() => {}}
                    isDisabled={pending}
                  />
                )}
              </div>
            ) : (
              ''
            )}
          </Fragment>
        );
      })}
      {errors.market && <span>{errors.market}</span>}
      {errors.pairs && <span>{errors.pairs}</span>}
    </StyledExchanges>
  );
};
const StyledExchanges = styled.div<{ pending?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
  margin: 19px 0 23px 0;
  position: relative;
  padding-bottom: 20px;
  > div {
    flex: 1;
    animation-name: ${({ pending }) => (pending ? 'loading-items' : '')};
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  > span {
    height: fit-content;
    &:last-child {
      position: absolute;
      color: ${({ theme }) => theme.error_red};
      bottom: 0;
    }
  }
  .active-selected {
    border: 1px solid ${({ theme }) => theme.submit_button_background};
  }
  .copy-select__value-container {
    align-items: flex-start;
    padding: 2px 0px;
  }
  .copy-select__clear-indicator {
    display: none;
  }
`;
export default CopyFollowStep2;
