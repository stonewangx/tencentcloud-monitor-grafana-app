import { QAAPInstanceAliasList, QAAPInvalidDemensions, namespace, templateQueryIdMap } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class QAAPDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = QAAPInstanceAliasList;
  InvalidDimensions = QAAPInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'gaap',
    action: 'DescribeProxies',
    responseField: 'ProxySet',
    interceptor: {
      // response: (data: unknown[]) =>[
      //   {
      //     "NetDetectId": "netd-12345678",
      //   },
      // ],
    },
  };
  // MetricReqConfig = {
  //   resultFilter: modifyDimensons,
  // };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
}
