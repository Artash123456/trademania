import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  AlternativeAuth,
  CheckboxInput,
  Input,
  PasswordStrength,
  Button,
} from 'components';
import { signUpValidator } from 'validations/sign_up';
import { handleRegister, isElectron } from 'redux/actions/user_actions';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { RegisterValues } from 'types';

const SignUp = () => {
  const { register } = useAppSelector(({ loading }) => loading);
  const [search] = useSearchParams();
  localStorage.setItem('affiliate_token', search.get('affiliate_token') || '');
  const affiliate_token = localStorage.getItem('affiliate_token') || '';
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('affiliate_token');
    }, 60 * 60 * 1000);
  }, []);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        password_confirmation: '',
        terms_accepted: false,
      }}
      validationSchema={signUpValidator}
      onSubmit={(
        values: RegisterValues,
        { setErrors }
      ): void | Promise<any> => {
        dispatch(
          handleRegister({
            values,
            setErrors,
            navigate,
            affiliate_token: affiliate_token,
          })
        );
      }}
    >
      {({ errors, touched, setFieldValue, values }) => {
        return (
          <Form>
            <h2>Create an account!</h2>
            <Input
              label={translation('email')}
              name="email"
              errors={errors?.email}
              touched={touched?.email}
            />
            <Input
              label={translation('password')}
              name="password"
              type="password"
              errors={errors?.password}
              touched={touched?.password}
              placeholder="Must be 8 characters"
            />
            <PasswordStrength value={values.password} />
            <Input
              label={translation('confirm_pass')}
              name="password_confirmation"
              type="password"
              errors={errors?.password_confirmation}
              touched={touched?.password_confirmation}
            />
            <CheckboxInput
              onChange={() =>
                setFieldValue('terms_accepted', !values.terms_accepted)
              }
              checked={values.terms_accepted}
              label="Accept terms of use"
              error={
                errors.terms_accepted && touched.terms_accepted
                  ? errors.terms_accepted
                  : ''
              }
            />
            <Button.Green
              value="register"
              type="submit"
              width="100%"
              pending={register}
              style={{ marginTop: '41px' }}
            />
            <AlternativeAuth />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUp;
