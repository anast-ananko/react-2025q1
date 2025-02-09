export const updateSearchParams = (
  searchParams: URLSearchParams,
  navigate: (url: string, options?: { replace?: boolean }) => void
): void => {
  const currentParams = new URLSearchParams(searchParams);
  const page = currentParams.get('page') || '1';
  const query = currentParams.get('query') || '';

  const newUrl = `/?page=${page}${query ? `&query=${query}` : ''}`;
  navigate(newUrl, { replace: true });
};
