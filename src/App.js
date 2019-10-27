import React, { Component } from 'react';
import './App.css';
import Login from './Container/Login/Login';
import NavLogin from './Component/NavLogin/NavLogin';
import NavPortal from './Component/NavPortal/NavPortal';
import Portal from './Container/Portal/Portal'
import Footer from './Component/Footer/Footer';
import Profile from './Container/Portal/Profile/Profile'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  state = {
    userinfo: null,
  }

  userInfoCallback = (userInfo) => {
    if(userInfo){
      this.setState({
        userinfo: userInfo,
      });
    }
    
  }

  

  render(){

    return(
      <BrowserRouter>
      <div className="App">
      <nav>
        <Switch>
          <Route path='/' exact component = {NavLogin} />
          <Route path='/Portal' component = {NavPortal} />
        </Switch>
      </nav>

      <main>
        <Switch>
          <Route path='/' exact component = {() => <Login  />} />
          <Route path='/Portal' exact component = {() => <Portal />} />
          <Route path='/Portal/Profile' component = {() => <Profile />} />
        </Switch>
      </main>

    <Footer />
    </div>
    </BrowserRouter>

    );
  }
}

export default App;
