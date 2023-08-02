import { ButtonGroup, CopyTradePositionsTable, Button } from 'components';
import { useAppDispatch, useAppSelector } from 'context';
import { useState, useEffect } from 'react';
import {
  fetchCopyOpenPositions,
  unfollowTrader,
} from 'redux/actions/copy_actions';
import styled from 'styled-components';
const CopyUnfollowTable = () => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const { open_trader } = useAppSelector(({ copy }) => copy.unfollow_info);
  const { copy_table_loading } = useAppSelector(({ loading }) => loading);
  const { isDemo } = useAppSelector(({ markets }) => markets);
  const [unFollowData, setUnfollowData] = useState({
    positions: [],
    income: 0,
  });
  const fee_to_system = Number((+unFollowData.income * 50) / 100);
  const markets = Boolean(open_trader?.my_markets)
    ? open_trader?.my_markets.join(',')
    : '';

  useEffect(() => {
    dispatch(
      fetchCopyOpenPositions({
        trade_id: open_trader?.user_id,
        markets,
        for_close: true,
      })
    ).then(({ payload }) => setUnfollowData(payload));
  }, [dispatch, markets, open_trader?.user_id]);
  return (
    <StyledContainer>
      {step === 0 ? (
        <>
          <h4>
            Please choose what you want to do with your positions from copy
            trading.
          </h4>
          <CopyTradePositionsTable
            data={unFollowData?.positions}
            loading={copy_table_loading}
          />

          <Button.Green value="set_41_paragraph" onClick={() => setStep(1)} />
          <Button.Green value="set_40_paragraph" onClick={() => setStep(2)} />
        </>
      ) : (
        <>
          <h4>
            Once you confirm, you will no longer follow the (
            {open_trader?.nickname}) trader,
            <br /> and all your positions will remain. As well as, you will be
            charged ({fee_to_system.toFixed(4)} $)
            <br /> based on your earnings from your current positions{' '}
            {step === 2 ? 'for the given time.' : ''}
          </h4>
          <ButtonGroup
            onBack={() => setStep(0)}
            onFurther={() =>
              dispatch(
                unfollowTrader({
                  markets,
                  user_id: open_trader?.user_id,
                  is_close: step === 1,
                  isDemo,
                  fee_to_system: fee_to_system,
                })
              )
            }
            text="confirm"
          />
        </>
      )}
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.body_color};
  padding: 1.6vmin;
  button {
    width: 100%;
    margin-bottom: 16px;
  }
  .table {
    margin-bottom: 25px;
  }
  h4 {
    max-width: 90%;
  }
`;
export default CopyUnfollowTable;
