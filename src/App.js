import React,{ useState } from "react";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './Home'
import Create from './components/create/Create'
import Login from "./components/login/login";

function App() {
  
  return (
    <Router>
     <div className="App">
     <Switch>
       <Route path="/" exact component={Home}/>
       <Route path="/create_acount" exact component={Create}/>
       <Route path="/login" exact component={Login}/>
       <Route path="/user/autenticado" exact component={Home}/>
       
       <Route path="*" component={()=>"404"}/>
     </Switch>
  
 </div>

     </Router>
     
      );
}

export default App;
