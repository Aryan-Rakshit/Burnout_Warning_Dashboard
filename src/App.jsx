import React from 'react';
import { BurnoutProvider } from './context/BurnoutContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BurnoutProvider>
      <Dashboard />
    </BurnoutProvider>
  );
}

export default App;
