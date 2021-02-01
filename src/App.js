import React,{Component} from 'react';
import './App.css';
import Form from './components/Form/Form';
import {BrowserRouter} from 'react-router-dom';
class App extends Component{
render(){
  return(
    <div className='App'>
      <BrowserRouter>
      <Form/>
      </BrowserRouter>
    </div>
  )
}
}
export default App;
