import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { LeverageWalletItem } from 'components';
import { useAppDispatch, useAppSelector } from 'context';
import { fetchManualOverview } from 'redux/actions/manual_actions';
const LeverageWallet: FC<{ addItem?: boolean; head?: string }> = ({
  addItem,
  head = 'Wallet',
}) => {
  const { wallets } = useAppSelector(({ manual }) => manual);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchManualOverview({ id: '', name: 'All' }));
  }, [dispatch]);
  return (
    <StyledWallet>
      <div className="head">{head}</div>
      {!addItem && (
        <div className="body">
          {Object.keys(wallets)?.map((item) => {
            return (
              <LeverageWalletItem key={item} data={wallets[item]} elem={item} />
            );
          })}
        </div>
      )}
    </StyledWallet>
  );
};
const StyledWallet = styled.div`
  height: 100%;
  min-height: 130px;
  padding: 1.6vmin;
  .body {
    padding: 5px;
    overflow: auto;
    height: calc(100% - 110px);
  }
`;
export default LeverageWallet;
