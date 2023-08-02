import styled from 'styled-components';
import { forgotPassword } from 'redux/actions/user_actions';
import { Input, Button } from 'components';
import { Formik, Form } from 'formik';
import { emailValidation } from 'validations';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { Back } from 'assets/icons';

const ResetPassword = () => {
  const { reset_password } = useAppSelector(({ loading }) => loading);
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={emailValidation}
      onSubmit={(values: { email: string }): void | Promise<any> =>
        dispatch(forgotPassword({ email: values.email }))
      }
    >
      {({ errors, touched }) => (
        <StyledForm>
          <Back />
          <h2>{translation('reset_password')}</h2>
          <p>
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </p>
          <p>
            For security reasons, we do NOT store your password. So rest assured
            that we will never send your password via email.
          </p>
          <Input
            label="Email address"
            name="email"
            errors={errors?.email}
            touched={touched?.email}
            placeholder="example@gmail.com"
          />
          <Button.Green
            value="email_pass_reset"
            type="submit"
            pending={reset_password}
            width="100%"
          />
        </StyledForm>
      )}
    </Formik>
  );
};

const StyledForm = styled(Form)`
  > h2 {
    margin-top: 60px;
  }
  > p {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
  }
  > div {
    margin-top: 42px;
  }
  > button {
    background-color: #3968fc;
    color: #fff;
    margin-top: 32px;
  }
  @media (max-width: 769px) {
    > div {
      margin-top: 0;
    }
  }
`;
export default ResetPassword;
