const axios = require("axios");

class ApiVtex {
  constructor(config) {
    this.accountName = config.accountName;
    this.appKey = config.appKey;
    this.appToken = config.appToken;
    this.environment = config.environment;
    this.commonHeaders = {
      "X-VTEX-API-AppKey": config.appKey,
      "X-VTEX-API-AppToken": config.appToken,
    };
  }
  updatePrices = async (priceSku, data) => {
    let config = {
      method: "put",
      url: `https://api.vtex.com/${this.accountName}/pricing/prices/${priceSku}`,
      headers: this.commonHeaders,
      data,
    };
    return axios(config);
  };
  updateStock = async (skuId, warehouseId, data) => {
    let config = {
      method: "put",
      url: `https://${this.accountName}.${this.environment}.com.br/api/logistics/pvt/inventory/skus/${skuId}/warehouses/${warehouseId}`,
      headers: this.commonHeaders,
      data: data,
    };
    return axios(config);
  };
  getDefaultWarehouseId = async () => {
    let config = {
      method: "get",
      url: `https://logistics.${this.environment}.com.br/api/logistics/pvt/configuration/warehouses?an=${this.accountName}`,
      headers: this.commonHeaders,
    };
    return axios(config);
  };
  create = async (info) => {
    let config = {
      method: info.method,
      url: info.url,
      headers: this.commonHeaders,
      data: info.data,
    };
    return axios(config);
  };
}

module.exports = ApiVtex;
