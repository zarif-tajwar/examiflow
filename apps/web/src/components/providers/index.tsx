'use client';

import { ReactNode } from 'react';
import ReactQueryProvider from './react-query';

const Providers = ({ children }: { children: ReactNode }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Providers;
