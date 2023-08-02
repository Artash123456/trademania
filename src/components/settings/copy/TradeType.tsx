import { Switch } from 'components';
import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
  onLeverageClick: MouseEventHandler<HTMLDivElement>;
  onSpotClick: MouseEventHandler<HTMLDivElement>;
  active: string;
}

const TradeType: FC<Props> = ({ onSpotClick, onLeverageClick, active }) => (
  <StyledContainer className="flacjsb">
    <h3>Trading modes</h3>
    <div>
      <label className="flacjsb">
        Leverage
        <Switch
          onChange={onLeverageClick}
          checked={Boolean(active === 'leverage' || active === 'leverage_spot')}
        />
      </label>

      <label className="flacjsb">
        Spot
        <Switch
          onChange={onSpotClick}
          checked={Boolean(active === 'spot' || active === 'leverage_spot')}
        />
      </label>
    </div>
  </StyledContainer>
);

const StyledContainer = styled.div`
  align-items: flex-start;
  h3 {
    margin: 0;
  }
  > div > label:first-child {
    margin-bottom: 50px;
  }
`;
export default TradeType;
