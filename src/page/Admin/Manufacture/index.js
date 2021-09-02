import './style.css'
import Table from '../../../components/Admin/Table/Table'

import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getListManufacturesAsync, deleteManufactureAsync } from '../../../redux/actions/manufactureAction';
import ToolTable from '../../../components/Admin/ToolTable/ToolTable';

import AddCategory from '../../../components/Admin/AddNew/Category/AddCategory';


export default function Manufacture(){

    let dispatch = useDispatch();

    const manufacturesList = useSelector((state) => state.manufactures.manufactureList);
    const isLoading = useSelector(state => state.manufactures.isLoading)
    console.log("categoryList",manufacturesList,"isloading", isLoading);

    useEffect(() => {
        dispatch(getListManufacturesAsync());
    }, []);

    let history = useHistory();
    const handleDelete = (manufactureId) => {
        if(window.confirm("Are you sure wanted to delete the manufacture?")){
            dispatch(deleteManufactureAsync(manufactureId));
        }
    }
    const handleEdit = (manufactureId) => {
        history.push(`/admin/manufactures/editManufacture/${manufactureId}`);
    }


    const [currIndexStart, setCurrIndexStart] = useState(0);

    const userTableHead = [
        // <th style={{width: "10px"}}>ID</th>,
    
        <th style={{width: "20%"}}>Name</th>,
        <th style={{width: "15%"}}>Phone</th>,
        <th style={{width: "25%"}}>Email</th>,
        <th style={{width: "25%"}}>Address</th>,
        <th style={{width: "10%"}}>Action</th>,
    ] 
    const renderHead = (item, index) => item;
    
    const renderBody = (item, index) =>(
        <tr key={index}>
            <td>{currIndexStart + index + 1}</td>
            {/* <td>{item._id}</td> */}
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.address}</td>
            <td>
                <span onClick={()=>handleEdit(item._id)}> <i class='bx bx-edit-alt iconEdit'> </i></span>
                <span onClick={()=>handleDelete(item._id)}> <i class='bx bx-trash iconDelete'></i></span>
            </td>
        </tr>
    )

    return(
        <div>
            <h2 className="page-header">Manufacture</h2>
            {/* <AddCategory/> */}
            <ToolTable 
                linkAdd = "/admin/manufactures/addManufacture"
            />
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">

                            {
                                isLoading ? <div>Loading...</div> : 
                                (manufacturesList && manufacturesList.length > 0) ? <div>
                                <Table
                                    limit='5'
                                    headData={userTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={manufacturesList}
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