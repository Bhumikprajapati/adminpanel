import React, { Component } from 'react';
import Reg1 from './Registration/Reg1/Reg1';
import Reg2 from './Registration/Reg2/Reg2';
// import NewReg2 from './Registration/Reg2/NewReg2';
import Login from './Login/Login';
import LoggedIn from './Login/LoggedIn/LoggedIn';
import UserDetails from './Login/LoggedIn/UserDetails/UserDetails';
import UserEducation from './Login/LoggedIn/UserEducation/UserEducation';
import ForgotPassword from './Login/ForgotPassword/ForgotPassword';
import Edit from './Login/LoggedIn/UserEducation/EditTask/Edit';
import ChangePass from './Login/LoggedIn/ChangePass/ChangePass';
import {Route,Switch} from 'react-router-dom';

class Form extends Component{
    render(){
        return(
            <div>
         <Switch>
             <Route path='/loggedin/userdetails'  component={UserDetails}  />
             <Route path='/loggedin/usereducation'  component={UserEducation}  />
             <Route  path='/loggedin/changepass'  component={ChangePass} />
             <Route path='/edit'  component={Edit}/> 
             <Route path='/loggedin'  component={LoggedIn}  /> 
             <Route  path='/forgotPassword'   component={ForgotPassword} />
            <Route  path='/reg2'  component={Reg2} />
            {/* <Route  path='/newreg2' component={NewReg2}   /> */}
            <Route  path='/reg1'   component={Reg1} />
             <Route path='/' exact component={Login}  />
            </Switch>
            </div>
        )
    }
}
export default Form;