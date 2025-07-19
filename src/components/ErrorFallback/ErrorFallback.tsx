import { Component } from 'react';
import chockedFace from '../../assets/shockedFace.svg';

export class ErrorFallback extends Component {
  handleClick = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-screen w-screen gap-4 bg-yellow-200">
        <p className="text-5xl font-semibold text-yellow-950">
          Oops! Something went wrong.
        </p>

        <p className="text-2xl text-yellow-950">Please, try again later.</p>

        <div className="h-100 ">
          <img src={chockedFace} alt="chockedFace" className="h-100 w-auto" />
        </div>

        <button
          className="cursor-pointer py-4 px-8 bg-yellow-900 hover:bg-yellow-950 text-l font-semibold text-white rounded-xl shadow-lg"
          onClick={this.handleClick}
        >
          RELOUD
        </button>
      </div>
    );
  }
}
