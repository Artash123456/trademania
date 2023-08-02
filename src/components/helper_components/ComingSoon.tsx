import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  logo: JSX.Element;
  title: string;
}

const ComingSoon: FC<Props> = ({ logo, title }) => {
  return (
    <StyledComing>
      <div>
        {logo}
        <h2> {title} is coming soon</h2>
        <p>
          We are working on implementing the functionality as fast as possible.
          <br /> Please be patient. Thanks!
        </p>
      </div>
    </StyledComing>
  );
};

const StyledComing = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  > div {
    max-height: 250px;
    margin: 0 auto;
    display: grid;
    place-items: center;
    > svg {
      width: 120px;
      height: 120px;
      > path {
        fill: ${({ theme }) => theme.font_gray};
      }
    }
    > h2,
    > p {
      color: ${({ theme }) => theme.font_gray};
      text-align: center;
      font-weight: bold;
      margin: 0;
    }

    > h2 {
      font-size: 2.4rem;
      letter-spacing: 0.6px;
      margin-bottom: 20px;
    }

    p {
      font-weight: 500;
      line-height: 21px;
      font-size: 1.6rem;
    }
  }
  @media (max-width: 600px) {
    width: 100%;
    > svg {
      width: 160px;
      height: 160px;
    }
  }
`;
export default ComingSoon;
