import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { changeSymbol, fetchLimitFormSpot } from 'redux/actions/spot_actions';
import { Form, Formik } from 'formik';
import { limitOrder } from 'validations';
import { TotalInput, Input, MarketDropDown, PairDropDown } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { SpotLimitValues, SpotMarket } from 'types';
const LimitSpot: FC<{
  market: SpotMarket;
}> = ({ market = { name: '', id: '', icon: '' } }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pending, pairs, symbol, activeSide, activeMenu } = useAppSelector(
    ({ spot }) => spot
  );
  return (
    <Formik
      enableReinitialize
      initialValues={{
        qty: '',
        price: '',
        order_type: activeMenu,
        side: activeSide,
        time_in_force:
          market?.id === 1 || market?.id === 2 ? 'GTC' : 'GoodTillCancel',
        market: market.id,
        symbol: symbol.value,
        currency: symbol.base,
      }}
      validationSchema={limitOrder}
      onSubmit={(values: SpotLimitValues, { resetForm }) =>
        dispatch(fetchLimitFormSpot({ values, resetForm }))
      }
    >
      {({ values, setFieldValue, errors, touched }) => {
        return (
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
            <div className="price-qty">
              <Input
                label={
                  translation('price') +
                  `(${
                    market && symbol.base
                      ? market.name === 'binance' || market.name === 'bybit'
                        ? symbol.quote
                        : symbol.base
                      : ''
                  })`
                }
                type="number"
                name="price"
                errors={errors.price && touched.price ? errors.price : ''}
              />
              <Input
                label={
                  translation('quantity') +
                  `(${
                    market && symbol.base
                      ? market.name === 'binance' || market.name === 'bybit'
                        ? symbol.base
                        : symbol.quote
                      : ''
                  })`
                }
                name="qty"
                type="number"
                errors={errors.qty && touched.qty ? errors.qty : ''}
              />
            </div>

            <TotalInput
              input_price={values.price}
              qty={values.qty}
              label="total"
              symbol={symbol}
              market={market}
            />
            <button
              type="submit"
              className={activeSide === 'Buy' ? 'buy' : 'sell'}
              disabled={pending}
            >
              {activeSide}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
export default LimitSpot;
