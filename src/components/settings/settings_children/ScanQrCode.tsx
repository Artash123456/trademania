import { useState } from 'react';
import { openModal } from 'redux/actions/other_actions';
import { verifyQrCode, fetchSetupKey } from 'redux/actions/settings_actions';
import { Button, ButtonGroup } from 'components';
import styled from 'styled-components';
import OtpInput from 'react-otp-input';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { copy } from 'context';
import { FiCopy } from 'react-icons/fi';

const ScanQrCode = () => {
  const dispatch = useAppDispatch();
  const [verify, setVerify] = useState('');
  const [showKey, setShowKey] = useState('');
  const [copied, setCopied] = useState(false);

  const { qr_svg, get_qr_code, verify_qr } = useAppSelector(
    ({ settings, loading }) => ({
      qr_svg: settings.qr_svg,
      get_qr_code: loading.get_qr_code,
      verify_qr: loading.verify_qr,
    })
  );
  const handleGetKey = () => {
    if (!showKey) {
      dispatch(fetchSetupKey()).then(({ payload }) => setShowKey(payload));
    } else {
      setShowKey('');
    }
  };
  return (
    <StyledQr copied={copied}>
      <h2>{translation('set_31_paragraph')}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: qr_svg,
        }}
        className="qr"
      />
      {showKey ? (
        <section className="setup">
          <span>{showKey}</span>
          <FiCopy
            onClick={() => {
              copy(showKey);
              setCopied(true);
              setTimeout(() => setCopied(false), 1000);
            }}
          />
        </section>
      ) : (
        <Button.Add
          value="show_setup_key"
          onClick={handleGetKey}
          pending={get_qr_code}
        />
      )}

      <OtpInput
        className="otp-inp"
        numInputs={6}
        isInputNum={true}
        value={verify}
        onChange={(e: string) => setVerify(e)}
        shouldAutoFocus={true}
      />

      <ButtonGroup
        cancel_text="decline"
        text="confirm"
        type="submit"
        onBack={() => {
          dispatch(openModal('activate_qr_code'));
        }}
        onFurther={() => verify.length === 6 && dispatch(verifyQrCode(verify))}
        disabled={verify_qr}
      />
    </StyledQr>
  );
};
const StyledQr = styled.div<{ copied: boolean }>`
  background: ${({ theme }) => theme.background_color};
  padding: 15px;
  h2 > {
    margin: 0;
  }
  > button {
    margin: 0 auto;
    padding: 2px 10px;
  }

  > div {
    width: fit-content;
    margin: 15px auto;
  }
  .btn-group {
    margin-top: 35px;
    width: 100%;
  }
  > .qr {
    background-color: #fff;
    padding: 2px;
  }

  section {
    display: flex;
    justify-content: center;

    > svg,
    > span {
      color: ${({ copied, theme }) =>
        copied ? theme.submit_button_background : theme.error_red};
      transition: all 0.2s;
    }
    > svg {
      font-size: 3rem;
      cursor: pointer;
    }
    > span {
      font-size: 2rem;
    }
  }
  .otp-inp {
    &:not(:last-child) {
      margin-right: 10px;
    }
    input {
      border-bottom: 1px solid #868787;
      border-radius: 3px;
      box-sizing: content-box;
      text-align: center;
      width: 35px !important;
      height: 35px;
      border: none;
      margin-right: 5px;
      font: normal normal 600 2.4rem/37px Manrope;
      letter-spacing: 1.2px;
    }
  }
  @media (max-width: 768px) {
    width: auto;
    h2 {
      font-size: 1.5rem;
      line-height: 21px;
      text-align: center;
    }
    > div:last-child > button {
      width: auto;
      height: 25px;
    }
    .otp-inp:not(:last-child) {
      margin-right: 3px;
    }
  }
`;
export default ScanQrCode;
