import * as Yup from 'yup';

export const emailValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is Required'),
});
