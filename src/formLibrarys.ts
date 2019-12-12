import { Enum } from './config/enum';
import FormDesign from './@types/form-design';

export const componentLibrarys: Array<FormDesign.ComponentLibrary> = [
    { code: 'vant', name: 'vant', type: Enum.FormType.mobile },
    { code: 'antd', name: 'ant-design', type: Enum.FormType.pc }
];