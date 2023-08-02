import { FC } from 'react';
import { useAppDispatch } from 'context';
import { useNavigate } from 'react-router-dom';
import { changeTheme } from 'redux/reducers/styles';
import styled, { css } from 'styled-components';
import { handleLogout } from 'redux/actions/user_actions';

const ContextMenu: FC<{ points: { x?: number; y?: number } }> = ({
  points,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <StyledNavigation y={points.y} x={points.x}>
      <div onClick={() => navigate('/settings/account')}>Account Settings</div>
      <div onClick={() => navigate('/settings/safety')}>Security Settings</div>
      <div onClick={() => navigate('/settings/api-connections')}>
        Api Settings
      </div>
      <div onClick={() => dispatch(changeTheme())}>Change Theme</div>
      <div onClick={() => dispatch(handleLogout()).then(() => navigate('/'))}>
        Log Out
      </div>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.div<{ x?: number; y?: number }>`
  position: absolute;
  z-index: 99;
  width: 200px;
  background-color: ${({ theme }) => theme.background_color};
  border-radius: 5px;
  box-shadow: 1px 1px 3px #000;
  padding: 4px;
  display: grid;
  ${({ x, y }) => css`
    top: ${y}px;
    left: ${x}px;
  `};
  > div {
    padding: 16px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${({ theme }) => theme.font_gray};
    cursor: pointer;
    &:last-child {
      color: #fa5252;
    }
    &:hover {
      background-color: #3968fc;
      color: #fff;
    }
  }
`;
export default ContextMenu;
