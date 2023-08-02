import * as Yup from 'yup';

export const limitOrder = Yup.object({
  qty: Yup.number().required('Quantity is required'),
  price: Yup.number().required('Price is required'),
});
