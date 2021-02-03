import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './UserEducation.css'
class UserEducation extends Component{
    edit=()=>{
        alert('edited')
    }
    delete=()=>{
        alert('deleted')
    }
    setAll=(eduindex)=>{
        return(
            <tr>
                <td> {eduindex['sclname']}</td>
                <td>{eduindex['course']}</td>
                <td>{eduindex['percent']}</td>
                <td>{eduindex['sdate']}</td>
                <td>{eduindex['edate']}</td>
                <td onClick={this.edit}><button>Edit</button></td>
                <td onClick={this.delete}><button className='danger'>Delete</button></td>
            </tr>
        )
    }
    render(){
       let store='';
        let arrOfinfo=[]
        const allinfo=JSON.parse(localStorage.getItem('allinfo'));
        for(let index in allinfo){
            let i=allinfo[index];
            let j=i['EduInfo']
            for(let k=0;k<j.length;k++){
                let eduindex=j[k]
                 store=this.setAll(eduindex)
                arrOfinfo.push(store)
            }
        }
        return(
<div className='details'>
<table  >
  <tr >
<th>School</th>
<th>Course</th>
<th>Percentage</th>
<th>Start Date</th>
<th>End Date</th>
<th colSpan='2'>Change</th>
 </tr>
 {arrOfinfo} 

 </table>
 <h3 ><NavLink to='/loggedin' > Go to Home Page</NavLink></h3>
 </div>
        )
    }
}
export default UserEducation;