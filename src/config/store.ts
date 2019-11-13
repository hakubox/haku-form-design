import Vue from 'vue';
import Vuex from 'vuex';
import { UserInfo } from '@/@types/basic.d';
import { User } from 'model';

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
        userInfo: {
            id: '',
            name: '',
            nickname: '',
            email: '',
            phone: ''
        }
    },
    getters: {
        /** 获取用户信息 */
        getUserInfo(state): User {
            return state.userInfo;
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
        }
    },
    mutations: {
        setPermissions(state, permissions) {
            state.permissions = permissions;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {}
});
