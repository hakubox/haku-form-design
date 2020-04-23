<template>
    <div class="approval-record">
        <ul class="approval-record-list">
            <!-- <li class="approval-record-item" style="padding: 0px;">
                <a-card size="small" title="审批意见" :bordered="false">
                    <a href="#" slot="extra" style="font-size: 12px;">历史意见</a>
                    <a-textarea
                        v-model="approvalText"
                        placeholder="请填写您的审批意见"
                        :autosize="{ minRows: 3, maxRows: 8 }"
                    ></a-textarea>
                </a-card>
            </li> -->
            <li class="approval-record-item" v-for="(item, index) in approvalList" :key="index">
                <div class="approval-record-item-header">
                    <span class="approval-record-item-jobName">{{item.wfdWorkflowNodeName}}</span>
                    <span class="approval-record-item-state" :class="{ 'complete': !!(item.langAction || item.action || item.status != '0') }">{{item.langAction || item.action || (item.status == '0' ? '未处理' : '已处理')}}</span>
                </div>

                <div class="approval-record-item-content">
                    <div class="approval-record-item-user">
                        <!-- <img class="approval-record-item-userimg" :src="item.userImgUrl" /> -->
                        <span class="approval-record-item-username">{{item.userName}}</span>
                    </div>

                    <span class="approval-record-item-remark">
                        <span class="approval-record-item-remark-content">{{item.remark}}</span>
                        <span
                            class="approval-record-item-date"
                        >{{$common.dateFormat(item.procTime || '', 'yyyy-MM-dd HH:mm:ss')}}</span>
                        <!-- recvTime -->
                    </span>
                </div>

                <!-- 印章 -->
                <div class="form-seal" v-if="getApprovalText(item)" :class="getApprovalStyle(item)">
                    {{ getApprovalText(item) }}
                    <span class="form-seal-line" />
                    <span class="form-seal-line" />
                    <span class="form-seal-line" />
                    <span class="form-seal-line" />
                </div>
            </li>
        </ul>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import { Route } from 'vue-router';
import { get, post } from '@/tools/common';

/** 审批记录 */
interface ApprovalItem {
    /** 审批节点 */
    wfdWorkflowNodeName: string;
    /** 审批人头像 */
    userImgUrl?: string;
    /** 审批人姓名 */
    ProcUserName: string;
    /** 岗位 */
    DisplayJobName: string;
    /** 审批意见 */
    remark?: string;
    /** 状态 */
    state: string;
    /** 状态 */
    status: string;
    /** */
    btnType?: string;
    /** 发起时间 */
    procTime?: string;
    /** 接收时间 */
    recvTime?: string;
    /** 动作名称 */
    langAction?: string;
    /** 动作名称2 */
    action?: string;
}

@Component({})
export default class ApprovalRecord extends Vue {
    /** 待办任务Id */
    @Prop({ type: String }) procId!: string;
    /** 审批文本 */
    @Prop({ type: String, default: '' }) approvalText!: string;

    @Prop({ type: Object }) form!: any;

    /** 系统Code */
    @Getter('getSysCode') readonly getSysCode!: string;

    /** 全局数据 */
    @Prop({ type: Object, default: () => ({}) }) applicationData!: any;

    /** 当前表单按钮列表 */
    approvalList: Array<ApprovalItem> = [];
    snNumber: string | (string | null)[] = '';

    // [
    //     {
    //         userName: '张三',
    //         jobName: '高级需求分析工程师',
    //         resultType: '提交',
    //         btnType: 'submit',
    //         date: '2020-01-06 09:13:00',
    //         state: '已提交'
    //     }, {
    //         userName: '李四',
    //         jobName: '部门高级经理',
    //         remark: '允许提交',
    //         resultType: '同意',
    //         btnType: 'success',
    //         date: '2020-01-06 09:13:00',
    //         state: '已审批'
    //     }, {
    //         userName: '王五',
    //         jobName: '研发主管',
    //         remark: '允许提交',
    //         resultType: '同意',
    //         btnType: 'danger',
    //         date: '2020-01-06 09:13:00',
    //         state: '已拒绝'
    //     }
    // ];

    // get getBtnList() {
    //     if (this.primary) {
    //         return this.btnList.filter(i => i.primary);
    //     } else {
    //         return this.btnList;
    //     }
    // }

    created() {
        this.init();
    }

    /** 初始化 */
    init() {
        this.snNumber = this.$route.query.snNumber;
        if (this.snNumber) {
            post('ExtenalApi/GetExternalInstApproveHistory', {
                SysCode: this.getSysCode,
                Sn: this.snNumber
            }).then(d => {
                this.approvalList = d as Array<ApprovalItem>;
            });
        }
    }

    getApprovalText(item: ApprovalItem) {
        switch (Number(item.status)) {
            case 0:
                return '等待处理';
            case 1:
                return '审批通过';
            case 3:
                return '审批拒绝';
            case 7:
                return '审批拒绝';
            default:
                return '';
        }
    }

    getApprovalStyle(item: ApprovalItem) {
        switch (Number(item.status)) {
            case 0:
                return 'todo';
            case 1:
                return 'success';
            case 3:
                return 'danger';
            case 7:
                return 'danger';
            default:
                return '';
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .approval-record-item {
    .ant-card.ant-card-small {
        > .ant-card-body {
            padding: 3px 6px;
        }
    }
}
</style>
