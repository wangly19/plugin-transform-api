

# 约定式接口编译时转换插件

@umijs/plugin-transform-api

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/shaojintian/Best_README_template/">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">@umijs/plugin-transform-api</h3>
  <p align="center">
    一个开发编译时转换 <a>request interface</a> 插件，基于 <a>@umijs</a> 微内核插件开发。
    <br />
    <a href="https://github.com/shaojintian/Best_README_template"><strong>探索本项目 »</strong></a>
    <br />
    <br />
    <a href="https://github.com/shaojintian/Best_README_template">查看示例</a>
    ·
    <a href="https://github.com/shaojintian/Best_README_template/issues">报告Bug</a>
    ·
    <a href="https://github.com/shaojintian/Best_README_template/issues">提出新特性</a>
  </p>

</p>


 本篇README.md面向开发者
 
## 目录

- [简介](##简介)
- [文件目录说明](#文件目录说明)
- [开发的架构](#开发的架构)
- [部署](#部署)
- [使用到的框架](#使用到的框架)
- [贡献者](#贡献者)
  - [如何参与开源项目](#如何参与开源项目)   
- [版本控制](#版本控制)
- [作者](#作者)
- [鸣谢](#鸣谢)

## 简介

插件功能作用于约定式`API`接口配置的编译时转换，为`umijs`提供接口转换能力，开发者不再需要进行频繁的手写`service spi` 函数。插件会自动帮您转换成对应的`Promise<R>`的函数，只需要从`plugin`或者是`umi`中引用就可以完成接口请求的问题。


插件相对来说是在编译时完成的，相对来说，会比运行时处理`约定式接口承诺`减少了多余的开销，利用`umijs`脚手架的`微内核`能力可以做到可拔插，剔除打包依赖的作用。

> 配置 -> 接口函数 -> umi


## 使用方法

通过包管理工具安装当前插件到运行时以来，安装结束后可以在`package.json`的`devDependencies`中可以查看当前版本依赖。

```shell
# yarn
yarn add plugin-interface -D

# npm
npm install plugin-interface -D
```

### 添加插件

根据相应的开发配置引入插件，一般在`.umirc.ts` 或者 `config/*`下配置对应的配置可以对应注入相应功能。参考以下配置: 

```ts
export default defineConfig({
  plugins: ['plugin-interface'],
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  interface: {
    path: 'services',
    requestPath: '@/utils/request'
  }
});

```

相对应插件会在开发时监听对应文件夹下的文件，并且产生最新的`函数接口`。

### 参数配置

|  名称   |  类型  | 描述 | 默认值 |
|  ----  | ----  |---- | ---- |
| path  | `string` | 定义目标当前需要监听的路径地址，默认配置为`api` | `api` |
| requestPath  | `string` | 接口请求函数的页面地址，最终映射到`import()`当中使用 | `__` |
| ...  | `any` |  待添加 | `__` |

### 添加一个配置

如何添加一个最基本的配置来运行脚本添加工具？使用起来是非常方便的。

#### JSON格式文件

```JSON
{
  "getUserInfo": "POST /mall-port/user/info",
  "login": "POST /mall-port/user/login",
  "deleteUser": "POST /mall-port/user/:id"
}
```

#### JS & TS 文件

```javaScript
module.export = {
  getUserInfo: "POST /mall-port/user/info",
  login: "POST /mall-port/user/login",
  deleteUser: "POST /mall-port/user/:id"
}
```

使用以上两种参数行为会为您在`.umi/plugin-interface`下生成新的插件函数，且默认配置为`export`方式。同时会将其`export`的内容导入到`umi`的导出项内。

```typeScript
// @ts-nocheck
import request from 'umi-request'

export function getUserInfo <T = any, O = Record<string, any>, R = any>(
  payload?: T = {}, 
  options?: O = {},
): Promise<R> {

    /* [info]: @no link params */
  
  return request( `/mall-port/user/info`, {
    data: payload,
    method: 'POST',
    ...options
  })
}


export function login <T = any, O = Record<string, any>, R = any>(
  payload?: T = {}, 
  options?: O = {},
): Promise<R> {

    /* [info]: @no link params */
  
  return request( `/mall-port/user/login`, {
    data: payload,
    method: 'POST',
    ...options
  })
}


export function deleteUser <T = any, O = Record<string, any>, R = any>(
  payload?: T = {}, 
  options?: O = {},
): Promise<R> {

    const { id, ...data } = payload
  
  return request( `/mall-port/user/${id}`, {
    data: data,
    method: 'POST',
    ...options
  })
}


```

### 如何引用

当有了一份基于`typeScript`的接口函数，可以通过以下两种方式进行引入。a=a=a==

```typeScript
import { deleteUser } from 'umi'

deleteUser().then()
```

```typeScript
import { deleteUser } from '@@/plugin-interface/api'
deleteUser().then()
```

## 如何参与开源项目

1. 克隆当前仓库
2. 创建你自己的开发分支(`git checkout -b [your branch name]`)
3. 提交你的代码修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到`Github`仓库 (`git push origin feature/AmazingFeature`)
5. 与我联系后，打开一个`PR(Pull Request)`推送给我。
6.  一星期后会进行仓库`branch merge`

## 贡献者

## 资源

- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Img Shields](https://shields.io)
- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Pages](https://pages.github.com)
- [Animate.css](https://daneden.github.io/animate.css)
- [xxxxxxxxxxxxxx](https://connoratherton.com/loaders)

<!-- links -->
[your-project-path]:shaojintian/Best_README_template
[contributors-shield]: https://img.shields.io/github/contributors/shaojintian/Best_README_template.svg?style=flat-square
[contributors-url]: https://github.com/shaojintian/Best_README_template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/shaojintian/Best_README_template.svg?style=flat-square
[forks-url]: https://github.com/shaojintian/Best_README_template/network/members
[stars-shield]: https://img.shields.io/github/stars/shaojintian/Best_README_template.svg?style=flat-square
[stars-url]: https://github.com/shaojintian/Best_README_template/stargazers
[issues-shield]: https://img.shields.io/github/issues/shaojintian/Best_README_template.svg?style=flat-square
[issues-url]: https://img.shields.io/github/issues/shaojintian/Best_README_template.svg
[license-shield]: https://img.shields.io/github/license/shaojintian/Best_README_template.svg?style=flat-square
[license-url]: https://github.com/shaojintian/Best_README_template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/shaojintian




