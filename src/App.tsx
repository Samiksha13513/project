
import './App.scss';
import { BrowserRouter as Router,Route , Routes} from 'react-router-dom';
import Signup from './Components/Signup';
 import Login from './Components/Login';
 import Mainpage from './Components/Mainpage';
 import { UserProvider } from './ContextApi/UserContext';
import Dashboard from './Components/Dashboard';
import Table from './Components/Table';
import Profile from './Components/Profile';

function App() {
  return (
    <>
    <UserProvider>
      <Router>
      <Routes>
        <Route path='/'  element={<Signup/>}/> 
        <Route path='/login'  element={<Login/>}/> 
        <Route path='/mainpage' element={<Mainpage/>}/>
        <Route path='/table' element={<Table/>}/>
         <Route path='/dashboard' element={<Dashboard/>}/>
         <Route path='/profile' element={<Profile/>}/>
      </Routes>
     </Router>
    </UserProvider>

    </>
  )
}

export default App;
