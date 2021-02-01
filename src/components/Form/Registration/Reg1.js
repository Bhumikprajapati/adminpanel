import React, { Component } from "react";
import Input from '../../../Input/Input';
import './Reg.css';
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
    value:'',
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
          required:true,
        },     
      }     
    },
    passwordcheck: true  ,
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
for(let id in newforms){
  formisValid=newforms[id].valid && formisValid
}
   newforms[id]=updated;
this.setState({
forms:newforms,
formisValid:formisValid
})
// console.log(newforms)
  }

  done=(event)=>{
    // console.log(this.props.history)
    event.preventDefault();
    // const data=[];
    // data.push(this.state.forms)
    let firstname=this.state.forms.firstname.value;
    let lastname=this.state.forms.lastname.value;
    let password=this.state.forms.password.value;
    let gender=this.state.forms.gender.value;
    let email=this.state.forms.email.value;
    let phone=this.state.forms.phone.value;
let userdata={'First name':firstname,'Last name':lastname,'Password':password,'Gender':gender,'Email':email,'Phone':phone}

localStorage.setItem('info',JSON.stringify(userdata))

//  localStorage.setItem('First name',firstname);
//  localStorage.setItem('Last name',lastname); 
//  localStorage.setItem('Password',password);  
//  localStorage.setItem('Gender',gender); 
//  localStorage.setItem('Email',email); 
//  localStorage.setItem('Phone',phone);  
// const forwardData=data.join('&')
// console.log(data)
    this.props.history.push('/reg2')
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
       <label>Step 1</label>      
      { 
      formsDemo.map(elem=>(
        <div>     
         <Input inputtype={elem.inform.type}
          configuration={elem.inform.config}
          value={elem.inform.value}
          key={elem.id}        
          valid={!elem.inform.valid}
          shouldvalidate={elem.inform.validation}
          touched={elem.inform.touched}
          changed={(event)=>this.onchangeHandler(event,elem.id)}       
           />         
            </div>
      ))}   

<button disabled={this.state.formisValid} >Next</button>     
     </form>
     {/* type='submit' disabled={!this.state.formisValid} */}
    </div>
  );
}
}
export default Reg1;