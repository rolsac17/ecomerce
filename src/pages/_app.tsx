import store from '@redux/app/store';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import '@styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
}
