import axios from './index';
export default {
    Login(){
        return axios.get('/base/login',{})
    }
}