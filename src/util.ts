import { utils } from 'umi'
import { join } from 'path'

/**
 * API约束数据类型
 */
export type RequestMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'OPTIONS' | 'PATCH'
export type RequestMethodAndURL = `${RequestMethod} /${string}`
export type RequestBaseConfig = Record<string, RequestMethodAndURL>

export function defineRequireConfig (config: RequestBaseConfig): RequestBaseConfig {
  return config
}

export function getCurrentServiceList (options: {
  readonly path: string
  readonly pattern: string,
}): Array<string> {
  const { glob, compatESModuleRequire } = utils
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
  return paths.map((p: string) => require(p))
}


/**
 * 
 * @param { string } url 当前标准url
 * @param linkParameter 当前url上的param参数
 * @returns { string } 产生的模板链接
 */
export function stringIfyRequestPathJoin (
  url: string,
  linkParameter: Array<string>
): string {
  const stringIfyLink = linkParameter.map((
    param: string
  ) => `/{params.${param}}`)
  return `${url}${stringIfyLink.join('')}`
}