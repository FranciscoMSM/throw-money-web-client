import React, { Component } from 'react';
import WebSocketComponent from './WebSocketComponent';
import './App.css';

class App extends Component {
  render() {
    if (!('WebSocket' in window || 'MozWebSocket' in window)) {
      return (
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            marginTop: 50,
          }}
        >
          Your browser doesn't support WebSockets, please try open the website in another one.
        </h2>
      );
    }

    return <WebSocketComponent />;
  }
}

export default App;
