import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from 'react-router-dom'
import './style.scss';
import { editManufactureAsync, getSingleManufactureAsync } from '../../../../redux/actions/manufactureAction'

function EditManufacture() {
    const [formData, setFormData] = useState({
        name: '', 
        phone: '',
        email: '', 
        address: ''
    })
    const [formValidError, setFomValidError] = useState({
        name: '', 
        phone: '',
        email: '', 
        address: ''
    })
    const [isValidForm, setIsValidForm] = useState(false);

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

    function checkValidateInput(formD){
        let err = {}
        if(!formD.name){
            err.name= "Name is required."
        } 
        if(!formD.phone){
            err.phone = "Phone is required."
        } else if(formD.phone.length < 10){
            err.phone = "Phone must be more than 10 characters."
        }
        if(!formD.email){
            err.email = "Email is required."
        } else if(!/\S+@\S+\.\S+/.test(formD.email)){
            err.email = "Email is invalid."
        }
        if(!formD.address){
            err.name= "Address is required."
        } 
        console.log("error form: ",err)

         if(err.name || err.phone || err.email || err.address ) {
            setIsValidForm(false)
            console.log("vao falsse")
        }else{
            setIsValidForm(true)
            //err.isValidForm = true;
            console.log("vao true")
        }
      
        return err;
    }

    let dispatch = useDispatch();
    let {id} = useParams();
    console.log("param: ", useParams())
    console.log("param id: ", id)
    useEffect(() => {
        dispatch(getSingleManufactureAsync(id));
    }, []);

    const manufactureEdit = useSelector((state) => state.manufactures.manufactureSingle)

    
    useEffect(() => {
        if(manufactureEdit){
            setFormData({
                name: manufactureEdit.name,
                phone: manufactureEdit.phone,
                email: manufactureEdit.email, 
                address: manufactureEdit.address
            })
        }
      }, [manufactureEdit]);


    function handleSaveManufacture(evt){
        evt.preventDefault();
        console.log("check save onclick")
        if(!isValidForm) return;
        
        console.log("check valid")
        dispatch(editManufactureAsync(id, {...formData}));
        // setFormData({
        //     name: '', 
        //     phone: '',
        //     email: '', 
        //     address: ''
        // })
        
        // dispatch(actSetLoginAsync(formData))
        //     .then(res =>{
        //         if(res.ok){
        //             //thanh cong
        //             history.push('/');
        //         } else {
        //             //that bai
        //             alert('Dang nhap that bai!')
        //         }
        //  })
     }

    let history = useHistory();
    const handleCancel = () => {
        history.push("/admin/manufactures");
    }

    return (
        <div className="add-box-container">
            <h2 className="title">
                <span><i class='bx bx-right-arrow icon'></i></span>
                <span>Edit Manufacture</span>
            </h2>
            <div>
                <form  className="add-category-form" onSubmit={handleSaveManufacture}>
                    <div className="form-group">
                        <label className="label">Name</label>
                        <input id="name" type="text" className="form-control bac" placeholder="Name new category..." 
                            value={formData.name} 
                            onChange={handleChangeFormData('name')} 
                        />
                        { formValidError.name &&  <label className="label-error">{formValidError.name}</label> }
                    </div>

                    <div className="form-group">
                        <label className="label">Phone</label>
                        <input id="phone" type="text" className="form-control" placeholder="Phone new user..." 
                            value={formData.phone} 
                            onChange={handleChangeFormData('phone')} 
                        />
                        { formValidError.phone &&  <label className="label-error">{formValidError.phone}</label> }
                    </div>

                    <div className="form-group">
                        <label className="label">Email</label>
                        <input id="email" type="email" className="form-control" placeholder="Email new user..." 
                            value={formData.email} 
                            onChange={handleChangeFormData('email')} 
                        />
                        { formValidError.email &&  <label className="label-error">{formValidError.email}</label> }
                    </div>

                    <div className="form-group">
                        <label className="label">Address</label>
                        <textarea type="text"  className="form-control address-user" placeholder="Address new user..."
                            value={formData.address} 
                            onChange={handleChangeFormData('address')} 
                        />
                        { formValidError.address &&  <label className="label-error">{formValidError.address}</label> }
                    </div>

                    <div className="form-group btn-row">
                        <button type="submit" className="form-control btn btn-save">Save</button>
                        <button  className="form-control btn btn-cancel" onClick={()=>handleCancel()}>Cancel</button>
                    </div>
                </form>
            </div>   
        </div>
    )
}

export default EditManufacture
