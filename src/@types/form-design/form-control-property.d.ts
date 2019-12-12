import { FormControl } from "./main";
import { Enum } from "@/config/enum";

/** 属性 */
export declare class FormControlProperty {
    /** 属性名 */
    name: string;
    /** 属性中文名 */
    title: string;
    /** 属性类型（目前仅为model属性使用） */
    type?: string | Function;
    /** 备注 */
    remark?: string;
    /** 默认值 */
    default?: any;
    /** 是否必填 */
    require?: boolean;
    /** 是否显示 */
    visible?: boolean;
    /** 是否子级 */
    leaf?: boolean;
    /** 属性分组 */
    group: Enum.FormControlPropertyGroup;
    /** 属性描述 */
    description?: string;
    /** 编辑器 */
    editor: Enum.FormControlPropertyEditor;
    /** 修改属性 */
    change?(prop: FormControlProperty, propList: Record<string, FormControlProperty>, control: Array<FormControl>, value: any, refs: Record<string, Element>): void;
    
    /** 附加属性 */
    attrs?: Record<string, any>;
    /** 附加选项 */
    attach?: Array<Enum.FormControlPropertyEditor>;
    /** 布局方式，默认为行内布局 */
    layout?: Enum.PropertyLayout;

    /** 属性当前的编辑器 */
    // currentEditor?: Enum.FormControlPropertyEditor;
}