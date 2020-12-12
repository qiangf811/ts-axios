import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  ResjectedFn,
  ResovedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorsManager from './InterceptorsManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorsManager<AxiosRequestConfig>
  response: InterceptorsManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResovedFn<T> | ((config: AxiosRequestConfig) => AxiosResponse)
  rejected?: ResjectedFn
}

export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initParams: AxiosRequestConfig) {
    this.defaults = initParams
    this.interceptors = {
      request: new InterceptorsManager<AxiosRequestConfig>(),
      response: new InterceptorsManager<AxiosResponse>()
    }
  }

  reqeust(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    const promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise.then(resolved, rejected)
    }

    return promise
  }

  private _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.reqeust(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  private _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.reqeust(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }
}
