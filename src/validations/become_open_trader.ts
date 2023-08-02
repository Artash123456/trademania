import * as Yup from 'yup';
export const becomeOpenTraderValidation = Yup.object().shape({
  nickname: Yup.string()
    .max(15, 'The nickname must not be greater than 15 characters.')
    .required('Nickname is required'),
  description: Yup.string()
    .required('Description is required')
    .min(25, 'Please use more than 25 symbols')
    .max(1500, 'Please use less than 1500 symbols'),
  trade_type: Yup.string().required('Please select trade type'),
  market_pairs: Yup.object().shape({}),
});
