import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import HeaderBar from './components/HeaderBar'
import Footer from './components/Footer'
import{
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import About from './page/About';
import Contact from './page/Contact';
import Sale from './page/Sale';
import Cart from './page/Cart';
import Blog from './page/Blog';
import Buy from './page/Buy';
import DetailsProduct from './page/DetailsProduct';
import AdminHome from './page/Admin/AdminHome';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loginCheckLocalAsync } from './redux/actions/authAction';

//import { actGetCurrentUserInforAsync } from './Store/currentuser/actions';
//import { actSetHeaderGetInforUser } from './Store/user/actions';


function App() {

    let dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.isLogin);
    const userCurrent = useSelector((state) => state.auth.userCurrent);
    console.log("gggggg", userCurrent)
    useEffect(()=>{
        if(localStorage.getItem("isLogin") === "true"){
            dispatch(loginCheckLocalAsync(localStorage.getItem("userCurrentId")))
        }
    },[])
  
  return (
    <Router>
      <Switch>
        {
          (userCurrent.role === "admin" || userCurrent.role === "Admin") && isLogin === true ?
          <Route path="/admin" component={AdminHome}/> : ''
        }
       
        <div className="App">
          <HeaderBar/>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/sale" component={Sale}/>
            <Route path="/cart" component={Cart}/>  
            <Route path="/blog" component={Blog}/> 
            <Route path="/buy" component={Buy}/>  
            <Route path="/detailsProduct" component={DetailsProduct}/>

            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
          <Footer/>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
