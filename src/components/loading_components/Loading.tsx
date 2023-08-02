import { Logo } from 'assets/icons';
import { FC } from 'react';
import styled from 'styled-components';

const Loading: FC<{ height?: string }> = ({ height }) => (
  <StyledLoading height={height}>
    <div className="flac">
      <Logo />
      <div>Trademania</div>
    </div>
  </StyledLoading>
);

const StyledLoading = styled.div<{ height?: string }>`
  width: 100%;
  height: ${({ height }) => (height ? height : '100vh')};
  display: grid;
  place-items: center;
  > div {
    > svg {
      margin-right: 20px;
      animation-name: logo-loading;
      animation-duration: 6s;
      animation-iteration-count: infinite;
    }
    > div {
      font-size: 4rem;
      color: #161c2f;
      font-weight: 700;
      position: relative;
    }
  }
`;
export default Loading;
