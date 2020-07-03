import ElementUI from 'element-ui';
import axios from 'axios';

const { Message } = ElementUI;

const instance = axios.create({
  timeout: 10000,
  baseURL: 'http://localhost:8080',
});

class Gateway {
  request(method, url, payload, config = {}) {
    const params = method === 'get' ? payload : null;
    const data = method === 'post' ? payload : null;
    return new Promise((resolve, reject) => {
      instance({
        method, url, data, params, ...config,
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  // 统一处理请求
  proxyRequest(method, url, payload, config) {
    return new Promise((resolve, reject) => {
      this.request(method, url, payload, config).then((res) => {
        if (res.code !== 0) {
          Message.error({
            duration: 1000,
            message: res.message || '接口请求错误，稍后重试',
          });
          return;
        }
        resolve(res);
      }).catch((err) => {
        Message.error({
          duration: 1000,
          message: err.message || '接口请求错误，稍后重试',
        });
        reject(err);
      });
    });
  }
}

export default Gateway;
