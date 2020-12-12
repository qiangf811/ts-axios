import Any = jasmine.Any
import defaults from '../helps/default'

export type Method =
  | 'GET'
  | 'get'
  | 'POST'
  | 'post'
  | 'PUT'
  | 'put'
  | 'PATCH'
  | 'patch'
  | 'OPTIONS'
  | 'options'
  | 'HEAD'
  | 'head'
  | 'DELETE'
  | 'delete'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number

  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  header: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosErrorType extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResovedFn<T>, rejectd?: ResjectedFn): number

  eject(id: number): void
}

export interface ResovedFn<T> {
  (val: T): T | Promise<T>
}

export interface ResjectedFn {
  (err: any): any
}

export interface InterceptorInstance<T> {
  use(resolved: ResovedFn<T>, rejected?: ResjectedFn): number

  eject(id: number): void
}
