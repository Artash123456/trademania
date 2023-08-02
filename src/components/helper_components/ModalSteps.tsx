import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  activeStep: number;
  steps: number;
}

const ModalSteps: FC<Props> = ({ activeStep, steps }) => {
  let data = [];
  for (let i = 1; i <= steps; i++) data.push(i);
  return (
    <StyledSteps>
      {data.map((elem) => (
        <div className={elem === activeStep ? 'active' : ''} key={elem} />
      ))}
    </StyledSteps>
  );
};

const StyledSteps = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    width: 48px;
    height: 8px;
    background: ${({ theme }) => theme.brands_background};
    opacity: 1;
    border-radius: 2px;

    &:not(:last-child) {
      margin-right: 16px;
    }
  }
  .active {
    background-color: #3968fc;
  }
  @media (max-width: 769px) {
    > div {
      width: 30px;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
  @media (max-width: 450px) {
    > div {
      display: none;
    }
  }
`;
export default ModalSteps;
