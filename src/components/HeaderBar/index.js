import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './style.scss'
import { loginCheckLocalAsync, logout } from '../../redux/actions/authAction';
import { useEffect } from 'react';
import { saveCartAsync } from '../../redux/actions/userAction';





export default function HeaderBar(){
    const isLogin = useSelector((state) => state.auth.isLogin);
    const userCurrent = useSelector(state => state.auth.userCurrent); 
    let dispatch = useDispatch();

    //kt render
    useEffect(()=>{
        if(localStorage.getItem("isLogin") === "true"){
            dispatch(loginCheckLocalAsync(localStorage.getItem("userCurrentId")))
        }
    },[])


    useEffect(()=>{
        console.log("curren user nheeeeeeeeee2: ",userCurrent,isLogin)
    },[userCurrent])
    const handleLogOut = () => {
        dispatch(saveCartAsync({id: userCurrent.id,cart: localStorage.getItem("cart")}))
        dispatch(logout());
        console.log("curren user nheeeeeeeeee: ",userCurrent,isLogin)
        window.location.href = "/"
        
        console.log("localStorage.getItem cart",localStorage.getItem("cart"))
        localStorage.removeItem("userCurrentId", userCurrent.id);
        localStorage.setItem("isLogin",false)
        localStorage.removeItem("cart");
        //history.push("/");

    }     
    return(
        <div className="header-bar row">
            <div className="col logo-page">
                <span><img src="/assets/images/icon_logo_page.png"></img></span>
            </div>
            <div className="col list-page">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/sale">Sale</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/contact">New</Link></li>
                </ul>
            </div>

            <div className="col icon-tool-page">
            <Link to="/cart"><span className="icon-cart-2"><i class='bx bx-shopping-bag icon-2'></i></span></Link>   
           
                {
                    isLogin && userCurrent.name !==" "  ?
                        <div className="info-user-current"> 
                            <span className="icon-logout-2" onClick={()=>handleLogOut()}><i class='bx bx-log-out-circle icon-2' ></i></span>  
                            {
                                userCurrent.image && !(userCurrent.image===" ") ? <img src = {process.env.REACT_APP_API_IMG + userCurrent.image}></img> :
                                <img src = "/assets/images/avatarDefault.png"></img>
                            }  
                             <span className="iuc-name">{userCurrent.name}</span>
                        </div> 
                    : <Link to="/login"><span className="icon-login-2"><i class='bx bx-log-in-circle icon-2' ></i></span></Link>
                }
                
            </div>
           
        </div>
    )
}