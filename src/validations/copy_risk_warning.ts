import * as Yup from 'yup';

export const copyRiskWarning = Yup.object({
  terms_accepted: Yup.boolean().oneOf([true], '  '),
  not_resident_of_special_countries: Yup.boolean().oneOf([true], '  '),
});
