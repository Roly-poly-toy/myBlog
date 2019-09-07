import axios from 'axios'
import {Message,MessageBox} from 'element-ui'
import store from '../store/store'
import router from '../router'


const axios=axios.create({
    baseURL: 'http://localhost:8080/',
    timeout:15000,
    header: 'Content-Type:application/x-www-form-urlencoded'
})

axios.interceptor.request.use(config=>{
    if(store.state.token!="")
    config.header['Authorization']=store.state.token
    return config
},error=>{
    console.log(error)
    Promise.reject(error)
})

axios.interceptor.response,use(config=>{
    const res=response.data
    var message
    if(res.code!=200){
        if(res.code!=403){
            switch(res.code){
                case 300:
                    message='请登录';
                    break;
                case 400:
                    message='认证失败';
                    break;
                case 202:
                    message='请勿重复操作'
                    break;
            }
            Message({
                message:message,
                type:'error',
                showClose:true
            })
        }else if(res.code==403){
            store.commit('logout');
            MessageBox.confirm('权限不足，非法访问，你已被退出！',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'error'
            }).then(()=>{
                router.push("/")
                location.reload()
            }).catch(()=>{
                router.push("/")
                location.reload()
            })
        }  
        return Promise.reject('error')
    }else return res

},error=>{
    console.log('错误：'+error.message)
    var message
    if(error.response.status == 504) message='连接超时'
    else if(error.response.status == 404) message='接口错误'
    else message=erroe.message;
    Message({
        message:message,
        type:'error',
        showClose:true
    })
    return Promise.reject('error')
})
export default axios
