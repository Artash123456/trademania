import { FC } from 'react';
import styled from 'styled-components';
import { CopyModalStepValues } from 'types';
import { selectCopyTradeType } from 'redux/actions/other_actions';
import { useAppSelector } from 'context';
import { Switch } from 'components';

interface Props {
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined
  ) => void;
  values: CopyModalStepValues;
  setErrors: (value: Record<string, string | undefined>) => void;
}

const CopyFollowStep1: FC<Props> = ({ setFieldValue, values, setErrors }) => {
  const { trade_type } = useAppSelector(
    ({ copy }) => copy?.user_data?.open_trader
  );
  return (
    <StyledContainer>
      {(trade_type === 'leverage' || trade_type === 'leverage_spot') && (
        <label>
          <Switch
            onChange={() =>
              selectCopyTradeType('leverage', values, setErrors, setFieldValue)
            }
            checked={
              values.trade_type === 'leverage' ||
              values.trade_type === 'leverage_spot'
            }
          />
          <p>Leverage</p>
        </label>
      )}
      {(trade_type === 'spot' || trade_type === 'leverage_spot') && (
        <label>
          <Switch
            onChange={() =>
              selectCopyTradeType('spot', values, setErrors, setFieldValue)
            }
            checked={
              values.trade_type === 'spot' ||
              values.trade_type === 'leverage_spot'
            }
          />
          <p>Spot</p>
        </label>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: grid;
  place-items: center;
  grid-row-gap: 10px;
  label {
    display: grid;
    grid-template-columns: 55px 100px;
    grid-column-gap: 10px;
    align-items: center;
  }
  p {
    font-size: 1.6rem;
  }
`;

export default CopyFollowStep1;
