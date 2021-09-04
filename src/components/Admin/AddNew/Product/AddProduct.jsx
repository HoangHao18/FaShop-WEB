import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import './style.scss'

import AddProductColor from '../ProductColor/AddProductColor';
import { getListCategoriesNameAsync } from '../../../../redux/actions/categoryAction';
import { getListManufacturesNameAsync } from '../../../../redux/actions/manufactureAction';
import { createProductAsync } from '../../../../redux/actions/productAction';
import axios from 'axios';

function AddProduct() {
    //get category, manufacture
    const categoryListName = useSelector((state) => state.categories.categoryListName);
    const isLoadingCate = useSelector(state => state.categories.isLoading)
    const manufactureListName = useSelector((state) => state.manufactures.manufactureListName);
    const isLoadingManu = useSelector(state => state.manufactures.isLoading)
    useEffect(() => {
        dispatch(getListCategoriesNameAsync());
        dispatch(getListManufacturesNameAsync());
    }, []);

    //end gett category, manufacture

    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        category: categoryListName && categoryListName.length > 0 ? categoryListName[0].name : '',
        manufacture: manufactureListName && manufactureListName.length > 0 ? manufactureListName[0].name : '',
        images: [],
        colors: [],
        description: '',
        price: 0
    })
    const [formValidError, setFomValidError] = useState({
        sku: '',
        name: '',
        images: '',
        colors: '',
        description: '',
        price: ''
    })
    const [isValidForm, setIsValidForm] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [showAddColor, setShowAddColor] = useState(false)

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

    useEffect(() => {
        setFormData({
            ...formData,
            images: selectedFiles
        })
    },[selectedFiles]);

    useEffect(() => {
        setFormData({
            ...formData,
            colors: selectedColors
        })
    },[selectedColors]);

   
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

    //colors
     const handleDeleteColorRender = (index) => {
         const newS = selectedColors.slice();
         newS.splice(index,1);
         console.log("splice:",newS)
         setSelectedColors(newS) ;
     }
 
     const renderSizes = (source) => {
        console.log("source size: ", source);
        return source.map((size, index) => {
          return (
            <div className="size-product-item" key={index}>
                <div>Size: {size.name}</div>
                <div>Number: {size.number}</div>
                {/* <span className="icon-delete-size" onClick={()=>handleDeleteSizeRender(index)}> <i class='bx bx-x-circle icon-del-size'></i></span> */}
            </div>
            )
        });
    };

     const renderColors = (source) => {
         console.log("source colors: ", source);
         return source.map((color, index) => {
           return (
             <div className="color-product-item-render" key={index}>
                 <div className="color-review" style={{ backgroundColor: `${color.color}` }}></div>
                 <div className="color-name">{color.name}</div>
                 <div className="result-sizes">{renderSizes(color.sizes)}</div>  
                 <span className="icon-delete-color" onClick={()=>handleDeleteColorRender(index)}> <i class='bx bx-x-circle icon-del-color'></i></span>
             </div>
             )
         });
     };
 
     const handleAddNewColor = (newSColor) => {
         const newS = selectedColors.slice();
         newS.push(newSColor);
         setSelectedColors(newS);
     }
     //end colors
   

    function checkValidateInput(formD){
        let err = {}
        if(!formD.sku){
            err.sku= "SKU is required."
        } 
        if(!formD.name){
            err.name= "Name is required."
        } 
        if(!formD.description){
            //err.description = "Description is required."
        } 
        if(formD.images.length <= 0){
            err.images= "Please add image!"
        } 
        if(formD.colors.length <= 0){
            err.colors= "Please add color!"
        } 
        if(formD.price < 0){
            err.price = "Price >= 0."
        } 
        console.log("mmm",err)

         if(err.name || err.sku || err.description || err.images || err.colors || err.price) {
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
    function handleSaveProduct(evt){
        evt.preventDefault();
        console.log("check save onclick")
        if(!isValidForm) return;
        
        console.log("check valid true formData:", formData)

        const data = new FormData();
        data.append("sku", formData.sku);
        data.append("name", formData.name);
        data.append("category", formData.category);
        data.append("manufacture", formData.manufacture);
        data.append("image-product", formData.images);
        data.append("colors", formData.colors);
        data.append("description", formData.description);
        data.append("price", formData.price);
        axios.post("https://httpbin.org/anything", data).then(res => console.log(res)).catch(err => console.log(err));
        console.log("check valid true data: ", data)

        // const datapost = {
        //     "sku": formData.sku,
        //     "name_product"
        // }

        dispatch(createProductAsync(formData))
        .then(res => {
            console.log("ok: ",res.ok )
            if (res.ok) {
              // Thành công
            
                setFormData({
                    sku: '',
                    name: '',
                    category: categoryListName && categoryListName.length > 0 ? categoryListName[0].name : '',
                    manufacture: manufactureListName && manufactureListName.length > 0 ? manufactureListName[0].name : '',
                    images: [],
                    colors: [],
                    description: '',
                    price: 0
                })
               // setPreviewImgURL('');
                
            } else {
              // Thất bại
              //console.log("status",status)
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
                                        value={formData.category} 
                                        onChange={handleChangeFormData('category')} 
                                    >
                                        {isLoadingCate===false && categoryListName && categoryListName.length > 0 &&
                                            categoryListName.map((item, index) => {
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
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="label">Manufacture</label>
                                    <select className="form-control"
                                        value={formData.manufacture} 
                                        onChange={handleChangeFormData('manufacture')} 
                                    >  
                                        {isLoadingManu===false && manufactureListName && manufactureListName.length > 0 &&
                                            manufactureListName.map((item, index) => {
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
                            <label className="label label-images" name="image">Images</label>
                            <input type="file" id="file" multiple hidden onChange={handleImageChange} />
                            <label htmlFor="file" className="label label-choose-img"><i class='bx bx-image-add icon-choose-img'></i>Add Image</label>
                            <div className="result">{renderPhotos(selectedFiles)}</div>
                            { formValidError.images &&  <label className="label-error">{formValidError.images}</label> }
                        </div>

                        <div className="row">
                            <label className="label label-color" name="color">Colors</label>
                            {/* <label  className="label label-choose-img"><i class='bx bx-palette icon-choose-img'></i>Add Color</label> */}
                            <div className="icon-add-colors-container" onClick={() => setShowAddColor(showAddColor => !showAddColor)}>
                                {
                                    showAddColor ? 
                                    <label  className="label label-choose-img"><i class='bx bx-palette icon-choose-img'></i>Close Add Color</label>  : 
                                    <label  className="label label-choose-img"><i class='bx bx-palette icon-choose-img'></i>Add Color</label> 
                                }
                            </div>
                            <div>
                                {
                                    showAddColor && (
                                    <div>
                                    <AddProductColor
                                        addColorOnclick={handleAddNewColor}
                                        handleCancelOnclick={setShowAddColor}
                                    />
                                    </div>)
                                }
                                <div className="result-colors">{renderColors(selectedColors)}</div> 
                                { formValidError.colors &&  <label className="label-error">{formValidError.colors}</label> } 
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
