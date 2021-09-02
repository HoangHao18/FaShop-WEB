import axios from 'axios'
export const CurrentUserService = {
    getCurrentUserInfo(){
        return axios.get('http://207.148.69.136/v1/users/'+ localStorage.getItem('user_id'), null, {
            headers: {
                ClientId: localStorage.getItem('client_id'),
                AccessToken: localStorage.getItem('access_token')
            }
        })
    }
}