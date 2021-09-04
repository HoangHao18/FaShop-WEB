import * as actionTypes from '../constants/authConstant';
import  { AuthService } from '../services/authService';
import { toast } from 'react-toastify';

const login = (userCurrent) => ({
    type: actionTypes.AUTH_LOGIN,
    payload: userCurrent,

})

export const loginAsync = (data) => {
    return async function(dispatch) {     
        try{
            let response = (await AuthService.login(data) );
            console.log("respon Login :",response)
            console.log("response.data.data Login :",response.data.data)
            if(response.data.success == true || response.status === 200 || response.status === 201){
                dispatch(login(response.data.data));
                toast.success("Đăng nhập thành công!");
                
                return {
                    ok: true,
                    userCurrent: response.data.data
                }
            }
            else{//call api not success not run in here
                console.log("response.eror: ", response.error);
                // toast.success(response.error);
            } 
        }catch(error){
            console.log("error.response: ", error.response);
            // const errorList = Object.values(error.response.data.message);
            // if(errorList.length > 0){
            //     errorList.map((item) => {
            //         toast.error(item);
            //     })
            // }
            toast.error("Sai thông tin đăng nhập!");
            console.log("status aciton ", error.response.status); //404..
            return{
                ok: false
            }
        }
    }
}

//log out
export const logout = () => ({
    type: actionTypes.AUTH_LOGIN,
    payload: {
        name: " ",
        image: " ",
        
    },

})