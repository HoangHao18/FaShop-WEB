import React, { useEffect, useState} from 'react'
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import './style.scss';
import { createCategoryAsync } from '../../../../redux/actions/categoryAction'
function AddCategory() {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    })
    const [formValidError, setFomValidError] = useState({
        name: '',
        description: ''
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
        if(!formD.description){
            err.description = "Description is required."
        } 
        console.log("error form: ",err)

         if(err.name || err.description ) {
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
    function handleSaveCategory(evt){
        evt.preventDefault();
        console.log("check save onclick")
        if(!isValidForm) return;
        
        console.log("check valid")
        dispatch(createCategoryAsync(formData));
        setFormData({
            name: '',
            description: ''
        })
        
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
        history.push("/admin/categories");
    }

    return (
        <div className="add-box-container">
            <h2 className="title">
                <span><i class='bx bx-right-arrow icon'></i></span>
                <span>Add Category</span>
            </h2>
            <div>
                <form  className="add-category-form" onSubmit={handleSaveCategory}>
                    <div className="form-group">
                        <label className="label">Name</label>
                        <input id="name" type="text" className="form-control bac" placeholder="Name new category..." 
                            value={formData.name} 
                            onChange={handleChangeFormData('name')} 
                        />
                        { formValidError.name &&  <label className="label-error">{formValidError.name}</label> }
                    </div>

                    <div className="form-group">
                        <label className="label">Description</label>
                        <textarea type="text"  className="form-control desc-category bac" placeholder="Description new category..."
                            value={formData.description} 
                            onChange={handleChangeFormData('description')} 
                        />
                        { formValidError.description &&  <label className="label-error">{formValidError.description}</label> }
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

export default AddCategory
