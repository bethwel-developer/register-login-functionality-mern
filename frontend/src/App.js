import {React} from "react"
import { BrowserRouter as Router,  Routes,Route } from "react-router-dom";
import Register from "./register/register";
import Login from "./login/login";
import Home from "./home/home";


function App () {
  return (
    
<Router>
  <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/home" element={<Home/>}/>
  </Routes>
</Router>
      
  
  );
}

export default App;
