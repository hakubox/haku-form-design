/** 基础组件 */
export declare class BasicControl {
    /** 组件Id，即为Ref */
    id?: string;
    /** 编辑器组件 */
    control: string;
    /** 组件属性 */
    attrs: Record<string, any>;
    /** 组件属性 */
    events: Record<string, any>;
    /** 修改前的组件属性 */
    propAttrs: Record<string, any>;
    /** 组件默认属性 */
    defaultAttrs?: Record<string, any>;
    /** 编辑器插槽 */
    slot: Record<string, Array<BasicControl>>;
    /** 包含的HTML */
    html?: string;
    /** 是否为主控件 */
    isMain?: boolean;
}