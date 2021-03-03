import request from '{{ REQUEST_PATH }}'


{{ #REQUEST_FUNCTION_LIST }}

export function {{ METHOD_NAME }} () {}

{{ /REQUEST_FUNCTION_LIST }}