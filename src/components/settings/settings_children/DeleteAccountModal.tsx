import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { openModal } from 'redux/actions/other_actions';
import { Formik, Form } from 'formik';
import { ButtonGroup, Input } from 'components';
import { passwordValidationTwoFactor } from 'validations/password_two_factor';
import { deleteAccount } from 'redux/actions/settings_actions';
import { translation, useAppDispatch, useAppSelector } from 'context';

const DeleteAccount = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pending } = useAppSelector(({ loading }) => loading);

  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={passwordValidationTwoFactor}
      onSubmit={(values) =>
        dispatch(deleteAccount(values)).then(() => navigate('/'))
      }
    >
      {({ errors, touched }) => (
        <StyledModal>
          <h2>Attention !</h2>
          <p>Do you really want to remove your Account?</p>
          <p>
            If you decide to delete this account, your account and personal data
            will be deleted permanently and irreversible. Please make sure you
            do not have any valuable information in there.
          </p>

          <Input
            type="password"
            name="password"
            label={translation('password')}
            errors={errors.password}
            touched={touched.password}
            autoFocus={true}
          />

          <ButtonGroup
            cancel_text="decline"
            text="delete_account"
            onBack={() => dispatch(openModal('delete_account'))}
            type="submit"
            disabled={pending}
          />
        </StyledModal>
      )}
    </Formik>
  );
};
const StyledModal = styled(Form)`
  width: 560px;
  background: ${({ theme }) => theme.background_color};
  border-radius: 8px;
  padding: 15px;
  margin: 0 auto;
  > h2 {
    margin: 0;
  }
  > p {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
  }
  > form > div {
    margin: 15px auto 0;
    width: fit-content;
    display: flex;
    button {
      font: normal normal bold 1.8rem/10px Manrope;
      letter-spacing: 0.9px;
      width: auto;
      height: 43px;

      padding: 5px 15px;
    }
    button:first-child {
      background: #f2f2f2;
      color: #c4c4c4;
      margin-right: 20px;
    }
    button:last-child {
      background-color: ${({ theme }) => theme.error_red};
    }
  }
  @media (max-width: 768px) {
    width: auto;
    > form > div {
      button {
        height: 25px;
      }
    }
  }
`;
export default DeleteAccount;
