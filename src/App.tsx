import { useContext } from 'react';
import { Loading } from 'components';
import { SignPage } from 'SignPage';
import { HomePage } from 'HomePage';
import { AuthContext } from 'context';
const App = () => {
  const { authenticated, loading } = useContext(AuthContext);
  if (loading) return <Loading />;
  if (!authenticated) return <SignPage />;
  return <HomePage />;
};

export default App;
