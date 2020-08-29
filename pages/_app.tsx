import '../styles/tailwind.css';

import { AppPropsType } from 'next/dist/next-server/lib/utils';
import React from 'react';

function MyApp({ Component, pageProps }: AppPropsType) {
  return <Component {...pageProps} />;
}

export default MyApp;
