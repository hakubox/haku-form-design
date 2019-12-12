import { FormControl } from "./main";

/** 组件类型分组 */
export declare class FormControlGroup {
    /** 分组名称 */
    name: string;
    /** 分组标题 */
    title: string;
    /** Antd图标名 */
    icon?: string;
    /** 组件清单 */
    controls: Array<FormControl>;
}