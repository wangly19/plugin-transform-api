import { config } from "process"

/**
 * API约束数据类型
 */
export type RequestMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'OPTIONS'
export type RequestMethodAndURL = `${RequestMethod} /${string}`
export type RequestBaseConfig = Record<string, RequestMethodAndURL>

export function defineRequireConfig (config: RequestBaseConfig): RequestBaseConfig {
  return config
}


export function getApiList () {
  const filePathReg = `^([a-z])\.(js|json|ts)$`
  
}