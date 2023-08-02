import { AsyncThunkPayloadCreatorReturnValue } from '@reduxjs/toolkit';
import { useAppDispatch } from 'context';
import { useEffect, useState, FC } from 'react';
import { fetchPairs } from 'redux/actions/trading_actions';
import { PairTypes } from 'types';
import { Select } from 'components';
interface Props {
  values: Record<string, Array<PairTypes>>;
  id: number;
  slug: string;
  onChange: (value: { value: PairTypes; label: string }[]) => void;
  onFocus?: Function;
  trade_type?: string;
  data: Array<PairTypes> | [];
  already_selected_pairs?: Record<number, Array<PairTypes>>;
  isDisabled?: boolean;
  follow_step?: boolean;
}
const ExchangesPairs: FC<Props> = ({
  values,
  id,
  slug,
  onChange,
  onFocus = () => {},
  trade_type,
  data = [],
  already_selected_pairs,
  isDisabled,
  follow_step,
}) => {
  const dispatch = useAppDispatch();
  const [pairs, setPairs] = useState<{ label: string; value: PairTypes }[]>([]);
  const selected_pairs = Boolean(already_selected_pairs)
    ? JSON.stringify(already_selected_pairs)
    : false;
  useEffect(() => {
    if (id && trade_type && !data?.length && !follow_step) {
      const is_spot = trade_type === 'spot' ? 1 : 0;
      const formData = new FormData();
      formData.append('market_id', id.toString());
      formData.append('slug', slug);
      if (trade_type !== 'leverage_spot')
        formData.append('is_spot', is_spot.toString());
      if (selected_pairs)
        formData.append('already_selected_pairs', selected_pairs);
      dispatch(fetchPairs({ formData, market: slug })).then(
        ({
          payload,
        }: {
          payload: AsyncThunkPayloadCreatorReturnValue<any, any>;
        }) =>
          setPairs(
            payload?.data.map((item: PairTypes) => ({
              label: `${item.label} (${item.is_spot ? 'Spot' : 'Leverage'})`,
              value: item,
            }))
          )
      );
    }
  }, [
    id,
    slug,
    trade_type,
    dispatch,
    data.length,
    selected_pairs,
    follow_step,
  ]);
  useEffect(() => {
    if (data.length)
      setPairs(
        data.map((item) => ({
          label: `${item.label} (${item.is_spot ? 'Spot' : 'Leverage'})`,
          value: item,
        }))
      );
  }, [data]);
  return (
    <Select
      closeMenuOnSelect={false}
      maxMenuHeight={150}
      isMulti
      defaultValue={values?.[id]}
      placeholder="Select Symbol"
      onChange={(value) => {
        onChange(value);
      }}
      options={pairs}
      onFocus={() => onFocus()}
      isDisabled={isDisabled}
    />
  );
};

export default ExchangesPairs;
