import * as actionTypes from '../constants/productConstant';
import  {ProductService} from '../services/productService';
import { toast } from 'react-toastify';


const getListProducts = (productList) => ({
    type: actionTypes.PRODUCT_GET_LIST,
    payload: productList,

})

export const getListProductsAsync = () => (dispatch) => {
        ProductService.getAllProducts()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListProducts(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//create Product
const createProduct = () => ({
    type: actionTypes.PRODUCT_CREATE_NEW,
})
const createProductFail = (errorReponse) => ({
    type: actionTypes.PRODUCT_CREATE_NEW_FAIL,
    payload: errorReponse,

})
const getStatus = (status) => ({
    type: actionTypes.PRODUCT_CREATE_NEW_FAIL,
    payload: status,

})

export const createProductAsync = (data) => {
    return async function(dispatch) {     
        try{
            let response = (await ProductService.createProduct(data) );
            console.log("respon s:",response)
            if(response.data.success == true || response.status === 200 || response.status === 201){
                dispatch(createProduct());
                dispatch(getListProductsAsync());
                dispatch(getStatus(response.data.status))
                toast.success("CREATE SUCCESS");
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
            dispatch(createProductFail(error.response));
            dispatch(getStatus(error.response.status));
            console.log("status aciton ", error.response.status);
            //cb();
            return{
                ok: false
            }
        }
    }
}

//delete 
const deleteProduct = () => ({
    type: actionTypes.PRODUCT_DELETE_BY_ID,
})

export const deleteProductAsync = (productId) => (dispatch) => {
        ProductService.deleteProduct(productId)
        .then(response => {
            console.log("response: ", response);
            dispatch(deleteProduct());
            dispatch(getListProductsAsync());
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


//get single product
const getSingleProduct = (productSingle) => ({
    type: actionTypes.PRODUCT_GET_SINGLE,
    payload: productSingle,

})

export const getSingleProductAsync = (id) => {
    return async function(dispatch){
        try{
            let response = (await ProductService.getSingleProduct(id))
            if(response.data.success == true || response.status === 200 || response.status === 201){
                dispatch(getSingleProduct(response.data.data));
                //toast.success("CREATE SUCCESS");
              
                return {
                    ok: true,
                    productCurrent: response.data.data
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

//edit single product
const editProduct = () => ({
    type: actionTypes.PRODUCT_EDIT_BY_ID,
})

export const editProductAsync = (id,data) => (dispatch) => {
        ProductService.editProduct(id,data)
        .then(response => {
            console.log("response: ", response);
            dispatch(editProduct());
            dispatch(getListProductsAsync());
            //toast.success("EDIT SUCCESS");
        })
        .catch((error) => {
            console.log("error.response: ", error.response);
            const errorList = Object.values(error.response.data.message);
            errorList.map((item) => {
                toast.error(item);
            })
        });
}


//get product by category
const getProductsByCategory = (products) => ({
    type: actionTypes.PRODUCT_GET_BY_CATEGORY,
    payload: products,

})

export const getProductsByCategoryAsync = (category) => {
    return async function(dispatch){
        try{
            let response = (await ProductService.getProductByCategory(category))
            if(response.data.success == true || response.status === 200 || response.status === 201){
                dispatch(getProductsByCategory(response.data.data));
                //toast.success("CREATE SUCCESS");
              
                return {
                    ok: true,
                    productFilterByCategory: response.data.data
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






















// export const loadProductList = () => async dispatch => {
//     try{
//         dispatch({ type: actionType.FETCH_USER_REQUEST});

//         const url = "http://localhost:3000/api/v1/user/all";
//         const response = await fetch(url);
//         const responseBody = await response.json();

//         dispatch({
//             type: actionType.FETCH_USER_SUCCESS,
//             data: responseBody
//         });
//     } catch (error){
//         console.log(error);

//         dispatch({
//             type: actionType.FETCH_USER_ERROR,
//             message: Error
//         });
//     }
// }

//  const userLoadStart = () => ({
//     type: actionTypes.USER_LOAD_START,
// });

//  const userLoadSuccess = (users) => ({
//     type: actionTypes.USER_LOAD_SUCCESS,
//     payload: users,
// })

//  const userLoadError = (errorMessage) => ({
//     type: actionTypes.USER_LOAD_ERROR,
//     payload: errorMessage,
// })

// const createUser = () => ({
//     type: actionTypes.USER_CREATE,
// })



// export const loadUsersAsync = () => (dispatch) => {
//     dispatch(userLoadStart())
//     UserService.getAllUsers()
//         .then(response => dispatch(userLoadSuccess(response.data)))
//         .catch((error) => dispatch(userLoadError(error.message)));
// }

// export const creatUsersAsync = ({ name, email, phone, address, password, gender, role }) => (dispatch) => {
//     //dispatch(userLoadStart())
//     UserService.createUser({ name, email, phone, address, password, gender, role })
//         .then(response => {
//             console.log("resp",response);
//             dispatch(createUser());
//             //dispatch()
//         })
//         .catch((error) => dispatch(userLoadError(error.message)));
// }