import { AxiosRequestConfig } from '../types'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json,test/plain,*/*'
    }
  }
}

const methodsWidthNoData = ['get', 'delete', 'head', 'options']
const methodsWidthData = ['post', 'put', 'patch']

methodsWidthNoData.forEach(method => {
  defaults.headers[method] = {}
})

methodsWidthData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
