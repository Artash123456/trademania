import { MobileNavigatable, Warning } from 'components';
import { useAppSelector } from 'context';
import { icons } from 'context/icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { MenuResponsive } from 'types';

const NavigationMobile = () => {
  const { menu_responsive } = useAppSelector(({ navigation }) => navigation);
  const [menu, setMenu] = useState<MenuResponsive>();
  const { markets } = useAppSelector(({ markets }) => markets);
  const market = markets?.find((item) => item.has_credential);
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = (item: MenuResponsive) => {
    if (!market && item.name === 'Trade') {
      toast.warn(
        <Warning
          message="You didn't connect to any of marketplaces"
          onConfirm={() => navigate('/settings/api-connections')}
          button_text="Connect Marketplace"
        />
      );
    } else {
      if (item.path) {
        setMenu(undefined);
        navigate(item.path);
      } else if (item.children) {
        if (menu && menu.name === item.name) {
          setMenu(undefined);
        } else {
          setMenu(item);
        }
      }
    }
  };
  const checkActiveIcon = (item: MenuResponsive) => {
    if (item.path && location.pathname === item.path) return true;
    if (
      item.children &&
      item?.children?.some((item) => {
        if (item.path) {
          return item.path === location.pathname;
        } else {
          return item?.children?.some(
            (item: { path: string }) => item.path === location.pathname
          );
        }
      })
    )
      return true;
  };
  useEffect(() => {
    setMenu(undefined);
  }, [location.pathname]);
  return (
    <>
      <StyledMobile id="navigation-mobile">
        {menu_responsive.map((item) => {
          return (
            <div
              onClick={() => handleNavigate(item)}
              className={checkActiveIcon(item) ? 'active menu' : 'menu'}
              key={item.name}
            >
              {icons[item.icon]}
              <span>{item.name}</span>
            </div>
          );
        })}
      </StyledMobile>
      <MobileNavigatable
        menu={menu}
        market={market}
        menu_is_open={Boolean(menu)}
      />
    </>
  );
};

const StyledMobile = styled.nav`
  height: 80px;
  width: 100%;
  background-color: ${({ theme }) => theme.background_color};
  position: fixed;
  bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.light_gray};
  padding: 8px;
  grid-template-columns: repeat(5, 1fr);
  z-index: 1;
  > .menu {
    display: grid;
    place-items: center;
    padding: 8px 16px;
    cursor: pointer;
    > svg {
      width: 18px;
      height: 18px;
    }
    > span {
      font-weight: 500;
      font-size: 10px;
      line-height: 14px;
      color: ${({ theme }) => theme.font_gray};
    }
  }
  .active {
    background: #3968fc26;
    > span {
      color: #3968fc;
    }
    > svg {
      > path,
      > rect {
        fill: #3968fc;
      }
    }
  }

  @media (max-width: 380px) {
    .menu {
      padding: 8px;
    }
  }
`;
export default NavigationMobile;
