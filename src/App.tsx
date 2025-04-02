
import './App.scss';
import { BrowserRouter as Router,Route , Routes} from 'react-router-dom';
import Signup from './Components/Signup';
 import Login from './Components/Login';
 import Mainpage from './Components/Mainpage';
 import { UserProvider } from './ContextApi/UserContext';

function App() {


  return (
    <>
    <UserProvider>
      <Router>
      <Routes>
        <Route path='/'  element={<Signup/>}/> 
        <Route path='/login'  element={<Login/>}/> 
        <Route path='/mainpage' element={<Mainpage/>}/>
      </Routes>
     </Router>
    </UserProvider>

    </>
  )
}

export default App;
