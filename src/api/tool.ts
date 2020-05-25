import {Get,Post} from './index';
export default {
    //文件下载
    downLoad(object:object):Promise<any>{
        return Post('/tool/downLoader',object)
    },
}