import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/formdesign',
        }, {
            path: '/formdesign',
            name: 'formdesign',
            meta: { title: '表单编辑器' },
            component: () => import('@/views/BasicFormDesign.vue')
        }
    ]
});
