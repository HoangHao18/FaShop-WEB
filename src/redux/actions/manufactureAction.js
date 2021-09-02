import * as actionStypes from '../constants/manufactureConstant';
import { ManufactureService} from '../services/manufactureService';
import { toast } from 'react-toastify';

const getListManufactures = (manufactureList) => ({
    type: actionStypes.MANUFACTURE_GET_LIST,
    payload: manufactureList,

})

export const getListManufacturesAsync = () => (dispatch) => {
        ManufactureService.getAllManufactures()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListManufactures(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//create Manufacture
const createManufacture = () => ({
    type: actionStypes.MANUFACTURE_CREATE_NEW,
})

// export const createManufactureAsync = ({ name, description }) => (dispatch) => {
//         ManufactureService.createManufacture({ name, description })
//         .then(response => {
//             console.log("response: ", response);
//             console.log("response err: ", response.message.name);
//             dispatch(createManufacture());
//             dispatch(getListCategoriesAsync());
//             toast.success("CREATE SUCCESS");
//         })
//         .catch((error) => {
//             console.log("error: ", error.response);
//         });
// }

export const createManufactureAsync = ({ name, phone, email, address }) => {
    return async function(dispatch) {     
        try{
            let response = (await ManufactureService.createManufacture({ name, phone, email, address }) );
            if(response.data.success == true){
                dispatch(createManufacture());
                dispatch(getListManufacturesAsync());
                toast.success("CREATE SUCCESS");
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                // toast.success(response.error);
            } 
        }catch(error){
            console.log("error.response: ", error.response);
            const errorList = Object.values(error.response.data.message);
            if(errorList.length > 0){
                errorList.map((item) => {
                    toast.error(item);
                })
            }
        }
    }
}

//delete Manufacture
const deleteManufacture = () => ({
    type: actionStypes.MANUFACTURE_DELETE_BY_ID,
})

export const deleteManufactureAsync = (manufactureId) => (dispatch) => {
        ManufactureService.deleteManufacture(manufactureId)
        .then(response => {
            console.log("response: ", response);
            dispatch(deleteManufacture());
            dispatch(getListManufacturesAsync());
            toast.success("DELETE SUCCESS");
        })
        .catch((error) => {
            console.log("error.response: ", error.response);
            const errorList = Object.values(error.response.data.message);
            errorList.map((item) => {
                toast.error(item);
            })
        });
}

//get single Manufacture
const getSingleManufacture = (manufactureSingle) => ({
    type: actionStypes.MANUFACTURE_GET_SINGLE,
    payload: manufactureSingle,

})

export const getSingleManufactureAsync = (id) => (dispatch) => {
        ManufactureService.getSingleManufacture(id)
        .then(response => {
            console.log("response: ", response);
            console.log("response dt: ", response.data);
            dispatch(getSingleManufacture(response.data.data));
            
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//edit Manufacture
const editManufacture = () => ({
    type: actionStypes.MANUFACTURE_EDIT_BY_ID,
})

export const editManufactureAsync = (id,{ name, description }) => (dispatch) => {
        ManufactureService.editManufacture(id,{ name, description })
        .then(response => {
            console.log("response: ", response);
            dispatch(editManufacture());
            dispatch(getListManufacturesAsync());
            toast.success("EDIT SUCCESS");
        })
        .catch((error) => {
            console.log("error.response: ", error.response);
            const errorList = Object.values(error.response.data.message);
            errorList.map((item) => {
                toast.error(item);
            })
        });
}