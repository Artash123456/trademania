import {
  EmailVerify,
  TwoFactorValidation,
  ResetPasswordEmail,
  ResetPassword,
  SignUp,
  SignIn,
  GeneratePassword,
} from 'components';
import { Routes, Route } from 'react-router-dom';
import background_blue_image from 'assets/images/login_background.svg';
import styled from 'styled-components';
import { Logo } from 'assets/icons';

export const SignPage = () => {
  return (
    <MainContainer>
      <StyledBlueBackground>
        <div>
          <abbr className="logo">
            <Logo color="#fff" />
            <span>Trademania</span>
          </abbr>
          <p>
            One Platform. <br />
            Four different trading
            <br /> modes.
          </p>
        </div>
      </StyledBlueBackground>
      <section>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/generate-password" element={<GeneratePassword />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/two-factor" element={<TwoFactorValidation />} />
          <Route path="/verify-email" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ResetPasswordEmail />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </section>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 44% auto;
  height: 100vh;
  border-radius: 0;
  .logo > span {
    color: #fff;
  }

  > section {
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 135px;
    background-color: ${({ theme }) => theme.body_color};
    overflow-y: auto;
    form {
      max-width: 600px;
    }
  }
  @media (max-width: 1600px) {
    > section {
      padding-top: 25px;
      padding-left: 25px;
      > form {
        max-width: 500px;
      }
    }
  }
  @media (max-width: 996px) {
    > section {
      form {
        max-width: 350px;
      }
    }
  }
  @media (max-width: 769px) {
    grid-template-columns: auto;
    overflow: auto;
    > section {
      padding: 25px;
      overflow-y: initial;
      form {
        max-width: 100%;
        h2 {
          margin-top: 0;
        }
      }
    }
  }
`;

const StyledBlueBackground = styled.div`
  background-image: url(${background_blue_image});
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 0;
  > div {
    display: grid;
    place-items: flex-start;
    > div {
      display: inline-block;
    }
    > p {
      font-size: 4.8rem;
      font-weight: 500;
      line-height: 66px;
      margin: 0;
      text-align: left;
      color: #fff;
    }
  }
  @media (max-width: 996px) {
    > div > p {
      font-size: 3rem;
      line-height: 35px;
    }
  }
  @media (max-width: 769px) {
    height: auto;
    background: none;
    align-items: flex-start;
    padding: 25px 25px 0;
    p {
      display: none;
    }
    .logo {
      > span {
        color: #3968fc;
      }
      > svg > path {
        fill: #3968fc;
      }
    }
  }
`;
