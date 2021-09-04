import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import './topnav.css'
import Dropdown from '../Dropdown/Dropdown'

import user_image from '../../../assets/Admin/images/cat.png'
import user_menu from '../../../assets/Admin/JsonData/user_menus.json'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions/authAction'

//console.log("dday nheeeeeeeee: ",curr_user.name)
// const renderUserToggle = (user) =>(
//     <div className="topnav__right-user">
//         <div className="topnav__right-user__image">
//             {
//                 user.image ? <img src = {process.env.REACT_APP_API_IMG + user.image}></img> :
//                 <img src = "/assets/images/avatarDefault.png"></img>
//             }    
//         </div>
//         <div className="topnav__right-user__name">
//             {user.name}
//         </div>
//     </div>
// )
const renderUserToggle = (user) =>(
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            {
                user.image && !(user.image===" ") ? <img src = {process.env.REACT_APP_API_IMG + user.image}></img> :
                <img src = "/assets/images/avatarDefault.png"></img>
            }    
        </div>
        <div className="topnav__right-user__name">
            {user.name}
        </div>
    </div>
)



const TopNav = () => {

    // const curr_user = localStorage.getItem("userCurrent") ?  JSON.parse(localStorage.getItem("userCurrent")) : {
    //     name: "",
    //     image: "",
    
    // }

    const userCurrent = useSelector((state) => state.auth.userCurrent)
    // const curr_user =  userCurrent ?  userCurrent : {
    //     name: "",
    //     image: "",
    
    // }


    let history = useHistory();
    let dispatch = useDispatch();
    const handleLogOut = () => {
        // localStorage.removeItem("userCurrent");
        // localStorage.setItem("isLogin",false)
        //history.push("/");

        dispatch(logout());
        // console.log("curren user nheeeeeeeeee: ",userCurrent)
        window.location.href = "/"
    }
    
    return (
        <div className="topnav">
            <div className="topnav__search">
                {/* <input type="text" placeholder="Search here..."></input>
                <i className='bx bx-search'></i> */}
            </div>

            <div className="topnav_right">
                <div className="topnav__right-item">
                    <Dropdown
                        // icon = 'bx bx-user' 
                        customToggle={()=> renderUserToggle(userCurrent)} 
                        contentData={user_menu}
                        renderItems={
                        <div>
                            <div className="notification-item">
                                <i className='bx bx-user'></i>
                                <span>Profile</span>
                            </div>
                    
                            <div className="notification-item">
                                <i className="bx bx-cog"></i>
                                <span>Settings</span>
                            </div>
                    
                            <div className="notification-item" onClick={()=>handleLogOut()}>
                                <i className="bx bx-log-out-circle bx-rotate-180"></i>
                                <span>Logout</span>
                            </div>
                        </div>}
                    />
                </div>

            </div>
        </div>
    )
}

export default TopNav
