import { Formik, Form } from 'formik';
import { Input, Button } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import styled from 'styled-components';
import {
  createNewUser,
  editUserData,
  getAllUsers,
} from 'redux/actions/admin_actions';
import { FC } from 'react';
import { openModal } from 'redux/actions/other_actions';
import { adminCreateUser, adminEditUser } from 'validations';
const EditUserModal: FC<{ user: Record<string, string>; create?: boolean }> = ({
  user,
  create,
}) => {
  const dispatch = useAppDispatch();
  const { admin_edit_user_loading, admin_create_user } = useAppSelector(
    ({ loading }) => loading
  );
  const { request_body } = useAppSelector(({ admin }) => admin);

  return (
    <StyledModal>
      <h2>{create ? 'Create' : 'Update'} User</h2>
      <Formik
        enableReinitialize
        initialValues={user}
        onSubmit={(values) => {
          if (!admin_edit_user_loading && !admin_create_user) {
            if (create) {
              dispatch(createNewUser({ values })).then(() => {
                dispatch(getAllUsers({ page: 1 }));
                dispatch(openModal('admin_create_user'));
              });
            } else {
              dispatch(
                editUserData({ values, id: user.id, method: 'PUT' })
              ).then(() => {
                dispatch(
                  getAllUsers({ page: 1, values: JSON.parse(request_body) })
                );
                dispatch(openModal('admin_edit_user'));
              });
            }
          }
        }}
        validationSchema={create ? adminCreateUser : adminEditUser}
      >
        {({ errors, touched }) => {
          return (
            <Form autoComplete="off" aria-autocomplete="none">
              <Input
                label={translation('email')}
                name="email"
                errors={errors?.email}
                touched={touched?.email}
              />
              <Input
                label={translation('first_name')}
                name="first_name"
                errors={errors?.first_name}
                touched={touched?.first_name}
              />
              <Input
                label={translation('last_name')}
                name="last_name"
                errors={errors?.last_name}
                touched={touched?.last_name}
              />
              <Input
                label={translation('password')}
                type="password"
                name="password"
                errors={errors?.password}
                touched={touched?.password}
              />

              {!create && user.affiliate_accepted_at && (
                <Input
                  label="Set Refer Bonus Rate"
                  name="refer_bonus_rate"
                  errors={errors?.refer_bonus_rate}
                  touched={touched?.refer_bonus_rate}
                />
              )}
              <Button.Green
                value={create ? 'create' : 'update'}
                type="submit"
                pending={create ? admin_create_user : admin_edit_user_loading}
              />
            </Form>
          );
        }}
      </Formik>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  padding: 1.6vmin;
  background-color: ${({ theme }) => theme.background_color};
  min-width: 450px;
  h2 {
    margin-top: 0;
  }
  button {
    width: 100%;
  }
  @media (max-width: 500px) {
    min-width: auto;
  }
`;

export default EditUserModal;
