import { fireEvent, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ErrorButton } from '../ErrorButton';

describe('ErrorButton', () => {
  it('Renders ErrorButton', () => {
    const component = render(<ErrorButton />);

    const button = component.getByTestId('error-button');
    expect(button).toBeInTheDocument();
  });

  it('Renders error after ErrorButton clicking', () => {
    const renderWithError = () => {
      const component = render(<ErrorButton />);

      const button = component.getByTestId('error-button');
      fireEvent.click(button);
    };

    expect(renderWithError).toThrowError();
  });
});
