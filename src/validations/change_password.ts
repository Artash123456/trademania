import * as Yup from 'yup';

export const changePassword = Yup.object({
  current_password: Yup.string().required('Password is Required'),
  new_password: Yup.string()
    .min(8, 'Password is too short')
    .max(30, 'Password is too long')
    .required('New Password is Required'),
  new_password_confirmation: Yup.string()
    .required('Password Confirmation is Required')
    .oneOf([Yup.ref('new_password')], 'Password must match'),
});
