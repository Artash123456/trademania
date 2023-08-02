import { useRef, useEffect } from 'react';
import { Logo } from 'assets/icons';
import { disabled_navigations, useAppDispatch, useAppSelector } from 'context';
import styled from 'styled-components';
import {
  AdminNav,
  Navigatable,
  ProfileInfo,
  SettingsNav,
  SpotNav,
} from 'components';
import { useNavigate } from 'react-router-dom';
import { openNavigation } from 'redux/reducers/navigation';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { fetchUnreadNotifications } from 'redux/actions/notification_actions';
const Navigation = () => {
  const navigate = useNavigate();
  const { menu, is_open } = useAppSelector(({ navigation }) => navigation);
  const { data } = useAppSelector(({ user }) => user);
  const { markets } = useAppSelector(({ markets }) => markets);
  const { count } = useAppSelector(({ notifications }) => notifications);
  const market = markets?.find((item) => item.has_credential);
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  useEffect(() => {
    dispatch(fetchUnreadNotifications());
  }, [data?.id, dispatch]);
  return (
    <StyledNavigation
      ref={ref}
      open={is_open}
      notifications_count={count || ''}
      id="navigation"
    >
      <div id="scroll">
        <div className="flacjsb head-logo">
          <abbr className="logo" onClick={() => navigate('/')}>
            <Logo />
            <span>Trademania</span>
          </abbr>
          <BsFillArrowLeftSquareFill
            onClick={() => {
              dispatch(openNavigation());
              setTimeout(() => dispatchEvent(new Event('resize')), 700);
            }}
          />
        </div>
        {menu.map((item) => (
          <div key={item.name}>
            <span>{item.name}</span>
            {item.children.map((item) => {
              const isDisabled = !market && disabled_navigations(item.name);
              if (item.name === 'Spot Trading')
                return (
                  <SpotNav
                    key="spot-nav"
                    className={
                      isDisabled
                        ? 'disabled'
                        : item.className
                        ? item.className
                        : ''
                    }
                    disabled={isDisabled}
                    open={is_open}
                  />
                );
              return (
                <Navigatable
                  item={item}
                  key={item.name}
                  market={market}
                  open={is_open}
                  className={
                    isDisabled
                      ? 'disabled'
                      : item.className
                      ? item.className
                      : ''
                  }
                />
              );
            })}
          </div>
        ))}

        {data?.role === 'admin' || data?.role === 'super-admin' ? (
          <AdminNav open={is_open} />
        ) : (
          ''
        )}
        <SettingsNav open={is_open} disabled={!market} />
      </div>

      <ProfileInfo open={is_open} />
    </StyledNavigation>
  );
};
const StyledNavigation = styled.nav<{
  open: boolean;
  notifications_count?: number | string;
}>`
  width: ${({ open }) => (open ? '16%' : '5%')};
  min-width: ${({ open }) => (open ? '300px' : '95px')};
  color: #fff;
  transition: all 0.3s;
  border-right: 1px solid ${({ theme }) => theme.font_gray};
  padding-bottom: 70px;
  position: sticky;
  top: 0;
  height: 100vh;
  .notifications {
    position: relative;
    &:after {
      content: '${({ notifications_count }) => notifications_count}';
      background: #fa5252;
      width: fit-content;
      padding: ${({ notifications_count }) =>
        notifications_count ? '4px 8px' : 0};
      border-radius: 8px;
      font-weight: 700;
      font-size: 1.2rem;
      line-height: 16px;
      color: #fff;
      justify-self: end;
    }
  }
  > div {
    overflow-y: auto;
    height: 100%;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    > .head-logo {
      margin: 40px 0 !important;
      justify-content: ${({ open }) => (open ? 'space-between' : 'center')};
      .logo {
        display: ${({ open }) => (open ? 'flex' : 'none')};
        > span {
          color: ${({ theme }) => theme.font_light_gray};
        }
      }
      > svg:last-child {
        color: #3968fc;
        font-size: 2.4rem;
        cursor: pointer;
        transform: rotate(${({ open }) => (open ? '0' : '180deg')});
      }
    }
    > div {
      width: 100%;
      color: ${({ theme }) => theme.font_gray};
      padding-left: 16px;
      padding-right: 16px;
      > span {
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        text-transform: uppercase;
        margin-bottom: 24px;
        margin-top: 32px;
        display: block;
      }
      .main-item {
        padding: 1.6vmin;
        display: grid;
        grid-template-columns: ${({ open }) =>
          open ? '18px auto auto' : 'auto'};
        grid-column-gap: 16px;
        align-items: center;
        cursor: pointer;
        justify-content: ${({ open }) => (open ? 'initial' : 'center')};
        > span {
          font-weight: 500;
          font-size: 1.6rem;
          line-height: 22px;
          color: ${({ theme }) => theme.font_gray};
          white-space: nowrap;
          transition: all 0.2s;
          display: ${({ open }) => (open ? 'block' : 'none')};
        }

        > svg > path {
          fill: ${({ theme }) => theme.font_gray};
        }
      }
    }
    .arrow {
      display: ${({ open }) => (open ? 'block' : 'none')};
      margin-left: auto;
      > svg > path {
        fill: ${({ theme }) => theme.font_gray};
      }
    }

    .active {
      background-color: #3968fc;
      > svg > path {
        fill: #fff !important;
      }
      > span {
        color: #fff !important;
      }
      > div {
        background: #fff !important;
        color: #3968fc !important;
      }
    }
  }
  @media screen and (max-width: 1700px) {
    > .head-logo {
      margin: 25px 0 !important;
    }
  }
  @media screen and (max-width: 1250px) {
    background-color: ${({ theme }) => theme.background_color};
  }
  @media screen and (max-width: 550px) {
    min-width: ${({ open }) => (open ? '200px' : '54px')};
    > div {
      > .head-logo {
        margin: 10px 0 !important;
        > svg {
          width: 30px;
        }
      }
      > div {
        padding-left: 8px;
        padding-right: 8px;

        > span {
          margin-bottom: 8px;
          margin-top: 16px;
          font-size: 8px;
          text-align: center;
        }
      }
    }
  }
`;
export default Navigation;
