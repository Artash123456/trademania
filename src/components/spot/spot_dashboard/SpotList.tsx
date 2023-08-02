import { useState } from 'react';
import styled from 'styled-components';
import { SpotMarketsHeader, SpotListTable, SpotGrid } from 'components';
const SpotList = () => {
  const [view, setView] = useState(true);
  return (
    <StyledCont>
      <div className="head">
        Spot List
        <SpotMarketsHeader />
        <div className="button-navigation">
          <span className={view ? 'active' : ''} onClick={() => setView(true)}>
            LIST
          </span>
          <span
            className={!view ? 'active' : ''}
            onClick={() => setView(false)}
          >
            GRID
          </span>
        </div>
      </div>
      {view ? <SpotListTable /> : <SpotGrid />}
    </StyledCont>
  );
};
const StyledCont = styled.div`
  background-color: ${({ theme }) => theme.background_color};
  padding: 1.6vmin;
  .head {
    display: flex;
    align-items: center;
    > div:first-child {
      margin-left: auto;
    }
  }
  @media (max-width: 680px) {
    .head {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .button-navigation:first-child {
        grid-area: 2/1/2/4;
        width: fit-content;
        margin-left: 0;
      }
      .button-navigation:last-child {
        grid-area: 1/2;
        margin-left: auto;
      }
    }
  } ;
`;
export default SpotList;
