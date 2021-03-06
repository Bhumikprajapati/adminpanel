import React, { Component } from "react";
import Input from '../../../../Input/Input';
import './Reg1.css';
class Reg1 extends Component{  
  state={
    forms:{
      firstname:{
        type:'input',
        config:{
          placeholder:'First Name',
          name:'firstname',
        },
        value:'',
        valid:false,
        touched:false,
        validation:{
          required:true,   
        }
      },
      lastname:{
        type:'input',
        config:{
          placeholder:'Last Name',
          name:'lastname',
        },
        touched:false,
        value:'',
        valid:false,      
        validation:{
          required:true,
        }
      },
      gender:{
        type:'select',
        config:{
         options:[
           {value:'Male', display:'Male'},
           {value:'Female', display:'Female'},
           {value:'Other', display:'Other'}
         ]
    }, 
    value:'Male',
        valid:true,
     validation:{}
      },
      email:{
        type:'input',
        config:{
          placeholder:'E-mail',
          name:'email',
        },
        value:'',
        touched:false,
        valid:false,    
        validation:{
          required:true,
          isEmail:true
        }
      },
      phone:{
        type:'input',
        config:{
          placeholder:'Mobile Number',
          name:'phone',
         },
         value:'',
         touched:false,
         valid:false,
         validation:{
           required:true,
           isNumeric:true,
           minLength:10,
           maxLength:10
         }
      },
      password:{
        type:'input',
        config:{
          placeholder:'Password',
          type:'password',
          name:'password',
        },
        touched:false,
        value:'',
        valid:false,       
        validation:{
          required:true,
          // isPass:true
        }
      },
      confirmpassword:{
        type:'input',
        config:{
          placeholder:'Re-enter Password',
          type:'password',
          name:'confirmpassword',
        },
        touched:false,
        value:'',
        valid:false,
        validation:{
          required:true
        },     
      }     
    },
    formisValid:false,
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
  if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
  }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
}
  return isValid;
  }
  onchangeHandler=(event,id)=>{
    let newforms={...this.state.forms};
   let updated={...newforms[id]};   
   updated.value=event.target.value;
   updated.valid=this.checkValidity(updated.value,updated.validation) 
   updated.touched=true;
   let formisValid=true;
   newforms[id]=updated;
   for(let id in newforms){
   formisValid=newforms[id].valid && formisValid
   }
   /*confirm password verification */
   let password=this.state.forms["password"].value;
   if(id==='confirmpassword'){
    if(password===event.target.value){
     formisValid=newforms[id].valid 
    }
    else{
     formisValid=!newforms[id].valid  
    }
  }
this.setState({
forms:newforms,
formisValid:formisValid
})
  }
  done=(event)=>{
    event.preventDefault();
let arr={}
// eslint-disable-next-line
// let pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
// if(!pattern.test(this.state.forms.password.value)){
//   alert('Password must satisfy following criteria:\n 1)Atleat 1 lowercase character\n 2)Atleat 1 Uppercase character\n 3)Atleat 1 Special character \n4)Atleat 1 numeric character')
// }
// else{}
  for(let id in this.state.forms)
{
    arr[id]=this.state.forms[id].value
}
  localStorage.setItem('info',JSON.stringify(arr))
  this.props.history.push('/reg2') 
   }
componentDidMount(){
    let info=JSON.parse(localStorage.getItem('info'))
    let newforms={...this.state.forms}
      if(info){
        for(let id in newforms){
          newforms[id].value=info[id]
        }
      let formisValid=true;
      this.setState({
        forms:newforms,
        formisValid:formisValid
      })
      }
      else{
        this.setState({
          forms:newforms
        })
      }    
   }
  render(){ 
    let formsDemo=[];
    for(let key in this.state.forms){
      formsDemo.push(
       {
         id:key,
         inform:this.state.forms[key]
       }   
      )
    }
  return (  
    <div className="Reg" >
     <form onSubmit={this.done}>
       <h2>REGISTER YOURSELF</h2>
       <h3>Step 1</h3>      
      { 
      formsDemo.map(elem=>(
        <div>     
         <Input inputtype={elem.inform.type}
          configuration={elem.inform.config}
          value={ elem.inform.value }
          key={elem.id}        
          valid={!elem.inform.valid}
          shouldvalidate={elem.inform.validation}
          touched={elem.inform.touched}
          changed={(event)=>this.onchangeHandler(event,elem.id)}       
           />         
            </div>
      ))}   
<button disabled={!this.state.formisValid} >Next</button>     
     </form>
    </div>
  );
}
}
export default Reg1;