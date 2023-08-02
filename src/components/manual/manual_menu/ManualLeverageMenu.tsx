import { FC, useEffect } from 'react';
import { ManualLimit, ManualMarket, ManualConditional } from 'components';
import styled from 'styled-components';
import { fetchManualPairs } from 'redux/actions/manual_actions';
import { useAppDispatch, useAppSelector } from 'context';

const ManualLeverageMenu: FC<{
  market: { id: number; name: string, slug: string };
}> = ({ market }) => {
  const dispatch = useAppDispatch();
  const { activeMenu } = useAppSelector(({ manual }) => manual);
  useEffect(() => {
    dispatch(fetchManualPairs(market));
  }, [dispatch, market]);
  return (
    <StyledMenu>
      {activeMenu === 'Limit' ? (
        <ManualLimit market={market} />
      ) : activeMenu === 'Market' ? (
        <ManualMarket market={market} />
      ) : (
        <ManualConditional market={market} />
      )}
    </StyledMenu>
  );
};
const StyledMenu = styled.div`
  > div,
  .check {
    display: flex;
    flex-wrap: wrap;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    > label {
      display: flex;
      align-items: center;
      width: 50%;
      font-size: 1.2rem;
      line-height: 2.1rem;
      font-weight: bold;
      letter-spacing: 0.6px;
      color: ${({ theme }) => theme.font_gray} !important;
      margin-bottom: 10px;
      > input {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
export default ManualLeverageMenu;
