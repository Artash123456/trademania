import { CopyUserActivity, Button } from 'components';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'context';
import { openModal } from 'redux/actions/other_actions';
import { useLocation } from 'react-router-dom';

const CopyUserModal = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user_data } = useAppSelector(({ copy }) => copy);
  return (
    <StyledModalContainer>
      <h1>{user_data.open_trader.nickname}</h1>
      <CopyUserActivity data={user_data} />
      <h3>BIO</h3>
      <p>{user_data.open_trader.description}</p>{' '}
      {location.pathname !== '/admin/copy' && (
        <Button.Green
          value="follow"
          onClick={() => {
            dispatch(openModal('copy_follow'));
            dispatch(openModal('copy_user_info'));
          }}
        />
      )}
    </StyledModalContainer>
  );
};
const StyledModalContainer = styled.div`
  background-color: ${({ theme }) => theme.background_color};
  max-width: 1600px;
  > button {
    width: 100%;
    height: 48px;
  }
  > p {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
    max-width: 800px;
  }
  @media (max-width: 1150px) {
    margin: 0 auto;
  }
`;
export default CopyUserModal;
