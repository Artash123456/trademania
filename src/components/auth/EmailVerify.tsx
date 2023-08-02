import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { handleLogout, resendEmail } from 'redux/actions/user_actions';
import { Button } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
const EmailVerify = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resend_email } = useAppSelector(({ loading }) => loading);
  const logout = () => {
    dispatch(handleLogout()).then(() => navigate('/'));
  };
  window.onbeforeunload = (e) => {
    e.preventDefault();
    logout();
  };
  useEffect(() => {
    return () => {
      logout();
    };
  }, [dispatch, navigate]);

  return (
    <>
      <StyledEmail>
        <h2>{translation('email_verify')}</h2>
        <h3>{translation('set_34_paragraph')}</h3>
        <div className="flacjsb">
          <Button.Green
            value="resend_email"
            onClick={() => dispatch(resendEmail())}
            pending={resend_email}
          />
          <Button.Green onClick={logout}>Log Out</Button.Green>
        </div>
      </StyledEmail>
    </>
  );
};
const StyledEmail = styled.div`
  background-color: ${({ theme }) => theme.background_color};
  max-width: 600px;
  padding: 16px;
  .flacjsb {
    gap: 25px;
    > button {
      flex: 1;
    }
  }
  @media (max-width: 500px) {
    .flacjsb {
      flex-direction: column;
      > button {
        width: 100%;
      }
    }
  }
`;
export default EmailVerify;
