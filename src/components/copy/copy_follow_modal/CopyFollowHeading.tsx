import { FC } from 'react';
import styled from 'styled-components';
import { translation } from 'context';
const CopyFollowHeading: FC<{ activeStep: number }> = ({ activeStep }) => {
  return (
    <StyledHeading>
      {translation(
        activeStep === 1
          ? 'trade_type'
          : activeStep === 2
          ? 'choose_exchange'
          : activeStep === 3
          ? 'choose_your_exchange'
          : activeStep === 4
          ? 'choose_investment'
          : 'summary'
      )}
    </StyledHeading>
  );
};
const StyledHeading = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  line-height: 3.7rem;
  font-weight: 600;
  letter-spacing: 1.2px;
  color: ${({ theme }) => theme.font_gray};
  margin: 0 auto 57px;
  text-transform: uppercase;
`;
export default CopyFollowHeading;
