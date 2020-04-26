import Axios from 'axios';
let axios = Axios.create({
    baseURL:process.env.BASE_URL,
    headers:{
        'Content-Type':'application/json;charset=UTF-8;multipart/form-data'
    },
    timeout:10000,
    responseType:'json',
    withCredentials:false,
    transformRequest:[
        function(data){
            data = data instanceof FormData ?  data : JSON.stringify(data);
            return data
        }
    ],
    transformResponse:[
        function(data){
            if(data){
                return data
            }else{
                throw new Error('未知错误')
            }
        }
    ]
})
//请求头拦截器
axios.interceptors.response.use(config=>{
    sessionStorage.getItem('token') ? config.headers.Authorization = sessionStorage.getItem('token') : "";
    return config
},err=>{
    return Promise.reject(err)
})
//响应头拦截器
axios.interceptors.response.use(config=>{
    if(config.data){
        alert("请求错误")
    }
    return config
},err=>{
    return Promise.reject(err)
})
export default axios;