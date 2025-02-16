import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary';

const Layout: FC = () => {
  return (
    <ErrorBoundary>
      <div className="px-4 py-8">
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
