import { FC } from 'react';
import styled from 'styled-components';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import face from 'assets/images/facebook_logo.svg';
import { useAppDispatch } from 'context';
import { checkByToken, loginWithFacebook } from 'redux/actions/user_actions';
import { AlternativeAuthProps } from 'types';
import { useLocation, useNavigate } from 'react-router-dom';

const Facebook: FC<AlternativeAuthProps> = ({ login, affiliate_token }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    localStorage.setItem('social_token', response.accessToken);
    localStorage.setItem('social_type', 'facebook');
    dispatch(
      checkByToken({ token: response.accessToken, social_type: 'facebook' })
    ).then(({ payload }) => {
      if (payload.has_account) {
        dispatch(
          loginWithFacebook({ token: response.accessToken, affiliate_token })
        );
      } else {
        navigate('/generate-password');
      }
    });
    dispatch(
      loginWithFacebook({ token: response.accessToken, affiliate_token })
    );
  };
  if (!import.meta.env.VITE_FACEBOOK_APP_ID) return <></>;

  return (
    <FacebookLogin
      appId={import.meta.env.VITE_FACEBOOK_APP_ID}
      icon={
        <Styledface className="alternative-button">
          <div className="social-image" />
          <span className="social-login-text">
            {login ? 'Login' : 'Sign Up'} with Facebook
          </span>
        </Styledface>
      }
      version="15.0"
      textButton=""
      cssClass="face-button"
      callback={responseFacebook}
      responseType="token"
    />
  );
};
const Styledface = styled.div`
  .social-image {
    background-image: url(${face});
  }
`;

export default Facebook;
