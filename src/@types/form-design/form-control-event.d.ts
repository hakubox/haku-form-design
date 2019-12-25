import { FormControl } from "./main";
import { Enum } from "@/config/enum";

/** 事件 */
export declare class FormControlEvent {
    /** 事件名称 */
    name: string;
    /** 事件标题 */
    title: string;
    /** 备注 */
    remark?: string;
    /** 代码段 */
    string?: string;
}