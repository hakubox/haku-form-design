import Vue, { VNode } from 'vue';
import lodash from 'lodash';
import { VueCookies } from 'vue-cookies';

declare global {

    /** cookie操作类 */
    const $cookies: VueCookies;

    interface Sass {
        /** 编译 */
        compile(scssTxt: string, cb: (result: { text: string }) => any);
    }

    const _: typeof lodash;
    const Sass: Sass;
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }

    interface Date {
        /**
         * 日期格式化
         * @param {string} [fmt='yyyy-MM-dd'] 格式化参数
         * @returns 格式化后的字符串
         */
        format(fmt: string): string;
    }
}

declare module 'axios' {
    interface AxiosRequestConfig {
        /** 用于撤销请求的函数 */
        cancel?: Function;
    }
}