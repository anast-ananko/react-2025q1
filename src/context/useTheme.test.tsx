import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';

import { useTheme } from './useTheme';
import { ThemeProvider } from './ThemeProvider';
import { Theme, ThemeContext } from './ThemeContext';

const mockContextValue = {
  theme: 'dark' as Theme,
  toggleTheme: vi.fn(),
};

describe('useTheme hook', () => {
  it('should return theme and toggleTheme from context when wrapped in ThemeProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('light');
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('should throw an error when used outside of ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
  });

  it('should return correct theme when provided a custom context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={mockContextValue}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
    expect(result.current.toggleTheme).toBe(mockContextValue.toggleTheme);
  });
});
