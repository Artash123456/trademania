import { StyledSoon } from 'assets/styles';
import { useAppDispatch, useAppSelector } from 'context';
import { icons } from 'context/icons';
import { FC, Fragment, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from 'redux/actions/user_actions';
import styled from 'styled-components';
import { MarketTypes, MenuResponsive } from 'types';

const MobileNavigatable: FC<{
  menu?: MenuResponsive;
  market?: MarketTypes;
  menu_is_open?: boolean;
}> = ({ menu, market, menu_is_open }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<string | boolean>(false);
  const { data } = useAppSelector(({ user }) => user);
  const handleNavigate = (item: Record<string, any>) => {
    if (item.path) {
      setOpen(false);
      if (item.name === 'Manual Trading') {
        navigate(`${item.path}?market=${market?.name}`);
      } else {
        navigate(item.path);
      }
    } else {
      setOpen((p) => (p && p === item.name ? false : item.name));
    }
  };
  return (
    <StyledNav open={menu_is_open}>
      <h2>{menu?.name === 'Menu' ? 'Menu' : 'Trade Selection'}</h2>

      {menu && menu.children ? (
        menu.children.map((item) => {
          const active = item.name === open;
          let showAdmin =
            item.name === 'Administrator'
              ? data?.role === 'admin' || data?.role === 'super-admin'
              : true;
          return (
            <Fragment key={item.name}>
              {showAdmin && (
                <div
                  className={`item ${active ? 'open' : ''}`}
                  onClick={() => handleNavigate(item)}
                >
                  {icons[item.icon]}
                  <span>{item.name}</span>
                  {item.children && <IoIosArrowForward className="arrow" />}
                  {item.ready === 'no' && (
                    <StyledSoon open className="soon">
                      Soon!
                    </StyledSoon>
                  )}
                </div>
              )}
              {active && item.children && (
                <div className="drop-down-menu">
                  {item.children?.map(
                    (elem: { name: string; path: string }) => {
                      return (
                        <span
                          key={elem.name}
                          onClick={() => {
                            if (elem.name === 'Marketplace') {
                              navigate(`${elem.path}?market=${market?.name}`);
                            } else {
                              navigate(elem.path);
                            }
                          }}
                        >
                          {elem.name}
                        </span>
                      );
                    }
                  )}
                </div>
              )}
            </Fragment>
          );
        })
      ) : (
        <></>
      )}
      <div
        className="logout"
        onClick={() => dispatch(handleLogout()).then(() => navigate('/'))}
      >
        <RiLogoutBoxRFill />
        <span>Log Out</span>
      </div>
    </StyledNav>
  );
};

const StyledNav = styled.div<{ open?: boolean }>`
  position: fixed;
  top: 0;
  background: ${({ theme }) => theme.background_color};
  border-radius: 0;
  width: 100%;
  max-width: 400px;
  height: calc(100% - 80px);
  z-index: 0;
  transition: all 0.3s;
  overflow: auto;
  padding: 16px;
  left: ${({ open }) => (open ? '0' : '-500px')};
  h2 {
    margin: 0;
  }
  span,
  .arrow {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: ${({ theme }) => theme.light_gray};
  }
  item svg path {
    fill: ${({ theme }) => theme.light_gray};
  }
  .logout svg {
    font-size: 25px;
    color: ${({ theme }) => theme.light_gray};
  }
  > .item,
  .logout {
    width: 100%;
    height: 64px;
    display: grid;
    grid-template-columns: 20px auto auto;
    grid-column-gap: 18px;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.light_gray};
    border-radius: 0;
  }
  .open {
    border-bottom: none;
    .arrow {
      transform: rotate(90deg);
      transition: all 0.3s;
    }
  }
  .drop-down-menu {
    padding-left: 50px;
    border-bottom: 1px solid ${({ theme }) => theme.light_gray};
    border-radius: 0;
    display: grid;
    > span {
      margin-bottom: 15px;
      cursor: pointer;
      text-transform: capitalize;
      border-bottom: 1px solid ${({ theme }) => theme.light_gray};
      padding: 5px 0;
    }
  }
  .arrow {
    justify-self: flex-end;
  }
  @media (min-width: 900px) {
    display: none;
  }
`;
export default MobileNavigatable;
