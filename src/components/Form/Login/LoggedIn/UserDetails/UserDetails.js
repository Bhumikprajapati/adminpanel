import React,{Component} from 'react';
import './UserDetails.css';

class UserDetails extends Component{
    
    render(){
       
        const info=JSON.parse(localStorage.getItem('info'));
        const fname=info['First name'];
        const lname=info['Last name'];
        const gender=info['Gender'];
        const email=info['Email'];
        const phone=info['Phone'];
        return(
<div>
<table  >
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
 </div>
        )
    }
}
export default UserDetails;