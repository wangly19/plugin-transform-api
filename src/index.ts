import { IApi } from '@umijs/types';
import { join } from 'path'
import { readFileSync } from 'fs'

import { 
  getCurrentServiceList,
  parsePathsInObject,
  RequestBaseConfig
} from './util'

export default function (api: IApi) {
  
  /**
   * 插件部分工具方法导出
   * @see https://umijs.org/zh-CN/plugins/api
   */
  const { 
    logger, 
    paths, 
    utils 
  } = api

  logger.info('正在加载transform-api插件')

  /**
   * 当前配置的目录路径
   * @returns { string }
   */
  function getServicesDir (): string {
    return api.config.transformApi?.path || 'api'
  }

  /**
   * 当前配置的src绝对路径
   * @returns { string }
   */
  function getSrcServicePath(): string {
    return join(paths.absSrcPath!, getServicesDir())
  }

  /**
   * 声明当前api配置
   * @example
   * { transformApi: true }
   * @type { boolean } transformApi
   * @returns { unknown }
   */
  api.describe({
    key: 'transformApi',
    config: {
      default: {},
      schema(joi) {
        return joi.object({
          path: joi.string(),
          requestPath: joi.string()
        })
      }
    },
  })

  /**
   * 创建当前临时文件，编辑到.umi目录下
   * @link @/.umi/plugin-transform-api
   * @returns { unknown }
   */
  api.onGenerateFiles(() => {

    const { Mustache } = utils

    const paths: Array<string> = getCurrentServiceList({
      path: getSrcServicePath(),
      // pattern: `**/${getServicesDir()}/**/*.{ts,tsx,js,jsx}`
      pattern: '**/*.{ts,tsx,js,jsx}'
    })
    const requestConfigList: Array<RequestBaseConfig> = parsePathsInObject(paths)

    
    const runtimeTpl = readFileSync(join(__dirname, '/template/runtime_build.tpl'), 'utf-8');

    api.writeTmpFile({
      path: 'plugin-service/api.ts',
      content: Mustache.render(runtimeTpl, {
        REQUEST_PATH: 'umi-request'
      })
    })
  })

}
