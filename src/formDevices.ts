import FormDesign from './@types/form-design';
import { Enum } from './config/enum';

/** 设备型号列表 */
export const remoteDevices: Array<FormDesign.RemoteDevice> = [
    /** 移动端设备 */
    {
        code: 'galaxys5',
        type: Enum.FormType.mobile,
        name: 'Galaxy S5',
        width: 360,
        height: 640,
        pixelRatio: 3
    }, {
        code: 'pixel2',
        type: Enum.FormType.mobile,
        name: 'Pixel 2',
        width: 411,
        height: 731,
        pixelRatio: 2.625
    }, {
        code: 'pixel2xl',
        type: Enum.FormType.mobile,
        name: 'Pixel 2 XL',
        width: 411,
        height: 823,
        pixelRatio: 3.5
    }, {
        code: 'iphone5se',
        type: Enum.FormType.mobile,
        name: 'iPhone 5/SE',
        width: 320,
        height: 568,
        pixelRatio: 2
    }, {
        code: 'iphone678',
        type: Enum.FormType.mobile,
        name: 'iPhone 6/7/8',
        width: 375,
        height: 667,
        pixelRatio: 2
    }, {
        code: 'iphone678plus',
        type: Enum.FormType.mobile,
        name: 'iPhone 6/7/8 Plus',
        width: 414,
        height: 736,
        pixelRatio: 3
    }, {
        code: 'iphonex',
        type: Enum.FormType.mobile,
        name: 'iPhone X',
        width: 375,
        height: 812,
        pixelRatio: 3
    }, {
        code: 'ipad',
        type: Enum.FormType.mobile,
        name: 'iPad',
        width: 768,
        height: 1024,
        pixelRatio: 2
    }, { 
        code: 'ipadpro',
        type: Enum.FormType.mobile,
        name: 'iPad Pro',
        width: 1024,
        height: 1366,
        pixelRatio: 2
    },

    /** PC端设备 */
    {
        code: 'xsmallpc',
        type: Enum.FormType.pc,
        name: '4:3小分辨率屏',
        width: 1024,
        height: 768,
        pixelRatio: 1
    }, {
        code: 'smallpc',
        type: Enum.FormType.pc,
        name: '小分辨率屏',
        width: 1366,
        height: 768,
        pixelRatio: 1
    }, {
        code: 'middlepc',
        type: Enum.FormType.pc,
        name: '中分辨率屏',
        width: 1600,
        height: 900,
        pixelRatio: 1
    }, {
        code: 'largepc',
        type: Enum.FormType.pc,
        name: '1080P屏',
        width: 1920,
        height: 1080,
        pixelRatio: 1
    }, {
        code: '2kpc',
        type: Enum.FormType.pc,
        name: '2K屏',
        width: 2560,
        height: 1440,
        pixelRatio: 1
    }, {
        code: '4kpc',
        type: Enum.FormType.pc,
        name: '4K屏',
        width: 3840,
        height: 2160,
        pixelRatio: 1
    }
];

export function initRemoteDevices(): Record<string, FormDesign.RemoteDevice> {
    // @ts-ignore
    return Object.assign.apply({}, remoteDevices.map(i => ({
        [i.code]: i
    })));
}