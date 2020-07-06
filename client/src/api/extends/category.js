import Gateway from '../gateway';

export default class Category extends Gateway {
  async queryCategoryList(payload) {
    const data = await this.proxyRequest('get', '/category/queryCategoryList', payload);
    return data;
  }

  async createCategory(payload) {
    const data = await this.proxyRequest('post', '/category/createCategory', payload);
    return data;
  }
}
