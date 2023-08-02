import { useEffect } from 'react';
import { Outlet } from 'react-router';
import {
  Modal,
  ActivateTwoFactorPassword,
  LogOutOtherBrowsers,
  DeleteAccountModal,
  ScanQrCode,
  SettingsExchangesModal,
} from 'components';
import styled from 'styled-components';
import { openModal } from 'redux/actions/other_actions';
import { getUser } from 'redux/actions/user_actions';
import { useAppDispatch, useAppSelector } from 'context';

const Settings = () => {
  const {
    confirm_password,
    activate_qr_code,
    log_out_from_other_browsers,
    delete_account,
    exchanges,
  } = useAppSelector(({ modal }) => modal.types);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <StyledSettings>
      <Outlet />
      <Modal
        open={confirm_password}
        onClose={() => dispatch(openModal('confirm_password'))}
      >
        <ActivateTwoFactorPassword />
      </Modal>
      <Modal
        open={activate_qr_code}
        onClose={() => dispatch(openModal('activate_qr_code'))}
      >
        <ScanQrCode />
      </Modal>
      <Modal
        open={log_out_from_other_browsers}
        onClose={() => dispatch(openModal('log_out_from_other_browsers'))}
      >
        <LogOutOtherBrowsers />
      </Modal>
      <Modal
        open={delete_account}
        onClose={() => dispatch(openModal('delete_account'))}
      >
        <DeleteAccountModal />
      </Modal>
      <Modal
        open={exchanges}
        onClose={() => dispatch(openModal('exchanges'))}
        with_close_icon="exchanges"
      >
        <SettingsExchangesModal />
      </Modal>
    </StyledSettings>
  );
};
const StyledSettings = styled.div`
  background-color: ${({ theme }) => theme.background_color};
  overflow: auto;
  padding-bottom: 150px;
  border-radius: 0;
  .settings {
    max-width: 750px;
    width: 100%;
    margin: 0 auto;
    padding-inline: 5px;
    border-radius: 0;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    form {
      position: relative;
    }
  }
  @media (max-width: 900px) {
    .settings {
      padding: 16px;
    }
  }
`;
export default Settings;
