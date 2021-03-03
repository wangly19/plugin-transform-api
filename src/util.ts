import { utils } from 'umi'
import { join } from 'path'

/**
 * API约束数据类型
 */
export type RequestMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'OPTIONS'
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

export function parsePathsInObject (paths: Array<string>): Array<RequestBaseConfig> {
  return paths.map((p: string) => require(p))
}