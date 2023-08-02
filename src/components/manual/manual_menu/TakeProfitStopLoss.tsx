import { FC, ChangeEventHandler, FocusEventHandler } from 'react';
import styled from 'styled-components';
import { RadioButtonGroup, Input } from 'components';
import { translation, useAppSelector } from 'context';
import { FormikValues } from 'formik';

interface Props {
  values: FormikValues;
  onInput1Change: ChangeEventHandler;
  onInput2Change: ChangeEventHandler;
  onButtonGroup1Change: ChangeEventHandler;
  onButtonGroup2Change: ChangeEventHandler;
  errors?: Record<string, string>;
  active?: boolean;
  touched?: Record<string, boolean>;
  handleBlur?: FocusEventHandler;
}

const TakeProfitStopLoss: FC<Props> = ({
  values = {},
  onButtonGroup1Change,
  onButtonGroup2Change,
  errors,
  active,
  touched,
}) => {
  const { takeProfitLabels, stopLossLabels } = useAppSelector(
    ({ manual }) => manual
  );
  return (
    <StyledTakeProfit active={active}>
      <span>{translation('stop_loss')}</span>
      <div>
        <RadioButtonGroup
          onChange={onButtonGroup1Change}
          checked={values.tpTrigger}
          labelList={takeProfitLabels}
        />
        <Input
          type="number"
          name="stop_loss"
          errors={errors && touched && errors.stop_loss ? errors.stop_loss : ''}
        />
      </div>{' '}
      <span>Take Profit</span>
      <div>
        <RadioButtonGroup
          onChange={onButtonGroup2Change}
          checked={values?.slTrigger}
          labelList={stopLossLabels}
        />
        <Input
          type="number"
          name="take_profit"
          errors={
            errors && touched && errors.take_profit && touched.take_profit
              ? errors.take_profit
              : ''
          }
        />
      </div>
    </StyledTakeProfit>
  );
};
const StyledTakeProfit = styled.div<{ active?: boolean }>`
  box-shadow: ${({ theme }) => theme.box_shadow}, 0 -3px 6px #00000029;
  padding: 1.6vmin;
  margin-bottom: 7px;
  height: ${({ active }) => (active ? 'auto' : 0)};
  padding: ${({ active }) => (active ? '15px' : 0)};
  width: ${({ active }) => (active ? 'auto' : 0)};
  transition: all 0.3s;
  > span {
    font-weight: 500;
    font-size: ${(props) => (props.active ? '1.6rem' : '0')};
    line-height: 22px;
    color: ${({ theme }) => theme.light_gray};
  }
  > div {
    grid-template-columns: 130px auto;
    place-items: center;
    display: ${(props) => (props.active ? 'grid' : 'none')};
    border-width: ${(props) => (props.active ? '1px' : 0)} !important;

    > div {
      margin: 0 0 10px !important;
      width: 95%;
    }
  }
`;
export default TakeProfitStopLoss;
