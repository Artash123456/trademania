import { FormikValues } from 'formik';

export const selectCopyTradeType = (
  type: string,
  values: FormikValues,
  setErrors: (value: Record<string, string | undefined>) => void,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
) => {
  setErrors({ trade_type: undefined });
  setFieldValue('market_pairs', {});
  const value = values.trade_type;
  if (
    (value === 'leverage' && type === 'spot') ||
    (value === 'spot' && type === 'leverage')
  ) {
    setFieldValue('trade_type', 'leverage_spot');
  } else {
    if (value === 'leverage_spot') {
      if (type === 'spot') {
        setFieldValue('trade_type', 'leverage');
      } else {
        setFieldValue('trade_type', 'spot');
      }
    } else {
      if (value === type) {
        setFieldValue('trade_type', '');
      } else {
        setFieldValue('trade_type', type);
      }
    }
  }
};
