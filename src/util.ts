import { utils } from 'umi'
const { join } = require('path')

/**
 * API约束数据类型
 */
export type RequestMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'OPTIONS' | 'PATCH'
export type RequestMethodAndURL = `${RequestMethod} /${string}`
export type RequestBaseConfig = Record<string, RequestMethodAndURL>
export interface RequestMethodBodyName {
  POST: 'data'
  GET: 'params'
  PUT: 'data'
}

export const requestMethodBodyName: RequestMethodBodyName = {
  POST: 'data',
  GET: 'params',
  PUT: 'data'
}

export function getCurrentServiceList (options: {
  readonly path: string
  readonly pattern: string,
}): Array<string> {
  const { glob } = utils
  const { path, pattern } = options

  return glob.sync(pattern, {
    cwd: path
  })
  .map((f: string) => {
    return join(path, f)
  })
  .map(utils.winPath)
  .filter((f: string) => {
    if (/\.d.ts$/.test(f)) return false
    if (/\.(test|e2e|spec).(j|t)sx?$/.test(f)) return false
    return true
  })
}

export function parsePathsInObject (
  paths: Array<string>
): Array<RequestBaseConfig> {

  console.log('[create]: require')
  return paths.map((p: string) => {

    console.log(require.resolve(p))

    delete require.cache[require.resolve(p)]
    return utils.compatESModuleRequire(require(p))
  })
}


/**
 * 
 * @param { string } url 当前标准url
 * @param linkParameter 当前url上的param参数
 * @returns { string } 产生的模板链接
 * `/${param}`
 */
export function stringIfyRequestPathJoin (
  url: string,
  linkParameter: Array<string>
): string {
  const stringIfyLink = linkParameter.map((
    param: string
  ) => '/${' + param + '}')
  return `${url}${stringIfyLink.join('')}`
}


/**
 * 
 * @param { Array<string> } linkParameter 当前link params参数列表
 * @returns { string } 导出template语句
 */
export function getExportPayloadTemplate (linkParameter: Array<string>): string {
  if (linkParameter.length > 0) {
    return `const { ${ linkParameter.join(', ') }, ...data } = payload`
  }
  return ''
}


export function defineRequestConfig (config: RequestBaseConfig): RequestBaseConfig
export function defineRequestConfig (config: any) {
  return config
}