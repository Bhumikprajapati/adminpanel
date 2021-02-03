import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

class UserEducation extends Component{
    setAll=(eduindex)=>{
        return(
            <tr>
                <td> {eduindex['sclname'].value}</td>
                <td>{eduindex['course'].value}</td>
                <td>{eduindex['percent'].value}</td>
                <td>{eduindex['sdate'].value}</td>
                <td>{eduindex['edate'].value}</td>
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
<div>
<table  >
  <tr >
<th>School</th>
<th>Course</th>
<th>Percentage</th>
<th>Start Date</th>
<th>End Date</th>
 </tr>
 {arrOfinfo} 

 </table>
 <h3 ><NavLink to='/loggedin' > Go to Home Page</NavLink></h3>
 </div>
        )
    }
}
export default UserEducation;