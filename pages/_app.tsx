import '../styles/global.css';
import { AppProps } from 'next/app';
import { AuthProvider } from '../pages/auth/UserContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default App;
