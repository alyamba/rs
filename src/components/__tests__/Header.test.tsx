import { describe, expect, it, vitest } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  const mockProps = {
    value: '',
    onChangeValue: vitest.fn(),
    onSearch: vitest.fn(),
  };

  it('Renders title, search input and search button', () => {
    const component = render(<Header {...mockProps} />);

    expect(component.getByTestId('search-input')).toBeTruthy();
    expect(component.getByTestId('search-button')).toBeTruthy();
  });

  it('Renders input with properly value according to props', () => {
    const component = render(<Header {...mockProps} value="testValue" />);

    const input = component.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('testValue');
  });

  it('Should call mock function on button click', () => {
    const mockFunction = vitest.fn();
    const component = render(<Header {...mockProps} onSearch={mockFunction} />);

    const button = component.getByTestId('search-button') as HTMLButtonElement;
    fireEvent.click(button);
    expect(mockFunction).toHaveBeenCalledOnce();
  });
});
