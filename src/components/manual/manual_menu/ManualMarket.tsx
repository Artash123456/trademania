import { FC } from 'react';
import {
  BuySellButtons,
  LeverageSlider,
  QuantitySlider,
  ManualBalanceValuePair,
  MarketDropDown,
  PairDropDown,
  Input,
} from 'components';
import {
  changeSymbol,
  setLeverage,
  fetchLimitForm,
} from 'redux/actions/manual_actions';
import { Form, Formik } from 'formik';
import { manualMarket } from 'validations';
import { translation, useAppSelector, useAppDispatch } from 'context';
import { useLocation, useNavigate } from 'react-router-dom';
import { MarketAsProps } from 'types';

const ManualMarket: FC<MarketAsProps> = ({ market }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { symbol, pairs, activeMenu, leverage, balance } = useAppSelector(
    ({ manual }) => manual
  );

  return (
    <Formik
      enableReinitialize
      validationSchema={manualMarket}
      onSubmit={(values, { resetForm }) => {
        if (!values.price) {
          values.price = balance.price;
        }
        dispatch(
          fetchLimitForm({
            data: { ...values, leverage },
            resetForm,
            market: market.name,
          })
        );
      }}
      initialValues={{
        symbol: symbol.value,
        currency: symbol.currency,
        quote: symbol.quote,
        qty: '',
        price: '',
        side: '',
        order_type: activeMenu,
        post_only: false,
        reduce_only: false,
        market: market.id,
      }}
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
              dispatch(changeSymbol({ value, market_id: market.id }));
            }}
            pairs={pairs}
          />
          <Input
            label={translation('quantity')}
            name="qty"
            errors={errors.qty && touched.qty ? errors.qty : ''}
          >
            <div className="symbol">
              <span>{symbol?.quote ? symbol?.quote : ''}</span>
            </div>
          </Input>
          <QuantitySlider
            onChange={(value) => setFieldValue('qty', value)}
            price={values.price || balance.price}
          />
          <ManualBalanceValuePair
            input_price={values.price || balance.price}
            qty={values.qty}
            symbol={symbol}
            market={market}
            isMarket={true}
          />
          <BuySellButtons
            onClickBuy={(name) => setFieldValue('side', name)}
            onClickSell={(name) => setFieldValue('side', name)}
          />
          <LeverageSlider
            onChange={(value) => {
              setFieldValue('leverage', value);
              dispatch(
                setLeverage({
                  market: market.id,
                  symbol: symbol.value,
                  leverage: value,
                  currency: symbol.base,
                  quote: symbol.quote,
                })
              );
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ManualMarket;
