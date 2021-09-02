import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './style.scss'
import { LogOutOutline } from 'react-ionicons'
import { actSetLoginAsync } from '../../Store/user/actions'




export default function HeaderBar(){
    const isLogin = false;
    // const isLogin = useSelector(state => state.User.token);
    // const currentUser = useSelector(state => state.User.currentUser); 
    // const dispatch = useDispatch();

    function handleOnclick(evt){
        // dispatch(actSetLoginAsync({
        //     PhoneNumber: '',
        //     Password: ''
        // }));
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('user_id');
        // localStorage.removeItem('client_id');
    }
    //console.log("c",currentUser)      
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
                    {/* <li><Link to="/">Features</Link></li>
                    <li><Link to="/">Shop</Link></li> */}
                </ul>
            </div>
            <div className="col icon-tool-page">
                <div className="icon_tool">
                    {
                        // isLogin && currentUser
                        isLogin
                         ? <div>
                              {/* <span className="name_current_user">{currentUser.Name}</span> */}
                              <span onClick={handleOnclick} className="icon_logout">
                              <LogOutOutline
                                color={'#00000'} 
                                title={'logout'}
                                height="30px"
                                width="30px"
                                />
                              </span>
                            </div> 
                         :  <span><Link to="/login"><img src="/assets/images/icon_login.png"></img></Link></span>
                    }
                    <span><Link to="/cart"><img src="/assets/images/icon_shopping_cart.png"></img></Link></span>
                </div>
            </div>
        </div>
    )
}