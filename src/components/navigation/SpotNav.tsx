import { FC } from 'react';
import { useAppSelector } from 'context';
import { icons } from 'context/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import DropDown from './DropDown';
import { toast } from 'react-toastify';
import { Warning } from 'components';

const SpotNav: FC<{
  open?: boolean;
  disabled?: boolean;
  className?: string;
}> = ({ open, disabled, className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { spot } = useAppSelector(({ navigation }) => navigation);
  const { markets } = useAppSelector(({ markets }) => markets);
  const handleNavigate = ({ name, path }: { name: string; path: string }) => {
    if (open)
      if (name === 'Marketplace') {
        const default_market = markets.find((item) => item.has_credential);
        if (default_market) navigate(`${path}?market=${default_market.name}`);
      } else navigate(path);
  };

  return (
    <DropDown
      open={open}
      disabled={disabled}
      path="/spot"
      icon={icons.Spot}
      heading="Spot Trading"
      className={className}
      onClick={() => {
        if (disabled)
          toast.warn(
            <Warning
              message="You didn't connect to any of marketplaces"
              onConfirm={() => navigate('/settings/api-connections')}
              button_text="Connect Marketplace"
            />
          );
      }}
    >
      <section>
        {spot.map((item) => (
          <article
            onClick={() => handleNavigate(item)}
            key={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            <span>{item.name}</span>
          </article>
        ))}
      </section>
    </DropDown>
  );
};

export default SpotNav;
