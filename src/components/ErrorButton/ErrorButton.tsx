import { Component } from 'react';

export class ErrorButton extends Component {
  state = { shouldBeError: false };

  render() {
    if (this.state.shouldBeError) {
      throw new Error('Test error functionality');
    }

    return (
      <button
        className="cursor-pointer py-4 px-8 bg-red-500 hover:bg-red-600 text-l font-semibold rounded-xl text-white shadow-lg animate-pulse"
        data-testid="error-button"
        onClick={() => {
          this.setState({ shouldBeError: true });
        }}
      >
        ⚠️ DO NOT CLICK
      </button>
    );
  }
}
