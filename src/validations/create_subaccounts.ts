import * as Yup from 'yup';

export const createSubaccount = Yup.object({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Please Enter valid email')
    .required('Email is required'),
  api_key: Yup.string().required('Api key is required'),
  private_key: Yup.string().required('Private Key is required'),
  passphrase: Yup.string().required('Passphrase is required'),
});
