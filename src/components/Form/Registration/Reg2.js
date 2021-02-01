import React,{Component} from 'react';
import Input from '../../../Input/Input';
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
                  required:true,
                 minLength:4 
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
                  required:true,
                  
                }
              },
              sdate:{
                type:'date',
                config:{
                  placeholder:'Course/Stream',
                  name:'sdate',
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  required:true,
                  
                }
              },
              edate:{
                type:'date',
                config:{
                  placeholder:'Course/Stream',
                  name:'edate',
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  required:true,                 
                }
              },
              addmore:{
                type:'textarea',
                config:{
                  placeholder:'Write about educational details',
                  name:'addmore'
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  maxLength:250  
                }
               
              }
        },
        formisValid:false
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
      if (rules.isPercent) {
        let pattern=/[0-9].[0-9]$/;
        isValid =  pattern.test(value) && isValid
    }
      return isValid; 
      }   
      onchangeHandler=(event,id)=>{
        let newforms={...this.state.form2};
       let updated={...newforms[id]};   
       updated.value=event.target.value;
       updated.valid=this.checkValidity(updated.value,updated.validation)     
       updated.touched=true;
      // console.log(updated.valid)
    let formValid=true;
    for(let id in newforms){
      formValid=newforms[id].valid && formValid
    }
       newforms[id]=updated;
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
  this.props.history.push('/login')
  let sclname=this.state.form2.sclname.value;
  let percent=this.state.form2.percent.value;
  let course=this.state.form2.course.value;
  let sdate=this.state.form2.sdate.value;
  let edate=this.state.form2.edate.value;
  let addmore=this.state.form2.addmore.value;
 

let eduinfo={'School name':sclname,'Percentage':percent,'Course':course,'Start date':sdate,'End date':edate,'Add more':addmore}
localStorage.setItem('Educational info',JSON.stringify(eduinfo))
}
    render(){
        let loadform=[];
        for(let key in  this.state.form2){
            loadform.push({
                id:key,
                info:this.state.form2[key]
            })
        
        }
        return(
            <div className='Reg2'>
                <form >
                <label>Step 2</label>
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
              
                <button onClick={ this.back}>Previous</button> 
                <button disabled={!this.state.formisValid} onClick={this.submitted}>Register</button> 
             
            </div>
        )
    }
}
export default Reg2;