import { BrowserSessions, ChangePassword, TwoFactor } from 'components';

const SettingsSecurity = () => {
  return (
    <div className="settings">
      <h2>Security</h2>
      <ChangePassword />
      <div className="hr" />
      <TwoFactor />
      <div className="hr" />
      <BrowserSessions />
    </div>
  );
};

export default SettingsSecurity;
