import { IApi } from '@umijs/types';

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
      default: false,
      schema(joi) {
        return joi.boolean()
      }
    },
    enableBy: api.EnableBy.config,
  })

  /**
   * 创建当前临时文件，编辑到.umi目录下
   * @link @/.umi/plugin-transform-api
   * @returns { unknown }
   */
  api.onGenerateFiles(() => {

  })

}
