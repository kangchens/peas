import Axios from 'axios';
let axios = Axios.create({
    baseURL:process.env.BASE_URL,
    headers:{
        'Content-Type':'application/json'
    },
    timeout:5000,
    // responseType:'json',
    withCredentials:false,
    transformResponse:[
        function(data){
                console.log('data',data)
            if(data){
                return data
            }else{
                throw new Error('未知错误')
            }
        }
    ]
})
//请求头拦截器
axios.interceptors.request.use(config=>{
    sessionStorage.getItem('token') ? config.headers.Authorization = sessionStorage.getItem('token') : "";
    return config
},err=>{
    return Promise.reject(err)
})
//响应头拦截器
axios.interceptors.response.use(config=>{
    return config
},err=>{
    return Promise.reject(err)
})

/* GET  */
export function Get<T>(url, data): Promise<T> {
    // `params`是要与请求一起发送的URL参数
    // 必须是纯对象或URLSearchParams对象
    return axios
        .get(url, {
            params: data,
        },)
        .then(res => {
            return res.data
        })
        .catch(err => {
            throw err
        })
}

/* POST */
export function Post<T>(url, data): Promise<T> {
    return axios
        .post(url, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            throw err
        })
}