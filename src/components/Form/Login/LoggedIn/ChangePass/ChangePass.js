import React,{Component} from 'react';
import Input from '../../../../../Input/Input'

class ChangePass extends Component{
    state={
        forms:{
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
            oldPassword:{
                type:'input',
                config:{
                    placeholder:"Old Password",
                    type:'password',
                    name:"oldPassword"
                },
                value:'',
                data:true,
                valid:false,
                touched:false,
                
                validation:{
                    required:true
                }
            },
            newPassword:{
                type:'input',
                config:{
                    placeholder:"New Password",
                    type:'password',
                    name:"newPassword"
                },
                value:'',
                check:true,
                valid:false,
                touched:false,
                validation:{
                    required:true
                }
            },
        },
        formisValid:false
    }
    checkValidity=(value,rules)=>{  
        let isValid=true;
        if(!rules){
          isValid=true;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid
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
    this.setState({
    forms:newforms,
    formisValid:formisValid
    })
      }
      check=(e)=>{
        e.preventDefault();
        let allinfo=JSON.parse(localStorage.getItem('allinfo'))
        if(allinfo){
        
            for(let index in allinfo){
                let i=allinfo[index] 
                let j=i['Info']         
                if(j['email']===this.state.forms.email.value){
                 
                    let oldPassfromstate=this.state.forms.oldPassword.value;
                    let newPassfromstate=this.state.forms.newPassword.value;
                    if(oldPassfromstate.trim()===''||newPassfromstate.trim()==='')
                    {
                        alert('Enter some password in fields')
                        
                    }
                   else if(oldPassfromstate===newPassfromstate)
                   {
                        alert('Password can not be same!!')
                       
                   }
                else{
                        let oldpass=j['password']
                        if(oldPassfromstate===oldpass){
                            j['password']=newPassfromstate;
                            console.log(j['password'])
                            alert('Password changed successfully!!')
                            localStorage.setItem('allinfo',JSON.stringify(allinfo)) 
                            this.props.history.push('/')
                    }       
                  }
                }
            }
        }
     
    }
    render(){
    let formsKeys=[];
    for(let key in this.state.forms){
      formsKeys.push(
       {
         id:key,
         para:this.state.forms[key]
       }   
      )
    }
    return(
        <div className>
            <h2>Change My Password</h2>
            <form >
            { 
                formsKeys.map(elem=>(
                <div>     
                <Input inputtype={elem.para.type}
                configuration={elem.para.config}
                value={elem.para.value}
                key={elem.id}        
                valid={!elem.para.valid}
                shouldvalidate={elem.para.validation}
                touched={elem.para.touched}
                changed={(event)=>this.onchangeHandler(event,elem.id)}       
                />         
        </div>
  ))}  
    <button onClick={this.check}>Submit</button>
            </form>
        </div>
    );
    }
}
export default ChangePass;