import { ServiceConfig } from '@/@types/form-design/service-config'
import common, { post } from '@/tools/common';
import axios, { AxiosInstance } from 'axios';
    
/** 基础数据URL */
const baseDataUrl: string = 'form/GetBaseTable';
/** 视图数据URL */
const viewDataUrl: string = 'form/GetViewTable';

/** 获取基础数据 */
function getBaseData(baseUrl?: string): Promise<Array<Record<string, any>>> {
    return new Promise((resolve, reject) => {
        common.post((baseUrl || '') + baseDataUrl).then(d => {
            resolve(d?.map(i => ({
                label: `${i.summary} [${i.table_name}]`,
                value: i.table_name,
            })) || []);
        }).catch(err => {
            reject(err);
        });
    });
}

/** 获取视图数据 */
function getViewData(baseUrl?: string): Promise<Array<Record<string, any>>> {
    return new Promise((resolve, reject) => {
        common.post((baseUrl || '') + viewDataUrl).then(d => {
            resolve(d?.map(i => ({
                label: `${i.summary} [${i.view_code}]`,
                value: i.view_code,
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
        
        getBaseData(this._baseUrl).then(d => {
            this.baseData = d;
        })
        getViewData(this._baseUrl).then(d => {
            this.viewData = d;
        })
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