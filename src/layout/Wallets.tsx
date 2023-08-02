import { LeverageWallet, SpotWallet } from 'components';
import styled from 'styled-components';
const Wallets = () => {
  return (
    <StyledWallet className="container">
      <h1>WALLETS </h1>
      <div className="grid">
        <SpotWallet head="SPOT WALLET" />
        <LeverageWallet head="LEVERAGE WALLET" />
      </div>
    </StyledWallet>
  );
};
const StyledWallet = styled.div`
  > .grid {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    > div {
      height: 400px;
      background-color: ${({ theme }) => theme.background_color};
    }
  }
  @media (max-width: 900px) {
    .grid {
      grid-template-columns: auto;
    }
  }
`;
export default Wallets;
