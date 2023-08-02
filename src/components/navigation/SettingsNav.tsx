import { Warning } from 'components';
import { disabled_navigations, useAppDispatch, useAppSelector } from 'context';
import { icons } from 'context/icons';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleLogout } from 'redux/actions/user_actions';
import DropDown from './DropDown';

const SettingsNav: FC<{ open: boolean; disabled?: boolean }> = ({
  open,
  disabled,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { settings } = useAppSelector(({ navigation }) => navigation);
  const { isDemo } = useAppSelector(({ markets }) => markets);

  return (
    <DropDown
      open={open}
      path="/settings"
      icon={icons.Settings}
      heading="Settings"
      scroll
    >
      <section>
        {settings.map((item) => (
          <article
            onClick={() => {
              if (disabled_navigations(item.name)) {
                if (disabled) {
                  toast.warn(
                    <Warning
                      message="You didn't connect to any of marketplaces"
                      onConfirm={() => navigate('/settings/api-connections')}
                      button_text="Connect Marketplace"
                    />
                  );
                } else navigate(item.path);
              } else if (isDemo && item.name === 'Subaccounts') {
                toast.info('Subaccounts is not available in demo mode');
              } else navigate(item.path);
            }}
            key={item.name}
            className={location.pathname === item.path ? 'active' : ''}
          >
            <span>{item.name}</span>
          </article>
        ))}
        <article
          onClick={() => dispatch(handleLogout()).then(() => navigate('/'))}
        >
          <span>Log Out</span>
        </article>
      </section>
    </DropDown>
  );
};

export default SettingsNav;
