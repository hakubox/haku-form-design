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
            path: '/taskapproval',
            name: 'taskapproval',
            meta: { title: '待审批' },
            component: () => import('@/views/task-handle/TaskApproval.vue')
        }, {
            path: '/myraised',
            name: 'myraised',
            meta: { title: '我的申请' },
            component: () => import('@/views/task-handle/MyRaised.vue')
        }, {
            path: '/myhandled',
            name: 'myhandled',
            meta: { title: '已办任务' },
            component: () => import('@/views/task-handle/MyHandled.vue')
        }, {
            path: '/taskform',
            name: 'taskform',
            meta: { title: '表单' },
            component: () => import('@/views/TaskForm.vue')
        }, {
            path: '/formdesign',
            name: 'formdesign',
            meta: { title: '表单编辑器' },
            component: () => import('@/views/BasicFormDesign.vue')
        }, {
            path: '/taskconfig',
            name: 'taskconfig',
            meta: { title: '流程配置' },
            component: () => import('@/views/task-handle/TaskConfig.vue')
        }, 
    ]
});
