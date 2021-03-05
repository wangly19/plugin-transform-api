import * as request from '{{ requestPath }}'


{{ #requestASTModules }}

export function {{ functionName }} ({{ test }}) {
  return request({})
}

{{ /requestASTModules }}