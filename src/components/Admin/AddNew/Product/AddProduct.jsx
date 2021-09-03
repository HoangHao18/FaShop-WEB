import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import './style.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import gender_items from '../../../../assets/Admin/JsonData/gender.json';
import role_items from '../../../../assets/Admin/JsonData/role.json';
import active_items from '../../../../assets/Admin/JsonData/state_active.json';
import { createUserAsync } from '../../../../redux/actions/userAction';
import axios from 'axios';

import { ChromePicker } from 'react-color';

function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        gender: gender_items && gender_items.length > 0 ? gender_items[0].name : '',
        phone: '',
        password: '',
        email: '',
        role: role_items && role_items.length > 0 ? role_items[0] : '',
        active: active_items && active_items.length > 0 ? active_items[0].key : '',
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
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [colorList, setColorList] = useState([]);
    const [color, setColor] = useState("#fff")
    const [showColorPicker, setShowColorPicker] = useState(false)


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

   
    //img
    const handleDeleteImgRender = (index) => {
        const newI = selectedFiles.slice();
        newI.splice(index,1);
        console.log("splice:",newI)
        setSelectedFiles(newI) ;
    }


    const handleImageChange = (e) => {
        // console.log(e.target.files[])
        if (e.target.files) {
          const filesArray = Array.from(e.target.files).map((file) =>
            URL.createObjectURL(file)
        );
    
           console.log("filesArray: ", filesArray);
    
          setSelectedFiles((prevImages) => prevImages.concat(filesArray));
          Array.from(e.target.files).map(
            (file) => URL.revokeObjectURL(file) // avoid memory leak
          );
        }
      };
    
      const renderPhotos = (source) => {
        console.log("source: ", source);
        return source.map((photo, index) => {
          return (
            <div className="img-product-2" key={index}>
                <img src={photo} alt="" key={photo} />
                <span className="icon-delete-img-2" onClick={()=>handleDeleteImgRender(index)}> <i class='bx bx-x-circle icon-del-img'></i></span>
            </div>
            )
        });
      };

    //end img

    function checkValidateInput(formD){
        let err = {}
        if(!formD.name){
            err.name= "Name is required."
        } else if(formD.name.length < 3){
            err.name = "Name must be more than 3 characters."
        }
        if(!formD.phone){
            err.phone = "Phone is required."
        } else if(formD.phone.length < 10){
            err.phone = "Phone must be more than 10 characters."
        }
        if(!formD.password){
            err.password = "Password is required."
        } else if(formD.password.length < 6){
            err.password = "Password must be more than 6 characters."
        }
        if(!formD.email){
            err.email = "Email is required."
        } else if(!/\S+@\S+\.\S+/.test(formD.email)){
            err.email = "Email is invalid."
        }
        if(!formD.address){
            err.address = "Address is required."
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
    function handleSaveProduct(evt){
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
              // Thành công
                console.log("errResponse",errResponse)
                console.log("status",status)
                setFormData({
                    name: '',
                    gender: gender_items && gender_items.length > 0 ? gender_items[0].name : '',
                    phone: '',
                    password: '',
                    email: '',
                    role: role_items && role_items.length > 0 ? role_items[0] : '',
                    active: active_items && active_items.length > 0 ? active_items[0].key : '',
                    address: '',
                    image: ''
                })
               // setPreviewImgURL('');
                
            } else {
              // Thất bại
              console.log("status",status)
            }
        });
     }

     let history = useHistory();
     const handleCancel = () => {
         history.push("/admin/products/");
     }

    return (
        <div>
             <div className="add-product-box-container">
                <h2 className="title">
                    <span><i class='bx bx-right-arrow icon'></i></span>
                    <span>Add Product</span>
                </h2>
                <div>
                    <form  className="add-product-form" onSubmit={handleSaveProduct}>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="label">SKU</label>
                                    <input id="sku" type="text" className="form-control" placeholder=""  
                                        value={formData.sku} 
                                        onChange={handleChangeFormData('sku')} 
                                    />
                                   { formValidError.sku &&  <label className="label-error">{formValidError.sku}</label> }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="label">Name</label>
                                    <input id="name" type="text" className="form-control" placeholder="" 
                                        value={formData.name} 
                                        onChange={handleChangeFormData('name')} 
                                    />
                                    { formValidError.name &&  <label className="label-error">{formValidError.name}</label> }
                                </div>
                            </div>
                        </div>
                       
                       <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Category</label>
                                    <select className="form-control"
                                        value={formData.role} 
                                        onChange={handleChangeFormData('role')} 
                                    >
                                        {role_items && role_items.length > 0 &&
                                            role_items.map((item, index) => {
                                                return(
                                                    <option className="select-item" key={index}>{item}
                                                        {/* <span><i className={item.icon}></i></span>
                                                        <span></span> */}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Manufacture</label>
                                    <select className="form-control"
                                        value={formData.active} 
                                        onChange={handleChangeFormData('active')} 
                                    >
                                        {active_items && active_items.length > 0 &&
                                            active_items.map((item, index) => {
                                                return(
                                                    <option className="select-item" key={index}>{item.desc}
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
                            <label className="label label-images" name="image">Images</label>
                            <input type="file" id="file" multiple hidden onChange={handleImageChange} />
                            <label htmlFor="file" className="label label-choose-img"><i class='bx bx-image-add icon-choose-img'></i>Add Image</label>
                            <div className="result">{renderPhotos(selectedFiles)}</div>
                           
                        </div>


                        <div className="row">
                            <label className="label" name="color">Colors</label>
                            <div className="col-6">
                                <button onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>{showColorPicker ? 'Close color picker' : 'Pick a color'}</button>
                                {
                                    showColorPicker && (
                                    <div>
                                        <ChromePicker 
                                        color = {color}
                                        onChange = {updateColor => setColor(updateColor.hex)}
                                        />
                                        <h2>you picked {color}</h2>
                                    </div>)
                                }
                                <h1 style={{ backgroundColor: `${color}` }}>{color}</h1>
                               
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="label">Description</label>
                                    <textarea type="text"  className="form-control address-user" placeholder=""
                                        value={formData.description} 
                                        onChange={handleChangeFormData('description')} 
                                    />
                                    { formValidError.description &&  <label className="label-error">{formValidError.description}</label> }
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <div className="form-group">
                                    <label className="label">Price</label> 
                                    <input id="price" type="number" className="form-control price" placeholder=""  
                                        value={formData.price} 
                                        onChange={handleChangeFormData('price')} 
                                    /> 
                                   { formValidError.price &&  <label className="label-error">{formValidError.price}</label> }
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group vnd">VND</div>
                            </div>
                        </div>
                        
                        <div className="form-group btn-row">
                            <button type="submit" className="form-control btn btn-save">Save</button>
                            <button  className="form-control btn btn-cancel" onClick={()=>handleCancel()}>Cancel</button>
                        </div>
                    </form>
                </div>          

            </div>
        </div>
    )
}

export default AddProduct
