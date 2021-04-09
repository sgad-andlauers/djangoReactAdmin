import React from 'react';
import DashBoard  from './components/dashBoard'; 
import DataContextProvider from "./context/DataContext";


function App() {
  return (
    <div className="App">
      <DataContextProvider>
      <DashBoard />
      </DataContextProvider>
    </div>
  );
}

export default App;
