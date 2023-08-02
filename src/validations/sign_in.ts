import * as Yup from 'yup';

export const signInValidator = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});
