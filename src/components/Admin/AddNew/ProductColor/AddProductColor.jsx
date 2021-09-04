import "./style.scss";
import React, { useState, useEffect } from "react";
import { ChromePicker } from 'react-color';
import AddProductSize from "../ProductSize/AddProductSize";


export default function AddProductColor({handleCancelOnclick, addColorOnclick}){
    // const [colorList, setColorList] = useState([]);
    const [color, setColor] = useState("#fff")
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [showAddSize, setShowAddSize] = useState(false)


    //size
    const [selectedSizes, setSelectedSizes] = useState([]);
    const handleDeleteSizeRender = (index) => {
        const newS = selectedSizes.slice();
        newS.splice(index,1);
        console.log("splice:",newS)
        setSelectedSizes(newS) ;
    }

    const renderSizes = (source) => {
        console.log("source size: ", source);
        return source.map((size, index) => {
          return (
            <div className="size-product-item" key={index}>
                <div>Size: {size.name}</div>
                <div>Number: {size.number}</div>
                <span className="icon-delete-size" onClick={()=>handleDeleteSizeRender(index)}> <i class='bx bx-x-circle icon-del-size'></i></span>
            </div>
            )
        });
    };

    const handleAddNewSize = (newSize) => {
        const newS = selectedSizes.slice();
        newS.push(newSize);
        setSelectedSizes(newS);
        setShowAddSize(false)
    }

    //end size

    //color item
    const [formData, setFormData] = useState({
        name: '',
        color: "#fff",
        sizes: []
    })
    const [formValidError, setFomValidError] = useState({
        name: '',
        sizes: ''
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
        setFormData({
            ...formData,
            color: color
        })
    },[color]);

    useEffect(() => {
        setFormData({
            ...formData,
            sizes: selectedSizes
        })
    },[selectedSizes]);

    useEffect(() => {
        console.log("kkk22: ",formData); //note
        setFomValidError(checkValidateInput(formData));
    },[formData]);
    

    function checkValidateInput(formD){
        let err = {}
        if(!formD.name){
            err.name= "Name is required."
        } 
        if(formD.sizes.length <= 0){
            err.sizes= "Please add size and number!"
        } 
        console.log("error form: ",err)

         if(err.name || err.sizes ) {
            setIsValidForm(false)
            console.log("vao falsse")
        }else{
            setIsValidForm(true)
            //err.isValidForm = true;
            console.log("vao true")
        }
      
        return err;
    }

    function handleSaveColor(){
        //evt.preventDefault();
        console.log("check save onclick")
        if(!isValidForm) return;
        
        console.log("check valid", formData)
        //dispatch(createCategoryAsync(formData));

        addColorOnclick(formData);
        handleCancelOnclick(false)
        // setFormData({
        //     name: '',
        //     color: "#fff",
        //     sizes: []
        // })
     }

    //end color item

    return(
        <div className="form-add-product-color-container">
            <form className="form-add-color">
                <div className="row">
                    <div className="col-4">
                        <div className="form-group-acf">
                            <label className="label">Name color</label>
                            <input type="text" className="input name-size" 
                                value={formData.name} 
                                onChange={handleChangeFormData('name')} 
                            ></input>
                            { formValidError.name &&  <label className="label-error">{formValidError.name}</label> }
                        </div>

                        <div className="color-picker-container">
                            <div onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>
                                {
                                    showColorPicker ? 
                                    <span className="btn-clo-op-color-picker clo"><i class='bx bxs-minus-circle' ></i> </span> : 
                                    <span className="btn-clo-op-color-picker op"><i class='bx bxs-plus-circle' ></i> Pick a color</span>
                                }
                            </div>
                            {
                                showColorPicker && (
                                <div>
                                    <ChromePicker 
                                    color = {color}
                                    onChange = {updateColor => setColor(updateColor.hex)}
                                    />
                                </div>)
                            }
                            <div className="color-review" style={{ backgroundColor: `${color}` }}></div>
                        </div>

                        
                    </div>

                    <div className="col-8">
                        <div className="icon-add-size-container" onClick={() => setShowAddSize(showAddSize => !showAddSize)}>
                            {
                                showAddSize ? 
                                <span className="btn-clo-op-add-size "><i class='bx bxs-minus-circle ' ></i> Close Add Size</span> : 
                                <span className="btn-clo-op-add-size"><i class='bx bxs-plus-circle' ></i> Add Size</span>
                            }
                        </div>
                            {
                                showAddSize && (
                                <div>
                                   <AddProductSize 
                                        addSizeOnclick={handleAddNewSize}
                            
                                   />
                                </div>)
                            }
                             <div className="result-sizes">{renderSizes(selectedSizes)}</div>  
                             { formValidError.sizes &&  <label className="label-error">{formValidError.sizes}</label> }
                        </div>

                </div>
              
                <div className="form-group-acf-btn">
                    <span className="btn-acf " onClick={() =>handleSaveColor()}><i class='bx bxs-check-circle btn-add-size'></i></span> 
                    <span className="btn-acf " onClick={() =>handleCancelOnclick(false)}><i class='bx bxs-x-circle btn-x-add-size'></i></span>  
                </div>      
                
            </form>
        </div>
    )
}