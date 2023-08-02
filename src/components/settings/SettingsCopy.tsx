import { Modal, Input, Button, Switch, Warning } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { openModal, selectCopyTradeType } from 'redux/actions/other_actions';
import {
  becomeOpenTrader,
  getTradeAccountDetails,
  setMyProfilePublic,
} from 'redux/actions/settings_actions';
import styled from 'styled-components';
import { becomeOpenTraderValidation } from 'validations';
import TradeType from './copy/TradeType';
import Exchanges from './copy/Exchanges';
import BecomeInvisigble from './copy/BecomeInvisigble';
import { toast } from 'react-toastify';

const SettingsCopy = () => {
  const { open_for_subscription, tradeAccountInitialValues } = useAppSelector(
    ({ settings }) => settings
  );
  const { settings_become_private } = useAppSelector(
    ({ modal }) => modal.types
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTradeAccountDetails());
  }, [dispatch]);
  return (
    <>
      <StyledCopy
        className="settings"
        open_for_subscription={open_for_subscription}
      >
        <h2>Copy Trading</h2>
        <h3 className="flacjsb">
          Profile visibility{' '}
          <label className="flacjsb">
            {open_for_subscription ? 'Visible' : 'Invisible'}
            <Switch
              onChange={() => {
                if (open_for_subscription) {
                  toast.warn(
                    <Warning
                      message="Are you sure you want to make your profile private"
                      onConfirm={() =>
                        dispatch(openModal('settings_become_private'))
                      }
                      button_text="Procced"
                    />
                  );
                } else {
                  dispatch(
                    setMyProfilePublic({
                      status: open_for_subscription ? 0 : 1,
                    })
                  );
                }
              }}
              checked={Boolean(open_for_subscription)}
            />
          </label>
        </h3>
        <h4>{translation('set_13_paragraph')}</h4>
        <div className="hr" />
        <Formik
          enableReinitialize
          onSubmit={(values, { setErrors }: { setErrors: Function }) => {
            dispatch(becomeOpenTrader({ values, setErrors }));
          }}
          validationSchema={becomeOpenTraderValidation}
          initialValues={tradeAccountInitialValues}
        >
          {({ values, setFieldValue, setErrors, errors, touched }) => {
            return (
              <Form>
                <h3>Profile information</h3>
                <h4>Update your account profile information</h4>{' '}
                <Input
                  name="nickname"
                  label={translation('nickname')}
                  errors={<>{errors?.nickname}</>}
                  touched={touched?.nickname}
                  value={values?.nickname}
                  disabled={!open_for_subscription}
                />
                <Input
                  name="description"
                  label="Bio"
                  errors={<>{errors?.description}</>}
                  touched={touched?.description}
                  value={values?.description}
                  disabled={!open_for_subscription}
                />
                <div className="hr" />
                <TradeType
                  onLeverageClick={() => {
                    if (open_for_subscription)
                      selectCopyTradeType(
                        'leverage',
                        values,
                        setErrors,
                        setFieldValue
                      );
                  }}
                  onSpotClick={() => {
                    if (open_for_subscription)
                      selectCopyTradeType(
                        'spot',
                        values,
                        setErrors,
                        setFieldValue
                      );
                  }}
                  active={values?.trade_type}
                />
                <div className="hr" />
                <Exchanges
                  values={values || {}}
                  errors={errors || {}}
                  setFieldValue={setFieldValue}
                  disabled={!open_for_subscription}
                />
                <Button.Green
                  type="submit"
                  value="confirm"
                  disabled={!open_for_subscription}
                />
              </Form>
            );
          }}
        </Formik>
      </StyledCopy>
      <Modal
        open={settings_become_private}
        onClose={() => dispatch(openModal('settings_become_private'))}
        with_close_icon="settings_become_private"
      >
        <BecomeInvisigble />
      </Modal>
    </>
  );
};

const StyledCopy = styled.div<{ open_for_subscription?: number }>`
  > form {
    opacity: ${({ open_for_subscription }) =>
      open_for_subscription ? 1 : 0.2};
    pointer-events: ${({ open_for_subscription }) =>
      open_for_subscription ? 'all' : 'none'};
  }
  label {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    color: ${({ theme }) => theme.font_gray};

    > div {
      margin-left: 16px;
    }
  }
  button {
    width: 100%;
    margin-top: 60px;
  }
`;
export default SettingsCopy;
