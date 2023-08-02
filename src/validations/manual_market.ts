import * as Yup from 'yup';

export const manualMarket = Yup.object({
  qty: Yup.number().required(),
  side: Yup.string().required(),
});
