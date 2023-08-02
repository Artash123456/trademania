import { Form, Formik, FormikValues } from 'formik';
import { Button, Input } from 'components';
import { translation, useAppDispatch } from 'context';
import { setNewPassword } from 'redux/actions/settings_actions';
import { changePassword } from 'validations';
const ChangePassword = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <h3>{translation('change') + ' ' + translation('password')}</h3>
      <h4>{translation('set_2_paragraph')}</h4>
      <Formik
        onSubmit={(
          values: FormikValues,
          { setErrors }: { setErrors: Function }
        ) => dispatch(setNewPassword({ data: values, setErrors }))}
        validationSchema={changePassword}
        initialValues={{
          new_password: '',
          current_password: '',
          new_password_confirmation: '',
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <>
            <Form>
              <Input
                name="current_password"
                label={translation('current') + ' ' + translation('password')}
                placeholder="********"
                type="password"
                errors={errors.current_password}
                touched={touched.current_password}
              />
              <Input
                name="new_password"
                label={translation('new') + ' ' + translation('password')}
                placeholder="********"
                type="password"
                errors={errors.new_password}
                touched={touched.new_password}
              />
              <Input
                name="new_password_confirmation"
                type="password"
                label={translation('confirm_pass')}
                placeholder="********"
                errors={errors.new_password_confirmation}
                touched={touched.new_password_confirmation}
              >
                <span className="input-save-btn">
                  <Button.Blue onClick={() => handleSubmit()}>Save</Button.Blue>
                </span>
              </Input>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};
export default ChangePassword;
