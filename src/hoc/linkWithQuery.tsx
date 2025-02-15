import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LinkWithQueryProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const LinkWithQuery: FC<LinkWithQueryProps> = ({ to, children, ...props }) => {
  const { search } = useLocation();

  const destination = to.includes('?')
    ? `${to}&${search.slice(1)}`
    : `${to}${search}`;

  return (
    <Link to={destination} {...props}>
      {children}
    </Link>
  );
};

export default LinkWithQuery;
