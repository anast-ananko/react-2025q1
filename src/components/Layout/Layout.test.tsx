import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Layout from '.';

describe('Layout', () => {
  it('should render the layout', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  });
});
