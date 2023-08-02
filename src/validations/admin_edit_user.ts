import * as Yup from 'yup';
export const adminEditUser = Yup.object().shape({
  email: Yup.string().email('Is Not Valid Email'),
  password: Yup.string().min(8, 'Password must be at least 8 character'),
  refer_bonus_rate: Yup.number().min(0, "Must be greater than 0").max(100, "Must be lower than 100").nullable()
});
