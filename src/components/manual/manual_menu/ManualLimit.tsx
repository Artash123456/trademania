import { useState, FC, ChangeEvent } from 'react';
import {
  changeSymbol,
  fetchLimitForm,
  setLeverage,
} from 'redux/actions/manual_actions';
import {
  BuySellButtons,
  CheckboxInput,
  TakeProfitStopLoss,
  LeverageSlider,
  QuantitySlider,
  ManualBalanceValuePair,
  MarketDropDown,
  PairDropDown,
  Select,
  Input,
} from 'components';
import { Form, Formik } from 'formik';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { ManualOrderType, MarketAsProps } from 'types';
import { useLocation, useNavigate } from 'react-router-dom';

const ManualLimit: FC<MarketAsProps> = ({ market }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [tpsl, setTpsl] = useState(false);
  const {
    symbol,
    pairs,
    activeMenu,
    timeInForce,
    timeInForceBinance,
    leverage,
  } = useAppSelector(({ manual }) => manual);
  return (
    <Formik
      enableReinitialize
      onSubmit={(values: ManualOrderType, { resetForm }) =>
        dispatch(
          fetchLimitForm({
            data: { ...values, leverage },
            resetForm,
            market: market?.name,
          })
        )
      }
      initialValues={{
        symbol: symbol.value,
        currency: symbol.currency,
        quote: symbol.quote,
        market: market.id,
        qty: '',
        price: '',
        side: '',
        order_type: activeMenu,
        post_only: false,
        reduce_only: false,
        time_in_force:
          market.id === 1 || market.id === 2 ? 'gtc' : 'GoodTillCancel',
        tpTrigger: '',
        slTrigger: '',
        closeOnTrigger: '',
        take_profit: '',
        stop_loss: '',
      }}
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
                dispatch(changeSymbol({ value: value, market_id: market.id }));
              }}
              pairs={pairs}
            />
            <Input
              label={translation('limit_price')}
              type="number"
              name="price"
              errors={errors.price && touched.price ? errors.price : ''}
            >
              <div className="symbol">
                <span>USD</span>
              </div>
            </Input>
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
              price={values.price}
            />
            <ManualBalanceValuePair
              input_price={values.price}
              qty={values.qty}
              symbol={symbol}
              market={market}
              isMarket={false}
            />
            <BuySellButtons
              onClickBuy={(name) => setFieldValue('side', name)}
              onClickSell={(name) => setFieldValue('side', name)}
            />
            <div className="check">
              <CheckboxInput
                label="Post-Only"
                name="post_only"
                checked={values.post_only}
                onChange={(value) => setFieldValue('post_only', value)}
              />
              <CheckboxInput
                label="Reduce-Only"
                name="reduce_only"
                checked={values.reduce_only}
                onChange={(value) => setFieldValue('reduce_only', value)}
              />
              <CheckboxInput
                label="BracketOrder"
                onChange={() => setTpsl((prev) => !prev)}
              />
            </div>
            <TakeProfitStopLoss
              onButtonGroup1Change={(
                e: ChangeEvent<Element> & { target: { value: string } }
              ) => setFieldValue('tpTrigger', e.target.value)}
              onButtonGroup2Change={(
                e: ChangeEvent<Element> & { target: { value: string } }
              ) => setFieldValue('slTrigger', e.target.value)}
              onInput1Change={(e) => setFieldValue('take_profit', e)}
              onInput2Change={(e) => setFieldValue('stop_loss', e)}
              values={values}
              errors={errors}
              active={tpsl}
            />
            {market.slug !== 'okx' && (
              <Select
                label="Time In Force"
                placeholder={values.time_in_force}
                options={
                  market.id === 2 || market.id === 1
                    ? timeInForceBinance
                    : timeInForce
                }
                onChange={(value) => {
                  setFieldValue('time_in_force', value.value);
                }}
              />
            )}

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
        );
      }}
    </Formik>
  );
};
export default ManualLimit;
