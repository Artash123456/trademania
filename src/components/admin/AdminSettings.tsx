import { Button, Input } from 'components';
import { useAppDispatch, useAppSelector } from 'context';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import {
  getTronPrivateKey,
  saveTronPrivateKey,
} from 'redux/actions/admin_actions';
import styled from 'styled-components';

const AdminSettings = () => {
  const dispatch = useAppDispatch();
  const [tronPrivateKey, setTronPrivateKey] = useState('');
  const { tron_private_key_loading } = useAppSelector(({ loading }) => loading);
  const { data } = useAppSelector(({ user }) => user);
  useEffect(() => {
    dispatch(getTronPrivateKey()).then(({ payload }) =>
      setTronPrivateKey(payload)
    );
  }, [dispatch]);
  return (
    <div>
      {data?.role === 'super-admin' && (
        <>
          <Formik
            enableReinitialize
            initialValues={{
              tron_private_key: tronPrivateKey,
            }}
            onSubmit={(values) =>
              dispatch(
                saveTronPrivateKey({
                  tron_private_key: values.tron_private_key,
                })
              )
            }
          >
            {({ handleSubmit }) => (
              <StyledForm>
                <h3>Tron Network</h3>
                <h4>Please enter your Tron network private key</h4>
                <Input label="Private key" name="tron_private_key">
                  <span className="input-save-btn">
                    <Button.Blue
                      disabled={tron_private_key_loading}
                      onClick={() => handleSubmit()}
                    >
                      Save
                    </Button.Blue>
                  </span>
                </Input>
              </StyledForm>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

const StyledForm = styled(Form)`
  max-width: 500px;
  background-color: ${({ theme }) => theme.background_color};
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
`;

export default AdminSettings;
