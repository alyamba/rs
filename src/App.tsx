import { Component } from 'react';
import { ErrorBoundary, ErrorFallback } from './components';

class App extends Component {
  state = {};
  render() {
    return (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <div className="app" />
      </ErrorBoundary>
    );
  }
}

export default App;
