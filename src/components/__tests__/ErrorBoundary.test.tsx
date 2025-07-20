import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { ErrorBoundary } from '../ErrorBoundary';
import { ErrorButton } from '../ErrorButton';

describe('ErrorBoundary', () => {
  const BrokenComponent = () => {
    throw new Error('Error');
  };

  it('Renders ErrorBoundary fallback with BrokenComponent', () => {
    const errorText = 'Something went wrong.';

    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const component = render(
      <ErrorBoundary fallback={<div>{errorText}</div>}>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorMock).toHaveBeenCalled();
    expect(component.getByText(errorText)).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });

  it('Renders ErrorBoundary fallback after clicking ErrorButton', () => {
    const errorText = 'Something went wrong.';

    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const component = render(
      <ErrorBoundary fallback={<div>{errorText}</div>}>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = component.getByTestId('error-button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(consoleErrorMock).toHaveBeenCalled();
    expect(component.getByText(errorText)).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });
});
