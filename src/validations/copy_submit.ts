import * as Yup from 'yup';
export const copyTraderValidation = Yup.object().shape({
  trade_type: Yup.string().required('Please select trade type'),
  initial_investment: Yup.number()
    .min(10, 'initial investment must be greater than 10')
    .required('initial investment is required'),
  per_trade_amount: Yup.number()
    .test(
      'per_trade_amount',
      'Must be lower then Initial investment',
      (value, context) => {
        return +context.parent.initial_investment > Number(value);
      }
    )
    .min(10, 'Per trade amount must be greater than 10')
    .required('Per trade amount is required'),
});
