import { FC } from 'react';

const Spinner: FC = () => {
  return (
    <div
      data-testid="spinner"
      className="flex items-center justify-center w-full h-64"
    >
      <div className="border-t-4 border-green-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
