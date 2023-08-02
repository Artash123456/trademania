import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { store } from 'redux/reducers';
import 'configs/axios.config';
import 'react-toastify/dist/ReactToastify.css';
import 'axios-progress-bar/dist/nprogress.css';
import 'assets/styles/index.css';
import 'assets/styles/responsive.css';
import 'assets/styles/loading.css';
import App from 'App';
import ErrorBoundary from 'ErrorBoundary';
import { isElectron } from 'redux/actions/user_actions';
import { AuthProvider } from 'context';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ErrorBoundary>
      {isElectron() ? (
        <HashRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </HashRouter>
      ) : (
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      )}
    </ErrorBoundary>
  </Provider>
);
