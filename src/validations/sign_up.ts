import * as Yup from 'yup';

export const signUpValidator = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is Required'),
  password: Yup.string()
    .min(8, 'Password is too weak')
    .required('Password is Required'),
  password_confirmation: Yup.string()
    .required('Password Confirmation is Required')
    .oneOf([Yup.ref('password')], 'Password must match'),
  terms_accepted: Yup.boolean().oneOf(
    [true],
    'Please Accept Terms and Conditions'
  ),
});
