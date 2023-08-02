import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { SpotWalletItem } from 'components';
import { fetchSpotOverview } from 'redux/actions/spot_actions';
import { useAppDispatch, useAppSelector } from 'context';
const SpotWallet: FC<{ addItem?: boolean; head?: string }> = ({
  addItem,
  head = 'Wallet',
}) => {
  const { wallets } = useAppSelector(({ spot }) => spot);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSpotOverview({ id: 0, name: 'All' }));
  }, [dispatch]);
  return (
    <StyledWallet>
      <div className="head">{head}</div>
      {!addItem && (
        <div className="body">
          {Object.keys(wallets)?.map((item) => {
            return (
              <SpotWalletItem key={item} data={wallets[item]} elem={item} />
            );
          })}
        </div>
      )}
    </StyledWallet>
  );
};
const StyledWallet = styled.div`
  height: 100%;
  padding: 1.6vmin;
  .body {
    padding: 5px;
    overflow: auto;
    height: calc(100% - 110px);
  }
`;
export default SpotWallet;
