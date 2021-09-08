import * as actionTypes from '../constants/productConstant';


const initialState = {
    productList: null,
    productSingle: null,
    productFilterByCategory: null,
    isLoading: true,
    errorMessage: null,
    errResponse: null,
    status: 676
}

function productReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.PRODUCT_GET_LIST:
            return{
                ...state,
                productList: action.payload,
                isLoading: false,
            }
        case actionTypes.PRODUCT_DELETE_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.PRODUCT_CREATE_NEW:
            return{
                ...state,
                errReponse: null,
                isLoading: false,
                
            }
        case actionTypes.PRODUCT_CREATE_NEW_FAIL:
            return{
                ...state,
                errReponse: action.payload,
                isLoading: false,
            }
        case actionTypes.PRODUCT_GET_STATUS:
            return{
                ...state,
                status: action.payload,
                isLoading: false,
            }
        case actionTypes.PRODUCT_GET_SINGLE:
            return{
                ...state,
                productSingle: action.payload,
                isLoading: false,
            }
        case actionTypes.PRODUCT_EDIT_BY_ID:
            return{
                ...state,
                isLoading: false,
            }
        case actionTypes.PRODUCT_GET_BY_CATEGORY:
            return{
                ...state,
                productFilterByCategory: action.payload,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default productReducers;







































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