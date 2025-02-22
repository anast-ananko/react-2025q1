import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import ErrorBoundary from '.';

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('should render child components without errors', () => {
    render(
      <ErrorBoundary>
        <div>Working component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/working component/i)).toBeInTheDocument();
  });

  it('should display the error message when an error occurs', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });
});
