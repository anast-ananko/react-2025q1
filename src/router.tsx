import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Home from './views/Home';
import NotFound from './views/NotFound';
import Layout from './components/Layout';
import { charactersLoader } from './loaders/charactersLoader';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} loader={charactersLoader} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
