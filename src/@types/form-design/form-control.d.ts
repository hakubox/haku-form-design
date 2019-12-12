import { BasicControl, FormControlProperty } from "./main";
import { Enum } from "@/config/enum";

/** 表单控件 */
export declare class FormControl {
    /** 控件ID（全局唯一） */
    id: string;
    /** 控件名称 */
    name: string;
    /** 控件 */
    control: BasicControl;
    /** 控件图标 */
    icon?: string;
    /** 控件标题 */
    title: string;
    /** 控件简要说明 */
    description?: string;
    /** 控件类型 */
    type?: Enum.FormControlType;
    /** 控件属性 */
    propertys: Array<FormControlProperty>;
    /** 默认控件属性编辑器 */
    propertyEditors?: Record<string, Enum.FormControlPropertyEditor>;

    /** 控件高度 */
    height?: number;
    /** 子组件区域选择器（与插槽无关） */
    childrenSlot?: string;
    /** 子控件 */
    children?: Array<Array<FormControl>>;
    /** 备注名 */
    remark?: string;
    /** 自动命名前缀 */
    autoPrefix?: string;
    /** 是否为表单项 */
    isFormItem?: boolean;
}