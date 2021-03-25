import {
  RequestBaseConfig,
  RequestMethod,
  RequestMethodAndURL,
  stringIfyRequestPathJoin,
  requestMethodBodyName,
  getExportPayloadTemplate
} from './util';

import { utils } from 'umi';

export type RequestASTModule = {
  functionName: string;
  url: string;
  method: RequestMethod;
  linkParams?: Array<string>;
  exportTemp?: string,
  paramType?: ['data', 'params']
};

export type TupleAfterCutting = [RequestMethod, string];

/**
 * 转换请求函数为AST抽象模块
 * @param { RequestBaseConfig } exportServiceModule 导出的配置对象
 * @returns { Array<RequestASTModule> }
 */
function transformRequestFunctionModule(
  exportServiceModule: RequestBaseConfig,
): Array<RequestASTModule> {
  // 遍历对象
  const requestParameter: Array<RequestASTModule> = Object.keys(
    exportServiceModule,
  ).map((k: string) => {
    const value: RequestMethodAndURL = exportServiceModule[k];
    const [method, transformPreUrl]: TupleAfterCutting = getCurrentMethodAndURL(value,);

    // throw error
    if (!method) {
      throw new Error(
        `[error]: 没有找到当前配置的请求方法，请检查${k}的配置是否正确。`,
      );
    }

    // throw error
    if (!transformPreUrl) {
      throw new Error(
        `[error]: 没有找到当前配置的请求链接api，请检查${k}的配置是否正确。`,
      );
    }

    const { transformAfterURL, linkParameter } = getCurrentLinkParamsAndURL(
      transformPreUrl,
    );

    return {
      functionName: k,
      url: transformAfterURL,
      method,
      linkParams: linkParameter,
      exportTemp: getExportPayloadTemplate(linkParameter),
      paramType: requestMethodBodyName[method] || 'data',
    };
  });

  return requestParameter;
}

/**
 * 获取所有转换后的AST语法模块
 * @returns { Array<RequestASTModule> }
 */
export function getAllRequestModule(
  requestConfig: Array<RequestBaseConfig>,
): Array<RequestASTModule> {
  const currentRequestConfigModule: RequestASTModule[][] = requestConfig.map(
    (config: RequestBaseConfig): Array<RequestASTModule> => {
      return transformRequestFunctionModule(config);
    },
  );

  return utils.lodash.flatten(currentRequestConfigModule);
}

/**
 * 切割当前URL和Method为元组方法
 * @param { RequestMethodAndURL } configAttr 当前配置的url和method
 * @returns { TupleAfterCutting }
 */
function getCurrentMethodAndURL(
  configAttr: RequestMethodAndURL,
): TupleAfterCutting {
  return configAttr.split(' ') as TupleAfterCutting;
}

/**
 * 切割当前url和链接参数
 * @param { string } transformBeforeURL 转换前url
 * @returns { object }
 */
function getCurrentLinkParamsAndURL(
  transformBeforeURL: string,
): {
  transformAfterURL: string;
  linkParameter: Array<string>;
} {
  const [url, ...linkParameter] = transformBeforeURL.split('/:');
  return {
    transformAfterURL: stringIfyRequestPathJoin(url, linkParameter),
    linkParameter,
  };
}
