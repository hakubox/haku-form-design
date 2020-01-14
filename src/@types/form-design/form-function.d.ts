import { FormControl } from "./main";
import { Enum } from "@/config/enum";

/** 事件 */
export declare class FormFunction {
    /** 事件名称 */
    name: string;
    /** 标题 */
    title?: string;
    /** 备注 */
    remark?: string;
    /** 字符串参数 */
    params?: string;
    /** 函数字符串 */
    body?: string;
    /** 函数声明 */
    declare?: string;
}