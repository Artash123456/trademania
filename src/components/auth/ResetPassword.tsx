import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleResetPassword } from 'redux/actions/user_actions';
import { Input, Button } from 'components';
import { Formik, Form } from 'formik';
import { resetPassword } from 'validations';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { ResetPasswordValues } from 'types';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const { reset_password } = useAppSelector(({ loading }) => loading);
  const email = search.get('email');
  const token = search.get('token');

  return (
    <StyledReset>
      <h2>{translation('reset_password')}</h2>
      <h3>Enter your new password below</h3>
      <Formik
        initialValues={{ password: '', password_confirmation: '' }}
        validationSchema={resetPassword}
        onSubmit={(values: ResetPasswordValues): void | Promise<any> => {
          if (token && email)
            dispatch(handleResetPassword({ values, email, token, navigate }));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Input
              label={translation('password')}
              name="password"
              type="password"
              errors={errors.password}
              touched={touched.password}
            />
            <Input
              label={translation('confirm_pass')}
              name="password_confirmation"
              type="password"
              errors={errors.password_confirmation}
              touched={touched.password_confirmation}
            />
            <Button.Green
              value="reset_password"
              type="submit"
              pending={reset_password}
            />
          </Form>
        )}
      </Formik>
    </StyledReset>
  );
};
const StyledReset = styled.div`
  > form {
    display: grid;
    place-items: center;
  }
  h3 {
    width: 60%;
  }
  button {
    width: 100%;
  }

  @media (max-width: 768px) {
    h3 {
      width: auto;
      margin: auto;
    }
  }
`;
export default ResetPassword;
