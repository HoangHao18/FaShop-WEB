import *  as actionTypes from '../constants/authConstant';

const initialState = {
    userCurrent: {
        name: " ",
        image: " ",    
    },
    isLoading: true,
    isLogin: false,
    errorMessage: null
}

function authReducers(state = initialState, action) {
    switch(action.type){
        case actionTypes.AUTH_LOGIN:
            return{
                ...state,
                userCurrent: action.payload,
                isLogin: true,
                isLoading: false,
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                userCurrent: action.payload,
                isLogin: false,
                isLoading: false,
            }
           
        case actionTypes.AUTH_LOGIN_CHECK_LOCAL:
            return{
                ...state,
                userCurrent: action.payload,
                isLogin: true,
                isLoading: false,
            }
        case actionTypes.AUTH_REGISTER:
            return{
                ...state,
                isLoading: false,
            }
      
        default:
            return state;
    }
}

export default authReducers;