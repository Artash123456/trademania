import styled from 'styled-components';
import { FC, JSXElementConstructor, ReactElement, cloneElement } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from 'context';
import { checkByToken, loginWithGoogle } from 'redux/actions/user_actions';
import google from 'assets/images/google_logo.svg';
import { AlternativeAuthProps } from 'types';
import { useNavigate } from 'react-router-dom';

const Google: FC<AlternativeAuthProps> = ({ login, affiliate_token }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      localStorage.setItem('social_token', access_token);
      localStorage.setItem('social_type', 'google');
      dispatch(
        checkByToken({ token: access_token, social_type: 'google' })
      ).then(({ payload }) => {
        if (payload.has_account) {
          dispatch(loginWithGoogle({ token: access_token, affiliate_token }));
        } else {
          navigate('/generate-password');
        }
      });
    },
  });

  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) return <></>;
  return (
    <StyledGoogle className="alternative-button" onClick={() => handleLogin()}>
      <div className="social-image" />
      <span className="social-login-text">
        {login ? 'Login' : 'Sign Up'} with Google
      </span>
    </StyledGoogle>
  );
};

const Provider: FC<{
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
      {cloneElement(children)}
    </GoogleOAuthProvider>
  );
};
const StyledGoogle = styled.div`
  .social-image {
    background-image: url(${google});
  }
`;

export default Google;
export const GoogleProvider = Provider;
