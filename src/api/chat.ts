import {Get,Post} from './index'
export default {
    // 聊天列表
    selectChat(obj:object):Promise<any>{
        return Post('/chat/chatList',obj)
    }
}