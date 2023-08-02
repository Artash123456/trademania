import * as Yup from 'yup';
export const adminAddMarketFee = Yup.object().shape({
  spot_fee: Yup.number()
    .min(0, "'Must be greater than 100'")
    .max(100, 'Must be less 100')
    .required('Required'),
  leverage_fee: Yup.number()
    .min(0, "'Must be greater than 100'")
    .max(100, 'Must be less 100')
    .required('Required'),
});
