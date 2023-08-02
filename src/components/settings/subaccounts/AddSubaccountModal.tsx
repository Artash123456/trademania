import { FC } from 'react';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { Form, Formik } from 'formik';
import { postSubaccount } from 'redux/actions/settings_actions';
import { createSubaccount } from 'validations';
import styled from 'styled-components';
import { Input, Button } from 'components';

const AddSubaccountModal: FC<{ market?: { id?: number; slug: string } }> = ({
  market,
}) => {
  const dispatch = useAppDispatch();
  const { sub_accounts } = useAppSelector(({ loading }) => loading);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        first_name: '',
        last_name: '',
        email: '',
        api_key: '',
        private_key: '',
        passphrase: '',
        market_id: market?.id,
      }}
      validationSchema={createSubaccount}
      onSubmit={(values, { resetForm }) => {
        if (values.market_id && market?.id)
          dispatch(postSubaccount({ values })).then(() => resetForm());
      }}
    >
      {({ errors, touched }) => (
        <StyledModal>
          <h2>{translation('add_customer')}</h2>{' '}
          <Input
            label={translation('first_name')}
            name="first_name"
            errors={errors?.first_name}
            touched={touched?.first_name}
          />
          <Input
            label={translation('last_name')}
            name="last_name"
            errors={errors?.last_name}
            touched={touched?.last_name}
          />
          <Input
            label={translation('email')}
            name="email"
            errors={errors?.email}
            touched={touched?.email}
          />
          <Input
            label={translation('api_key')}
            name="api_key"
            errors={errors.api_key}
            touched={touched.api_key}
          />
          <Input
            label={translation('private_key')}
            name="private_key"
            errors={errors.private_key}
            touched={touched.private_key}
          />
          {market?.slug === 'okx' || market?.slug === 'bitget' ? (
            <Input
              label="Passphrase"
              name="passphrase"
              errors={errors.passphrase}
              touched={touched.passphrase}
            />
          ) : (
            <></>
          )}
          <Button.Green type="submit" value="save" pending={sub_accounts} />
        </StyledModal>
      )}
    </Formik>
  );
};
const StyledModal = styled(Form)`
  width: 560px;
  background: ${({ theme }) => theme.background_color};
  border-radius: 8px;
  padding: 2.4vmin;
  margin: 0 auto;
  h2 {
    margin-top: 0;
  }
  button {
    width: 100%;
    margin-top: 25px;
  }
`;

export default AddSubaccountModal;
