import Gateway from '../gateway';

export default class Bill extends Gateway {
  async queryBillingList(payload) {
    const data = await this.proxyRequest('get', '/bill/queryBillingList', payload);
    return data;
  }

  async queryTotalAmount(payload) {
    const data = await this.proxyRequest('get', '/bill/queryTotalAmount', payload);
    return data;
  }

  async createBill(payload) {
    const data = await this.proxyRequest('post', '/bill/createBill', payload);
    return data;
  }
}
