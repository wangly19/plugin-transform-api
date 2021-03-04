import { type } from 'os'
import { 
  RequestBaseConfig,
  RequestMethod,
  RequestMethodAndURL,
} from './util'

export type RequestASTModule = {
  functionName: string,
  url: string
  method: RequestMethod
  params?: Record<string, keyof any>
  data?: Record<string, keyof any>
  query?: Record<string, keyof any>
}

export type TupleAfterCutting = [RequestMethod, string]

/**
 * 转换请求函数为AST抽象模块
 * @returns { RequestASTModule }
 */
export function transformRequestFunctionModule (
  exportServiceMoudle: RequestBaseConfig
): RequestASTModule {

  // 遍历对象
  const requestParameter: Array<RequestASTModule> =  Object.keys(
    exportServiceMoudle
  ).map(((k: string) => {
    const value: RequestMethodAndURL = exportServiceMoudle[k]
    const [ method, transformPreUrl ]: TupleAfterCutting = getCurrentMethodAndURL(value)

    // throw error
    if (method) {
      throw new Error(`[error]: 没有找到当前配置的请求方法，请检查${k}的配置是否正确。`)
    }

    // throw error
    if (transformPreUrl) {
      throw new Error(`[error]: 没有找到当前配置的请求链接api，请检查${k}的配置是否正确。`)
    }

    const { transformAfterURL, linkParameter } = getCurrentLinkParamsAndURL(transformPreUrl)

    // TODO
    return {
      functionName: k,
    }
  }))
}


/**
 * 切割当前URL和Method为元组方法
 * @param { RequestMethodAndURL } configAttr 当前配置的url和method
 * @returns { TupleAfterCutting }
 */
export function getCurrentMethodAndURL (
  configAttr: RequestMethodAndURL
): TupleAfterCutting {
  return configAttr.split(' ') as TupleAfterCutting
}

/**
 * 切割当前url和链接参数
 * @param { string } transformBeforeURL 转换前url
 * @returns { object }
 */
export function getCurrentLinkParamsAndURL (transformBeforeURL: string): {
  transformAfterURL: string,
  linkParameter: Array<string>,
} {
  const [transformAfterURL, ...linkParameter] = transformBeforeURL.split('/:')
  return {
    transformAfterURL,
    linkParameter
  }
}

/**
 * 获取所有转换后的AST语法模块
 * @returns { Array<RequestASTModule> }
 */
export function getAllRequestModule () {}

export function generateRequestFunctionModules () {}