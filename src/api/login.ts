import axios from './index';
export default {
    Login(){
        return axios.get('/user/login',{})
    },
    Logout(){
        return axios.get("/user/logout",{})
    },
    register(){
        return axios.post('/user/register',{})
    }
}