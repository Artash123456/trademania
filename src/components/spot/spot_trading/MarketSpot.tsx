import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { changeSymbol, fetchLimitFormSpot } from 'redux/actions/spot_actions';
import { Form, Formik } from 'formik';
import {
  Input,
  MarketDropDown,
  PairDropDown,
  ReactSelectHelper,
  TotalInput,
} from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';

const MarketSpot: FC<{
  market: { id: number | string; name: string };
}> = ({ market }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pending, pairs, symbol, activeSide, activeMenu, socket_price } =
    useAppSelector(({ loading, spot }) => ({
      pending: loading.pending,
      pairs: spot.pairs,
      symbol: spot.symbol,
      activeSide: spot.activeSide,
      activeMenu: spot.activeMenu,
      socket_price: +spot.balance.price,
    }));

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        qty: '',
        price: '',
        order_type: activeMenu,
        side: activeSide,
        time_in_force:
          market.id === 1 || market.id === 2 ? 'GTC' : 'GoodTillCancel',
        market: market.id,
        symbol: symbol.value,
        currency: symbol.base,
      }}
      onSubmit={(values, { resetForm }) =>
        dispatch(fetchLimitFormSpot({ values, resetForm }))
      }
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          <MarketDropDown
            onChange={(value) => {
              navigate(`${location.pathname}?market=${value.value}`);
              setFieldValue('market_id', value.id);
            }}
          />
          <PairDropDown
            value={values.symbol}
            onChange={(value) => {
              setFieldValue('symbol', value.value);
              setFieldValue('currency', value.base);
              setFieldValue('quote', value.quote);
              dispatch(changeSymbol({ value, market }));
            }}
            pairs={pairs}
          />
          <Input
            label={
              translation('quantity') + `(${symbol.quote ? symbol.quote : ''})`
            }
            name="qty"
            type="number"
            errors={errors.qty && touched.qty ? errors.qty : ''}
          />
          <TotalInput
            qty={values.qty}
            market={market}
            symbol={symbol}
            input_price={socket_price}
            isMarket={true}
            label="total"
          />
          <button
            type="submit"
            className={activeSide === 'Buy' ? 'buy' : 'sell'}
            disabled={pending}
          >
            {activeSide}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MarketSpot;
