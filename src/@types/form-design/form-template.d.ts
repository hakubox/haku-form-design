import { Form } from "ant-design-vue";
import { FormControl, FormVariable, FormFunction } from "./main";

/** 表单模板 */
export declare class FormTemplate {
    /** Code */
    code: string;
    /** 标题 */
    title: string;
    /** 描述 */
    description?: string;
    /** 设备类型 */
    deviceType: 'pc' | 'mobile';
    /** 组件库code */
    library: string;
    /** 控件列表 */
    controls: Array<FormControl>;
    /** 初始变量 */
    variables?: string;
    /** 初始函数 */
    functions?: string;
}