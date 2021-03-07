import { IApi } from 'umi';
const { join } = require('path')
const { readFileSync } = require('fs')

import { 
  getCurrentServiceList,
  parsePathsInObject,
  RequestBaseConfig,
} from './util'

export { defineRequestConfig } from './util'

import { 
  RequestASTModule,
  getAllRequestModule,
} from './render';

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
    return api.config.interface?.path || 'api'
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
   * @returns { unknown }
   */
  api.describe({
    key: 'interface',
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
  api.onGenerateFiles(async () => {

    const { Mustache } = utils

    const paths: Array<string> = getCurrentServiceList({
      path: getSrcServicePath(),
      pattern: '**/*.{ts,js,json}'
    })
    const requestConfigList: Array<RequestBaseConfig> = parsePathsInObject(paths)

    const requestASTModules: Array<RequestASTModule> = getAllRequestModule(requestConfigList)
    
    const runtimeTpl = readFileSync(
      join(__dirname, '/template/runtime_fetch.tpl'), 'utf-8'
    );

    api.writeTmpFile({
      path: 'plugin-interface/api.ts',
      content: Mustache.render(runtimeTpl, {
        requestPath: utils.winPath(api.config.interface?.requestPath),
        requestASTModules,
      })
    })

    const exportTpl = readFileSync(
      join(__dirname, '/template/runtime_export.tpl'), 'utf-8'
    );

    api.writeTmpFile({
      path: 'plugin-interface/exports.ts',
      content: Mustache.render(exportTpl, {})
    })

  })

  
  api.addTmpGenerateWatcherPaths(() => {
    const path: string = getSrcServicePath()
    return [path]
  });


  api.addUmiExports(() => {
    return {
      specifiers: ['defineRequireConfig'],
      source: '../plugin-interface/exports'
    }
  });

}