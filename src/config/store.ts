import Vue from 'vue';
import Vuex from 'vuex';
import { UserInfo } from '@/@types/basic.d';
import { User } from 'model';
import FormDesign from '@/@types/form-design';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        permissions: [
            {
                id: -1,
                code: '',
                name: '',
                remark: ''
            }
        ],
        /** 用户信息 */
        userInfo: {
            /** 用户Id */
            userid: '',
            /** 用户账号 */
            useraccount: '',
            /** 企业Id */
            enterpriseid: ''
        },
        formVariables: [] as Array<FormDesign.FormVariable>,
        formFunctions: [] as Array<FormDesign.FormFunction>,
        formScript: `return {
    data: {

    },
    methods: {
        test() {

        }
    },
    created() {
        
    }
}`,
        formScriptComment: {} as Record<string, string>,
        apiList: [
            {
                name: '',
                type: 'post',
                address: '',
                remark: ''
            }
        ] as FormDesign.Api[]
    },
    getters: {
        /** 获取用户信息 */
        getUserInfo(state) {
            return state.userInfo || {};
        },
        /** 获取用户所有权限 */
        allPermissions(state): Array<string> {
            return state.permissions.map(i => i.code);
        },
        /** 权限校验 */
        checkPermissions: state => (value: undefined | string | Array<string>): boolean => {
            let re = false;
            if(!value) {
                re = true;
            } else if(typeof(value) == 'string') {
                re = !!state.permissions.find(i => i && i.code === value);
            } else if(value instanceof Array) {
                re = value.every(val => !!state.permissions.find(i => i && i.code === val));
            }
            return re;
        },
        getFormScriptCode(state): string {
            return state.formScript;
        },
        getFormScript(state): FormDesign.FormScript {
            return Function(state.formScript)() as FormDesign.FormScript;
        },
        getFormScriptComment(state): Record<string, string> {
            let _reg = /(\/\*\*\s*(?<remark>.*?)\s*\*\/)?\s*(?<name>[a-zA-Z0-9_]+)(:|\()/gs;
            let _item: RegExpExecArray | null;
            let _list: Record<string, string> = {};
            while(_item = _reg.exec(state.formScript)) {
                if (_item !== null) {
                    _list[_item.groups?.name || ''] = _item.groups?.remark || '';
                }
            }
            return _list;
        },
        getApiList(state) {
            return state.apiList;
        },
        /** 获取用户Id */
        getUserId(state) {
            return state.userInfo?.userid ?? '';
        },
        /** 获取用户账号 */
        getUserAccount(state) {
            return state.userInfo?.useraccount ?? '';
        },
        /** 获取企业Id */
        getEnterpriseId(state) {
            return state.userInfo?.enterpriseid ?? '';
        },
        /** 获取SysCode，暂时写死为SRM */
        getSysCode(state) {
            return 'SRM';
        }
    },
    mutations: {
        setPermissions(state, permissions) {
            state.permissions = permissions;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setFormScript(state, script) {
            state.formScript = script;
        },
        setApiList(state, apiList) {
            state.apiList = apiList;
        }
    },
    actions: {}
});
