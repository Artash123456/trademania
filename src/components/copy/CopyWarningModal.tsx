import { useNavigate } from 'react-router-dom';
import { ButtonGroup, CheckboxInput } from 'components';
import styled from 'styled-components';
import { translation, useAppDispatch } from 'context';
import { acceptCopy } from 'redux/actions/copy_actions';
import { AiFillWarning } from 'react-icons/ai';
import { Form, Formik } from 'formik';
import { copyRiskWarning } from 'validations';

const CopyWarningModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const closeModal = (type: string) => {
    if (type === 'decline') {
      navigate('/');
    }
    if (type === 'accept') {
      dispatch(acceptCopy());
    }
  };
  return (
    <Formik
      initialValues={{
        terms_accepted: false,
        not_resident_of_special_countries: false,
      }}
      onSubmit={() => closeModal('accept')}
      validationSchema={copyRiskWarning}
    >
      {({ handleSubmit, errors, setFieldValue, values }) => {
        return (
          <StyledCopyWarning>
            <h1>{translation('risks')}</h1>

            <div className="error">
              <AiFillWarning /> {translation('set_19_paragraph')}
            </div>
            <p>{translation('set_20_paragraph')}</p>
            <p>{translation('set_21_paragraph')}</p>
            <p>{translation('set_22_paragraph')}</p>
            <CheckboxInput
              onChange={() =>
                setFieldValue('terms_accepted', !values.terms_accepted)
              }
              checked={values.terms_accepted}
              label={translation('set_23_paragraph')}
              error={errors.terms_accepted}
            />
            <CheckboxInput
              error={errors.not_resident_of_special_countries}
              checked={values.not_resident_of_special_countries}
              onChange={() =>
                setFieldValue(
                  'not_resident_of_special_countries',
                  !values.not_resident_of_special_countries
                )
              }
              label={translation('set_24_paragraph')}
            />

            <ButtonGroup
              onBack={() => closeModal('decline')}
              onFurther={() => handleSubmit()}
              text="confirm"
              cancel_text="decline"
            />
          </StyledCopyWarning>
        );
      }}
    </Formik>
  );
};

const StyledCopyWarning = styled(Form)`
  width: 60%;
  margin: 0 auto;
  background: ${({ theme }) => theme.background_color};
  padding: 1.6vmin;
  border-radius: 8px;
  h1 {
    text-transform: capitalize;
  }
  .error {
    margin: 0;
  }
  p {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
  }
  span {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
  }
`;

export default CopyWarningModal;
