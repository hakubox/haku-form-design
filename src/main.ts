import '@/tools/registerComponentHooks.ts';
import Vue from "vue";
import App from "./App.vue";
import router from "@/config/router";
import store from "@/config/store";
import axios from 'axios';
import vueCookie from 'vue-cookies';
import moment, { Moment } from 'moment';
import { Base64 } from 'js-base64';
import '@/config/enum';
// import lessLoader from '@/lib/less-loader';
//公共函数库
import * as common from '@/tools/common';

//全局枚举
moment.locale('zn-cn');

window['moment'] = moment;

const packageInfo = require('../package.json');

//自定义指令
import "@/tools/directives";
//筛选器
import "@/tools/filters";
//ant-design-vue
import "@/config/components";
// import '@/assets/less/variables.less';
//自定义组件库
import components from "@/tools/registerGlobalComponents.ts";
//主样式
// import '@/assets/scss/basic.scss';
//Fontawesome
// import '@fortawesome/fontawesome-pro/scss/fontawesome.scss';
// import '@fortawesome/fontawesome-pro/scss/light.scss';
// import '@fortawesome/fontawesome-pro/scss/regular.scss';
// import '@fortawesome/fontawesome-pro/scss/solid.scss';
//多语言
import VueI18n from 'vue-i18n';
import lang_en from '@/lang/en';
import lang_zn_CN from '@/lang/zh-CN';
import { Breadcrumb, PagePagination } from '@/@types/basic';

//let hakuDebug = require('./lib/haku-debug/index').default;

axios.defaults.baseURL = process.env.VUE_APP_INTERFACE;

Vue.use(components);


Vue.config.productionTip = false;
Vue.prototype.$cookie = vueCookie;
Vue.prototype.$common = common;
Vue.prototype.$axios = axios;
Vue.prototype.dateFormat = common.dateFormat;
Vue.prototype.$api = axios.create({
    baseURL: process.env.VUE_APP_DESIGNER_INTERFACE,
    timeout: 3000
});
Vue.prototype.$store = store;
Vue.prototype.$config = {};
Object.defineProperties(Vue.prototype.$config, Object.assign({}, ...Object.entries(process.env).map(([key, value]) => ({ [key.replace('VUE_APP_', '')]: { get() { return process.env[key] } } }))));

//Axios拦截器
axios.interceptors.response.use(function (response) {
    if(response.headers['NewToken']) {
        localStorage.setItem('Authorization', response.headers['NewToken']);
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

//主题
import setTheme from '@/config/theme';
Vue.prototype.$setTheme = setTheme;
setTheme('default');

//EventBus
const bus = new Vue();
Vue.prototype.$bus = bus;

Vue.use(VueI18n);

let i18n = new VueI18n({
    locale: 'zh-CN',
    fallbackLocale: 'en',
    silentFallbackWarn: true,
    messages: {
        ['en']: { lang_en },
        ['zh-CN']: { lang_zn_CN }
    }
});

let isPageInit = false;
let __vue:Vue = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    data: () => ({
        packageInfo: packageInfo,
        /** 面包屑 */
        breadcrumbSource: []
    }),
    async created() {
        
        //获取权限
        // if (localStorage.getItem('Authorization')) {
        //     let permissions = '';
        //     try {
        //         permissions = await api.funcation.GetFunctionListByUserId();
        //     } catch (error) {
        //         console.log(error);
        //         localStorage.removeItem('Authorization');
        //         router.push('/login');
        //         return;
        //     }
        //     store.commit('setPermissions', permissions);

        //     let userInfo = await api.user.GetUser();
        //     store.commit('setUserInfo', userInfo);
        // } else {
        //     router.push('/login');
        // }
    },
    mounted() {
        isPageInit = true;
    },
    methods: {
        login() {
            try {
                let authorization = this.$cookie.get('Authorization').split('.')[1];
                authorization = Base64.decode(authorization);
                const jwtInfo = new Function('return ' + authorization)();
                store.commit('setUserInfo', jwtInfo);
            } catch (error) {
                console.error(error);
                this.$message.error('获取用户信息失败。');
            }
        },
        /**
         * @method setBreadcrumb 设置面包屑
         * @param {Array} arr 面包屑路径
         */
        setBreadcrumb(arr: Array<Breadcrumb | string>):void {
            let initArr:Array<any> = [
                {
                    title: this.$config.TITLE,
                    url: '/'
                }
            ];
            this.$set(this, 'breadcrumbSource', initArr.concat(
                arr.map(i => {
                    if (typeof i == 'string') {
                        return { title: i };
                    } else {
                        return i;
                    }
                })
            ));
        },
        /** 获取分页器默认属性 */
        getPagination(config: PagePagination): PagePagination {
            return {
                pageSizeOptions: ['5', '10', '20', '40'],
                showQuickJumper: true,
                showSizeChanger: true,
                defaultCurrent: 1,
                current: 1,
                pageSize: 10,
                defaultPageSize: 10,
                total: 100,
                ...config
            };
        },
        /** 注销 */
        logout() {
            localStorage.removeItem('Authorization');
            this.$router.push('/login');
        }
    }
});
    
Vue.mixin({
    /** 组件权限判断 */
    created(this:Vue) {
        if(this.$attrs.permission !== undefined) {
            if(!this.$store.getters.checkPermissions(this.$attrs.permission)) {
                //@ts-ignore
                this._render = function() {
                    //@ts-ignore
                    let node = new this.$vnode.constructor();
                    node.text = '';
                    node.isComment = true;
                    return node;
                };
            }
        }
    },
    /** 组件错误样式 */
    renderError(h, err) {
        return h('pre', { style: { color: 'red' }, class: 'ant-alert ant-alert-error'}, err.stack)
    }
});

router.afterEach((to, from) => {
    if (to?.meta?.title) {
        document.title = to.meta.title;
    }
})

//页面跳转校验
router.beforeEach((to, from, next) => {

    

    if(!to.meta || !to.meta.permission || store.getters.checkPermissions(to.meta.permission)) {
        if(isPageInit) {
            bus.$emit("routerchange", to);
        } else {
            localStorage.setItem('routerchange', JSON.stringify(to));
        }
        
        next();
    } else {
        next('/front/403');
    }
});

//自研异常监控平台
// hakuDebug({
//     vue: _vue,
//     axios: axios
// });

__vue.$mount('#app');