import './style.css'
import Table from '../../../components/Admin/Table/Table'

import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getListManufacturesAsync, deleteManufactureAsync } from '../../../redux/actions/manufactureAction';
import ToolTable from '../../../components/Admin/ToolTable/ToolTable';

import AddCategory from '../../../components/Admin/AddNew/Category/AddCategory';
import ordersList from '../../../assets/Admin/JsonData/ordersList.json'

export default function Order(){

    let dispatch = useDispatch();

    // const manufacturesList = useSelector((state) => state.manufactures.manufactureList);
    // const isLoading = useSelector(state => state.manufactures.isLoading)
    // console.log("categoryList",manufacturesList,"isloading", isLoading);
    
    const isLoading = false;

    useEffect(() => {
        //dispatch(getListManufacturesAsync());
    }, []);

    let history = useHistory();
    const handleDelete = (orderId) => {
        if(window.confirm("Are you sure wanted to delete the order?")){
            //dispatch(deleteorderAsync(orderId));
        }
    }
    const handleEdit = (orderId) => {
        //history.push(`/admin/orders/editorder/${orderId}`);
    }


    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        // <th style={{width: "10px"}}>ID</th>,
        <th style={{width: "10%"}}>Code</th>,
        <th style={{width: "20%"}}>Guest</th>,
        <th style={{width: "15%"}}>Ship</th>,
        <th style={{width: "15%"}}>Total Price</th>,
        <th style={{width: "10%"}}>Status</th>,
        <th style={{width: "15%"}}>Date Order</th>,
        <th style={{width: "10%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            {/* <td>{item._id}</td> */}
            <td>{item.code}</td>
            <td>{item.guest}</td>
            <td>{item.ship} VND</td>
            <td>{item.totalprice} VND</td>
            <td><span className="done">{item.status}</span></td>
            <td>{item.dateorder}</td>
            <td>
                <span onClick={()=>handleEdit(item._id)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                <span onClick={()=>handleDelete(item._id)}> <i class='bx bx-trash iconDelete'></i></span>
            </td>
        </tr>
    )

    return(
        <div className="order-admin-page">
            <h2 className="page-header">Order</h2>
            {/* <AddCategory/> */}
            <ToolTable 
                // linkAdd = "/admin/manufactures/addManufacture"
            />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">

                            {
                                isLoading ? <div>Loading...</div> : 
                                (ordersList && ordersList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={ordersList}
                                    renderBody={(item, index) => renderBody(item, index)}
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