import { Enum } from "@/config/enum";
import { BasicControl } from "./main";

/** 属性编辑器 */
export declare class PropertyEditor {
    /** 编辑器名称 */
    name: string;
    /** 编辑器描述 */
    description: string;
    /** 编辑器组件 */
    control: Array<BasicControl>;
    /** 编辑器 */
    editor: Enum.FormControlPropertyEditor;
    /** 值转换器 */
    format?(val: any): any; 
}