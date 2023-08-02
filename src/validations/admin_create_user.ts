import * as Yup from 'yup';
export const adminCreateUser = Yup.object().shape({
  first_name: Yup.string().required('Last Name is required'),
  last_name: Yup.string().required('First Name is required'),
  email: Yup.string().email('Is Not Valid Email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 character')
    .required('Password is required'),
  refer_bonus_rate: Yup.number()
    .min(0, 'Must be greater than 0')
    .max(100, 'Must be lower than 100')
    .nullable(),
});
