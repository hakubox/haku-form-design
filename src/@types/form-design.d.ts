import { VanComponent } from 'vant/types/component';
import Vue, { Component, VNode } from 'vue';
import { Enum } from '@/config/enum';
import { Field } from 'ant-design-vue/types/form/form';
import { AntdComponent } from 'ant-design-vue/types/component';

/** 表单编辑器 */
export namespace FormDesign {

    export class AntdComponent {
        static name: string;
        static install(vue: typeof Vue): void;
    }

    /** 简单坐标接口 */
    export interface Location {
        /** X坐标 */
        x: number;
        /** Y坐标 */
        y: number;
    }

    /** 拖拽组件配置 */
    export interface DragConfig {
        /** 是否开始预拖拽 */
        isPreDrag: boolean;
        /** 是否开始正式拖拽 */
        isDrag: boolean;
        /** 是否进入放置范围 */
        isDragArea: boolean;
        /** 正在拖拽的组件 */
        control: any;
        /** 要插入的组件Id（非父组件的情况默认插入组件前） */
        insertControlId: string;
        /** 要插入的父控件Slot索引 */
        insertControlSlotIndex?: number;
        /** 用于移动的组件Id */
        targetFormControlId: string;
        /** 开始坐标 */
        startLoc: Location;
        /** 结束坐标 */
        endLoc: Location;
    }

    export interface FormFooterConfig {
        /** 是否显示 */
        isShow: boolean;
        /** 提交按钮文本 */
        submitButtonText: string;
        /** 是否显示取消按钮 */
        cancelButton: boolean;
        /** 取消按钮文字 */
        cancelButtonText: string;
    }

    /** 表单基本配置 */
    export interface FormConfig {
        /** 面板标题 */
        canvasTitle: string;
        /** 表单标题 */
        formTitle: string;
        /** 表单名称 */
        formName: string;
        /** 表单宽度 */
        width: number;
        /** 表单高度 */
        height: number;
        /** 表单头部高度 */
        headerHeight: number;
        /** 表单数据 */
        data: Record<string, any>;
        /** 设备类型 */
        deviceId: string;
        /** 底部按钮配置 */
        footer: FormFooterConfig;
    }

    /** 设备类型 */
    export interface RemoteDevice {
        /** 设备名称 */
        name: string;
        /** 宽度 */
        width: number;
        /** 高度 */
        height: number;
        /** 设备像素比 */
        pixelRatio: number;
    }

    /** 组件类型分组 */
    export interface FormControlGroup {
        /** 分组名称 */
        name: string;
        /** 分组标题 */
        title: string;
        /** Antd图标名 */
        icon?: string;
        /** 组件清单 */
        controls: Array<FormControl>;
    }

    /** 包含一个控件列表的表单区域 */
    export interface FormPanel {
        /** 区域名称 */
        name?: string;
        /** 控件堆叠方向 */
        direction: string;
        /** 控件列表 */
        children: Array<FormControl>;
    }

    /** 属性 */
    export interface FormControlProperty {
        /** 属性名 */
        name: string;
        /** 属性中文名 */
        title: string;
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
        /** 布局方式，默认为行内布局 */
        layout?: Enum.PropertyLayout;
    }

    /** 基础组件 */
    export interface BasicControl {
        /** 组件Id，即为Ref */
        id?: string;
        /** 编辑器组件 */
        control: string;
        /** 组件属性 */
        attrs: Record<string, any>;
        /** 组件事件 */
        event?: Record<string, any>;
        /** 组件默认属性 */
        defaultAttrs?: Record<string, any>;
        /** 编辑器插槽 */
        slot: Record<string, Array<BasicControl>>;
        /** 包含的HTML */
        html?: string;
        /** 是否为主控件 */
        isMain?: boolean;
    }

    /** 属性编辑器 */
    export interface PropertyEditor {
        /** 编辑器名称 */
        name: string;
        /** 编辑器组件 */
        control: Array<BasicControl>;
        /** 编辑器 */
        editor: Enum.FormControlPropertyEditor;
        /** 值转换器 */
        format?(val: any): any; 
    }

    /** 属性组 */
    export interface PropertyGroup {
        /** 属性名 */
        title: string;
        /** 属性列表 */
        propertys: Array<FormControlProperty>;
    }

    /** 表单控件 */
    export interface FormControl {
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

        /** 控件高度 */
        height?: number;
        /** 子组件区域选择器（与插槽无关） */
        childrenSlot?: string;
        /** 子控件 */
        children?: Array<Array<FormControl>>;
    }

    //Record<string, any>;
}