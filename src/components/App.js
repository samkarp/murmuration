import React from 'react';
import { Link } from 'react-router';
import { version } from '../../package.json';

const App = ({ children }) => (
  <div>
    <header>
      <h1>Murmuration {version}</h1>
      <Link to="/table">Table</Link>
      <Link to="/viewMapItems">Map</Link>
    </header>
    <section>
      {children || 'Welcome to Murmuration'}
    </section>
  </div>
);

App.propTypes = { children: React.PropTypes.object };

export default App;
