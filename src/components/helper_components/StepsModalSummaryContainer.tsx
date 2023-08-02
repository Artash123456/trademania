import { Children, FC, isValidElement, ReactNode } from 'react';
import styled from 'styled-components';
import { RiPencilFill } from 'react-icons/ri';

interface Props {
  heading: string;
  step: number;
  setStep: Function;
  children: ReactNode | string;
}

const StepsModalSummaryContainer: FC<Props> = ({
  step,
  setStep,
  children,
  heading,
}) => {
  return (
    <StyledContainer>
      <span className="s">{heading}</span>
      {Children.map(children, (child) => {
        if (isValidElement(child)) return child;
        return '';
      })}
      <RiPencilFill onClick={() => setStep(step)} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.dark_input};
  display: grid;
  grid-template-columns: auto auto 25px;
  grid-column-gap: 24px;
  align-items: center;
  padding-inline: 16px;
  height: 80px;
  > .s {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 22px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.font_gray};
  }
  > svg {
    color: ${({ theme }) => theme.font_gray};
    font-size: 2.4rem;

    cursor: pointer;
  }
  > div {
    justify-self: end;
  }
  @media (max-width: 450px) {
    grid-column-gap: 8px;
  }
`;
export default StepsModalSummaryContainer;
