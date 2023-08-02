import * as Yup from 'yup';

export const passwordValidationTwoFactor = Yup.object({
  password: Yup.string()
    .min(8, 'Password is too short')
    .max(30, 'Password is too long')
    .required('Password is Required'),
});
