import { Component } from 'react';
import errorCharacter from '../../assets/errorcharacter.png';

export class ErrorFallback extends Component {
  handleClick = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-screen gap-4">
        <p className="text-5xl font-semibold text-blue-950">
          Oops! Something went wrong.
        </p>
        <p className="text-2xl text-blue-950">Please, try again later.</p>
        <div className="h-100 ">
          <img
            src={errorCharacter}
            alt="errorCharacter"
            className="h-100 w-auto rounded-md"
          />
        </div>
        <button
          className="cursor-pointer p-2 bg-blue-950 text-white"
          onClick={this.handleClick}
        >
          Reload
        </button>
      </div>
    );
  }
}
