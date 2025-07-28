import { useState, type FC } from 'react';

export const ErrorButton: FC = () => {
  const [shouldBeError, setShouldBeError] = useState<boolean>(false);

  if (shouldBeError) {
    throw new Error('Test error functionality');
  }

  return (
    <button
      className="cursor-pointer py-4 px-8 bg-red-500 hover:bg-red-600 text-l font-semibold rounded-xl text-white shadow-lg animate-pulse"
      data-testid="error-button"
      onClick={() => {
        setShouldBeError(true);
      }}
    >
      ⚠️ DO NOT CLICK
    </button>
  );
};
