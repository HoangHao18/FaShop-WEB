import {ACT_SET_HEADER_GET_INFOR_USER, ACT_SET_LOGIN} from './actions'
import {ACT_GET_CURRENT_USER_INFOR} from '../currentuser/actions'; 

const initUserState = {
    isLogin: false,
    userId: '',
    clientId: '',
    token: '',
    currentUser: null
}

export default function reducer(state = initUserState, action){
    switch(action.type){
        case ACT_SET_LOGIN:
            return state;
        case ACT_GET_CURRENT_USER_INFOR:
            return{
                ...state,
                currentUser: action.payload.currentUser
                
            }
        case ACT_SET_HEADER_GET_INFOR_USER:
            return{
                ...state,
                userId: action.payload.userId,
                clientId: action.payload.clientId,
                token: action.payload.token

            }
        default:
            return state;
    }
}