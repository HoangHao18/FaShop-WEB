import { UserService } from "../../services/user";
import { actGetCurrentUserInforAsync } from "../currentuser/actions";

export const ACT_SET_LOGIN = 'ACT_SET_LOGIN';
export const ACT_SET_HEADER_GET_INFOR_USER = 'ACT_SET_HEADER_GET_INFOR_USER';



export function actSetLogin(value){
    
    return{
        type: ACT_SET_LOGIN,
        payload:{
            isLogin: value
            // isLogin: false,
            // token: '',
            // currentUser:{
            //     username: 'Admin'
            // }
        }
    }
}

export function actSetHeaderGetInforUser(userId,clientId,token){
    
    return{
        type: ACT_SET_HEADER_GET_INFOR_USER,
        payload:{
            userId,
            clientId,
            token
        }
    }
}


export function actSetLoginAsync({
    PhoneNumber,
    Password
}){
    return async dispatch => {
        //Action => Service
        try{
            const response = await UserService.login({
                PhoneNumber,
                Password
            })
            const data = response.data;
            const token = data.AccessToken;
            const ClientId = data.ClientId;
            const userID = data.UserId;

            window.localStorage.setItem('client_id', ClientId);
            window.localStorage.setItem('access_token', token);
            window.localStorage.setItem('user_id', userID);

            dispatch(actSetHeaderGetInforUser(userID,ClientId,token));
            dispatch(actGetCurrentUserInforAsync());

            console.log(response);
            if ((response.data == "shortpassword") || response.data == "wrongphonenumberorpassword"){
                return{
                    ok: false
                }
            }
            return{
                ok: true
            }
        } catch(e){
            return{
                ok: false,
            }
        }
    }
}