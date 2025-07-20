import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { ErrorBoundary } from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  const BrokenComponent = () => {
    throw new Error('Error');
  };

  it('Renders ErrorBoundary with BrokenComponent', () => {
    const errorText = 'Something went wrong.';

    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const component = render(
      <ErrorBoundary fallback={<div>{errorText}</div>}>
        {<BrokenComponent />}
      </ErrorBoundary>
    );

    expect(consoleErrorMock).toHaveBeenCalled();
    expect(component.getByText(errorText)).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });
});
