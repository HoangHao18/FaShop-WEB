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

//import { actGetCurrentUserInforAsync } from './Store/currentuser/actions';
//import { actSetHeaderGetInforUser } from './Store/user/actions';


function App() {

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const ClientId = localStorage.getItem('client_id');
  //   const token = localStorage.getItem('access_token');
  //   const userID = localStorage.getItem('user_id');
  // },[])

  // const data = useSelector(state => state.users.data);
  // const requesting = useSelector(state => state.users.requesting);
  // console.log(data, requesting);
  // console.log("mmmm", data)

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadUserList());
  // }, []);
  
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={AdminHome}/>
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
