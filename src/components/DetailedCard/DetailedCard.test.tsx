import { render, screen, fireEvent } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import { useNavigate } from 'react-router-dom';

import DetailedCard from '.';
import { useGetCharacterQuery } from '../../store/services/rickandmortyApi';
import { mockCharacter } from '../../__mocks__/mockCharacter';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn().mockReturnValue({ search: '' }),
  useSearchParams: vi.fn().mockReturnValue([new URLSearchParams(), vi.fn()]),
  useParams: vi.fn().mockReturnValue({ id: '1' }),
}));

vi.mock('../../store/services/rickandmortyApi', () => ({
  useGetCharacterQuery: vi.fn().mockReturnValue({ isLoading: true }),
}));

describe('DetailedCard component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading spinner while fetching data', () => {
    render(<DetailedCard />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should display error message if fetching fails', () => {
    (useGetCharacterQuery as Mock).mockReturnValue({ isError: true });

    render(<DetailedCard />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('should render character details when data is successfully fetched', () => {
    (useGetCharacterQuery as Mock).mockReturnValue({
      data: mockCharacter,
      isSuccess: true,
      isLoading: false,
      isFetching: false,
    });

    render(<DetailedCard />);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Status: ${mockCharacter.status}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Species: ${mockCharacter.species}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Gender: ${mockCharacter.gender}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Origin: ${mockCharacter.origin.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Location: ${mockCharacter.location.name}`)
    ).toBeInTheDocument();
  });

  it('should navigate on close button click', () => {
    const navigateMock = vi.fn();
    (useNavigate as unknown as Mock).mockReturnValue(navigateMock);

    (useGetCharacterQuery as Mock).mockReturnValue({
      data: mockCharacter,
      isSuccess: true,
      isLoading: false,
      isFetching: false,
    });

    render(<DetailedCard />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('should navigate when clicked outside the component', () => {
    const navigateMock = vi.fn();
    (useNavigate as unknown as Mock).mockReturnValue(navigateMock);

    (useGetCharacterQuery as Mock).mockReturnValue({
      data: mockCharacter,
      isSuccess: true,
      isLoading: false,
      isFetching: false,
    });

    render(<DetailedCard />);

    fireEvent.mouseDown(document);
    expect(navigateMock).toHaveBeenCalled();
  });
});
