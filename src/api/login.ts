import {Get,Post} from './index';
export default {
    //用户登录
    Login(object:object):Promise<any>{
        return Post('/user/login',object)
    },
    // 注册用户
    register(object:object):Promise<any>{
        return Post('/user/register',object)
    }
}