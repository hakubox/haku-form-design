<template>
    <div class="page-form-design">
        <span v-if="!init">加载中.....</span>
        <component :is="init ? 'todo' : 'div'" :text="myTxt" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

function wait(time: number = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}

@Component({
    components: {}
})
export default class BasicFormDesign extends Vue {

    /** 是否加载完毕 */
    init = false;

    myTxt: string = 'abc';

    // beforeRouteLeave(to, from, next) {
    //     this.$confirm({
    //       title: '是否跳转？',
    //       content: '跳转到另外一个神奇的页面。。。确认是否跳转？？？',
    //       onCancel() {
    //           next(false);
    //       },
    //       onOk() {
    //           next(true);
    //       }
    //     });
    // }

    async created() {
        await wait(3000);
        var todoItem = Vue.extend({
            // template: `<task-form></task-form>`,
            template: `<div>
    <!-- FormTitle  : 测试流程 -->
    <!-- FormName   : TestTask -->
    <!-- CreateDate : 2020-01-18 18:40 -->

    <div class="page-TestTask">

        <van-nav-bar class="home-title" title="测试流程" left-arrow @click-left="$router.go(-1)">
        </van-nav-bar>

        <a-divider v-show='true' text='基本信息' :dashed='false' orientation='left' type='horizontal'></a-divider>
        <a-row type='flex' v-show='true' :gutter='0' tag='div' justify='start' align='top' options='[{"span":12,"offset":0},{"span":12,"offset":0}]'>
            <a-col :span="12" :offset="0">
                <a-form-item :label-col="{ span: 5, offset: 1 }" :wrapper-col="{ span: 18, offset: 0 }" label='申请人'>
                     {{'张三'}}
                </a-form-item>
            </a-col>
            <a-col :span="12" :offset="0">
                <a-form-item :label-col="{ span: 5, offset: 1 }" :wrapper-col="{ span: 18, offset: 0 }" label='申请时间'>
                     {{new Date().format('yyyy-MM-dd HH:mm:ss')}}
                </a-form-item>
            </a-col>
        </a-row>
        <a-row type='flex' v-show='true' :gutter='0' tag='div' justify='start' align='top' options='[{"span":12,"offset":0},{"span":12,"offset":0}]'>
            <a-col :span="12" :offset="0">
                <a-form-item :label-col="{ span: 5, offset: 1 }" :wrapper-col="{ span: 18, offset: 0 }" label='所属部门'>
                     {{'设计部'}}
                </a-form-item>
            </a-col>
            <a-col :span="12" :offset="0">
                <a-form-item :label-col="{ span: 5, offset: 1 }" :wrapper-col="{ span: 18, offset: 0 }" label='申请单号'>
                     {{''}}
                </a-form-item>
            </a-col>
        </a-row>
        <a-row type='flex' v-show='true' :gutter='0' tag='div' justify='start' align='top' options='[{"span":12,"offset":0},{"span":12,"offset":0}]'>
            <a-col :span="12" :offset="0">
                <a-form-item :label-col="{ span: 5, offset: 1 }" :wrapper-col="{ span: 18, offset: 0 }" label='公司信息'>
                     {{'戈吉网络'}}
                </a-form-item>
            </a-col>
            <a-col :span="12" :offset="0">
                <a-form-item :label-col="{ span: 5, offset: 1 }" :wrapper-col="{ span: 18, offset: 0 }" label='成本中心'>
                     {{'XA10000001'}}
                </a-form-item>
            </a-col>
        </a-row>
        <a-divider v-show='true' text='详细信息' :dashed='false' orientation='left' type='horizontal'></a-divider>
        
    </div>
</div>`,
            components: {
            },
            ...(Function(`return {
    data: () => ({
        /** 流程数据 */
        taskData: {
            /** 流程编号 */
            nodeCode: '998',
            /** 草稿id */
            draftId: '',
            /** 任务创建时间 */
            createTime: '',
            /** 审批id */
            procId: '',
            /** 下一步审批id */
            nextProcId: '',
            /** 审批状态 */
            procStatus: '',
            /** 任务id */
            taskId: '',
            /** 按钮id */
            actionId: '',
            /** 按钮描述 */
            action: '',
            /** 审批备注 */
            comments: '',
            /** 是否为开始节点 */
            isStartStep: false,
            /** 是否为自动测试 */
            isAutoTest: false,
            /** 企业id */
            enterpriseId: '',
            /** 任务状态 */
            taskStatus: '',
            /** 表单是否为只读 */
            isReadOnly: false,
            /** 是否结束 */
            isEnd: false,
            /** 转发/询问/加签时选中的账号 */
            assignToUserAccount: ''
        },
        /** 全局数据 */
        applicationData: {
            /** 表单发起时间 */
            requestTime: '',
            /** 业务流水号 */
            snNumber: '',
            /** 表单打开时的登录账号 */
            openFormUserAccount: '',
            /** 审批人账号 */
            procUserAccount: '',
            /** 当前用户姓名 */
            currentUserName: '',
            /** 当前用户账号 */
            currentUserAccount: '',
            /** 申请人账号 */
            applicantUserAccount: '',
            /** 申请人是否有效 */
            applicantActive: '',
            /** 申请人姓名 */
            applicantUserName: '',
            /** 申请人邮箱 */
            applicantEMail: '',
            /** 申请人部门 */
            applicantDepartment: '',
            /** 发起人账号 */
            initiatorUserAccount: '',
            /** 发起人姓名 */
            initiatorUserName: '',
            /** 发起人邮箱 */
            initiatorEMail: '',
            /** 发起人部门 */
            initiatorDepartment: '',
        },
        /** 表单数据 */
        formData: {

        }
    }),
    methods: {
        /** 测试函数 */
        fn(numA, numB) {
            if (numA && numB) {
                return numA + numB;
            } else {
                return 0;
            }
        }
    },
    created() {
        
    }
}`)() as any)
        })
        Vue.component('todo', todoItem);
        this.init = true;
    }

    mounted() {
    }
}
</script>

<style lang="scss">
    .page-form-design {
        position: relative;
        overflow: auto;
        width: 100vw;
        height: 100vh;
    }
</style>