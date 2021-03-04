import * as request from '{{ REQUEST_PATH }}'


{{ #REQUEST_FUNCTION_LIST }}

export function {{ METHOD_NAME }} () {
  return request({
    
  })
}

{{ /REQUEST_FUNCTION_LIST }}