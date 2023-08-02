import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { icons } from 'context/icons';
import { MarketTypes } from 'types';
import { toast } from 'react-toastify';
import { Warning } from 'components';
import { disabled_navigations } from 'context';
import { StyledSoon } from 'assets/styles';

const Navigatable: FC<{
  item: Record<string, string>;
  market?: MarketTypes;
  className?: string;
  open?: boolean;
}> = ({ item, market, className, open }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = () => {
    const showWarning = () =>
      toast.warn(
        <Warning
          message="You didn't connect to any of marketplaces"
          onConfirm={() => navigate('/settings/api-connections')}
          button_text="Connect Marketplace"
        />
      );
    if (item.name === 'Manual Trading') {
      if (market) {
        navigate(
          `${item.path}?${
            item.name === 'Manual Trading' && market
              ? `market=${market?.name}`
              : ''
          }`
        );
      } else {
        showWarning();
      }
    } else if (disabled_navigations(item.name)) {
      if (market) {
        navigate(item.path);
      } else {
        showWarning();
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <div
      className={`main-item ${
        item.path === location.pathname ? 'active' : ''
      } ${className}`}
      onClick={handleNavigate}
    >
      {icons[item.icon as keyof unknown]}
      <span className="name">{item.name}</span>
      {item.ready && <StyledSoon open={open}>Soon!</StyledSoon>}
    </div>
  );
};

export default Navigatable;
