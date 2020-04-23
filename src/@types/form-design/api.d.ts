/** API接口 */
export class Api {
    /** 接口Id */
    id: string;
    /** 名称/别名 */
    name: string;
    /** 接口类型 */
    type: 'get' | 'post';
    /** 接口地址 */
    address: string;
    /** 描述 */
    remark: string;
    /** 参数 */
    params?: Record<string, any>;
}