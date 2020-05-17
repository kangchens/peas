import {Get,Post} from './index';
export default {
    Login(object:object):Promise<any>{
        return Post('/user/login',object)
    },
    register(object:object):Promise<any>{
        return Post('/user/register',object)
    }
}