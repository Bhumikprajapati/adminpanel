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
                  required:true,
                  isString:true
                }
              },
              sdate:{
                type:'date',
                config:{   
                  name:'start date',
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
                  name:'end date'
                },
                value:'',
                valid:false,
                touched:false,
                validation:{
                  required:true,
                    echeck:true        
                }
              },             
        },
        formisValid:false,
        eduarray:[]
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
        if(rules.isString){
          const pattern = /^[a-zA-Z]+$/;
          isValid = pattern.test(value) && isValid
        }
        if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid
      }
      if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid
      }
      if (rules.isPercent) {
        let pattern= /^([0-9]){1,2}(\.[0-9]{1,2})?$/
        isValid =  pattern.test(value) && isValid
    }
    
    if (rules.echeck) {
      let edate=value;
      let sdate=this.state.form2.sdate.value
      if(edate<sdate){
        isValid=false
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
  this.submit();
  let arr=[];
  let info=JSON.parse(localStorage.getItem('info'))
  let eduinfo=JSON.parse(localStorage.getItem('eduinfo'))
  arr.push({Info:info,EduInfo:eduinfo});
 localStorage.setItem('allinfo',JSON.stringify(arr))
  localStorage.removeItem('info')
  localStorage.removeItem('eduinfo')
  this.props.history.push('/')
}
addmore=()=>{
  this.submit()
}

submit=()=>{
  let arr={}
for(let elem in this.state.form2)
{
arr[elem]=this.state.form2[elem].value
}
let updatedform2={...this.state.form2}
 let eduinfo=[...this.state.eduarray]
 eduinfo.push(arr)
 
localStorage.setItem('eduinfo',JSON.stringify(eduinfo))
this.setState({
  form2:updatedform2,
  eduarray:eduinfo
})
}
componentDidMount(){
  let info=JSON.parse(localStorage.getItem('eduinfo'))
  //  let forms=this.state.forms;
  let newforms={...this.state.form2}
    if(info){
      for(let id in newforms){
        newforms[id].value=info[id]
      }
    let formisValid=true;
    this.setState({
      form2:newforms,
      formisValid:formisValid
    })
    }
    else{
      this.setState({
        form2:newforms
      })
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
        return(
            <div className='Reg2'>
                <form >
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
              <button onClick={this.addmore} disabled={!this.state.formisValid} >Add more education</button>
                <button onClick={ this.back}>Previous</button> 
                <button disabled={!this.state.formisValid} onClick={this.submitted}>Register</button> 
             
            </div>
        )
    }
}
export default Reg2;