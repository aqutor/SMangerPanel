import React, { Component } from 'react';
import './App.css';
import Login from './Container/Login/Login';
import NavLogin from './Component/NavLogin/NavLogin';
import NavPortal from './Component/NavPortal/NavPortal';
import Portal from './Container/Portal/Portal'
import Footer from './Component/Footer/Footer';
import Profile from './Container/Portal/Profile/Profile';
import DutyDay from './Container/Portal/DutyDay/DutyDay';
import Admin from './Container/Portal/Admin/Admin';
import Sign from './Container/Portal/Sign/Sign';
import Members from './Container/Portal/Admin/Members/Members';
import Students from './Container/Portal/Admin/Students/Students';
import Password from './Container/Portal/Admin/Password/Password';
import SignAdd from './Container/Portal/Sign/Add/Add';
import SignRecords from './Container/Portal/Sign/Records/Records';
import Group from './Container/Portal/Group/Group';
import Forget from './Container/Forget/Forget';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  state = {
    userinfo: null,
  }

  // userInfoCallback = (userInfo) => {
  //   if(userInfo){
  //     this.setState({
  //       userinfo: userInfo,
  //     });
  //   }
    
  // }

  

  render(){

    return(
      <BrowserRouter>
      <div className="App">
      <nav>
        <Switch>
          <Route path='/' exact component = {NavLogin} />
          <Route path='/Forget' exact component = {NavLogin} />
          <Route path='/Portal' component = {NavPortal} />
        </Switch>
      </nav>

      <main>
        <Switch>
          <Route path='/' exact component = {() => <Login  />} />
          <Route path='/Portal' exact component = {() => <Portal />} />
          <Route path='/Portal/Profile' exact component = {() => <Profile />} />
          <Route path='/Portal/DutyDay' exact component = {() => <DutyDay />} />
          <Route path='/Portal/Sign' exact component = {() => <Sign />} />
          <Route path='/Portal/Sign/Add' exact component = {() => <SignAdd />} />
          <Route path='/Portal/Admin' exact component = {() => <Admin />} />
          <Route path='/Portal/Admin/Members' exact component = {() => <Members />} />
          <Route path='/Portal/Group' exact component = {() => <Group />} />
          <Route path='/Forget' exact component = {() => <Forget />} />
          <Route path='/Portal/Admin/Password' exact component = {() => <Password />} />
          <Route path='/Portal/Admin/Students' component = {() => <Students />} />
          <Route path='/Portal/Sign/Records' component = {() => <SignRecords />} />
          
        </Switch>
      </main>

    <Footer />
    </div>
    </BrowserRouter>

    );
  }
}

export default App;
