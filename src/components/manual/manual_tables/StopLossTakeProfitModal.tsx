import { useState, FC } from 'react';
import { openModal } from 'redux/actions/other_actions';
import { postTakeProfit } from 'redux/actions/manual_actions';
import {
  CheckboxInput,
  PercentSelector,
  Button,
  Input,
  Select,
} from 'components';
import { Form, Formik } from 'formik';
import styled from 'styled-components';

import { translation, useAppDispatch, useAppSelector } from 'context';
import { MarketAsProps } from 'types';

const StopLossTakeProfitModal: FC<MarketAsProps> = ({ market }) => {
  const dispatch = useAppDispatch();
  const { take_profit_modal_drop_down, takeProfit, stop_loss } = useAppSelector(
    ({ manual, loading }) => ({
      take_profit_modal_drop_down: manual.take_profit_modal_drop_down,
      takeProfit: manual.takeProfit,
      stop_loss: loading.stop_loss,
    })
  );
  const [check, setCheck] = useState<{
    [key: string]: boolean;
  }>({
    take_profit: false,
    stop_loss: false,
    trailing_stop: false,
  });

  const handleChange = (name: string) => {
    const obj: {
      [key: string]: boolean;
    } = { ...check };
    obj[name] = !obj[name];
    setCheck(obj);
  };
  return (
    <Formik
      enableReinitialize
      onSubmit={(values) => dispatch(postTakeProfit({ values }))}
      initialValues={{
        ...takeProfit,
        take_profit: 0,
        stop_loss: 0,
        trailing_stop: null,
        new_trailing_active: null,
        tp_trigger_by: take_profit_modal_drop_down[market.slug]?.[0]?.value,
        sl_trigger_by: take_profit_modal_drop_down[market.slug]?.[0]?.value,
        entry_price: 0,
        liquidation_price: 0,
        market: market.id,
      }}
    >
      {({ values, setFieldValue, errors, touched, handleSubmit }) => (
        <StyledForm>
          <h2>{translation('take_profit_stop_loss')}</h2>
          <div className="box">
            <CheckboxInput
              label={translation('take_pr')}
              checked={check.take_profit}
              onChange={() => handleChange('take_profit')}
            />
            <div className="flacjsb">
              <Input
                type="number"
                label="Price"
                name="take_profit"
                errors={errors?.take_profit && touched?.take_profit}
                disabled={!check.take_profit}
              />
              <Select
                classNameWrapper="select"
                label={translation('trigger_by')}
                maxMenuHeight={150}
                placeholder={values?.tp_trigger_by}
                value={values?.tp_trigger_by}
                options={take_profit_modal_drop_down[market.slug]}
                onChange={(value) =>
                  setFieldValue('tp_trigger_by', value.value)
                }
              />
            </div>

            <PercentSelector
              arr={1}
              onClick={(e) => {
                const value = Number(
                  +values.entry_price +
                    Number(
                      (+values.entry_price - +values.liquidation_price) * +e
                    ) /
                      100
                );
                setFieldValue('take_profit', value);
              }}
            />
          </div>
          <div className="box">
            <CheckboxInput
              label={translation('stop_loss')}
              checked={check.stop_loss}
              onChange={() => handleChange('stop_loss')}
            />
            <div className="flacjsb">
              <Input
                type="number"
                label="Price"
                name="stop_loss"
                errors={errors?.take_profit && touched?.stop_loss}
                disabled={!check.stop_loss}
              />
              <Select
                classNameWrapper="select"
                label={translation('trigger_by')}
                maxMenuHeight={150}
                placeholder={values?.sl_trigger_by}
                value={values?.sl_trigger_by}
                options={take_profit_modal_drop_down[market.slug]}
                onChange={(value) =>
                  setFieldValue('sl_trigger_by', value.value)
                }
              />
            </div>

            <PercentSelector
              arr={2}
              onClick={(e) => {
                const value = Number(
                  +values.entry_price +
                    Number(
                      (+values.entry_price - +values.liquidation_price) * +e
                    ) /
                      100
                );
                setFieldValue('take_profit', value);
              }}
            />
          </div>
          {values.market !== 2 && (
            <div className="box">
              <CheckboxInput
                label={translation('trailing_stop')}
                name="trailing_stop"
                checked={check.trailing_stop}
                onChange={() => handleChange('trailing_stop')}
              />

              <div className="flacjsb">
                <Input
                  type="number"
                  label="Trail value"
                  name="trailing_stop"
                  errors={errors?.trailing_stop && touched?.trailing_stop}
                />
                <Input
                  type="number"
                  label="Activation Price"
                  name="new_trailing_active"
                  errors={
                    errors?.new_trailing_active && touched?.new_trailing_active
                  }
                />
              </div>
            </div>
          )}
          <div className="flacjsb">
            <Button.Green
              value="decline"
              onClick={() => dispatch(openModal('take_profit_stop_loss'))}
            />
            <Button.Green
              value="confirm"
              type="submit"
              pending={stop_loss}
              onClick={() => handleSubmit()}
            />
          </div>
        </StyledForm>
      )}
    </Formik>
  );
};
const StyledForm = styled(Form)`
  width: 100%;
  min-height: 640px;
  background-color: ${({ theme }) => theme.background_color};
  padding: 1rem 32px;
  border-radius: 8px;
  width: 1200px;
  > h2 {
    margin: 0 0 16px;
  }
  .box {
    border: 1px solid ${({ theme }) => theme.font_gray};
    padding: 1.6vmin;
    margin-bottom: 16px;
    > label {
      margin-bottom: 24px;
    }
    input {
      max-width: 330px;
    }
  }
  .select {
    .react-select {
      max-width: 160px;
      min-width: 100px;
    }
  }
  button {
    width: 100%;
    justify-content: center;
    margin-bottom: 16px;
    &:first-child {
      background: transparent;
      border: 1px solid ${({ theme }) => theme.light_gray};
    }
  }

  @media (max-width: 1200px) {
    min-width: initial;
    padding: 28px 20px;
  }
  @media (max-width: 600px) {
    .flacjsb {
      width: 100%;
      gap: 15px;
    }
  }
`;
export default StopLossTakeProfitModal;
