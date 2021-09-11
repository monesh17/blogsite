import '../styles/global.css';
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/UserContext';

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
