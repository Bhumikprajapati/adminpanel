import React,{Component} from 'react';
import {NavLink,Route,Redirect} from 'react-router-dom';
import UserDetails from './UserDetails/UserDetails';
import './LoggedIn.css';

class LoggedIn extends Component{
    render(){
        const info=JSON.parse(localStorage.getItem('info'));
        const fname=info['First name'];
        const lname=info['Last name'];
    return(
        
        <div>
            <ul>
                <li> <NavLink to='/loggedin' >Home </NavLink></li>
       <li> <NavLink to='/loggedin/userdetails'>User details</NavLink></li>
       <li> 
        <NavLink  to='/loggedin/usereducation'>User education </NavLink></li>
       <li>  <Redirect  to='/login'>Log out </Redirect></li>
      
      
        </ul>
            You are {fname} {lname}
            <Route path='/loggedin/userdetails' component={UserDetails} />
        </div>

    )
}
}
export default LoggedIn;