import React,{Component} from 'react';
import Input from '../../../../Input/Input';
import './Reg2.css';
class Reg2 extends Component{
    state={
        form2:{
            sclname:{
                type:'input',
                config:{
                  placeholder:'Institute/School Name',
                  name:'sclname',
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  required:true
                }
              },
              percent:{
                type:'input',
                config:{
                  placeholder:'Percentage/CGPA',
                  name:'percent',
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  required:true,
                  isNumeric:true,
                  minLength:1,
                  isPercent:true
                }
              },
              course:{
                type:'input',
                config:{
                  placeholder:'Course/Stream',
                  name:'course',
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  required:true
                }
              },
              // sdate:{
              //   type:'date',
              //   config:{   
              //     name:'start date',
              //   },
              //   value:'',
              //   valid:false,
              //   touched:false,
              //   validation:{
              //     required:true,                                 
              //   }
              // },
              // edate:{
              //   type:'date',
              //   config:{  
              //     name:'end date'
              //   },
              //   value:'',
              //   valid:false,
              //   touched:false,
              //   validation:{
              //     required:true,
              //       echeck:true        
              //   }
              // },             
        },
        formisValid:false,
        addData:[],
    }
    checkValidity=(value,rules)=>{
        let isValid=true;
        if(!rules){
          return true;
        }
        if(rules.required){
          isValid=value.trim()!=='' && isValid
        }
        if(rules.isNumeric){
          const pattern = /^\d+$/;
          isValid = pattern.test(value) && isValid
        }
        if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid
      }
      if (rules.isPercent) {
        let pattern= /^([0-9]){1,2}(\.[0-9]{1,2})?$/
        isValid =  pattern.test(value) && isValid
    }
    
    if (rules.echeck) {
      let edate=value;
      let sdate=this.state.form2.sdate.value
      if(edate<sdate){
        isValid=!isValid
      }    
  }
      return isValid; 
      }   
      onchangeHandler=(event,id)=>{
        let newforms={...this.state.form2};
       let updated={...newforms[id]};   
       updated.value=event.target.value;
       updated.valid=this.checkValidity(updated.value,updated.validation)     
       updated.touched=true;
       newforms[id]=updated;
      // console.log(updated.valid)
    let formValid=true;

    for(let id in newforms){
      formValid=newforms[id].valid && formValid
    }    
    // console.log(updated)
    this.setState({
    form2:newforms,
    formisValid:formValid
    })
    // console.log(newforms)
      }
back=()=>{
  this.props.history.goBack()
}
submitted=(e)=>{
  e.preventDefault();
  this.addmore()
  let info=JSON.parse(localStorage.getItem('info'))
  // let eduinfo=JSON.parse(sessionStorage.getItem('eduinfo'))
  let allinfos=JSON.parse(localStorage.getItem('allinfo'))
  let pushData=[];
  if(allinfos){ 
    pushData=allinfos
    pushData.push({Info:info,EduInfo:this.state.addData})
    localStorage.setItem('allinfo',JSON.stringify(pushData))
  }
  else{
    localStorage.setItem('allinfo', JSON.stringify([{ Info:info,EduInfo:this.state.addData }]));
  }
  localStorage.removeItem('info')
  localStorage.removeItem('eduinfo')
  this.props.history.push('/')
}
addmore=()=>{
  let formData = {}
  for (let formElement in this.state.form2) {
      formData[formElement] = this.state.form2[formElement].value;
  }
  const updatedform2 = {...this.state.form2}
   const addCopyData = [...this.state.addData]
  addCopyData.push(formData);
// localStorage.setItem('eduinfo',JSON.stringify(addCopyData))
for(let id in updatedform2) {
  updatedform2[id].touched = false;
  updatedform2[id].value = '';
  updatedform2[id].valid = false;  
}
this.setState({
  form2:updatedform2,
  addData:addCopyData,
  formisValid:false
})
}
editEdu=(index)=>{
  let updatedform2={...this.state.form2}
  let loaddata=this.state.addData[index];
  for(let id in updatedform2) {
    updatedform2[id].touched = false;
    updatedform2[id].value = loaddata[id];
    updatedform2[id].valid = false;  
  }
  this.setState({
    form2:updatedform2,
    formisValid:false
  })
  let t=this.state.addData
  t.splice(index,1)
  this.setState({
    addData:t
  })

}
deleteEdu=(index)=>{

  console.log(index)
let del=window.confirm('Sure to delete?')
if(del){
  let updatedData=[...this.state.addData]
  updatedData.splice(index,1)
  this.setState({
    addData:updatedData
  })
  console.log(this.state.addData)
}
}
    render(){
        let loadform=[];
        for(let key in  this.state.form2){
            loadform.push({
                id:key,
                info:this.state.form2[key]
            })       
        }
        let showEducations;
        if(this.state.addData.length>0){
          showEducations = (
            this.state.addData.map((d, index) => {
              return(
                <table>
                  <tr>
                   <td>{d.sclname}</td>
                   <td>{d.course}</td>
                   <td>{d.percent}</td>
                   <td>{d.sdate}</td>
                   <td>{d.edate}</td>
                   <td><button onClick={()=>this.editEdu( index)}  >Edit</button></td>
                   <td><button onClick={()=>this.deleteEdu( index)}  >Delete</button></td>
                   </tr>
                </table>
               
              )
            })
          )
        }
        return(
            <div className='Reg2'>
                <form >
                  <h2>You are about to done</h2>
                <h3>Step 2</h3>
            {loadform.map(elem=>(
                <Input inputtype={elem.info.type}
                configuration={elem.info.config}
                value={elem.info.value}
                key={elem.id}        
                valid={!elem.info.valid}
                shouldvalidate={elem.info.validation}
                touched={elem.info.touched}
                changed={(event)=>this.onchangeHandler(event,elem.id)}
               />
            ))}
                </form>
                {showEducations}
              <button onClick={this.addmore} disabled={!this.state.formisValid} >Add more education</button>
                <button onClick={ this.back}>Previous</button> 
                <button disabled={!this.state.formisValid} onClick={this.submitted}>Register Me</button> 
             
            </div>
        )
    }
}
export default Reg2;