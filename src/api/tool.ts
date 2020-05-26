import {Get,Post,DownLoad} from './index';
export default {
    //文件下载
    downLoad(object:object):Promise<any>{
        return DownLoad('/tool/downLoader',object)
    },
}