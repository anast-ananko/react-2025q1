import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Home from './views/Home';
import NotFound from './views/NotFound';
import Layout from './components/Layout';
import DetailedCard from './components/DetailedCard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />}>
        <Route path="details/:id" element={<DetailedCard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
