import * as Yup from 'yup';

export const validateBotSteps = Yup.object().shape({
  bot: Yup.object()
    .shape({
      id: Yup.number().required('Please select bot'),
    })
    .required('Please select bot'),
  market: Yup.object()
    .shape({
      id: Yup.number().required('Please select market'),
    })
    .required('Please select market'),
  pair: Yup.object()
    .shape({
      id: Yup.number().required('Please select pair'),
    })
    .required('Please select pair'),
  capital: Yup.object().when(['bot'], (state) => {
    if (state.id === 1) {
      return Yup.object().shape({
        balance: Yup.number(),
        reinvest: Yup.boolean(),
        capital: Yup.number()
          .min(0.0000000000000001, 'Please select amount of capital')
          .test(
            'capital',
            'Capital must be lower than balance',
            (_, context) => {
              return +context.parent.capital <= +context.parent.balance;
            }
          )
          .required('Capital is required'),
      });
    } else {
      return Yup.object().shape({
        balance: Yup.number(),
        lower_price: Yup.number()
          .min(0.0000000000000001, 'Please select amount of capital')
          .required('Lower price is required'),
        upper_price: Yup.number()
          .min(0, 'Upper price must be positive number')
          .test(
            'lower_price',
            'Lower price must be lower than Upper price',
            (_, context) => {
              return +context.parent.upper_price > +context.parent.lower_price;
            }
          )
          .required('Upper price is required'),
        investment: Yup.number()
          .min(0, 'Capital must be positive number')
          .required('Capital is required')
          .test(
            'balance',
            'Capital must be lower than balance',
            (_, context) => {
              return +context.parent.investment <= +context.parent.balance;
            }
          ),
        grids: Yup.number()
          .min(
            0.000000000000000000000000000000000001,
            'Grids must be positive number'
          )
          .max(100, 'Grids must be less than 100')
          .required('Grids is required'),
        income_percent: Yup.number()
          .min(0, 'Must be greater than 0')
          .max(100, 'Must be less than 100')
          .required('Income percent is required'),
      });
    }
  }),
});
