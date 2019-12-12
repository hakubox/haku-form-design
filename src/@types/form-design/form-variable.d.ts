import { FormFooterConfig } from "./form-footer-config";

/** 表单变量 */
export declare class FormVariable {

    /** 变量前缀关键字 */
    keyword: 'const' | 'let' | 'var';

    /** 变量名 */
    name: string;

    /** 变量类型 */
    type?: string;

    /** 变量默认值 */
    default?: string;

    /** 注释 */
    remark?: string;

}