import { FormikErrors, FormikTouched } from 'formik';
import { FC } from 'react';
import styled from 'styled-components';
import { CopyModalStepErrors, CopyModalStepValues } from 'types';
import { Input } from 'components';

interface Props {
  errors: FormikErrors<CopyModalStepErrors>;
  touched: FormikTouched<CopyModalStepValues>;
}

const CopyFollowStep4: FC<Props> = ({ errors, touched }) => {
  return (
    <StyledContainer>
      <Input
        label="Initial Investment"
        name="initial_investment"
        type="number"
        errors={errors?.initial_investment}
        touched={touched?.initial_investment}
        autoFocus
      />
      <Input
        label="Per Trade Amount"
        name="per_trade_amount"
        type="number"
        errors={errors?.per_trade_amount}
        touched={touched?.per_trade_amount}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  > p,
  > p > b {
    font-size: 2.2rem;
  }
`;

export default CopyFollowStep4;
