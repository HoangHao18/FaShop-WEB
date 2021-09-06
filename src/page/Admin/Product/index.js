import './style.css'
import Table from '../../../components/Admin/Table/Table'

import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { getListProductsAsync, createProductAsync, deleteProductAsync } from '../../../redux/actions/productAction';
import ToolTable from '../../../components/Admin/ToolTable/ToolTable';
import NumberFormat from 'react-number-format';
import AddProduct from '../../../components/Admin/AddNew/Product/AddProduct';
//import productList from '../../../assets/Admin/JsonData/productList.json'



export default function Product(){

    let dispatch = useDispatch();

    const productList = useSelector((state) => state.products.productList);
    const isLoading = useSelector(state => state.products.isLoading)
    console.log("productList product page",productList);

    useEffect(() => {
        dispatch(getListProductsAsync());
    }, []);

    let history = useHistory();
    const handleDelete = (productId) => {
        if(window.confirm("Are you sure wanted to delete the Product?")){
            dispatch(deleteProductAsync(productId));
        }
    }
    const handleEdit = (productId) => {
        history.push(`/admin/editproduct/${productId}`);
    }

    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        // <th style={{width: "10px"}}>ID</th>,
        <th style={{width: "8%"}}>SKU</th>,
        <th style={{width: "18%"}}>Name</th>,
        <th style={{width: "12%"}}>Price</th>,
        <th style={{width: "7%"}}>Colors</th>,
        <th style={{width: "12%"}}>Category</th>,
        <th style={{width: "18%"}}>Manufacture</th>,
        <th style={{width: "10%"}}>Image</th>,
        <th style={{width: "10%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            <td>{item.sku}</td>
            <td>{item.name}</td>
            <td><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} /> VND</td>
            <td>{JSON.parse(item.colors).length}</td>
            <td>{item.category}</td>
            <td>{item.manufacture}</td>
            {console.log("image: ",process.env.REACT_APP_API_IMG,item.images)}
            <td>
                <div className="img-product">
                    {
                        (item.images.length > 0) ? <img src = {process.env.REACT_APP_API_IMG + item.images[0]}></img> :
                        <img src = "/assets/images/avatarDefault.png"></img>
                    }     
                </div>
            </td>
            <td>
                <span onClick={()=>handleEdit(item._id)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                <span onClick={()=>handleDelete(item._id)}> <i class='bx bx-trash iconDelete'></i></span>
            </td>
        </tr>
    )

    return(
        <div>
            <h2 className="page-header">Product</h2>
            {/* <AddUser/> */}
            <ToolTable
                linkAdd = "/admin/products/addProduct"
            />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                isLoading ? <div>Loading...</div> : 
                                (productList && productList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={productList}
                                    renderBody={(item, index, currIndexStart) => renderBody(item, index)}
                                    passChildData={setCurrIndexStart}
                                /> 
                                </div>
                                : <div>Data is empty</div>
                            }                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}