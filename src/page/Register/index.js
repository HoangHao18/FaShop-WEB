import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import './style.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import gender_items from '../../assets/Admin/JsonData/gender.json';
import role_items from '../../assets/Admin/JsonData/role.json';
import active_items from '../../assets/Admin/JsonData/state_active.json';
import { createUserAsync } from '../../redux/actions/userAction';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        gender: gender_items && gender_items.length > 0 ? gender_items[0].name : '',
        phone: '',
        password: '',
        email: '',
        role: "guest",
        active: true,
        address: '',
        image: ''
    })
    const [formValidError, setFomValidError] = useState({
        name: '',
        gender: '',
        phone: '',
        password: '',
        email: '',
        role: '',
        active: '',
        address: '',
        image: ''
    })
    const [isValidForm, setIsValidForm] = useState(false);
    const [previewImgURL, setPreviewImgURL] = useState('');
    const [isOpenPreviewImg, setIsOpenPreviewImg] = useState(false);


    function handleChangeFormData(key){ 
        return(evt) => {   
            setFormData({
                ...formData,
                [key]: evt.target.value
            })
            console.log("kkk: ",formData); //note
        }
    }

    useEffect(() => {
        console.log("kkk22: ",formData); //note
        setFomValidError(checkValidateInput(formData));
    },[formData]);

   
    const handleOnChangeImage = (event) => {
        let dataFile = event.target.files;
        let file = dataFile[0];
        if(file){
            let objectUrl = URL.createObjectURL(file);
            setPreviewImgURL(objectUrl);
        }
        setFormData({
            ...formData,
            image: file
        })
        
    }

    const openPreviewimage = () => {
        if(!previewImgURL) return;
        setIsOpenPreviewImg(true);
    }

    function checkValidateInput(formD){
        let err = {}
        if(!formD.name){
            err.name= "T??n l?? b???t bu???c."
        } else if(formD.name.length < 3){
            err.name = "Name must be more than 3 characters."
        }
        if(!formD.phone){
            err.phone = "S??? ??i???n tho???i l?? b???t bu???c."
        } else if(formD.phone.length < 10){
            err.phone = "S??? ??i???n tho???i ch??a h???p l???."
        }
        if(!formD.password){
            err.password = "M???t kh???u l?? b???t bu???c."
        } else if(formD.password.length < 6){
            err.password = "M???t kh???u ph???i l???n h??n 6 k?? t???."
        }
        if(!formD.email){
            err.email = "Email l?? b???t bu???c."
        } else if(!/\S+@\S+\.\S+/.test(formD.email)){
            err.email = "Email ch??a h???p l???."
        }
        if(!formD.address){
            err.address = "?????a ch??? l?? b???t bu???c."
        } 
        console.log("mmm",err)

         if(err.name || err.phone || err.password || err.email || err.address) {
            setIsValidForm(false)
            //err.isValidForm = false;
            console.log("vao falsse")
        }else{
            setIsValidForm(true)
            //err.isValidForm = true;
            console.log("vao true")
        }
      
        return err;

    }

    let dispatch = useDispatch();
    const errResponse = useSelector((state) => state.users.errResponse);
    const status = useSelector((state) => state.users.status);
   const bb = "bb"
    function handleSaveUser(evt){
        evt.preventDefault();
        console.log("check save onclick")
        if(!isValidForm) return;
        
        console.log("check valid")
        //dispatch(createUserAsync(formData));

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("gender", formData.gender);
        data.append("phone", formData.phone);
        data.append("role", formData.role);
        data.append("active", formData.active);
        data.append("address", formData.address);
        data.append("image", formData.image);
        axios.post("https://httpbin.org/anything", data).then(res => console.log(res)).catch(err => console.log(err));
        
        const cb = ()=>{
            console.log("check call back")
            console.log("errResponse cb",errResponse)
            console.log("status cb",status)
            console.log("bb",bb);
        }
        
        dispatch(createUserAsync(data))
        .then(res => {
            console.log("ok: ",res.ok )
            if (res.ok) {
              // Th??nh c??ng
                console.log("errResponse",errResponse)
                console.log("status",status)
                setFormData({
                    name: '',
                    gender: gender_items && gender_items.length > 0 ? gender_items[0].name : '',
                    phone: '',
                    password: '',
                    email: '',
                    role: "guest",
                    active: true,
                    address: '',
                    image: ''
                })
                setPreviewImgURL('');
                history.push("/login")
            } else {
              // Th???t b???i
              console.log("status",status)
            }
        });
     }

     let history = useHistory();
     const handleCancel = () => {
         history.push("/admin/users");
     }

    return (
        <div className="register-bg">
            <h2 className="title">????NG K??</h2>
             <div className="register-box-container">
                {/* <h2 className="title">
                    <span><i class='bx bx-right-arrow icon'></i></span>
                    <span>Add user</span>
                </h2> */}
                
                <div>
                    <form  className="add-user-form" onSubmit={handleSaveUser}>
                        <div className="row">
                            <div className="col-8">
                                <div className="form-group">
                                    <label className="label">T??n hi???n th???</label>
                                    <input id="name" type="text" className="form-control" placeholder=" "  
                                        value={formData.name} 
                                        onChange={handleChangeFormData('name')} 
                                    />
                                   { formValidError.name &&  <label className="label-error">{formValidError.name}</label> }
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="label">Gi???i t??nh</label>
                                    <select className="form-control"
                                        value={formData.gender} 
                                        onChange={handleChangeFormData('gender')} 
                                    >
                                        {gender_items && gender_items.length > 0 &&
                                            gender_items.map((item, index) => {
                                                return(
                                                    <option className="select-item" key={index}>{item.name}
                                                        {/* <span><i className={item.icon}></i></span>
                                                        <span></span> */}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="label">Email</label>
                                    <input id="email" type="email" className="form-control" placeholder=" " 
                                        value={formData.email} 
                                        onChange={handleChangeFormData('email')} 
                                    />
                                    { formValidError.email &&  <label className="label-error">{formValidError.email}</label> }
                                </div>
                            </div>
                        </div>
                       
                       <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">S??? ??i???n tho???i</label>
                                    <input id="phone" type="text" className="form-control" placeholder=" " 
                                        value={formData.phone} 
                                        onChange={handleChangeFormData('phone')} 
                                    />
                                    { formValidError.phone &&  <label className="label-error">{formValidError.phone}</label> }
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">M???t kh???u</label>
                                    <input id="password" type="password" className="form-control" placeholder=" " 
                                        value={formData.password} 
                                        onChange={handleChangeFormData('password')} 
                                    />
                                    { formValidError.password &&  <label className="label-error">{formValidError.password}</label> }
                                </div>
                            </div>
                       </div>
                       {/* <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Role</label>
                                    <select className="form-control"
                                        value={formData.role} 
                                        onChange={handleChangeFormData('role')} 
                                    >
                                        {role_items && role_items.length > 0 &&
                                            role_items.map((item, index) => {
                                                return(
                                                    <option className="select-item" key={index}>{item}
                                                        <span><i className={item.icon}></i></span>
                                                        <span></span>
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div> */}
                            {/* <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Active</label>
                                    <select className="form-control"
                                        value={formData.active} 
                                        onChange={handleChangeFormData('active')} 
                                    >
                                        {active_items && active_items.length > 0 &&
                                            active_items.map((item, index) => {
                                                return(
                                                    <option className="select-item" key={index}>{item.desc}
                                                        <span><i className={item.icon}></i></span>
                                                        <span></span>
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                       </div> */}

                        <div className="row">
                            <div className="col-8">
                                <div className="form-group">
                                    <label className="label">?????a ch???</label>
                                    <textarea type="text"  className="form-control address-user" placeholder=" "
                                        value={formData.address} 
                                        onChange={handleChangeFormData('address')} 
                                    />
                                    { formValidError.address &&  <label className="label-error">{formValidError.address}</label> }
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="label" name="image">???nh ?????i di???n</label>
                                    <div className="preview-img"
                                        style={{ backgroundImage: `url(${previewImgURL})`}}
                                        onClick = { () => openPreviewimage()}
                                    ></div>
                                    <input id="image" type="file" className="form-control "  hidden
                                        onChange={ (event) => handleOnChangeImage(event)}
                                    />
                                    <label className="form-control choose-img" htmlFor="image"><i class='bx bx-image-add icon-choose-img'></i>Ch???n ???nh</label>
                                   
                                </div>
                            </div>      
                        </div>

                        <div className="form-group btn-row">
                            <button type="submit" className="form-control btn btn-save">????NG K??</button>
                            <button  className="form-control btn btn-cancel" onClick={()=>handleCancel()}>THO??T</button>
                        </div>
                    </form>
                </div>   

                {
                    isOpenPreviewImg === true &&
                    <Lightbox
                        mainSrc={previewImgURL }   
                        onCloseRequest={() => setIsOpenPreviewImg(false)} 
                    />
                }
                

            </div>
        </div>
    )
}

export default Register;
