import { fireEvent, render } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { ErrorFallback } from '../ErrorFallback';

describe('ErrorFallback', () => {
  const reloadMock = vi.fn();

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...window.location, reload: reloadMock },
    });
  });

  it('Renders ErrorFallback content', () => {
    const component = render(<ErrorFallback />);

    const errorFallbackContainer = component.getByTestId(
      'error-fallback-container'
    ) as HTMLDivElement;

    expect(errorFallbackContainer).toHaveTextContent(
      'Oops! Something went wrong.'
    );
    expect(errorFallbackContainer).toHaveTextContent(
      'Please, try again later.'
    );

    const button = component.getByRole('button') as HTMLButtonElement;
    expect(button).toBeInTheDocument();
  });

  it('Reloads app on ErrorButton click', () => {
    const component = render(<ErrorFallback />);
    const button = component.getByTestId('reload-button') as HTMLButtonElement;

    fireEvent.click(button);
    expect(reloadMock).toHaveBeenCalled();

    reloadMock.mockRestore();
  });
});
