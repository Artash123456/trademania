import { FC, useCallback, useEffect, useState } from 'react';
import { openModal } from 'redux/actions/other_actions';
import {
  ButtonGroup,
  CopyFollowHeading,
  CopyFollowStep1,
  CopyFollowStep2,
  CopyFollowStep3,
  CopyFollowStep4,
  ModalSteps,
} from 'components';
import {
  CopyEditUserTypes,
  CopyModalStepErrors,
  CopyModalStepValues,
} from 'types';
import { Form, Formik, FormikErrors } from 'formik';
import { copyTraderValidation } from 'validations';
import { followTrader } from 'redux/actions/copy_actions';
import CopyFollowStep5 from './CopyFollowStep5';
import { useAppDispatch, useAppSelector } from 'context';
import { StyledStepsModal } from 'assets/styles';

interface Props {
  initialStep: number;
  initialValues: CopyEditUserTypes;
}

const CopyFollowMainModal: FC<Props> = ({ initialStep, initialValues }) => {
  const { user_data } = useAppSelector(({ copy }) => copy);
  const { isDemo }= useAppSelector(({ markets })=>markets)
  const [step, setStep] = useState(1);
  useEffect(() => {
    setStep(initialStep);
    return () => {
      setStep(1);
    };
  }, [initialStep]);
  const dispatch = useAppDispatch();
  const buttonDisable = useCallback(
    (
      errors: FormikErrors<CopyModalStepErrors>,
      setErrors: (value: Record<string, string>) => void,
      values: CopyModalStepValues
    ) => {
      if (step === 1 && errors.trade_type) return true;
      if (step === 2) {
        if (errors.market || errors.pairs) return true;
        if (!Object.keys(values.market_pairs)?.length) {
          setErrors({ market: 'Please select market' });
          return true;
        }
      }
      if (step === 3) {
        if (errors.market) return true;
        if (!values.my_markets?.length) {
          setErrors({ market: 'Please select market' });
          return true;
        }
      }
      return !!(
        step === 4 &&
        (!values.per_trade_amount ||
          +values.per_trade_amount < 10 ||
          errors.per_trade_amount ||
          (!values.initial_investment && errors.initial_investment))
      );
    },
    [step]
  );
  const goBack = () => {
    if (step === 1) {
      dispatch(openModal('copy_follow'));
      return;
    }
    setStep((prev: number) => (prev > 1 ? prev - 1 : 1));
  };
  const goFurther = (
    values: CopyModalStepValues,
    setErrors: (value: Record<string, string>) => void,
    errors: FormikErrors<CopyModalStepErrors>
  ) => {
    if (buttonDisable(errors, setErrors, values)) return;
    for (let item in values.market_pairs) {
      let pairs = values.market_pairs[item];
      if (!pairs?.length) {
        setErrors({ pairs: 'Please select pair' });
        return;
      }
    }
    setStep((prev: number) => prev + 1);
  };
  if (!initialStep) return <></>;
  return (
    <StyledStepsModal>
      <div className="steps">
        <CopyFollowHeading activeStep={step} />
        <ModalSteps activeStep={step} steps={5} />
      </div>
      {user_data && (
        <Formik
          enableReinitialize={step === 5}
          initialValues={initialValues}
          validateOnChange
          validateOnMount
          validationSchema={copyTraderValidation}
          onSubmit={(values: CopyModalStepValues, { resetForm }) => {
            dispatch(
              followTrader({ values, user_id: user_data?.id, resetForm, isDemo })
            );
          }}
        >
          {({
            setFieldValue,
            values,
            errors,
            setErrors,
            touched,
            handleSubmit,
          }) => (
            <Form>
              {step === 1 && (
                <CopyFollowStep1
                  setFieldValue={setFieldValue}
                  values={values}
                  setErrors={setErrors}
                />
              )}
              {step === 2 && (
                <CopyFollowStep2
                  setFieldValue={setFieldValue}
                  values={values}
                  errors={errors}
                />
              )}
              {step === 3 && (
                <CopyFollowStep3
                  setFieldValue={setFieldValue}
                  values={values}
                  errors={errors}
                />
              )}
              {step === 4 && (
                <CopyFollowStep4 errors={errors} touched={touched} />
              )}
              {step === 5 && (
                <CopyFollowStep5 values={values} setStep={setStep} />
              )}
              <ButtonGroup
                onBack={goBack}
                disabled={buttonDisable(errors, setErrors, values)}
                onFurther={() => {
                  step === 5
                    ? handleSubmit()
                    : goFurther(values, setErrors, errors);
                }}
                step={step}
                text={step === 5 ? 'finish' : 'next'}
              />
            </Form>
          )}
        </Formik>
      )}
    </StyledStepsModal>
  );
};

export default CopyFollowMainModal;
