import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './UserDetails.css';

class UserDetails extends Component{
    
    render(){   
        const allinfo=JSON.parse(localStorage.getItem('allinfo'));
        let fname,lname,gender,email,phone;
        for(let index in allinfo){
            let i=allinfo[index];
             fname=i['Info']['firstname'];
            lname=i['Info']['lastname'];
            gender=i['Info']['gender']
            email=i['Info']['email']
            phone=i['Info']['phone']
        }
        return(
<div className='details'>
<table>
  <tr >
<th>First name</th>
<th>Last name</th>
<th>Gender</th>
<th>Email</th>
<th>Phone no</th>
 </tr>
 <tr>
     {/* {info.map(elem=>{
         return <td>{elem}</td>
     })} */}
<td>{fname}</td>
<td>{lname}</td>
<td>{gender}</td>
<td>{email}</td>
<td>{phone }</td>  
  </tr>
 </table>
 <h3 ><NavLink to='/loggedin' > Go to Home Page</NavLink></h3>
 </div>
        )
    }
}
export default UserDetails;