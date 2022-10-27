import {
  type AdapterResponse,
  type ResponseInterceptor,
  setup
} from '@gopowerteam/request'
import { AxiosAdapter } from '@gopowerteam/request/adapters'
class StatusInterceptors implements ResponseInterceptor {
  exec(respone: AdapterResponse) {
    return respone.status < 400
  }
}

class SuccessInterceptors implements ResponseInterceptor {
  exec(response: AdapterResponse) {
    return response.data
  }
}

class ErrorInterceptors implements ResponseInterceptor {
  exec(response: AdapterResponse) {
    return response.data
  }
}

class ExceptionInterceptors implements ResponseInterceptor {
  exec(response: AdapterResponse) {
    console.error(response)
  }
}

export default function httpSetup() {
  // 配置服务端信息
  setup({
    gateway: 'https://mall-service.gopowerteam.cn',
    adapter: new AxiosAdapter(),
    qs: {
      arrayFormat: 'repeat',
      skipNulls: true,
      allowDots: true,
      encodeValuesOnly: true,
      encode: true
    },
    interceptors: {
      status: new StatusInterceptors(),
      success: new SuccessInterceptors(),
      error: new ErrorInterceptors(),
      exception: new ExceptionInterceptors()
    },
    plugins: []
  })
}
