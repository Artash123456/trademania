import { Fragment, FC, useCallback } from 'react';
import styled from 'styled-components';
import { PairTypes } from 'types';
import { ExchangesContainer, ExchangesPairs } from 'components';
import { FormikErrors, FormikValues } from 'formik';
import { deepCopy, useAppDispatch, useAppSelector } from 'context';
import { changeCopyValues } from 'redux/reducers/settings';

interface Props {
  values?: FormikValues;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined
  ) => void;
  errors?: FormikErrors<Record<string, string>>;
  disabled?: boolean;
}

const Exchanges: FC<Props> = ({ values, setFieldValue, errors, disabled }) => {
  const dispatch = useAppDispatch();
  const { markets } = useAppSelector(({ markets }) => markets);
  const pairsRequest = useCallback(
    (id: number, isActive: boolean) => {
      if (disabled) return;
      if (isActive) {
        const obj = deepCopy(values?.market_pairs);
        delete obj[id];
        setFieldValue('market_pairs', obj);
        dispatch(changeCopyValues({ ...values, market_pairs: obj }));
      } else {
        setFieldValue('market_pairs', {
          ...values?.market_pairs,
          [id]: [],
        });
        dispatch(
          changeCopyValues({
            ...values,
            market_pairs: { ...values?.market_pairs, [id]: [] },
          })
        );
      }
    },
    [setFieldValue, disabled, dispatch, values]
  );
  const selectPair = (pairs: PairTypes[], market_id: number) => {
    setFieldValue('market_pairs', {
      ...values?.market_pairs,
      [market_id]: pairs,
    });
    dispatch(
      changeCopyValues({
        ...values,
        market_pairs: {
          ...values?.market_pairs,
          [market_id]: pairs,
        },
      })
    );
  };
  return (
    <StyledExchanges>
      {markets.map((elem, index) => {
        let isActive = false;
        if (values?.market_pairs)
          isActive = Object.keys(values?.market_pairs).some(
            (item) => String(item) === String(elem.id)
          );
        return (
          <Fragment key={index}>
            {elem.name && elem.has_credential && (
              <div>
                <span onClick={() => pairsRequest(elem.id, isActive)}>
                  <ExchangesContainer
                    elem={elem}
                    key={index}
                    width="100%"
                    bot
                    className={isActive ? 'active-selected' : ''}
                  />
                </span>
                {isActive && (
                  <ExchangesPairs
                    trade_type={values?.trade_type}
                    values={values?.market_pairs}
                    data={[]}
                    id={isActive ? elem.id : 0}
                    slug={elem.slug}
                    onChange={(value) =>
                      selectPair(
                        value.map((item) => item.value),
                        elem.id
                      )
                    }
                  />
                )}
              </div>
            )}
          </Fragment>
        );
      })}
      {errors?.market && <span>{errors?.market}</span>}
      {errors?.pairs && <span>{errors?.pairs}</span>}
    </StyledExchanges>
  );
};
const StyledExchanges = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
  margin: 19px 0 23px 0;
  position: relative;
  padding-bottom: 20px;
  > div {
    flex: 1;
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
    border: 2px solid ${({ theme }) => theme.submit_button_background};
  }
  .copy-select__value-container {
    align-items: flex-start;
    padding: 2px 0px;
  }
  .copy-select__clear-indicator {
    display: none;
  }
  @media (max-width: 769px) {
    display: grid;
  }
`;
export default Exchanges;
