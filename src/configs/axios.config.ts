import axios from 'axios';
import { store } from 'redux/reducers';
import { toast } from 'react-toastify';
import { got401status } from 'redux/reducers/user';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use((response) => {
  store.dispatch({ type: 'LOADING', payload: { pending: true } });
  return response;
});

axios.interceptors.response.use(
  (response) => {
    store.dispatch({ type: 'LOADING', payload: { pending: false } });
    if (response?.data?.data?.info && response?.data?.message) {
      toast.info(response?.data?.message);
    } else if (response?.data?.message) {
      toast.success(response?.data?.message);
    }
    return response;
  },
  (error) => {
    store.dispatch({ type: 'LOADING', payload: { pending: false } });
    if (error?.response?.status === 401) {
      localStorage.clear();
      store.dispatch(got401status());
    } else {
      toast.error(error?.response?.data?.message);
    }
    throw new Error(error);
  }
);
