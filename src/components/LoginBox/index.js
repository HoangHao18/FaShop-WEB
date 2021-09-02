import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { CheckboxOutline } from 'react-ionicons'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import './mystyle.scss'
import axios from 'axios'

import {actSetLoginAsync} from '../../Store/user/actions'

export default function LoginBox(){
    //const isLogin = useNotAuthenticated();
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        PhoneNumber: '',
        Password: ''
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
        if(!formData.PhoneNumber || !formData.Password){
            return
        }
        dispatch(actSetLoginAsync(formData))
            .then(res =>{
                if(res.ok){
                    //thanh cong
                    history.push('/');
                } else {
                    //that bai
                    alert('Dang nhap that bai!')
                }
            })


        // var data = JSON.stringify({
        //     "PhoneNumber": "0396906925",
        //     "Password": "123123"
        //   });
          
        //   var config = {
        //     method: 'post',
        //     url: 'http://207.148.69.136/v1/users/login',
        //     headers: { 
        //       'Content-Type': 'application/json'
        //     },
        //     data : data
        //   };
          
        //   axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
          
    }
    return(
        <div className="login-box-container">
            <h2 className="title">ĐĂNG NHẬP</h2>
            <div >
                <form  className="signin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input id="phone-number" type="text" className="form-control" placeholder="Email" value={formData.PhoneNumber} onChange={handleChange('PhoneNumber')} required />
                    </div>

                    <div className="form-group">
                        <input id="password-field" type="password" className="form-control" placeholder="Mật khẩu" value={formData.Password} onChange={handleChange('Password')} required />
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

                        <label className="link-sign-in">Bạn chưa có tài khoản?  <a >ĐĂNG KÝ</a> tại đây!</label>
                    </div>
                </form>
            </div>
            
        </div>
        
    )
    
}






