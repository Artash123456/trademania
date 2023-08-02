import { useEffect, useState } from 'react';
import { fetchPairs } from 'redux/actions/trading_actions';
import {
  checkPosition,
  fetchAvailableBalance,
  fetchBots,
  saveBot,
} from 'redux/actions/bot_actions';
import { openModal } from 'redux/actions/other_actions';
import { validateBotSteps } from 'validations';
import {
  ButtonGroup,
  CreateBotHeading,
  CreateBotStep1,
  CreateBotStep2,
  CreateBotStep3,
  CreateBotStep4Bot1,
  CreateBotStep4Bot2,
  CreateBotStep5,
  ModalSteps,
} from 'components';
import { BotModalStepValues } from 'types';
import { Form, Formik, FormikErrors } from 'formik';
import { useAppDispatch } from 'context';
import { StyledStepsModal } from 'assets/styles';
const initial_pair = {
  base: '',
  value: '',
  quote: '',
  id: '',
  is_spot: 0,
  label: '',
  market_id: '',
  name: '',
  order: '',
  status: '',
  value_charts: '',
  currency: '',
};
const initial_capital = {
  balance: '',
  capital: '',
  reinvest: false,
  lower_price: '',
  grids: '',
  upper_price: '',
  investment: '',
  trigger_price: '',
  stop_loss: '',
  take_profit: '',
  income_percent: '',
};

const CreateBotMain = () => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const checkValidation = ({
    errors,
  }: {
    errors?: FormikErrors<BotModalStepValues>;
  }) => {
    if (step === 1 && errors?.bot) return true;
    if (step === 2 && errors?.market) return true;
    if (step === 3 && errors?.pair) return true;
    return !!(step === 4 && errors?.capital);
  };

  const goFurther = ({
    values,
    errors,
    setFieldValue,
  }: {
    values: BotModalStepValues;
    errors?: FormikErrors<BotModalStepValues>;
    setFieldValue?: Function;
  }) => {
    if (checkValidation({ errors })) return;
    const formData = new FormData();
    const { market, pair, capital, bot } = values;
    const is_spot = bot?.id !== 1;
    if (step === 1 && !errors?.bot) {
      setStep((prev) => (prev < 5 ? prev + 1 : 5));
    }
    if (step === 2 && market && bot && bot.id) {
      formData.append('market_id', market.id.toString());
      formData.append('slug', market.slug);
      formData.append('is_spot', (bot.id === 2 ? 1 : 0).toString());
      dispatch(
        fetchPairs({ formData, market: market.slug, bot_id: bot.id })
      ).then(() => setStep((prev) => (prev < 5 ? prev + 1 : 5)));
    }
    if (step === 3 && market && pair) {
      formData.append('currency', pair.base);
      formData.append('quote', pair.quote);
      formData.append('symbol', pair.value);
      formData.append('market_id', market.id.toString());
      dispatch(fetchAvailableBalance({ values: formData, is_spot })).then(
        ({ payload }) => {
          if (setFieldValue) {
            setFieldValue('capital', {
              ...values.capital,
              balance: payload.balance,
            });
          }
          setStep((prev) => (prev < 5 ? prev + 1 : 5));
        }
      );
    }
    if (step === 4 && capital && market && pair) {
      formData.append('amount', capital.capital.toString());
      formData.append('pair_id', pair.id.toString());
      formData.append('market', market.id.toString());

      if (values?.bot?.id === 1) {
        dispatch(checkPosition({ values: formData })).then(({ payload }) => {
          if (payload) setStep((prev) => (prev < 5 ? prev + 1 : 5));
        });
      } else {
        setStep((prev) => (prev < 5 ? prev + 1 : 5));
      }
    }
    if (step === 5 && market && bot && bot.id) {
      formData.append('amount', capital.capital.toString());
      formData.append('pair_id', pair.id.toString());
      formData.append('market_id', market.id.toString());
      formData.append('bot_id', bot.id.toString());
      if (bot?.id === 1) {
        formData.append('reinvest', Number(capital.reinvest).toString());
      } else {
        formData.append('lower_price', capital.lower_price);
        formData.append('grids', capital.grids);
        formData.append('upper_price', capital.upper_price);
        formData.append('investment', capital.investment);
        formData.append('income_percent', capital.income_percent);
        capital.trigger_price &&
          formData.append('trigger_price', capital.trigger_price);
        capital.stop_loss && formData.append('stop_loss', capital.stop_loss);
        capital.take_profit &&
          formData.append('take_profit', capital.take_profit);
      }

      dispatch(saveBot({ data: formData, is_spot })).then(({ payload }) => {
        if (payload) dispatch(openModal('create_bot_trading'));
      });
      return;
    }
  };
  useEffect(() => {
    dispatch(fetchBots());
  }, [dispatch]);
  const goBack = (setFieldValue: Function) => {
    if (step === 1) {
      dispatch(openModal('create_bot_trading'));
      return;
    }
    if (step === 2) setFieldValue('market', null);
    if (step === 3) setFieldValue('pair', initial_pair);
    if (step === 4) setFieldValue('capital', initial_capital);
    setStep((prev) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <StyledStepsModal>
      <div className="steps">
        <CreateBotHeading activeStep={step} />
        <ModalSteps activeStep={step} steps={5} />
      </div>
      <Formik
        initialValues={{
          bot: { id: null },
          market: null,
          pair: initial_pair,
          capital: initial_capital,
        }}
        onSubmit={(values) => goFurther({ values })}
        validationSchema={validateBotSteps}
        validateOnMount
      >
        {({
          errors,
          values,
          setFieldTouched,
          setFieldValue,
          handleSubmit,
          touched,
          setErrors,
        }) => (
          <Form>
            {step === 1 && (
              <CreateBotStep1
                values={values}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
              />
            )}
            {step === 2 && (
              <CreateBotStep2 values={values} setFieldValue={setFieldValue} />
            )}
            {step === 3 && (
              <CreateBotStep3 values={values} setFieldValue={setFieldValue} />
            )}
            {step === 4 &&
              (values?.bot && values?.bot?.id === 1 ? (
                <CreateBotStep4Bot1
                  values={values}
                  errors={errors}
                  setFieldValue={setFieldValue}
                />
              ) : (
                <CreateBotStep4Bot2
                  values={values}
                  errors={errors}
                  touched={touched}
                  setErrors={setErrors}
                />
              ))}
            {step === 5 && <CreateBotStep5 setStep={setStep} values={values} />}
            <ButtonGroup
              onBack={() => goBack(setFieldValue)}
              disabled={checkValidation({ errors })}
              onFurther={(e) => {
                e.detail === 1 && goFurther({ values, errors, setFieldValue });
              }}
              onSubmit={handleSubmit}
              type="button"
              step={step}
            />
          </Form>
        )}
      </Formik>
    </StyledStepsModal>
  );
};

export default CreateBotMain;
