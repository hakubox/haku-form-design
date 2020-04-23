import { ServiceConfig } from '@/@types/form-design/service-config'
import common, { post } from '@/tools/common';
import axios, { AxiosInstance } from 'axios';
import store from '@/config/store';
    
/** 基础数据URL */
const baseDataUrl: string = 'ExtenalApi/GetAllBasicData';
/** 视图数据URL */
const viewDataUrl: string = 'ExtenalApi/GetAllTablesAndViews';

/** 获取基础数据 */
function getBaseData(baseUrl?: string): Promise<Array<Record<string, any>>> {
    return new Promise((resolve, reject) => {
        common.post((baseUrl || '') + baseDataUrl, {
            EnterpriseId: store.getters.getEnterpriseId, 
            LanguageCulture: "zh-CN"
        }).then(d => {
            resolve(d?.map(i => ({
                label: i.chName,
                value: i.id,
            })) || []);
        }).catch(err => {
            reject(err);
        });
    });
}

/** 获取视图数据 */
function getViewData(baseUrl?: string): Promise<Array<Record<string, any>>> {
    return new Promise((resolve, reject) => {
        common.post((baseUrl || '') + viewDataUrl, {
            EnterpriseId: store.getters.getEnterpriseId, 
            LanguageCulture: "zh-CN"
        }).then(d => {
            resolve(d?.bpmViewTables?.map(i => ({
                label: `${i.name} [${i.schemaName}]`,
                value: i.schemaName,
            })) || []);
        }).catch(err => {
            reject(err);
        });
    });
}

/** 服务列表 */
class Service {
    constructor(baseUrl?: string) {
        if (baseUrl) {
            this._baseUrl = baseUrl;
        }
        
        setTimeout(() => {
            getBaseData(this._baseUrl).then(d => {
                this.baseData = d;
            })
            getViewData(this._baseUrl).then(d => {
                this.viewData = d;
            })
        }, 2000);
    }

    private _baseUrl: string = '';
    /** 获取基础URL */
    get baseUrl() {
        return this._baseUrl || axios.defaults.baseURL;
    }

    /** 基础数据 */
    baseData: Array<Record<string, any>> = [];
    /** 视图数据 */
    viewData: Array<Record<string, any>> = [];
}

const _service = new Service();

export default _service;