import React, { Component } from 'react';
import Reg1 from './Registration/Reg1';
import Reg2 from './Registration/Reg2';
import Login from './Login/Login';
// import LoggedIn from './Login/LoggedIn/LoggedIn';
import UserDetails from './Login/LoggedIn/UserDetails/UserDetails';
import {Route,Switch} from 'react-router-dom';
import LoggedIn from './Login/LoggedIn/LoggedIn';

class Form extends Component{
    render(){
        return(
            <div>
         <Switch>
             <Route path='/userdetails' component={UserDetails}  />
             <Route path='/loggedin' component={LoggedIn}  />
            <Route path='/login' component={Login}  />
            <Route  path='/reg2'  component={Reg2} />
            <Route  path='/'  component={Reg1} />
            </Switch>
            </div>
        )
    }
}
export default Form;