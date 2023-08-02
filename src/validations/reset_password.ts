import * as Yup from 'yup';

export const resetPassword = Yup.object({
  password: Yup.string()
    .min(8, 'Password is too short')
    .max(30, 'Password is too long')
    .required('New Password is Required'),
  password_confirmation: Yup.string()
    .required('Password Confirmation is Required')
    .oneOf([Yup.ref('password')], 'Password must match'),
});
