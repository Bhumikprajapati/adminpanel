import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './UserEducation.css'
class UserEducation extends Component{
    edit=()=>{
        // const allinfo=JSON.parse(localStorage.getItem('allinfo'));
        // for(let index in allinfo){
        //     let i=allinfo[index];
        //     let j=i['EduInfo']
        //     for(let k=0;k<j.length;k++){
        //         let eduindex=j[k]
        //      console.log(eduindex)
        //     }
        // }

    }
    delete=(eduindex)=>{
        // let sclname=eduindex.sclname.value
        // console.log(sclname)
        localStorage.removeItem(eduindex)    
        
            }
    setAll=(eduindex)=>{
        return(
            <tr>
                <td> {eduindex.sclname.value}</td>
                <td>{eduindex.course.value}</td>
                <td>{eduindex.percent.value}</td>
                <td>{eduindex.sdate.value}</td>
                <td>{eduindex.edate.value}</td>
                <td onClick={this.edit}><button>Edit</button></td>
                <td onClick={this.delete.bind(this,eduindex)}><button className='danger'>Delete</button></td>
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
                // console.log(arrOfinfo)
            }
        }
        return(
<div className='details'>
<table  >
    <thead>
  <tr >
<th>School</th>
<th>Course</th>
<th>Percentage</th>
<th>Start Date</th>
<th>End Date</th>
<th colSpan='2'>Let's Change</th>
 </tr>
 </thead>
 <tbody>
 {arrOfinfo} 
 </tbody>
 </table>
 <h3 ><NavLink to='/loggedin' > Go to Home Page</NavLink></h3>
 </div>
        )
    }
}
export default UserEducation;