import { Location } from '@/@types/form-design/location'

/** 拖拽组件配置 */
export declare class DragConfig {
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