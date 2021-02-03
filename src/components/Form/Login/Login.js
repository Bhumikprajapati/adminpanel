import React,{Component} from 'react';
import Input from '../../../Input/Input';
import {NavLink} from 'react-router-dom';
import './Login.css';
class Login extends Component{
    state={
        userData:null,
        fname:'',
        lname:'',
        password:'',
        forms:{
            firstname:{
              type:'input',
              config:{
                placeholder:'Your Name',
                name:'firstname',
              },
              value:'',
             
            },
            password:{
                type:'input',
                config:{
                  placeholder:'Your Password',
                  type:'password',
                  name:'password',
                },    
                value:'',
              }
            },
    }
    // componentDidMount(){
    //     const fname=localStorage.getItem('First name');
    //     const lname=localStorage.getItem('Last name');
    //     const password=localStorage.getItem('Password');
    //     this.setState({
    //         fname:fname,
    //         lname:lname,
    //         password:password
    //     })
    // }
    onchangeHandler=(event,id)=>{
        let newforms={...this.state.forms};
       let updated={...newforms[id]};   
       updated.value=event.target.value;
       newforms[id]=updated;
    this.setState({
    forms:newforms,
    })
      }
      match=(e)=>{
        e.preventDefault();
        // const data=localStorage.getItem([]);
        const allinfo=JSON.parse(localStorage.getItem('allinfo'));
        // console.log(allinfo)
        
        const fnamefromstate=this.state.forms.firstname.value
        const passfromstate=this.state.forms.password.value
        // console.log(fname +' '+fnamefromstate)
        for(let index in allinfo ){
         let i=allinfo[index];
        //  let info=i['Info']
         let fname=i['Info']['firstname'];
         let password=i['Info']['password'];
          if(fnamefromstate===fname && passfromstate===password)
          { 
            this.props.history.push('/loggedin') 
          }
          else{
              alert('Please Write Correct Id & passsword')  
               break;
          }
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
        let formdisp=
          formsDemo.map(elem=>(
            <div>     
             <Input inputtype={elem.inform.type}
              configuration={elem.inform.config}
              value={elem.inform.value}
              key={elem.id}        
              changed={(event)=>this.onchangeHandler(event,elem.id)}   
               />         
                </div>
          ))
        
        return(
            <div className='login'>
              
              <h2>You are in Login Page</h2>
                 { formdisp }  
      <button onClick={this.match}  >
      Login
      </button> 
      <button><NavLink to='/reg1' > Register</NavLink> </button> 
      <h4>Forgot password?</h4>
      {/* <Route path='/loggedin'  component={LoggedIn}/> */}
           {/* {this.state.proceed?<Route path='/loggedin' component={LoggedIn} firstname={this.state.fname} lastname={this.state.lname}/>:null} */}
           
            </div>
        )
    }
}
export default Login;