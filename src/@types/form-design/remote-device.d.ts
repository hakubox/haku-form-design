import { Enum } from "@/config/enum";

/** 设备类型 */
export declare class RemoteDevice {
    /** 设备编号 */
    code: string;
    /** 设备表单类型 */
    type: Enum.FormType;
    /** 设备名称 */
    name: string;
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    /** 设备像素比 */
    pixelRatio: number;
}