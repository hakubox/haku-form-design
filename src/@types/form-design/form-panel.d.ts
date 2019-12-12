import { FormControl } from "./main";

/** 包含一个控件列表的表单区域 */
export declare class FormPanel {
    /** 区域名称 */
    name?: string;
    /** 控件堆叠方向 */
    direction: string;
    /** 控件列表 */
    children: Array<FormControl>;
}