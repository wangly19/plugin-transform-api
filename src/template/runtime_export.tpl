export type RequestMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'OPTIONS' | 'PATCH'

export type RequestMethodAndURL = `${RequestMethod} /${string}`

export type RequestBaseConfig = Record<string, RequestMethodAndURL>

export function defineRequireConfig (config: RequestBaseConfig): RequestBaseConfig {
  return config
}

export default {
  defineRequireConfig
}