import { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { MarketSocketPrice, translation, useAppSelector } from 'context';
import { BotModalStepValues } from 'types';
import { FormikErrors, FormikTouched } from 'formik';
import { Input } from 'components';
import {
  LineChart,
  Line,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
const CreateBotStep4Bot2: FC<{
  values: BotModalStepValues;
  errors: FormikErrors<BotModalStepValues>;
  touched: FormikTouched<BotModalStepValues>;
  setErrors: (errors: any) => void;
}> = ({
  errors = { capital: {} },
  touched = { capital: {} },
  values,
  setErrors,
}) => {
  const { balance } = useAppSelector(({ bot }) => bot);
  const { price } = MarketSocketPrice(values?.market?.name || '', values.pair);
  const draw_chart = useMemo(() => {
    const grids = values?.capital?.grids;
    if (+grids > 100) return [];
    const lower_price = values?.capital?.lower_price;
    const upper_price = values?.capital?.upper_price;
    const arr = [];
    if (upper_price && lower_price && grids) {
      const g = (+upper_price - +lower_price) / +grids;
      for (let i = 0; i < +grids; i++) {
        arr.push({
          buy: undefined,
          sell: +Math.floor(+i * +g + +lower_price),
        });
      }
      arr[arr.length] = { buy: upper_price, sell: upper_price };
      for (let i = arr.length - 2; i >= 0; i--) {
        arr.push({
          sell: undefined,
          buy: +Math.floor(+i * +g + +lower_price),
        });
      }
    }
    return arr;
  }, [values]);
  useEffect(() => {
    if (values && values.capital) {
      const { balance, investment, grids } = values.capital;
      const per_trade_amount = +investment / +grids;
      if (
        grids &&
        investment &&
        balance &&
        +(per_trade_amount * (+grids + 1) > +balance)
      )
        setErrors({
          ...errors,
          capital: {
            ...errors?.capital,
            investment: `The budget for your settings is ${
              investment + per_trade_amount
            }. This includes initial market order. Your balance less than the budget of your settings.`,
          },
        });
    }
  }, [errors, values, setErrors]);
  return (
    <StyledContainer>
      <div className="flacjsb">
        <div>
          <Input
            label="Lower Price"
            name="capital.lower_price"
            touched={
              touched && touched?.capital && touched?.capital?.lower_price
            }
            errors={errors && errors.capital ? errors.capital.lower_price : ''}
            type="number"
          />
          <Input
            label="Upper Price"
            name="capital.upper_price"
            touched={
              touched && touched?.capital && touched?.capital?.upper_price
            }
            errors={
              errors && touched && touched.capital && errors.capital
                ? errors.capital.upper_price
                : ''
            }
            type="number"
          />
          <Input
            label="Grids"
            info="Please note that there will be one more market order for bot initialization"
            name="capital.grids"
            touched={touched && touched?.capital && touched?.capital?.grids}
            errors={
              errors && touched && touched.capital && errors.capital
                ? errors.capital.grids
                : ''
            }
            type="number"
          />
          <Input
            label={translation('choose_capital')}
            touched={
              touched && touched?.capital && touched?.capital?.investment
            }
            name="capital.investment"
            errors={
              errors && touched && touched.capital && errors.capital
                ? errors.capital.investment
                : ''
            }
            type="number"
          />
          <Input
            label={'Income percent'}
            touched={
              touched && touched?.capital && touched?.capital?.income_percent
            }
            name="capital.income_percent"
            errors={
              errors && touched && touched.capital && errors.capital
                ? errors.capital.income_percent
                : ''
            }
            type="number"
          />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={draw_chart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <YAxis domain={['buy']} />
            <Tooltip />
            {draw_chart.map((item, index) => (
              <ReferenceLine
                key={index}
                y={item.buy}
                stroke="gray"
                label={item.buy}
              />
            ))}
            <ReferenceLine
              y={
                values?.market?.name === 'phemex'
                  ? Number(price) / 10000
                  : price
              }
              stroke="blue"
              label={`Price ${
                values?.market?.name === 'phemex'
                  ? Number(price) / 10000
                  : price
              }`}
            />

            <Line type="basis" dataKey="buy" label="Buy" stroke={'green'} />
            <Line type="basis" dataKey="sell" label="Sell" stroke={'red'} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="adv">
        <p>
          Price: ≈{' '}
          {values?.market?.name === 'phemex' ? Number(price) / 10000 : price}
        </p>
        <p>
          Balance: ≈ {balance.balance} {values.pair?.quote}
        </p>
      </div>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  overflow: auto;
  max-height: 530px;
  padding-right: 20px;
  .recharts-label {
    transform: translate(-45%, -10px);
    text-align: left;
  }
  .recharts-cartesian-axis-tick-value,
  .recharts-cartesian-axis-tick {
    display: none;
  }
  @media (max-width: 769px) {
    .flacjsb {
      flex-direction: column;
      > div {
        width: 100%;
      }
    }
  }
`;
export default CreateBotStep4Bot2;
