import styled from 'styled-components';
import { openModal } from 'redux/actions/other_actions';
import { Formik, Form, FormikValues } from 'formik';
import { ButtonGroup, Input } from 'components';
import { passwordValidationTwoFactor } from 'validations/password_two_factor';
import { twoFactor, disableTwoFactor } from 'redux/actions/settings_actions';
import { translation, useAppDispatch, useAppSelector } from 'context';

const ActivateTwoFactorPassword = () => {
  const dispatch = useAppDispatch();
  const { two_factor_confirmed, two_factor_activate } = useAppSelector(
    ({ user, loading }) => ({
      two_factor_confirmed: user?.data?.two_factor_confirmed,
      two_factor_activate: loading.two_factor_activate,
    })
  );
  const handleSubmit = (values: FormikValues) => {
    if (two_factor_confirmed) {
      dispatch(disableTwoFactor(values));
    } else {
      dispatch(twoFactor(values));
    }
  };
  return (
    <StyledModal>
      <Formik
        initialValues={{ password: '' }}
        validationSchema={passwordValidationTwoFactor}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <h2>{translation('enter_password')}</h2>
            <Input
              type="password"
              name="password"
              label={translation('password')}
              errors={errors.password}
              touched={touched.password}
              autoFocus={true}
            />
            <ButtonGroup
              cancel_text="decline"
              text="confirm"
              type="submit"
              onBack={() => {
                dispatch(openModal('confirm_password'));
              }}
              disabled={two_factor_activate}
            />
          </Form>
        )}
      </Formik>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  background: ${({ theme }) => theme.background_color};
  display: grid;
  padding: 1.6vmin;
  place-items: center;
`;

export default ActivateTwoFactorPassword;
