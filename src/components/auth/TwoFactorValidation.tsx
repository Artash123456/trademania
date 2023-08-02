import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginForTwoFactorUsers } from 'redux/actions/user_actions';
import styled from 'styled-components';
import OtpInput from 'react-otp-input';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { Back } from 'assets/icons';

const TwoFactorValidation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [verify, setVerify] = useState('');
  const { two_factor_login, get_user } = useAppSelector(
    ({ loading }) => loading
  );
  useEffect(() => {
    if (verify.length === 6) {
      const formData: FormData = new FormData();
      formData.append('code', verify);
      dispatch(loginForTwoFactorUsers({ code: formData, navigate }));
      setVerify('');
    }
  }, [verify, dispatch, navigate]);
  return (
    <StyledTwoFactor pending={two_factor_login || get_user}>
      <Back />

      <h2>{translation('set_32_paragraph')}</h2>
      <OtpInput
        className="otp-inp"
        numInputs={6}
        isInputNum={true}
        value={verify}
        onChange={(e: string) => setVerify(e)}
        shouldAutoFocus={true}
        isDisabled={verify.length === 6}
      />
    </StyledTwoFactor>
  );
};
const StyledTwoFactor = styled.div<{ pending: boolean }>`
  background: ${({ theme }) => theme.font_white};
  padding: 5vmin 6.4vmin;
  display: grid;
  filter: ${({ pending }) => (pending ? 'blur(3px)' : 'none')};
  pointer-events: ${({ pending }) => (pending ? 'none' : 'all')};
  width: fit-content;
  .otp-inp {
    width: 80px;
    height: 80px;
    border: none;
    &:not(:last-child) {
      margin-right: 32px;
    }
    input {
      width: 100% !important;
      font-size: 5rem;
      padding: 1.6vmin;
    }
  }
  @media (max-width: 1500px) {
    .otp-inp {
      width: 50px;
      height: 50px;
      > input {
        padding: 3px;
      }
      &:not(:last-child) {
        margin-right: 16px;
      }
    }
  }
  @media (max-width: 950px) {
    padding: 1.6vmin;
  }
  @media (max-width: 769px) {
    padding: 1.6vmin;
    place-items: center;
    margin: 0 auto;
  }
  @media (max-width: 460px) {
    padding: 16px;

    h2 {
      font-size: 1.6rem;
    }
    .otp-inp {
      width: 30px;
      height: 30px;
      > input {
        height: 100%;
        padding: 3px;
        font-size: 100%;
      }
      &:not(:last-child) {
        margin-right: 16px;
      }
    }
  }
`;
export default TwoFactorValidation;
