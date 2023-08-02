import { FC, Fragment } from 'react';
import { FormikErrors } from 'formik';
import styled from 'styled-components';
import { CopyModalStepErrors, CopyModalStepValues } from 'types';
import { ExchangesContainer } from 'components';
import { deepCopy, useAppSelector } from 'context';

interface Props {
  values: CopyModalStepValues;
  setFieldValue: Function;
  errors: FormikErrors<CopyModalStepErrors>;
}

const CopyFollowStep3: FC<Props> = ({ errors, values, setFieldValue }) => {
  const { markets } = useAppSelector(({ markets }) => markets);

  const selectMarket = (id: number, isActive: boolean) => {
    let arr = deepCopy(values.my_markets);
    if (isActive) {
      arr = arr.filter((item: number) => item !== id);
    } else {
      arr.push(id);
    }
    setFieldValue('my_markets', arr);
  };
  return (
    <StyledExchanges>
      {markets.map((elem, index: number) => {
        const isActive = values?.my_markets?.some((item) => item === elem.id);
        return (
          <Fragment key={index}>
            {elem.name && elem.has_credential && (
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
              </div>
            )}
          </Fragment>
        );
      })}
      {errors.market && <span>{errors.market}</span>}
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
    border: 1px solid ${({ theme }) => theme.submit_button_background};
  }
`;

export default CopyFollowStep3;
