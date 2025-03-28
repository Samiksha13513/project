
import './App.scss';
import { BrowserRouter as Router,Route , Routes} from 'react-router-dom';
import Signup from './Components/Signup';
 import Login from './Components/Login';
 import Mainpage from './Components/Mainpage';

function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path='/'  element={<Signup/>}/> 
        <Route path='/login'  element={<Login/>}/> 
        <Route path='/mainpage' element={<Mainpage/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App;
