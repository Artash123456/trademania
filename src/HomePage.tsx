import { useEffect, useMemo } from 'react';
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  Dashboard,
  Settings,
  Manual,
  Copy,
  Bot,
  Spot,
  Wallets,
  Notifications,
  Admin,
  Affiliate,
  Navigation,
  NavigationMobile,
} from 'layout';
import {
  ComingSoon,
  SettingsApi,
  SettingsCopy,
  SettingsAccount,
  SettingsSecurity,
  AdminDashboard,
  AdminOrders,
  AdminPositions,
  AdminAffiliate,
  AdminBots,
  AdminCopy,
  AdminUsers,
  AdminMarkets,
  AdminReports,
  SettingsSubaccounts,
  ContextMenu,
  Transactions,
  AdminSettings,
  AdminUserBalances,
  Button,
} from 'components';
import {
  ReportsIcon,
  SignalTradingIcon,
  LaunchTradingIcon,
  Chart,
  Portfolio,
  History,
  CopyTradingIcon,
} from 'assets/icons';
import { getMarketplaces } from 'redux/actions/market_actions';
import {
  disabled_routes,
  useAppDispatch,
  useAppSelector,
  useContextMenu,
} from 'context';
import styled from 'styled-components';
import { Gradient } from 'assets/styles';
import { closeAllModals } from 'redux/reducers/modal';
import { returnAdminBack } from 'redux/actions/admin_actions';
export const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { clicked, setClicked, points, setPoints } = useContextMenu();

  const {
    checked,
    two_factor_confirmed,
    role,
    markets,
    fetch_marketplaces,
    get_user,
    logged_in_as,
    back_token,
    admin_id,
    return_admin_back,
  } = useAppSelector(({ markets, user, loading, modal, admin }) => ({
    markets: markets.markets,
    checked: user?.data,
    two_factor_confirmed: user?.data?.two_factor_confirmed,
    get_user: loading.get_user,
    role: user?.data?.role,
    logged_in_as: admin?.logged_in_as,
    fetch_marketplaces: loading.fetch_marketplaces,
    return_admin_back: loading.return_admin_back,
    add_balance: modal.types.add_balance,
    back_token: admin.back_token,
    admin_id: admin.admin_id,
  }));

  useEffect(() => {
    dispatch(getMarketplaces());
  }, [dispatch]);
  useEffect(() => {
    dispatch(closeAllModals());
  }, [location.pathname, dispatch]);
  const has_credential = useMemo(() => {
    return markets.find((item) => item.has_credential);
  }, [markets]);

  useEffect(() => {
    if (
      !two_factor_confirmed &&
      has_credential &&
      !get_user &&
      !return_admin_back
    )
      navigate('/settings/safety');
  }, [
    navigate,
    two_factor_confirmed,
    has_credential,
    return_admin_back,
    get_user,
  ]);
  useEffect(() => {
    if (
      !has_credential &&
      disabled_routes(location.pathname) &&
      !fetch_marketplaces &&
      markets.length
    )
      navigate('/settings/api-connections');
  }, [
    navigate,
    two_factor_confirmed,
    has_credential,
    markets.length,
    location.pathname,
    fetch_marketplaces,
  ]);
  return (
    <MainContainer
      onContextMenuCapture={(e) => {
        e.preventDefault();
        setClicked(true);
        setPoints({
          x: e.pageX,
          y: e.pageY,
        });
      }}
    >
      <Navigation />
      <Gradient id="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings/*" element={<Settings />}>
            <Route path="account" element={<SettingsAccount />} />
            <Route path="safety" element={<SettingsSecurity />} />
            <Route path="api-connections" element={<SettingsApi />} />
            <Route path="copy-trading" element={<SettingsCopy />} />
            <Route path="subaccounts" element={<SettingsSubaccounts />} />
          </Route>
          <Route
            path="/signal"
            element={
              <ComingSoon logo={<SignalTradingIcon />} title="Signal trading" />
            }
          />
          {(role === 'admin' || role === 'super-admin') && (
            <Route path="/admin/*" element={<Admin />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="positions" element={<AdminPositions />} />
              <Route path="affiliate" element={<AdminAffiliate />} />
              <Route path="bots" element={<AdminBots />} />
              <Route path="copy" element={<AdminCopy />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="markets" element={<AdminMarkets />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="user-balances" element={<AdminUserBalances />} />
            </Route>
          )}
          <Route
            path="/copy"
            element={
              import.meta.env.VITE_DEPLOY_MODE === 'development' ? (
                <Copy />
              ) : (
                <ComingSoon logo={<CopyTradingIcon />} title="Copy Trading" />
              )
            }
          />
          <Route
            path="/chart"
            element={<ComingSoon logo={<Chart />} title="Interactive Chart" />}
          />
          <Route
            path="/portfolio"
            element={<ComingSoon logo={<Portfolio />} title="Portfolio" />}
          />
          <Route path="/transactions" element={<Transactions />} />
          <Route
            path="/history"
            element={<ComingSoon logo={<History />} title="History" />}
          />
          <Route path="/bot-trading" element={<Bot />} />
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route
            path="/launch"
            element={
              <ComingSoon logo={<LaunchTradingIcon />} title="Launch pad" />
            }
          />
          <Route path="/spot/*" element={<Spot />} />
          <Route
            path="/reports"
            element={<ComingSoon logo={<ReportsIcon />} title="Reports" />}
          />
          <Route path="/test-bot-page" element={<Bot />} />
          <Route path="/manual" element={<Manual />} />
          {checked && <Route path="*" element={<Dashboard />} />}
          <Route path="/affiliate" element={<Affiliate />} />
          <Route
            path="/affiliate"
            element={<Navigate to="/affiliate/general" />}
          />
          {(role !== 'admin' || role !== 'super-admin') && (
            <Route path="/admin/*" element={<Navigate to="/" />} />
          )}
          {import.meta.env.VITE_DEPLOY_MODE !== 'development' && (
            <Route
              path="/settings/copy-trading"
              element={
                <ComingSoon logo={<CopyTradingIcon />} title="Copy Trading" />
              }
            />
          )}
        </Routes>
      </Gradient>
      <NavigationMobile />
      {clicked && <ContextMenu points={points} />}
      {logged_in_as && (
        <AdminReturnButton
          pending={return_admin_back}
          onClick={() =>
            dispatch(returnAdminBack({ back_token, admin_id, navigate }))
          }
        >
          Return Back
        </AdminReturnButton>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div<{ is_admin?: boolean }>`
  display: flex;
  overflow: hidden;
  height: 100vh;
  > #container {
    width: 100%;
    min-height: 100%;
    overflow: auto;
  }
  #navigation-mobile {
    display: none;
  }
  @media (max-width: 1025px) {
    #container {
      min-height: auto;
      height: calc(100% - 80px);
    }
    #navigation {
      display: none;
    }
    #navigation-mobile {
      display: grid;
    }
  }
`;
const AdminReturnButton = styled(Button.Blue)`
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 99;
`;
