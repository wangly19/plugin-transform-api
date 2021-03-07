import request from '{{{ requestPath }}}'


{{ #requestASTModules }}

export function {{ functionName }} <T = any, O = Record<string, any>, R = any>(
  payload?: T = {}, 
  options?: O = {},
): Promise<R> {

  {{#exportTemp}}
    {{{ exportTemp }}}
  {{/exportTemp}}
  {{^exportTemp}}
    /* [info]: @no link params */
  {{/exportTemp}}
  
  return request( `{{{ url }}}`, {
    {{ paramType }}: {{#exportTemp}}data{{/exportTemp}}{{^exportTemp}}payload{{/exportTemp}},
    method: '{{ method }}',
    ...options
  })
}

{{ /requestASTModules }}