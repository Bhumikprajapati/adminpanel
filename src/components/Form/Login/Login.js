import React,{Component} from 'react';
import Input from '../../../Input/Input';
import LoggedIn from './LoggedIn/LoggedIn';
import {NavLink,Route} from 'react-router-dom';
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
              }
            },
         
    }
    componentDidMount(){
        const fname=localStorage.getItem('First name');
        const lname=localStorage.getItem('Last name');
        const password=localStorage.getItem('Password');
        this.setState({
            fname:fname,
            lname:lname,
            password:password
        })
    }
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
        const info=JSON.parse(localStorage.getItem('info'));
        const fname=info['First name'];
        const password=info['Password'];
        const fnamefromstate=this.state.forms.firstname.value
        const passfromstate=this.state.forms.password.value
        // console.log(fname +' '+fnamefromstate)

        if(fnamefromstate===fname && passfromstate===password){
            this.props.history.push('/loggedin')
        }
        else{
            alert('Write Correct Id & passsword')
           
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
        return(
            <div>
                 { 
      formsDemo.map(elem=>(
        <div>     
         <Input inputtype={elem.inform.type}
          configuration={elem.inform.config}
          value={elem.inform.value}
          key={elem.id}        
          changed={(event)=>this.onchangeHandler(event,elem.id)}   
           />         
            </div>
      ))}  
      <button  onClick={this.match}>
      Login
         </button> 
      <button><NavLink to='/' > Register</NavLink> </button> 
      {/* <Route path= '/loggedin'  component={LoggedIn}/> */}
           {/* {this.state.proceed?<Route path='/loggedin' component={LoggedIn} firstname={this.state.fname} lastname={this.state.lname}/>:null} */}
            </div>
        )
    }
}
export default Login;