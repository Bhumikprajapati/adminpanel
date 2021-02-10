import React,{Component} from 'react';
import Input from '../../../../../../Input/Input'
class Edit extends Component{
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
        id:null
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
   let formValid=true
    for(let id in newforms){
      formValid=newforms[id].valid 
    }    
    this.setState({
    form2:newforms,
    formisValid:formValid
    })
      }
submitted=(e)=>{
  e.preventDefault();
  let allinfos=JSON.parse(localStorage.getItem('allinfo'))
  let userId=localStorage.getItem('activeindex')
  let info=allinfos[userId];
  let eduinfo=info['EduInfo'];
  let elem=eduinfo[this.state.id]
        elem['sclname']=this.state.form2['sclname'].value;
        elem['course']=this.state.form2['course'].value;
        elem['percent']=this.state.form2['percent'].value;
        elem['sdate']=this.state.form2['sdate'].value;
        elem['edate']=this.state.form2['edate'].value;

  localStorage.setItem('allinfo',JSON.stringify(allinfos))
  localStorage.removeItem('editData')
  this.props.history.push('/loggedin/usereducation')
}
componentDidMount(){
    let editData=JSON.parse(localStorage.getItem('editData'));
     if(editData){
        let form2={...this.state.form2}
        form2.sclname.value=editData['sclname'];
            form2.course.value=editData['course'];
            form2.percent.value=editData['percent'];
            form2.sdate.value=editData['sdate'];
            form2.edate.value=editData['edate'];
        let id=editData['id']
        // console.log(id)
   this.setState({form2:form2,formisValid:true,id:id});
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
                  <h2>Edit Page</h2>
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
                <button disabled={!this.state.formisValid} onClick={this.submitted}>Save</button> 
             
            </div>
        )
    }
}
export default Edit;
