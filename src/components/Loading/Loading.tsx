import { type FC } from 'react';

export const Loading: FC = () => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      data-testid="loading"
    >
      <div className="w-6 h-6 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
