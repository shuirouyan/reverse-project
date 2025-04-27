
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html>', {
  url: 'http://localhost',
  referrer: 'http://localhost',
  contentType: 'text/html',
  includeNodeLocations: true,
  storageQuota: 10000000
});

// 将 JSDOM 中的全局对象挂载到 Node.js 的全局对象上
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.localStorage = dom.window.localStorage;
global.sessionStorage = dom.window.sessionStorage;

// 模拟 requestAnimationFrame 和 cancelAnimationFrame
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

import axios from 'axios'
import Qs from 'querystring'

import Encrypt from 'encryptlong'
import { Base64 } from 'js-base64'

let baseURL = ''
let baseURL2 = ''
// 退出接口
let baseURL1 = ''
if (process.env.NODE_ENV === 'development') {
  // 石超超
  // baseURL = 'http://10.134.10.153:8080/cms'
  // baseURL1 = 'http://10.134.10.153:8080/cms'
  // baseURL2 = 'http://10.134.10.153:8080/cms'

  // // 王
  baseURL = 'http://10.134.25.247:31091/cms'
  baseURL1 = 'http://10.134.25.247:31091/cms'
  baseURL2 = 'http://10.134.25.247:31091/cms'

  //  baseURL = 'http://10.134.15.65:8080/cms'
  // 生产
  // baseURL = 'http://10.134.10.11:8080/cms'
  // baseURL1 = 'http://10.134.10.11:8080/cms'
  // baseURL2 = 'http://10.134.10.11:8080/cms'
  // baseURL = 'https://www.cnpcbidding.com/cms'
  // baseURL1 = 'https://www.cnpcbidding.com/cms'
  // baseURL2 = 'https://www.cnpcbidding.com/cms'
} else if (process.env.NODE_ENV === 'staging') {
  // 石超超
  // baseURL = 'http://10.134.10.153:8080/cms'
  // baseURL1 = 'http://10.134.10.153:8080/cms'
  // baseURL2 = 'http://10.134.10.153:8080/cms'
  // 王
  // baseURL = 'http://10.134.10.11:8080/cms'
  // baseURL1 = 'http://10.134.10.11:8080/cms'
  // baseURL2 = 'http://10.134.10.11:8080/cms'
  // 生产
  baseURL = '/cms'
  baseURL1 = '/cms'
  baseURL2 = '/cms'
  // baseURL = 'https://www.cnpcbidding.com/cms'
  // baseURL1 = 'https://www.cnpcbidding.com/cms'
  // baseURL2 = 'https://www.cnpcbidding.com/cms'

  // baseURL = 'http://10.134.25.247:31091/cms'
  // baseURL1 = 'http://10.134.25.247:31091/cms'
  // baseURL2 = 'http://10.134.25.247:31091/cms'
} else if (process.env.NODE_ENV === 'production') {
  // baseURL = 'http://10.134.25.236:8082/cms'
  // baseURL1 = 'http://10.134.25.236:8082/cms'
  // baseURL2 = 'http://10.134.25.236:8082/cms'
  baseURL = 'http://10.134.25.236:8082/cms'
  baseURL1 = 'http://10.134.25.236:8082/cms'
  baseURL2 = 'http://10.134.25.236:8082/cms'
  // baseURL = window.PLATFROM_CONFIG.baseUrl
  // baseURL1 = window.PLATFROM_CONFIG.baseUrl1
}

// 从SessionStorage中获取token
// function getSessionToken() {
//   const token = getToken()
//   return token
// }

// 创建一个axios实例
const service = axios.create({
  withCredentials: true,
  baseURL,
  timeout: 140 * 10000000

})
// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers.MACHINE_CODE = localStorage.getItem('time')

    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = 'bearer ' + localStorage.getItem('token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 给实例添加一个serviceSetToken方法，用于登录后将最新token动态添加到header，同时将token保存在localStorage中
service.serviceSetToken = (access_token, refresh_token) => {
  service.defaults.headers['authorization'] = access_token
  // window.localStorage.setItem('token', token)
  setToken('bearer ' + access_token)
  setReToken(refresh_token)
}
// 刷新token
function refreshTokens() {
  // const refresh_token = getReToken()
  // service是当前request.js中已创建的axios实例
  // return service.post('/auth', Qs.stringify({ refresh_token: refresh_token })).then(res => res.data)
  const _data = {}
  _data.refreshToken = getReToken()
  return api.user.refresh(_data).then(res => res.data)
}
function tz() {
  // 跳转登录页，携带当前页的路由，能登录成功，在跳回
  // Router.push({ path: '/login', query: { redirect: Router.currentRoute.fullPath }})
}

// 是否正在刷新的标记
const isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
const requests = []
const that = this
// response interceptor响应拦截器-----------------------------------
service.interceptors.response.use(response => {
  if (response.status == '509') {
    this.$router.push('/')
  }

  const { code, data } = response.data

  // 1021 token超时
  if (code === '1021') {
    Message({
      message: '请登录',
      type: 'error',
      duration: 2 * 1000
    })
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  } else if (code === '1022') {
    // 刷新也失效
    // Message({
    //   message: '超时请重新登录',
    //   type: 'error',
    //   duration: 2 * 1000
    // })

    tz()
    // 跳转登录页，携带当前页的路由，能登录成功，在跳回
    // Router.push({ path: '/login', query: { redirect: Router.currentRoute.fullPath }})
  } else if (code === '1020') {
    Message({
      message: response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
    Router.push('/401')
  }
  return response.data
}, error => {
  // 响应状态不成功时
  const that = this
  // return Promise.reject(error)
  // 如果有错误状态
  if (error.response.status) {
    switch (error.response.status) {
      case 401:
        // 未登录

        // 如果没token,跳转登录，并携带当前页面的路径
        // if (!that.$store.state.user.token) {
        //   return Router.push({ path: '/login', query: { redirect: Router.currentRoute.path }})
        // }
        // token失效
        // 清空token和角色
        // that.$store.dispatch('user/resetToken')
        // setTimeout(() => {
        // 网页重新载入
        // window.location.reload()
        // const refresh_token = getReToken()
        // //重新申请token,并判断是否获取成功，成功存储本地并发送原来的请求，不成功跳转登录页
        // service.post('/发送refresh获取token地址', Qs.stringify({ refresh_token: refresh_token }))
        //   .then(res =>
        //     {
        //       that.$store.user.commit('SET_TOKEN',res.data.data)

        //       Message({
        //         message: "请重新操作",
        //         type: 'success',
        //         duration: 2 * 1000
        //       })

        //       refreshTokens().then(res => {
        //         const { access_token, refresh_token } = res.data
        //         // service.setToken(token)
        //         service.serviceSetToken(access_token, refresh_token)
        //         // 已经刷新了token，将所有队列中的请求进行重试
        //         requests.forEach(cb => cb(access_token))
        //         requests = []
        //       }).catch(res => {
        //         console.error('refreshtoken error =>', res)
        //       })

        //       return service( err.config )
        //     })
        //   .catch(() => {
        //     that.$store.dispatch('user/resetToken')
        //     return Router.push({ path: 'login', query: { redirect: Router.currentRoute.path }})
        //   })
        // }, 1000)
        break

      case 404:
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
        // Router.push('/404')
        break

      case 503:
        Message({
          message: '服务不可用',
          type: 'error',
          duration: 5 * 1000
        })
        break

      default:
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
        break
    }
  }
  return Promise.reject(error.response)
})

const get = (url, params) => {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params

    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const post = (url, params) => {
  return new Promise((resolve, reject) => {
    service.post(url, Qs.stringify(params))
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const postJson = (url, data) => {
  console.log('传参', data)
  const datas = Base64.encode(JSON.stringify(data))
  var encryptor = new Encrypt()
  if (!localStorage.getItem('logo1')) {
    api.user.BjCss().then((res) => {
      const css = res.split('.')
      const css1 = css[1]
      const css2 = css[2]
      const regex = /base64,([^)]+)\)/
      const c1 = css1.match(regex)
      const c2 = css2.match(regex)
      localStorage.setItem('logo1', c1[1])
      localStorage.setItem('logo2', c2[1])
    })
  }
  encryptor.setPublicKey(localStorage.getItem('logo1'))
  data = encryptor.encryptLong(JSON.stringify(datas))
  return new Promise((resolve, reject) => {
    service.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(res => {
        if (typeof res === 'string') {
          if (!localStorage.getItem('logo2')) {
            api.user.BjCss().then((res) => {
              const css = res.split('.')
              const css1 = css[1]
              const css2 = css[2]
              const regex = /base64,([^)]+)\)/
              const c1 = css1.match(regex)
              const c2 = css2.match(regex)
              localStorage.setItem('logo1', c1[1])
              localStorage.setItem('logo2', c2[1])
            })
          }
          var encryptorJm = new Encrypt()
          encryptorJm.setPrivateKey(localStorage.getItem('logo2'))
          if (!res) return false
          var result = encryptorJm.decryptLong(res)
          const ResultData = Base64.decode(result)
          const ele = JSON.parse(ResultData)
          console.log('返回的值', ele)
          resolve(ele)
        } else {
          // console.log('返回的值',res);
          resolve(res)
        }
        // var encryptorJm = new Encrypt()
        // encryptorJm.setPrivateKey(localStorage.getItem('logo2'))
        // if (!res) return false
        // var result = encryptorJm.decryptLong(res)
        // let ResultData = Base64.decode(result)
        // let ele = JSON.parse(ResultData)

        // resolve(ele)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const postStr = (url, params) => {
  return new Promise((resolve, reject) => {
    service.post(url, params, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const postFormData = (url, params) => {
  return new Promise((resolve, reject) => {
    service.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const postDownload = (url, params) => {
  return new Promise((resolve, reject) => {
    service.post(url, params, {
      responseType: 'blob'
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getDownload = (url, params) => {
  return new Promise((resolve, reject) => {
    service.get(url, params, {
      responseType: 'blob'
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const pdfPerview = (url, params) => {
  return new Promise((resolve, reject) => {
    service.post(url, params, {
      responseType: 'arraybuffer'
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const deletes = (url, params) => {
  return new Promise((resolve, reject) => {
    service.delete(url, { data: params })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// export const request = {
//   get,
//   post,
//   postJson,
//   postStr,
//   postFormData,
//   postDownload,
//   getDownload,
//   deletes,
//   pdfPerview,
//   baseURL,
//   baseURL2,
//   baseURL1
// }

// export default service
postJson('/cms/article/page', {
  "current": current,
  "size": 10000,
  "condition": {
    "columnId": "21",
    "title": "",
    "projectType": ""
  }
})