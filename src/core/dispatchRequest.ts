import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helps/url'
import { transformResponse, transformRequest } from '../helps/data'
import { flattenHeaders, processHeaders } from '../helps/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConifg(config)
  return xhr(config).then(res => transformResponseData(res))
}

function processConifg(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transfromHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params) // 类型断言
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transfromHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
