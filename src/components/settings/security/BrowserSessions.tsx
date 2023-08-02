import { useEffect } from 'react';
import { Button, DeviceSessions, WarningContent } from 'components';
import { fetchBrowserSessions } from 'redux/actions/settings_actions';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { Scroll } from 'assets/styles';
import { openModal } from 'redux/actions/other_actions';

const BrowserSessions = () => {
  const dispatch = useAppDispatch();
  const { deviceSessions } = useAppSelector(({ settings }) => settings);
  const { browser_sessions } = useAppSelector(({ loading }) => loading);
  useEffect(() => {
    dispatch(fetchBrowserSessions());
  }, [dispatch]);
  return (
    <div className="settings">
      <h3>{translation('browser_session')}</h3>
      <h4>{translation('set_7_paragraph')}</h4>
      <Scroll height="250px">
        {deviceSessions.map((elem, index) => (
          <DeviceSessions item={elem} key={index} />
        ))}
      </Scroll>
      <WarningContent paragraph="If necessary, you may log out of all of your other browser sessions across all of your devices. If you feel that your account has been compromised, you should update your password.">
        <Button.Blue
          onClick={() => {
            const set = document.getElementById('container') as HTMLElement;
            if (set)
              set.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
          }}
          style={{ marginLeft: 'auto' }}
        >
          Change password
        </Button.Blue>
      </WarningContent>
      <Button.Green
        value="log_out_other_browsers"
        pending={browser_sessions}
        onClick={() => dispatch(openModal('log_out_from_other_browsers'))}
        error
        style={{ float: 'right' }}
      />
    </div>
  );
};

export default BrowserSessions;
