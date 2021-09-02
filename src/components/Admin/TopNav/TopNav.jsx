import React from 'react'

import './topnav.css'
import Dropdown from '../Dropdown/Dropdown'

import user_image from '../../../assets/Admin/images/cat.png'
import user_menu from '../../../assets/Admin/JsonData/user_menus.json'
import { Link } from 'react-router-dom'

const curr_user = {
    display_name: 'Hoang Hao',
    image: user_image
}

const renderUserToggle = (user) =>(
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user_image}></img>
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)
const renderUserMenu =(item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const TopNav = () => {
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
                        customToggle={()=> renderUserToggle(curr_user)} 
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}  
                    />
                </div>

            </div>
        </div>
    )
}

export default TopNav
