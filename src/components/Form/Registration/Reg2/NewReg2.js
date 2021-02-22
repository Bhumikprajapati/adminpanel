import React,{Component} from 'react';
import './Reg2.css';
class NewReg2 extends Component{
    state={
      values: [],
      validations:{
        sclname:{
            required:true,
        },
        percent:{
          required:true,
          regex: /^([0-9]){1,2}(\.[0-9]{1,2})?$/
      },
        course:{
            required:true,
        },
       
        sdate:{
            required:true,
        },
        edate:{
            required:true,
        }
      },
      formisValid: false,
      message:''
    }
    creatUI=()=> 
    { 
      return this.state.values.map((el, id) => 
    <div key={id}>
     <table>
       <tbody>
         <tr>
             <th>Institute:</th> 
             <td><input type="text" name='sclname' value={el.sclname?el.sclname.value:''} onChange={this.onchangeHandler.bind(this, id)}  /></td>
         </tr>
         <tr>
             <th>Course:</th> 
             <td><input type="text" name='course' value={el.course?el.course.value:''} onChange={this.onchangeHandler.bind(this, id)} /></td>
         </tr>
         <tr>
             <th>Percentage/CGPA:</th> 
             <td><input type="text" name='percent' value={el.percent?el.percent.value:''} onChange={this.onchangeHandler.bind(this, id)} /></td>
         </tr>
         <tr>
             <th>Start Date:</th> 
             <td><input type="date" name='sdate' value={el.sdate?el.sdate.value:''} onChange={this.onchangeHandler.bind(this, id)} /></td>
         </tr>
         <tr>
             <th>End Date:</th> 
             <td><input type="date" name='edate' value={el.edate?el.edate.value:''} onChange={this.onchangeHandler.bind(this, id)} /></td>
         </tr>
         <tr>
             <td><input type='button' value='remove' onClick={this.removeClick.bind(this, id)}/></td>
         </tr>
         </tbody>
     </table>
     </div>          
)}

    checkValidity=(value,rules)=>{
      let valid=true;
        if(rules.required){
            if (value==='')
            valid=valid && false;
        }
        if(rules.regex)
        {
            valid=rules.regex.test(value) && valid;
        }
        return valid;
     
      }   
      onchangeHandler=(event,id)=>{
        let values=[...this.state.values];
       let updated=values[id]; 
       console.log(updated)  
       updated[event.target.name]=
       {value:event.target.value,
        touched:false,
        valid:false}
        let validations=this.state.validations;
        let v=validations[event.target.name]
        updated[event.target.name].touched=true
       updated[event.target.name].valid=this.checkValidity(v,event.target.value)     
       if(event.target.name==='edate'){
        if(event.target.value && updated['sdate'].value)
        {
            if(event.target.value < updated['sdate'].value){
                this.setState({message: 'End date should be greater than start date..'})
                updated[event.target.name].valid=updated[event.target.name].valid && false;
            }
            else{
                this.setState({message:''})
            }
        }
    }
    values[id]=updated

      this.setState({values:values})
    let formValid=true;

    for (let j in values) {
      for(let ele in values[j]){
          formValid=formValid && values[j][ele].valid;
      }  

    this.setState({
    formisValid:formValid
    })
      }}
back=()=>{
  this.props.history.goBack()
}
submitted=(e)=>{
  e.preventDefault();
  const Reg2=[];
  const values=this.state.values;
  for(let i in values)
  {
      Reg2[i]={};
      for(let ele in values[i])
          Reg2[i][ele]=values[i][ele].value;
  }
  let info=JSON.parse(localStorage.getItem('info'))
  let allinfos=JSON.parse(localStorage.getItem('allinfo'))
  let pushData=[];
  if(allinfos){ 
    pushData=allinfos
    pushData.push({Info:info,EduInfo:Reg2})
    localStorage.setItem('allinfo',JSON.stringify(pushData))
  }
  else{
    localStorage.setItem('allinfo', JSON.stringify([{ Info:info,EduInfo:Reg2 }]));
  }
  localStorage.removeItem('info')
  alert('Registration Successfully!!')
  this.props.history.push('/')
}
addmore=()=>{
  this.setState(prevState => ({ values: [...prevState.values,
    {sclname:{
        value:'',
        touched:false,
        valid:false
    },
    course:{
        value: '',
        touched:false,
        valid:false
    },
    percent:{
        value: '',
        touched:false,
        valid:false
    },
    sdate:{
        value:'',
        touched:false,
        valid:false
    },
    edate:{
        value: '',
        touched:false,
        valid:false
    }
}]
})
)
}
removeClick=(id)=>{
  let values = [...this.state.values];
  values.splice(id,1);
  this.setState({ values:values });
}

    render(){  
        return(
            <div >
                <form onSubmit={this.submitted}>
               {this.creatUI()} 
              <input  type='button' value='Add more education' onClick={this.addmore}  />
                <input type='button' value='Previous' onClick={ this.back} /> 
                <input type='submit' value='Submit' disabled={!this.state.formisValid} />
                </form>
            </div>
        )
    }
}
export default NewReg2;