import { FC, useMemo } from 'react';
import { Select } from 'components';
import { PairTypes } from 'types';

const PairDropDown: FC<{
  onChange: (value: PairTypes) => void;
  pairs?: PairTypes[];
  value?: string;
}> = ({ onChange, pairs, value }) => {
  const defaultValue = useMemo(() => {
    if (pairs?.length) {
      return pairs.find((item) => item.value === value);
    }
    return null;
  }, [value, pairs]);
  if (!pairs) return <></>;
  return (
    <Select
      options={pairs || []}
      label="Symbol"
      onChange={(value) => {
        onChange(value);
      }}
      placeholder={defaultValue?.value}
      value={defaultValue}
    />
  );
};

export default PairDropDown;
