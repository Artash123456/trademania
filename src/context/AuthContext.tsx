import { createContext, ReactNode, FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './redux.hooks';
import { getUser, isElectron } from 'redux/actions/user_actions';
import axios from 'axios';
import Image from 'components/helper_components/download_image/Image';
import { loadProgressBar } from 'axios-progress-bar';
import { Toast } from 'components';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'assets/styles/GlobalStyles';
import 'react-rangeslider/lib/index.css';
import 'react-datepicker/dist/react-datepicker.css';
// import 'context/firebase';
const AuthContext = createContext({ authenticated: false, loading: false });

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    const set = document.getElementById('container') as HTMLElement;
    if (set)
      set.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  }, [location.pathname]);
  const { styles, user, modal, navigation } = useAppSelector(
    ({ styles, user, modal, navigation }) => ({
      styles,
      user,
      modal,
      navigation,
    })
  );
  const { two_factor_confirmed, get_user, logout } = useAppSelector(
    ({ loading }) => loading
  );
  if (user?.access_token)
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user?.access_token}`;
  useEffect(() => {
    if (!user.is_authenticated) dispatch(getUser());
    //eslint-disable-next-line
  }, []);
  const authenticated = useMemo(() => {
    if (isElectron()) {
      return user.is_authenticated && user.access_token;
    }
    return user.is_authenticated;
  }, [user.is_authenticated, user.access_token]);
  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading: two_factor_confirmed || get_user || logout,
      }}
    >
      <ThemeProvider theme={styles[styles.theme]}>
        {loadProgressBar()}
        <Toast />
        <GlobalStyles
          is_modal_open={
            modal.isOpen ||
            (location.pathname === '/copy' && modal.types.copy_warning)
          }
          is_navigation_open={navigation.is_open}
        />
        {children}
        {styles.downloadImage && <Image data={styles.downloadImage} />}
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
