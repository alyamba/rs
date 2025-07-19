import { Component } from 'react';

export class Loading extends Component {
  state = {};

  render() {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
}
