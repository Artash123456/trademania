import { Formik, Form } from 'formik';
import { Input, Button } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { generatePassword } from 'validations';
import { loginWithFacebook, loginWithGoogle } from 'redux/actions/user_actions';
const GeneratePassword = () => {
  const { pending } = useAppSelector(({ loading }) => loading);
  const { social_token, affiliate_token, social_type } = useAppSelector(
    ({ user }) => user
  );
  const token = social_token || localStorage.getItem('social_token');
  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={{
        password: '',
        password_confirmation: '',
      }}
      validationSchema={generatePassword}
      onSubmit={(values) => {
        if (social_type === 'facebook') {
          dispatch(loginWithFacebook({ token, affiliate_token, ...values }));
        } else {
          dispatch(loginWithGoogle({ token, affiliate_token, ...values }));
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <h2>Please generate password for additional security</h2>
          <Input
            label={translation('password')}
            type="password"
            name="password"
            errors={errors?.password}
            touched={touched?.password}
            placeholder="**********"
          />

          <Input
            label={translation('confirm_pass')}
            type="password"
            name="password_confirmation"
            errors={errors?.password_confirmation}
            touched={touched?.password_confirmation}
            placeholder="**********"
          />
          <Button.Green
            value="save"
            type="submit"
            width="100%"
            pending={pending}
          />
        </Form>
      )}
    </Formik>
  );
};

export default GeneratePassword;
