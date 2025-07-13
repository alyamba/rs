import { Component } from 'react';
import errorCharacter from '../../assets/errorcharacter.png';

export class ErrorFallback extends Component {
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
      </div>
    );
  }
}
