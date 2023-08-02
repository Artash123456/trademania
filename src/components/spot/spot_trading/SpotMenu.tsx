import { FC, useEffect } from 'react';
import {
  LimitSpot,
  MarketSpot,
  SpotMenuNavigation,
  SpotOrderTypeNav,
} from 'components';
import styled from 'styled-components';
import { fetchSpotPairs } from 'redux/actions/spot_actions';
import { SpotMarket } from 'types';
import { useAppDispatch, useAppSelector } from 'context';

interface Props {
  market?: SpotMarket;
  addItem?: boolean;
}

const SpotMenu: FC<Props> = ({ market = { name: '', id: 0 }, addItem }) => {
  const dispatch = useAppDispatch();
  const { activeMenu } = useAppSelector(({ spot }) => spot);
  const { pending } = useAppSelector(({ loading }) => loading);

  useEffect(() => {
    if (market?.id) dispatch(fetchSpotPairs({ market }));
  }, [dispatch, market]);
  return (
    <StyledMenu pending={pending}>
      <div className="head">
        Financial Operation
        <SpotMenuNavigation />
      </div>
      <SpotOrderTypeNav />
      {market &&
        !addItem &&
        (activeMenu === 'Limit' ? (
          <LimitSpot market={market} />
        ) : activeMenu === 'Market' ? (
          <MarketSpot market={market} />
        ) : (
          ''
        ))}
    </StyledMenu>
  );
};

const StyledMenu = styled.div<{ pending?: boolean }>`
  height: 100%;
  overflow: auto;
  padding: 1.6vmin;
  pointer-events: ${({ pending }) => (pending ? 'none' : 'all')};
  opacity: ${({ pending }) => (pending ? '0.3' : '1')};
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  > form {
    > .price-qty {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 10px;
    }

    .buy,
    .sell {
      color: #fff;
      border: none;
      width: 100%;
      height: 56px;
      margin-top: 16px;
      margin-bottom: 16px;
      font-weight: 600;
      font-size: 2rem;
      line-height: 27px;
    }
    .buy {
      background-color: #18d690;
    }
    .sell {
      background-color: #e03131;
    }
  }
`;

export default SpotMenu;
