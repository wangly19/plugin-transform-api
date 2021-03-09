// @ts-nocheck
type RequestMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'OPTIONS' | 'PATCH'
type RequestMethodAndURL = `${RequestMethod} /${string}`
type RequestBaseConfig = Record<string, RequestMethodAndURL>
function defineRequireConfig (config: RequestBaseConfig): RequestBaseConfig {
  return config
}

module.exports = {
  defineRequireConfig
}