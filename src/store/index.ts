import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        formVariables: []
    },
    mutations: {},
    getters: {
        getFormVariables: state => (value): any => {
            return state.formVariables;
        }
    },
    actions: {},
    modules: {}
});
