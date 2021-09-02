import { CurrentUserService } from "../../services/currentuser";
import { actSetHeaderGetInforUser } from "../user/actions";


export const ACT_GET_CURRENT_USER_INFOR = 'ACT_GET_CURRENT_USER_INFOR';

export function actGetCurrentUserInfor(currentUser){
    return{
        type: ACT_GET_CURRENT_USER_INFOR,
        payload:{
            currentUser
        }
    }
}

export function actGetCurrentUserInforAsync(){
    return async dispatch => {
        try{
            const response = await CurrentUserService.getCurrentUserInfo();
            dispatch(actGetCurrentUserInfor(response.data));
        } catch(e){
            dispatch(actSetHeaderGetInforUser('','',''));
            localStorage.removeItem('access_token', '');
            localStorage.removeItem('user_id', '');
            localStorage.removeItem('client_id', '');

        }
    }
}