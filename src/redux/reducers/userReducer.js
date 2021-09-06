import * as actionTypes from '../constants/userConstant';


const initialState = {
    userList: null,
    userSingle: null,
    isLoading: true,
    errorMessage: null,
    errResponse: null,
    status: 676
}

function userReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.USER_GET_LIST:
            return{
                ...state,
                userList: action.payload,
                isLoading: false,
            }
        case actionTypes.USER_GET_SINGLE:
            return{
                ...state,
                userSingle: action.payload,
                isLoading: false,
            }
        case actionTypes.USER_DELETE_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.USER_SAVE_CART:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.USER_CREATE_NEW:
            return{
                ...state,
                errReponse: null,
                isLoading: false,
                
            }
        case actionTypes.USER_CREATE_NEW_FAIL:
            return{
                ...state,
                errReponse: action.payload,
                isLoading: false,
            }
        case actionTypes.USER_GET_STATUS:
            return{
                ...state,
                status: action.payload,
                isLoading: false,
            }
        case actionTypes.USER_GET_SINGLE:
            return{
                ...state,
                userSingle: action.payload,
                isLoading: false,
            }
        case actionTypes.USER_EDIT_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default userReducers;







































// const initialState = {
//    isLoading: false,
//    users: null,
//    errorMessage: null,
// }

// function userReducers(state = initialState, action) {
//     switch(action.type){
//         case actionTypes.USER_LOAD_START:
//             return {
//                 ...state,
//                 isLoading: true,
//                 users: null,
//                 errorMessage: null,
//             };
//         case actionTypes.USER_LOAD_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 users: action.payload,
//             };
//         case actionTypes.USER_LOAD_ERROR:
//             return {
//                 ...state,
//                 isLoading: false,
//                 errorMessage: action.payload,
//             };

//         case actionTypes.USER_CREATE:
//             const newUserList = state.users.concat(action.payload)
//             return {
//                 ...state,
//                 isLoading: false,
//                 users: action.payload,
//             };
            
//         default:
//             return state;
//     }
// }

// export default userReducers;



// const initialState = {
//     requesting: false,
//     success: false,
//     message: null,
//     data: null
// }

// function userReducers(state = initialState, payload) {
//     switch(payload.type){
//         case FETCH_USER_REQUEST:
//             return {
//                 ...state,
//                 requesting: true
//             };
//         case FETCH_USER_SUCCESS:
//             return {
//                 ...state,
//                 requesting: false,
//                 success: true,
//                 data: payload.data
//             };
//         case FETCH_USER_ERROR:
//             return {
//                 ...state,
//                 requesting: false,
//                 success: false,
//                 data: payload.message
//             };
            
//         default:
//             return state;
//     }
// }

// export default userReducers;