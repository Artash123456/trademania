import { useState, FC, ChangeEvent } from 'react';
import {
  RadioButtonGroup,
  CheckboxInput,
  TakeProfitStopLoss,
  BuySellButtons,
  LeverageSlider,
  QuantitySlider,
  ManualBalanceValuePair,
  MarketDropDown,
  PairDropDown,
  Select,
  Input,
} from 'components';
import {
  changeSymbol,
  setLeverage,
  fetchLimitForm,
} from 'redux/actions/manual_actions';
import { Form, Formik } from 'formik';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { manualConditional } from 'validations';
import { ManualOrderType, MarketAsProps } from 'types';
import { useLocation, useNavigate } from 'react-router-dom';

const ManualConditional: FC<MarketAsProps> = ({ market }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [tpsl, setTpsl] = useState(false);
  const {
    symbol,
    pairs,
    timeInForce,
    timeInForceBinance,
    leverage,
    marketLimitLabels,
    byTypeLabels,
  } = useAppSelector(({ manual }) => manual);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        order_type: 'Limit',
        symbol: symbol.value,
        currency: symbol.currency,
        quote: symbol.quote,
        market: market.id,
        qty: '',
        price: 0,
        stop_px: '',
        side: 'Buy',
        post_only: false,
        reduce_only: false,
        close_on_trigger: false,
        time_in_force:
          market.id === 1 || market.id === 2 ? 'gtc' : 'GoodTillCancel',
        trigger_type: 'ByMarkPrice',
        trigger_by: 'ByMarkPrice',
        stop_loss: '',
        take_profit: '',
        slTrigger: 'ByMarkPrice',
        tpTrigger: 'ByMarkPrice',
      }}
      validationSchema={manualConditional}
      onSubmit={(values: ManualOrderType, { resetForm }) =>
        dispatch(
          fetchLimitForm({
            data: { ...values, leverage },
            resetForm,
            market: market.name,
          })
        )
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
              dispatch(changeSymbol({ value, market_id: market.id }));
            }}
            pairs={pairs}
          />
          <RadioButtonGroup
            labelList={marketLimitLabels}
            onChange={(e) => setFieldValue('order_type', e.target.value)}
            checked={values.order_type}
          />
          {values.order_type === 'Limit' && (
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
          )}
          <Input
            label={translation('trigger_price')}
            type="number"
            name="stop_px"
            errors={errors.stop_px && touched.stop_px ? errors.stop_px : ''}
          >
            <div className="symbol">
              <span>USD</span>
            </div>
          </Input>
          <RadioButtonGroup
            labelList={byTypeLabels}
            onChange={(e) => setFieldValue('trigger_by', e.target.value)}
            checked={values.trigger_by}
          />
          <Input
            label={translation('quantity')}
            type="number"
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
            isMarket={values.order_type === 'Market'}
            market={market}
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
              showCheckbox={
                values.order_type === 'Market' ? market.name !== 'phemex' : true
              }
            />
            <CheckboxInput
              label="Reduce-Only"
              name="reduce_only"
              checked={values.reduce_only}
              onChange={(value) => setFieldValue('reduce_only', value)}
              showCheckbox={market.name !== 'phemex' && market.name !== 'bybit'}
            />
            <CheckboxInput
              label="BracketOrder"
              onChange={() => setTpsl((prev) => !prev)}
              showCheckbox={
                values.order_type === 'Market' ? market.name !== 'phemex' : true
              }
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

          {values.order_type !== 'Market' && market.slug !== 'okx' && (
            <Select
              label="Time In Force"
              placeholder={values.time_in_force}
              options={
                market.id === 2 || market.id === 1
                  ? timeInForceBinance
                  : timeInForce
              }
              onChange={({ value }) => {
                setFieldValue('time_in_force', value);
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
      )}
    </Formik>
  );
};

export default ManualConditional;
