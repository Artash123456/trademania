import { FC } from 'react';
import styled from 'styled-components';
const ExchangesLoading: FC<{ width?: string }> = ({ width }) => (
  <StyledLoading width={width} className="loading-anim" />
);

const StyledLoading = styled.div<{ width?: string }>`
  background: ${({ theme }) => theme.perc_background};
  width: ${({ width }) => width};
  height: 92px;
`;
export default ExchangesLoading;
