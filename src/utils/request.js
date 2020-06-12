import axios from 'axios'

const service = axios.create({
  // baseURL: 'http://192.168.43.119:8080/platform-diner-1.0.0/api',
  // baseURL: 'http://192.168.0.112:8080/platform-diner-1.0.0/api',
  // http://127.0.0.1:8080/platform-diner-1.0.0/api
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  withCredentials: false
})
// 请求拦截
service.interceptors.request.use(config => {
//   var token = (Cookies.get('token', token))
  // if (token) {
  //   // config.headers.token = token;
  // }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
service.interceptors.response.use(response => {
//   if (response.data && response.data.errno === 502) {
//     Cookies.remove('token')
//   }
  console.log('response=' + response)
  return response
}, error => {
  return Promise.reject(error)
})

export default service
