import React from 'react';
import './App.css';
import Login from './Container/Login/Login';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    
    <div className="App">
      <header>
        <Navbar />
      </header>

      <body>
        <Login />
      </body>

    <Footer />
    </div>
  );
}

export default App;
