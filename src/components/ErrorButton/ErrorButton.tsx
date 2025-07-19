import { Component } from 'react';

export class ErrorButton extends Component {
  state = { shouldBeError: false };

  render() {
    if (this.state.shouldBeError) {
      throw new Error('Test error functionality');
    }
    return (
      <button
        onClick={() => {
          this.setState({ shouldBeError: true });
        }}
        className="cursor-pointer p-2 bg-red-200"
      >
        Error
      </button>
    );
  }
}
