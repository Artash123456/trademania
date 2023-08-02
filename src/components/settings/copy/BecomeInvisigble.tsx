import { useEffect, useState } from 'react';

import {
  becomePrivateUserPositions,
  setMyProfilePublic,
} from 'redux/actions/settings_actions';
import styled from 'styled-components';
import { ButtonGroup, CopyTradePositionsTable, Button } from 'components';
import { useAppDispatch, useAppSelector } from 'context';

const BecomeInvisigble = () => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const { open_trader } = useAppSelector(({ copy }) => copy.unfollow_info);
  const { copy_table_loading } = useAppSelector(({ loading }) => loading);
  const [unFollowData, setUnfollowData] = useState({
    positions: [],
    income: 0,
  });
  const markets = Boolean(open_trader?.my_markets)
    ? open_trader?.my_markets.join(',')
    : '';
  useEffect(() => {
    if (step === 1)
      dispatch(becomePrivateUserPositions()).then(({ payload }) =>
        setUnfollowData(payload)
      );
  }, [dispatch, open_trader?.user_id, markets, step]);

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

          <Button.Green value="set_39_paragraph" onClick={() => setStep(1)} />
          <Button.Green value="set_42_paragraph" onClick={() => setStep(2)} />
        </>
      ) : (
        <>
          <h4>
            {Number(unFollowData?.income) > 0
              ? `Once you confirm, you will lose all your
        followers, and will earn (
        ${Number((+unFollowData?.income * 50) / 100).toFixed(4)} $) from them`
              : 'You will not have earnings from your followers'}
          </h4>
          <ButtonGroup
            onBack={() => setStep(0)}
            onFurther={() =>
              dispatch(setMyProfilePublic({ status: 0, is_close: step === 1 }))
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
`;
export default BecomeInvisigble;
