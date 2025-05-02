import axios from 'axios'
import {useUserStore}from '@/stores'
import {ElMessage} from 'element-plus'
import router from '@/router'
const baseURL = 'http://big-event-vue-api-t.http://127.0.0.1:4523/m1/6131655-5823385-default.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const useStore=useUserStore()
    if(useStore.token){
        config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if(res.data.code ===0){
        return res
    }
    ElMessage.error(res.data.message||'请求失败')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    if(err.response.status === 401){
   
        // TODO 7. 跳转到登录页
        ElMessage.error('请先登录')
        router.push('/login')
        return
    }
    ElMessage.error(err.response.data.message||'请求失败')
    return Promise.reject(err)
  }
)

export default instance
export {baseURL}