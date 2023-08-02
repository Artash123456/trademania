import * as Yup from 'yup';

export const manualConditional = Yup.object({
  qty: Yup.number().required(),
  price: Yup.number().required(),
});
