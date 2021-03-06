import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './LoggedIn.css';
class LoggedIn extends Component{
    render(){
        let activeFname=localStorage.getItem('activeFname');
        let activeLname=localStorage.getItem('activeLname'); 
    return(    
        <div className='all'>
         <h3>You have successfully logged in</h3>
            <ul>
             <li><NavLink to='/loggedin' >Home </NavLink></li>
            <li> <NavLink to='/loggedin/userdetails'>User details</NavLink></li>
            <li> <NavLink  to='/loggedin/usereducation'>User education </NavLink></li>
            <li><NavLink  to='/loggedin/changepass'  >Change Password<small>(new)</small></NavLink></li>
            <li> <NavLink  to='/login'>Log out </NavLink></li>    
            </ul>
            <h1>Welcome {activeFname} {activeLname}!!</h1>
       
        </div>
    )
}
}
export default LoggedIn;