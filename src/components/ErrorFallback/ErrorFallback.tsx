import { Component } from 'react';
import errorCharacter from '../../assets/errorcharacter.png';

export class ErrorFallback extends Component {
  render() {
    return (
      <div>
        <h2>Oops! Something went wrong.</h2>
        <p>Please try again later.</p>
        <div>
          <img src={errorCharacter} alt="errorCharacter" />
        </div>
      </div>
    );
  }
}

export default ErrorFallback;
