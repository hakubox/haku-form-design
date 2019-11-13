import { Pagination } from 'ant-design-vue';

/** 分页参数 */
export interface pageFilter {
    /** 每页数据条数 */
    pageSize: number;
    /** 当前页数 */
    pageNum: number;
}

/** 面包屑 */
export interface Breadcrumb {
    /** 标签文本 */
    title: string;
    /** 跳转地址 */
    url?: string;
    /** 图标 */
    icon?: string;
    /** 点击事件 */
    click?: Function
}

/** 用户信息 */
export interface UserInfo {
    id?: string,
    name?: string,
    rolename?: string,
    nickname?: string,
    phone?: string,
    email?: string,
    createtime?: Date | number
}

/** 页面用非可空分页类 */
export declare class PagePagination extends Pagination {
    total: number;
    defaultCurrent: number;
    current: number;
    defaultPageSize: number;
    pageSize: number;
    size: string;
    orderBy: string;
    sort: string;
    filters: object;
}

/** 弹窗查询Model */
export interface QueryDto {
    /** 数据源编号 */
    code: string,
    /** 分页 */
    inputPage: PagePagination,
    /** 过滤键值 */
    filters?: object
}
/** 弹窗列 */
export interface Column {
    /** 列明 */
    name: string,
    /** 字段名 */
    colname: string,
    /** 是否显示 */
    isdisplay: boolean,
    /** 对齐方式 */
    alignment: string,
}