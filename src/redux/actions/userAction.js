import * as actionTypes from '../constants/userConstant';
import  {UserService} from '../services/userService';
import { toast } from 'react-toastify';


const getListUsers = (userList) => ({
    type: actionTypes.USER_GET_LIST,
    payload: userList,

})

export const getListUsersAsync = () => (dispatch) => {
        UserService.getAllUsers()
        .then(response => {
            console.log("response: ", response);
            dispatch(getListUsers(response.data.reverse()));
        })
        .catch((error) => {
            console.log("error: ",error);
        });
}

//create user
const createUser = () => ({
    type: actionTypes.USER_CREATE_NEW,
})
const createUserFail = (errorReponse) => ({
    type: actionTypes.USER_CREATE_NEW_FAIL,
    payload: errorReponse,

})
const getStatus = (status) => ({
    type: actionTypes.USER_CREATE_NEW_FAIL,
    payload: status,

})

export const createUserAsync = (data) => {
    return async function(dispatch) {     
        try{
            let response = (await UserService.createUser(data) );
            console.log("respon s:",response)
            if(response.data.success == true || response.status === 200 || response.status === 201){
                dispatch(createUser());
                dispatch(getListUsersAsync());
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
            dispatch(createUserFail(error.response));
            dispatch(getStatus(error.response.status));
            console.log("status aciton ", error.response.status);
            //cb();
            return{
                ok: false
            }
        }
    }
}

//delete category
const deleteUser = () => ({
    type: actionTypes.USER_DELETE_BY_ID,
})

export const deleteUserAsync = (userId) => (dispatch) => {
        UserService.deleteUser(userId)
        .then(response => {
            console.log("response: ", response);
            dispatch(deleteUser());
            dispatch(getListUsersAsync());
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
























// export const loadUserList = () => async dispatch => {
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