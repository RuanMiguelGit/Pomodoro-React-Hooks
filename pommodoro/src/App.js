import React from 'react';
import './App.css';
import Provider from './context/appProvider';
import Main from './Pages/Main';
function App() {
  return (
   <div>
     <Provider>
     <Main /> 
     </Provider>
   </div>
  );
}

export default App;
