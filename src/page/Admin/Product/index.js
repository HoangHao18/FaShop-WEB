import './style.css'
import Table from '../../../components/Admin/Table/Table'
//import customerList from '../../../assets/Admin/JsonData/customers-list.json'

import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { getListUsersAsync, createUserAsync, deleteUserAsync } from '../../../redux/actions/userAction';
import ToolTable from '../../../components/Admin/ToolTable/ToolTable';

import AddUser from '../../../components/Admin/AddNew/User/AddUser';


// const userTableHead = [
//     {
//         w: 20, 
//         nameHead: ''
//     },
//     {
//         w: 20, 
//         nameHead: 'name'
//     },
//     {
//         w: 20, 
//         nameHead: 'email'
//     },
//     {
//         w: 20, 
//         nameHead: 'phone'
//     },
//     {
//         w: 20, 
//         nameHead: 'role'
//     },
//     {
//         w: 20, 
//         nameHead: 'location'
//     },
//     // 'password',
    
// ]
//const renderHead = (item, index) => <th key={index} style={{width: `'${item.w}px'`}}>{item.nameHead}</th>


export default function Product(){

    let dispatch = useDispatch();

    const userList = useSelector((state) => state.users.userList);
    const isLoading = useSelector(state => state.users.isLoading)
    console.log("userList",userList,"isloading", isLoading);

    useEffect(() => {
        dispatch(getListUsersAsync());
    }, []);

    let history = useHistory();
    const handleDelete = (userId) => {
        if(window.confirm("Are you sure wanted to delete the user?")){
            dispatch(deleteUserAsync(userId));
        }
    }
    const handleEdit = (userId) => {
        history.push(`/admin/edituser/${userId}`);
    }

    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        // <th style={{width: "10px"}}>ID</th>,
        <th style={{width: "15%"}}>SKU</th>,
        <th style={{width: "7%"}}>Name</th>,
        <th style={{width: "15%"}}>Price</th>,
        <th style={{width: "15%"}}>Colors</th>,
        <th style={{width: "15%"}}>Category</th>,
        <th style={{width: "15%"}}>Manufacture</th>,
        <th style={{width: "11%"}}>Image</th>,
        <th style={{width: "10%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            <td>{item.sku}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.colors.length}</td>
            <td>{item.category}</td>
            <td>{item.manufacture}</td>
            {console.log("image: ",process.env.REACT_APP_API_IMG,item.image)}
            <td>
                <div className="img-user">
                    {
                        item.image ? <img src = {process.env.REACT_APP_API_IMG + item.image}></img> :
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
            <h2 className="page-header">User</h2>
            {/* <AddUser/> */}
            <ToolTable
                linkAdd = "/admin/addUser"
            />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                isLoading ? <div>Loading...</div> : 
                                (userList && userList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={userList}
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