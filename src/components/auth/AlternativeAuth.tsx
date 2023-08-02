import { FC, useEffect } from 'react';
import { Facebook, Google, GoogleProvider } from 'components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { isElectron } from 'redux/actions/user_actions';

const AlternativeAuth: FC<{ login?: boolean }> = ({ login }) => {
  const navigate = useNavigate();
  const [search] = useSearchParams();

  localStorage.setItem('affiliate_token', search.get('affiliate_token') || '');
  const affiliate_token = localStorage.getItem('affiliate_token') || '';
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('affiliate_token');
    }, 60 * 60 * 1000);
  }, []);
  return (
    <>
      {!isElectron() && (
        <StyledSocial>
          <div />
          <span>Or {login ? 'login' : 'sign up'} using</span>
          <div>
            <Facebook login={login} affiliate_token={affiliate_token} />
            <GoogleProvider>
              <Google login={login} affiliate_token={affiliate_token} />
            </GoogleProvider>
          </div>
        </StyledSocial>
      )}
      <StyledDont>
        <span>
          {login ? "Don't have an account?" : 'Already have an account?'}
        </span>
        {login ? (
          <span onClick={() => navigate('/register')}>Sign up for free</span>
        ) : (
          <span onClick={() => navigate('/')}>Log in</span>
        )}
      </StyledDont>
    </>
  );
};
const StyledDont = styled.div`
  text-align: center;
  margin-top: 32px;
  > span {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    &:first-child {
      color: ${({ theme }) => theme.light_gray};
      margin-right: 10px;
    }
    &:last-child {
      color: #3968fc;
      cursor: pointer;
    }
  }
`;

const StyledSocial = styled.div`
  margin-top: 40px;
  display: grid;
  place-items: center;
  > div:first-child {
    width: 32px;
    height: 0px;
    border: 1px solid ${({ theme }) => theme.font_gray};
    margin-bottom: 16px;
  }
  > span {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: ${({ theme }) => theme.light_gray};
  }
  > div:last-child {
    width: 100%;
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
  .face-button {
    padding: 0;
  }
  @media (max-width: 500px) {
    > div:first-child {
      display: none;
    }
    > div:last-child {
      grid-template-columns: auto;
      grid-row-gap: 16px;
    }
  }
`;
export default AlternativeAuth;
