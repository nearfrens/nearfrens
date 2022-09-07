import React from 'react';
import './App.css';
import { LayoutHome } from './components/layoutHome';
import { Page } from './components/page';

function App() {
  return (
    <div className="App">
      <Page main={ <LayoutHome/> }/>
    </div>
  );
}

export default App;
