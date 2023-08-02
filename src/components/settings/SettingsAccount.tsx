import { UpdateProfileDetails, UpdateProfileImage } from 'components';
import styled from 'styled-components';

const SettingsAccount = () => {
  return (
    <StyledAccount className="settings">
      <h2>Account</h2>
      <UpdateProfileImage />
      <UpdateProfileDetails />
    </StyledAccount>
  );
};
const StyledAccount = styled.div`
  .pic {
    display: flex;
  }
  .save-changes-btn {
    width: 100%;
    padding: 17px;
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 22px;
    margin-top: 56px;
    background-color: ${({ theme }) => theme.submit_button_background};
    color: ${({ theme }) => theme.font_light_gray};
  }
  .select-theme {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 25px;
    > span,
    > label {
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 22px;
      color: ${({ theme }) => theme.font_gray};
    }
    > label > div {
      margin-left: 15px;
    }
  }
`;
export default SettingsAccount;
