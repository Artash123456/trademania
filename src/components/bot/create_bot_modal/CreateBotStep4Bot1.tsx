import { FC } from 'react';
import { CheckboxInput, Input } from 'components';
import styled from 'styled-components';
import { getImage, translation, useAppSelector } from 'context';
import { BotModalStepValues } from 'types';
import { FormikErrors } from 'formik';

const CreateBotStep4Bot1: FC<{
  values: BotModalStepValues;
  errors: FormikErrors<BotModalStepValues>;
  setFieldValue: Function;
}> = ({ values, errors, setFieldValue }) => {
  const { balance } = useAppSelector(({ bot }) => bot);
  return (
    <StyledContainer>
      <div>
        <span>Credit</span>
        <span>
          {balance.balance_coin} {values?.pair?.base}
        </span>
      </div>
      <div className="invest">
        <Input
          label={translation('choose_capital')}
          name="capital.capital"
          type="number"
          errors={errors && errors.capital ? errors?.capital?.capital : ''}
          touched={true}
        >
          <div className="coin">
            <div
              style={{
                backgroundImage: `url(${getImage(
                  values?.pair?.quote,
                  true,
                  false
                )})`,
              }}
            />
            <span>{values?.pair?.quote}</span>
          </div>
        </Input>
        <Input
          label={translation('balance')}
          name="capital.balance"
          type="number"
          disabled
        >
          <div className="coin">
            <div
              style={{
                backgroundImage: `url(${getImage(
                  values?.pair?.quote,
                  true,
                  false
                )})`,
              }}
            />
            <span>{values?.pair?.quote}</span>
          </div>
        </Input>

        <CheckboxInput
          label={translation('automatically_reinvest')}
          title={translation('automatically_reinvest')}
          name="capital.reinvest"
          checked={values.capital.reinvest}
          onChange={() =>
            setFieldValue('capital', {
              ...values.capital,
              reinvest: !values.capital.reinvest,
            })
          }
        />
      </div>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  display: grid;
  place-items: center;

  > div:first-child {
    background: ${({ theme }) => theme.dark_input};
    width: 100%;
    padding: 4.6vmin 2.4vmin;
    display: flex;
    justify-content: space-between;
    > span:first-child {
      font-weight: 500;
      font-size: 1.8rem;
      line-height: 150%;
      color: ${({ theme }) => theme.light_gray};
    }
    > span:last-child {
      font-weight: 600;
      font-size: 2.4rem;
      line-height: 33px;
      color: ${({ theme }) => theme.light_gray};
    }
  }
  .invest {
    width: 100%;
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
    position: relative;
    .coin {
      position: absolute;
      top: 30px;
      right: 0;
      height: 56px;
      display: flex;
      align-items: center;
      padding-right: 16px;
      > div {
        width: 32px;
        height: 32px;
        background-size: cover;
        margin-right: 16px;
      }
      > span {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 22px;
        color: ${({ theme }) => theme.light_gray};
        text-transform: uppercase;
      }
    }
  }
  @media (max-width: 600px) {
    .invest .coin > div {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
`;
export default CreateBotStep4Bot1;
