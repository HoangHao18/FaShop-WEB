import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { CheckboxOutline } from 'react-ionicons'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './mystyle.scss'

import { loginAsync } from '../../redux/actions/authAction';
import { Link } from 'react-router-dom';

export default function LoginBox(){
    //const isLogin = useNotAuthenticated();
    const history = useHistory();
    const userCurrent = useSelector((state) => state.auth.userCurrent);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    function handleChange(key){
        return(evt) => {
            
            setFormData({
                ...formData,
                [key]: evt.target.value
            })
        }
    }
    function handleSubmit(evt){
        evt.preventDefault();
        console.log("mmmm")
        if(!formData.email || !formData.password){
            return
        }
        dispatch(loginAsync(formData))
        .then(res => {
            //console.log("ok: ",res.ok )
            if (res.ok) {
              // Thành công
                setFormData({
                    email: '',
                    password: ''
                })
                console.log("user current: nene: ", userCurrent)
                // localStorage.setItem("userCurrent", JSON.stringify(res.userCurrent));
                // localStorage.setItem("isLogin", true);
                if(res.userCurrent.role === "Admin" || res.userCurrent.role === "admin"){
                    history.push('/admin');
                }else if(res.userCurrent.role === "Guest" || res.userCurrent.role === "guest"){
                    history.push('/');
                }
                
                
            } else {
              // Thất bại
              //console.log("status",status)
            }
        });

          
    }
    return(
        <div className="login-box-container">
            <h2 className="title">ĐĂNG NHẬP</h2>
            <div >
                <form  className="signin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input id="phone-number" type="text" className="form-control" placeholder="Email" required
                            value={formData.email} 
                            onChange={handleChange('email')} 
                        />
                    </div>

                    <div className="form-group">
                        <input id="password-field" type="password" className="form-control" placeholder="Mật khẩu" required
                        value={formData.password} 
                        onChange={handleChange('password')}  
                    />
                        {/* <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password" /> */}
                    </div>

                    <div className="form-group">
                        <button type="submit" className="form-control btn">Đăng nhập</button>
                    </div>

                    <div className="form-group">
                        {/* <label className="checkbox-wrap">
                            <span className="custom-checkmark">
                                <CheckboxOutline
                                    color={'#00000'} 
                                    title={"c"}
                                    height="10px"
                                    width="10px"
                                />
                            </span>
                            Remember Me
                            <input type="checkbox" className="default-checkmark" defaultChecked />
                            
                        </label> 

                        <div className="forgot-password">
                            <a >Forgot Password</a>
                        </div> */}

                        <label className="link-sign-in">Bạn chưa có tài khoản?  <Link to="/register">ĐĂNG KÝ</Link> tại đây!</label>
                    </div>
                </form>
            </div>
            
        </div>
        
    )
    
}






