import React,{Component} from 'react';
import Reg1 from './Reg1/Reg1';
import Reg2 from './Reg2/Reg2';
class Registration extends Component{
    state={
        step:1
    }
    nextStep=()=>{
       let step=this.state.step;
       step=step+1
        this.setState({
            step:step
        })
    }
    prevStep=()=>{
        let step=this.state.step;
        step=step-1
         this.setState({
             step:step
         })
    }
    render(){
        let loadcomp;
       switch(this.state.step){
           case 1:
               loadcomp=<Reg1 
                next={this.nextStep}
                />
               break;
            case 2:
                loadcomp=<Reg2
                prev={this.prevStep}
                />    
                break;
                default:
                    loadcomp=<Reg1 next={this.nextStep}   />
                    break;
       }

        return(
            <div>
         {loadcomp}
            </div>
        )
    }
}
export default Registration;