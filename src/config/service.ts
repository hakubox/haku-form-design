import { ServiceConfig } from '@/@types/form-design/service-config'
import { post } from '@/tools/common';
import axios from 'axios';

const serviceConfig: ServiceConfig = {
    baseUrl: 'http://127.0.0.1:5020/api/',

    baseDataUrl: 'http://127.0.0.1:5020/api/form/GetBaseTable',
    baseDataTitleField: 'summary',
    baseDataValueField: 'table_name',
    baseData: [],

    viewDataUrl: 'http://127.0.0.1:5020/api/form/GetViewTable',
    viewDataTitleField: 'summary',
    viewDataValueField: 'view_code',
    viewData: [],
}

export default serviceConfig;