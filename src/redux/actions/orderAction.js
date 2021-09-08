import * as actionTypes from '../constants/orderConstant';
import  {OrderService} from '../services/orderService';
import { toast } from 'react-toastify';


const getListOrders = (orderList) => ({
    type: actionTypes.ORDER_GET_LIST,
    payload: orderList,

})

export const getListOrdersAsync = () => (dispatch) => {
        OrderService.getAllOrders()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListOrders(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}


//create user
const createOrder = () => ({
    type: actionTypes.ORDER_CREATE_NEW,
})
// const createUserFail = (errorReponse) => ({
//     type: actionTypes.USER_CREATE_NEW_FAIL,
//     payload: errorReponse,

// })
// const getStatus = (status) => ({
//     type: actionTypes.USER_CREATE_NEW_FAIL,
//     payload: status,

// })

export const createOrderAsync = (data) => {
    return async function(dispatch) {     
        try{
            let response = (await OrderService.createOrder(data) );
            console.log("respon s:",response)
            if(response.data.success == true || response.status === 200 || response.status === 201){
                dispatch(createOrder());
                dispatch(getListOrdersAsync());
                toast.success("ORDER SUCCESS");
                //cb();
                return {
                    ok: true
                }
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
            // dispatch(createUserFail(error.response));
            // dispatch(getStatus(error.response.status));
            console.log("status aciton ", error.response.status);
            //cb();
            return{
                ok: false
            }
        }
    }
}

//get single product
const getSingleOrder = (orderSingle) => ({
    type: actionTypes.ORDER_GET_SINGLE,
    payload: orderSingle,

})

export const getSingleOrderAsync = (id) => {
    return async function(dispatch){
        try{
            let response = (await OrderService.getSignOrder(id))
            if(response.data.success == true || response.status === 200 || response.status === 201){
                dispatch(getSingleOrder(response.data.data));
                //toast.success("CREATE SUCCESS");
              
                return {
                    ok: true,
                    orderCurrent: response.data.data
                }
            }
        }catch(error){
            console.log("error: ",error);
            return{
                ok: false
            }
        };
    }      
}


//get orders by id user
const getOrdersByUserId = (orders) => ({
    type: actionTypes.ORDER_GET_BY_USER_ID,
    payload: orders,

})

export const getOrdersByUserIdAsync = (iduser) => {
    return async function(dispatch){
        try{
            let response = (await OrderService.getOrdersByUserId(iduser))
            if(response.data.success == true || response.status === 200 || response.status === 201){
                dispatch(getOrdersByUserId(response.data.data));
                //toast.success("CREATE SUCCESS");
                console.log("ne111111111",response.data.data)
                return {
                    ok: true,
                    ordersOfUserCurrent: response.data.data
                }
            }
        }catch(error){
            console.log("error: ",error);
            return{
                ok: false
            }
        };
    }      
}
