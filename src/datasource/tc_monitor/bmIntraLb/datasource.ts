import { BMINTRALBInstanceAliasList, BMINTRALBInvalidDemensions, namespace, templateQueryIdMap } from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = BMINTRALBInstanceAliasList;
  InvalidDimensions = BMINTRALBInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'bmlb',
    action: 'DescribeLoadBalancers',
    responseField: 'LoadBalancerSet',
  };
  RegionMap = {};
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // 重写getRegion
  getRegions() {
    return this.doRequest(
      {
        url: this.url + '/bm',
      },
      'bm',
      { action: 'DescribeRegions', region: 'ap-guangzhou' }
    ).then((response) => {
      // 缓存，后面获取可用区zone
      this.RegionMap = _.keyBy(response.RegionInfoSet, 'Region');
      return _.map(response.RegionInfoSet || [], (item) => {
        return {
          text: item.RegionDescription,
          value: item.Region,
        };
      });
    });
  }

  async getInstances(region, params = {}) {
    const rawSet = await super.getInstances(region, params);
    return rawSet.filter((item) => item.LoadBalancerType === 'internal');
  }

  async getVariableInstances(region, query = {}) {
    const rawSet = await super.getVariableInstances(region, query);
    return rawSet.filter((item) => item.LoadBalancerType === 'internal');
  }
}