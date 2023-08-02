import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { signInValidator } from 'validations/sign_in';
import { handleLogin, isElectron } from 'redux/actions/user_actions';
import { CheckboxInput, Input, Button, AlternativeAuth } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { LoginValues } from 'types';
import styled from 'styled-components';

const SingIn = () => {
  const { login } = useAppSelector(({ loading }) => loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        remember_me: false,
      }}
      validationSchema={signInValidator}
      onSubmit={(values: LoginValues, { setErrors }): void | Promise<any> =>
        dispatch(handleLogin({ values, navigate, setErrors }))
      }
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form>
          <h2>Welcome back! </h2>
          <Input
            label={translation('email')}
            name="email"
            errors={errors?.email}
            touched={touched?.email}
            placeholder="example@gmail.com"
          />
          <Input
            label={translation('password')}
            type="password"
            name="password"
            errors={errors?.password}
            touched={touched?.password}
            placeholder="**********"
          />
          <StyledFl>
            <CheckboxInput
              onChange={() => setFieldValue('remember_me', !values.remember_me)}
              label="Remember me"
              checked={values.remember_me}
            />
            <span onClick={() => navigate('/forgot-password')}>
              {translation('forgot_password')}
            </span>
          </StyledFl>
          <Button.Green
            value="login"
            type="submit"
            width="100%"
            pending={login}
          />
          <AlternativeAuth login />
        </Form>
      )}
    </Formik>
  );
};

const StyledFl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 33px;
  margin-top: 41px;
  > span {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-decoration: underline;
    cursor: pointer;
    color: #3968fc;
  }
  @media (max-width: 499px) {
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

export default SingIn;
