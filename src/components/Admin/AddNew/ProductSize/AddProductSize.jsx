import "./style.scss";
import React, { useEffect,useState } from 'react'

export default function AddProductSize({addSizeOnclick, sizeHave}){
    const [formData, setFormData] = useState({
        name: '',
        number: 0
    })
    const [formValidError, setFomValidError] = useState({
        name: '',
        number: ''
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
        if(formD.number < 0){
            err.number = "Number >= 0."
        } 
        console.log("error form: ",err)

         if(err.name || err.number ) {
            setIsValidForm(false)
            console.log("vao falsse")
        }else{
            setIsValidForm(true)
            //err.isValidForm = true;
            console.log("vao true")
        }
      
        return err;
    }

    function handleSaveCategory(){
        //evt.preventDefault();
        console.log("check save onclick")
        if(!isValidForm) return;
        
        console.log("check valid", formData)
        //dispatch(createCategoryAsync(formData));
        addSizeOnclick(formData);
        setFormData({
            name: '',
            number: 0
        })
     }


    return(
        <div className="form-add-size-container">
            <form className="form-add-size row">
                <div className="form-group-asf">
                    <label className="label">Name size</label>
                    <input type="text" className="input name-size" 
                        value={formData.name} 
                        onChange={handleChangeFormData('name')} 
                    ></input>
                     { formValidError.name &&  <label className="label-error">{formValidError.name}</label> }
                </div>
              
                <div className="form-group-asf">
                    <label className="label">Number</label>
                    <input type="number" className="input number-size"
                        value={formData.number} 
                        onChange={handleChangeFormData('number')} 
                    ></input>
                     { formValidError.number &&  <label className="label-error">{formValidError.number}</label> }
                </div>

                <div className="form-group-asf btn-add-size">
                    <span className="btn-asf " onClick={() =>handleSaveCategory()}><i class='bx bxs-plus-circle btn-add-size'></i></span> 
                </div>
            </form>
        </div>
    )
}