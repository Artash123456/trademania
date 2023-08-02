import { SpotStats, SpotOverview, SpotList } from 'components';
import styled from 'styled-components';

const SpotDashboard = () => (
  <StyledSpotMain className="container">
    <h1>Spot Dashboard</h1>
    <SpotOverview />
    <SpotList />
    <SpotStats />
  </StyledSpotMain>
);

const StyledSpotMain = styled.div`
  > div {
    margin-bottom: 32px;
  }
`;
export default SpotDashboard;
