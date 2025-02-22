import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useContext } from 'react';

import { ThemeContext } from './ThemeContext';
import { ThemeProvider } from './ThemeProvider';

const TestComponent = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) return <div>Context not available</div>;

  const { theme, toggleTheme } = themeContext;

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should default to light theme if no theme is in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme').textContent).toBe('light');
  });

  it('should default to dark theme if localStorage has dark', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
  });

  it('should toggle the theme from light to dark and vice versa', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeDisplay = screen.getByTestId('current-theme');
    const toggleButton = screen.getByText(/toggle theme/i);

    expect(themeDisplay.textContent).toBe('light');

    fireEvent.click(toggleButton);
    expect(themeDisplay.textContent).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(toggleButton);
    expect(themeDisplay.textContent).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should render children correctly', () => {
    render(
      <ThemeProvider>
        <p>Test Child</p>
      </ThemeProvider>
    );

    expect(screen.getByText(/test child/i)).toBeInTheDocument();
  });

  it('should persist theme changes in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText(/toggle theme/i);

    fireEvent.click(toggleButton);
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(toggleButton);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
