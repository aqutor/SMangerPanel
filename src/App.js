import React from 'react';
import './App.css';
import Login from './Container/Login/Login';
import Navbar from './Component/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';

function App() {
  return (
    
    <div className="App">
      <header>
        <Navbar />
      </header>

      <body>
        <Login />

        <Alert variant = 'warning' id = 'alertWarn'> The site is still under constuction. </Alert>
      </body>

      <footer>
        <p> ©️ 上海海事大学信息工程学院小可爱 </p>
      </footer>
      
    </div>
  );
}

export default App;
