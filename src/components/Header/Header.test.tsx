import { render, screen } from '@testing-library/react';

import Header from '.';

describe('Header', () => {
  it('should render without crashing', () => {
    render(<Header query="" onQueryChange={() => {}} onSubmit={() => {}} />);

    expect(screen.getByRole('button', { name: /throw error/i })).toBeTruthy();
  });
});
