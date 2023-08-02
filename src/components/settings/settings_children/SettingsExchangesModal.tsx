import { useState, useRef } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Input, Button } from 'components';
import { postCredentials } from 'redux/actions/settings_actions';
import {
  translation,
  useAppDispatch,
  useAppSelector,
  useClickOutside,
} from 'context';
import { removeCredential } from 'redux/actions/settings_actions';
import { openModal } from 'redux/actions/other_actions';
const SettingsExchangesModal = () => {
  const confirmRef = useRef(null);
  const removeRef = useRef(null);
  const dispatch = useAppDispatch();
  const [confirm, setConfirm] = useState(false);
  const [remove, setRemove] = useState(false);
  const { post_credentials, remove_credentials } = useAppSelector(
    ({ loading }) => loading
  );
  const { showInModal } = useAppSelector(({ settings }) => settings);
  useClickOutside(confirmRef, setConfirm);
  useClickOutside(removeRef, setRemove);

  return (
    <>
      <StyledModal>
        <h2>Add API key</h2>
        <h3>Connect your exchange</h3>

        <Formik
          initialValues={{
            market_id: showInModal?.market?.id,
            api_key: showInModal?.api_key,
            private_key: showInModal?.private_key,
            passphrase:
              showInModal.market.name === 'bitget' ||
              showInModal.market.name === 'okx'
                ? showInModal.passphrase
                : undefined,
          }}
          onSubmit={(values) => {
            if (!values || !confirm) return;
            if (
              values.api_key === showInModal?.api_key &&
              values.private_key === showInModal?.private_key
            ) {
              dispatch(openModal('exchanges'));
            } else {
              try {
                dispatch(
                  postCredentials({
                    data: values,
                    market_id: showInModal?.market?.id,
                  })
                );
              } finally {
                setConfirm(false);
              }
            }
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <Input
                  name="api_key"
                  label={translation('api_key')}
                  errors={errors.api_key}
                  touched={touched.api_key}
                />
                <Input
                  name="private_key"
                  label={translation('secret_key')}
                  errors={errors.private_key}
                  touched={touched.private_key}
                />
                {(showInModal.market.name === 'bitget' ||
                  showInModal.market.name === 'okx' ||
                  showInModal.market.name === 'kucoin') && (
                  <Input
                    name="passphrase"
                    label="Passphrase"
                    errors={errors.passphrase}
                    touched={touched.passphrase}
                  />
                )}
                <Button.Green
                  type="button"
                  value="connect"
                  onClick={() => setConfirm(true)}
                />
                {showInModal.api_key && (
                  <Button.Green
                    type="button"
                    value="remove"
                    onClick={() => setRemove(true)}
                    style={{ background: '#AF2F56' }}
                  />
                )}

                <div
                  ref={confirmRef}
                  className={confirm ? 'confirm-block confirm' : 'confirm'}
                >
                  <p>{translation('set_36_paragraph')}</p>
                  <Button.Green
                    value="confirm"
                    pending={post_credentials}
                    type="submit"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>

        <div
          ref={removeRef}
          className={remove ? 'confirm-block confirm' : 'confirm'}
        >
          <p>{translation('set_38_paragraph')}</p>
          <StyledGroup>
            <Button.Blue
              plus="yes"
              pending={remove_credentials}
              type="button"
              onClick={() =>
                dispatch(
                  removeCredential({ market_id: showInModal?.market?.id })
                ).then(() => setRemove(false))
              }
            />
            <Button.Blue
              plus="no"
              pending={remove_credentials}
              type="button"
              onClick={() => setRemove(false)}
            />
          </StyledGroup>
        </div>
      </StyledModal>
    </>
  );
};

const StyledModal = styled.div`
  width: 880px;
  background: ${({ theme }) => theme.background_color};
  h2 {
    margin: 0;
  }
  .confirm {
    position: absolute;
    background: ${({ theme }) => theme.background_color};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 0;
    box-shadow: ${({ theme }) => theme.box_shadow};
    width: 0;
    p {
      font-size: 0;
      text-align: center;
      margin-bottom: 12px;
    }
    button {
      display: none;
    }
  }
  .confirm-block {
    width: auto !important;
    padding: 12px;
    p {
      transition: all 0.3s;
      font-size: 1.6rem;
    }
    button {
      display: block;
      margin: 0 auto;
    }
  }

  form {
    display: grid;
    > button {
      margin-bottom: 10px;
    }
  }

  div:nth-child(2) > p {
    text-align: left;
    margin-bottom: 14px;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const StyledGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 16px;
  > button {
    height: 35px;
  }
`;
export default SettingsExchangesModal;
