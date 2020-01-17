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
    /** Vue初始化代码 */
    script?: string;
    /** 初始样式（SCSS） */
    style?: string;
}