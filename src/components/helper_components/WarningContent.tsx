import { FC, ReactNode } from 'react';
import { AiFillWarning } from 'react-icons/ai';
import styled from 'styled-components';

interface Props {
  heading?: string;
  paragraph?: string;
  icon?: ReactNode;
  children?: ReactNode | string;
}

const WarningContent: FC<Props> = ({
  heading = 'Warning',
  paragraph = '',
  icon = (
    <div className="war">
      <AiFillWarning />
    </div>
  ),
  children = '',
}) => {
  return (
    <StyledWarning>
      {icon}
      <h2>{heading}</h2>
      <p>{paragraph}</p>
      {children}
    </StyledWarning>
  );
};
const StyledWarning = styled.div`
  margin: 16px 0;
  padding: 1.6vmin;
  background: ${({ theme }) => theme.dark_input};
  > .war {
    width: 64px;
    height: 64px;
    background-color: ${({ theme }) => theme.font_white};
    border-radius: 50%;
    display: grid;
    place-items: center;
    > svg {
      font-size: 3.2rem;
      color: ${({ theme }) => theme.light_gray};
    }
  }
  > h2 {
    font-weight: 600;
    font-size: 2rem;
    line-height: 21px;
    color: ${({ theme }) => theme.font_gray};
    margin-top: 35px;
    margin-bottom: 0;
  }
  > p {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    color: ${({ theme }) => theme.light_gray};
  }
`;
export default WarningContent;
