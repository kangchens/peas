import {Get,Post} from './index';
export default {
    //用户登录
    Login(object:object):Promise<any>{
        return Post('/user/login',object)
    },
    // 注册用户
    register(object:object):Promise<any>{
        return Post('/user/register',object)
    },
    //获取用户列表
    getUserList(object:object):Promise<any>{
        return Get('/user/userlist',object)
    },
    //修改角色信息
    changeDetail(object:object):Promise<any>{
        return Post('/user/changeDetail',object)
    }
}