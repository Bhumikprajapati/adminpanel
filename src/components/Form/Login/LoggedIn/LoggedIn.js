import React,{Component} from 'react';
import {NavLink,Route} from 'react-router-dom';
import UserDetails from './UserDetails/UserDetails';
import './LoggedIn.css';

class LoggedIn extends Component{
    render(){
        const allinfo=JSON.parse(localStorage.getItem('allinfo'));
        let fname,lname;
        for(let index in allinfo){
            let i=allinfo[index];
             fname=i['Info']['firstname'];
            lname=i['Info']['lastname'];
        }
        
        
    return(
        
        <div>
            <h3>You are now logged in</h3>
            <ul>
                <li> <NavLink to='/loggedin' >Home </NavLink></li>
       <li> <NavLink to='/loggedin/userdetails'>User details</NavLink></li>
       <li> 
        <NavLink  to='/loggedin/usereducation'>User education </NavLink></li>
       <li>  <NavLink  to='/login'>Log out </NavLink></li>
      
      
        </ul>
            <h1>You are {fname} {lname}</h1>
            <Route path='/loggedin/userdetails' component={UserDetails} />
        </div>

    )
}
}
export default LoggedIn;