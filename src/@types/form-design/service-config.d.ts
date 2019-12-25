
/** 服务配置 */
export declare class ServiceConfig {
    /** 基础服务域名 */
    baseUrl: string;

    /** 基础数据 */
    baseData?: any[];
    /** 基础数据API地址 */
    baseDataUrl?: string;
    /** 基础数据标题字段 */
    baseDataTitleField?: string;
    /** 基础数据值字段 */
    baseDataValueField?: string;

    viewData?: any[];
    /** 视图数据API地址 */
    viewDataUrl?: string;
    /** 视图数据标题字段 */
    viewDataTitleField?: string;
    /** 视图数据值字段 */
    viewDataValueField?: string;
}