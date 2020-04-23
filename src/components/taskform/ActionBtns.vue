<template>
    <div class="action-btns">
        <a-button
            :class="{ btnClass, 'action-primary-btn': btn.primary }"
            v-for="btn in btnList"
            :size="size"
            :type="btn.btnType"
            :key="btn.actionId"
            @click="btnClick($event, btn)"
        >{{btn.actionName}}</a-button>
        <slot></slot>

        <!-- 选择转发用户 -->
        <gj-user-select
            ref="userSelect"
            :multiple="selectedUserIsMultiple"
            :show.sync="userPickerVisible"
            :data="selectedUsers"
            @confirm="selectForwardUser"
        ></gj-user-select>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import { Route } from 'vue-router';
import { get, post } from '@/tools/common';


/** 动作按钮 */
interface ActionButton {
    /** 按钮文本 */
    actionName: string;
    /** 动作GUID */
    actionId?: string;
    /** 类型 */
    type: string;
    /** 序号 */
    displayOrder: number;
    /** 状态 */
    btnType: string;
    /** 是否重要 */
    primary?: boolean;
}

/** 基础按钮 */
interface ActionButtonType {
    /** 按钮名称 */
    displayText: string;
    /** 是否需要校验 */
    verification?: boolean;
    /** 点击事件 */
    click?: (vue: ActionBtns, btn: ActionButton) => string | void;
    /** 操作回调 */
    callback?: (vue: ActionBtns) => Promise<any>;
}

@Component({})
export default class ActionBtns extends Vue {
    /** 按钮大小 */
    @Prop({ type: String, default: 'default' }) size!: string;
    /** 是否仅展示重要按钮 */
    @Prop({ type: Boolean, default: false }) primary!: boolean;

    @Prop({ type: String, default: '' }) btnClass!: string;

    @Prop({ type: Object }) form!: any;
    /** 流程数据 */
    @Prop({ type: Object, default: () => ({}) }) detailData!: any;

    /** 全局数据 */
    @Prop({ type: Object, default: () => ({}) }) applicationData!: any;

    /** 表单数据 */
    @Prop({ type: Object, default: () => ({}) }) formData!: any;

    /** 企业编号 */
    @Getter('getEnterpriseId') getEnterpriseId!: string;
    
    /** 用户账号 */
    @Getter('getUserId') readonly getUserId!: string;
    
    /** 用户账号 */
    @Getter('getUserAccount') readonly getUserAccount!: string;
    
    /** 系统Code */
    @Getter('getSysCode') readonly getSysCode!: string;

    /** 当前操作按钮类型 */
    activeBtnType: string = '';

    activeBtn?: ActionButton = undefined;

    /** 转发用户 */
    selectedUsers: any[] = [];
    /** 用户选择框是否显示 */
    userPickerVisible: boolean = false;
    /** 用户是否为多选 */
    selectedUserIsMultiple: boolean = false;
    
    wfCode: string = '';
    nodeId: string = '';
    procId: string = '';
    snNumber: string = '';
    actionId: string = '';
    /** 选择用户 */
    selectForwardUser(record: any[]) {
        this.selectedUsers = record.map(x => ({ id: '', sign_userid: x.account, username: x.chName, state: 0 }));
        this.btnType[this.activeBtnType]?.callback?.(this).then(d => {
            if (d.nextProcessors) {
                this.$success({
                    title: '流程已提交到 ' + d.nextProcessors,
                    content: '',
                    onOk() {
                        window.close();
                    }
                });
            }
        });
    }

    /** 按钮类型 */
    btnType: Record<string, ActionButtonType> = {
        /** 撤回 */
        event_Recede: {
            displayText: '撤回',
            verification: true,
            click: vue => {
                vue.$common.post('ExtenalApi/BaseRevoke', {
                    EnterpriseId: vue.getEnterpriseId,
                    userId: vue.getUserId,
                    ProcId: '3eeeda98-d919-445f-a573-4d73e5b28c24',
                }).then(d => {
                    this.$success({
                        title: '流程已撤回',
                        content: ''
                    });
                });
            }
        }, 
        /** 除开始节点外撤回 */
        event_FormRecede: { displayText: '撤回' ,
            /**没有流程跑起来之后的撤回 */
        },
        /** 开始节点挂起 */
        event_Waiting: { displayText: '挂起' },
        /** 除开始节点外挂起 */
        event_FormWaiting: { displayText: '挂起' },
        /** 提交 */
        event_Submit: {
            displayText: '提交',
            verification: true,
            click: (vue, btn) => {
                vue.$common.post('ExtenalApi/SubmitTask', {
                    enterpriseId: vue.getEnterpriseId,
                    userId: vue.getUserId,
                    userAccount: vue.getUserAccount,
                    wfCode: vue.wfCode,
                    topic: 'test',
                    sysCode: vue.getSysCode,
                    formJson: JSON.stringify({
                        formData:vue.formData,
                        detailData:vue.detailData
                    }),
                    businessNo: vue.snNumber,
                    actionId: btn.actionId,
                    action: '接收',
                    procId: vue.procId,
                    variables: {}
                }).then(d => {
                    this.$success({
                        title: '流程已提交到 ' + d.nextProcessors,
                        content: '',
                        onOk() {
                            window.close();
                        }
                    });
                });
            }
        },
        /** 重新提交 */
        event_ReSubmit: {
            displayText: '重新提交',
            verification: true,
            click: (vue, btn) => {
                vue.$common.post('ExtenalApi/SubmitTask', {
                    enterpriseId: vue.getEnterpriseId,
                    userId: vue.getUserId,
                    userAccount: vue.getUserAccount,
                    wfCode: vue.wfCode,
                    topic: 'test',
                    sysCode: vue.getSysCode,
                    formJson: JSON.stringify({
                        formData:vue.formData,
                        detailData:vue.detailData
                    }),
                    businessNo: vue.snNumber,
                    actionId: btn.actionId,
                    action: '接收',
                    procId: vue.procId,
                    variables: {}
                }).then(d => {
                    this.$success({
                        title: '流程已提交',
                        content: '',
                        onOk() {
                            window.close();
                        }
                    });
                });
            }
        },
        /** 保存草稿 */
        event_SaveToDraft: { 
             displayText: '保存草稿',
            verification: true,
            click: vue => {
                console.error('保存草稿功能未完成。');
                vue.$common.post('ExtenalApi/SaveDraft', {
                    Id:"",
                    EnterpriseId: vue.getEnterpriseId,
                    OwnerUserId: vue.getUserId,
                    ProcId: "",
                    WfCode: vue.wfCode,
                    NodeId: "",
                    Topic: 'test',
                    SysCode: vue.getSysCode,
                    FormDate:'{"initData":{"masterTable":"proc_travelexpense","detailTable":"proc_travelexpense_dt","wfdId":"27a69d8b-4211-42ce-b07f-bae85726f8f8","nodeCode":"Applicant","nodeId":"4137ff58-9817-4095-8196-b5875ce864b0","pageId":"9ea80e80-485e-47b3-a39e-214fdf06b616","openType":1,"draftId":"","createDate":"2018-07-09 10:53:49","procId":"","nextProcId":"","procStatus":null,"taskId":"00820EE7-8109-48AD-B676-D98E161D3379","actionId":null,"action":null,"summary":"TR20180600549 HUD：集成canstack 2700.00","comments":null,"isStartStep":true,"isAutoTest":false,"enterpriseId":"99bd28a8-9046-43cd-9957-907417fecb8e","taskStatus":"0",Operation","languageCultue":"zh-CN"},"formData":{"nameValues":[{"name":"proc_travelexpense.description","value":"HUD：集成canstack"},{"name":"proc_travelexpense_dt.subtotal","value":"0"}]},"arrList":[]}'
                }).then(d => {
                    this.$success({
                        title: '已保存',
                        content: '',
                        onOk() {
                            window.close();
                        }
                    });
                });
            }
         },
        /** 审批中保存草稿 */
        event_SaveToDraftOne: { displayText: '保存草稿' },
        /** 审批中保存数据 */
        event_SaveForm: { displayText: '保存' },
        /** 保存模板 */
        event_SaveToTemplate: { displayText: '保存模板' },
        /** 删除 */
        event_Delete: { displayText: '删除' },
        /** 接受 */
        event_Accept: {
            displayText: '接收',
            verification: true,
            click: (vue, btn) => {
                vue.$common.post('ExtenalApi/ApproveTask', {
                    ActionId: btn.actionId,
                    Action: '接收',
                    FormJson: JSON.stringify({
                        formData:vue.formData,
                        detailData:vue.detailData
                    }),
                    Comments: vue.formData.sysRemark,
                    ProcId: vue.procId,
                    variables: {}
                }).then(d => {
                    this.$success({
                        title: '流程已接收',
                        content: '',
                        onOk() {
                            window.close();
                        }
                    });
                });
            }
        },
        /** 同意 */
        event_Agree: {
            displayText: '同意',
            verification: true,
            click: (vue, btn) => {
                vue.$common.post('ExtenalApi/ApproveTask', {
                    actionId: btn.actionId,
                    action: '同意',
                    formJson: JSON.stringify({
                        formData:vue.formData,
                        detailData:vue.detailData
                    }),
                    comments: vue.formData.sysRemark,
                    procId: vue.procId,
                    variables: {}
                }).then(d => {
                    if (d.end) {
                        this.$success({
                            title: '流程审批结束',
                            content: '',
                            onOk() {
                                window.close();
                            }
                        });
                    } else if (d.nextProcessors) {
                        this.$success({
                            title: '流程已流转到 ' + d.nextProcessors,
                            content: '',
                            onOk() {
                                window.close();
                            }
                        });
                    } else {
                        this.$success({
                            title: '流程已流转到其他人处理',
                            content: '',
                            onOk() {
                                window.close();
                            }
                        });
                    }
                });
            }
        },
        /** 完成 */
        event_Complete: { 
            displayText: '完成' ,
            verification: true,
            click: vue => {
                vue.$common.post('ExtenalApi/EndTask', {
                    enterpriseId: vue.getEnterpriseId,
                    userId: vue.getUserId,
                    wfCode: vue.wfCode,
                    topic: '',
                    sysCode: vue.getSysCode,
                }).then(d => {
                    this.$success({
                        title: '流程已结束',
                        content: '',
                        onOk() {
                            window.close();
                        }
                    });
                });
            }
        },
        /** 拒绝 */
        event_Reject: {
            displayText: '拒绝',
            verification: true,
            click: vue => {
                if (!vue.formData.sysRemark) {
                    vue.$message.error('审批意见不能为空。');
                    return;
                }
                vue.$common.post('ExtenalApi/Cancel', {
                    enterpriseId: vue.getEnterpriseId,
                    postUserId: vue.getUserId,
                    comments: vue.formData.sysRemark,
                    procId: vue.procId,
                    actionId: vue.actionId,
                    nodeId: vue.nodeId
                }).then(d => {
                    this.$success({
                        title: '已拒绝',
                        content: '',
                        onOk() {
                            window.close();
                        }
                    });
                });
            }
        },
        /** 转发 */
        event_TurnOver: {
            displayText: '转发',
            verification: true,
            click: vue => {
                vue.userPickerVisible = true;
            },
            callback: vue => vue.$common.post('ExtenalApi/Forward', {
                procId: vue.procId,
                actionId: vue.activeBtn?.actionId,
                comments: vue.formData.sysRemark,
                userAccount: vue.selectedUsers[0].sign_userid
            })
        },
        /** 抄送 */
        event_Copy: {
            displayText: '抄送',
            click: vue => {
                // vue.userPickerVisible = true;
            }
            /**抄送是设置在流程图里面的，自动抄送 */
        },
        /** 加签 */
        event_AdditionalSigner: { 
            displayText: '加签' ,
            verification: true,
            click: vue => {
                vue.userPickerVisible = true;
            },
            callback: vue => vue.$common.post('ExtenalApi/AddSigner', {
                procId: vue.procId,
                actionId: vue.activeBtn?.actionId,
                comments: vue.formData.sysRemark,
                userAccount: vue.selectedUsers[0].sign_userid
            })
        },
        /** 退回发起人 */
        event_RecedeToProposer: {
            displayText: '退回发起人' ,
            verification: true,
            click: vue => {
                if (!vue.formData.sysRemark) {
                    vue.$message.error('审批意见不能为空。');
                    return;
                }
                vue.$common.post('ExtenalApi/Restart', {
                    EnterpriseId: vue.getEnterpriseId,
                    PostUserId: vue.getUserId,
                    Comments: vue.formData.sysRemark,
                    ProcId: vue.procId,
                    ActionId: vue.actionId,
                    NodeId: vue.nodeId
                }).then(d => {
                    this.$success({
                        title: '已退回发起人',
                        content: '',
                        onOk() {
                            window.close();
                        }
                    });
                });
            }
        },
        /** 退回上一步 */
        event_RecedeToPreviousStep: { 
             displayText: '退回上一步' ,
             verification: true,
             click: vue => {
                vue.$common.post('ExtenalApi/ReturnToPrevious', {
                    EnterpriseId: vue.getEnterpriseId,
                    PostUserId: vue.getUserId,
                    Comments: vue.formData.sysRemark,
                    ProcId: vue.procId,
                    ActionId: vue.actionId,
                    NodeId: vue.nodeId
                }).then(d => {
                    this.$success({
                        title: '已退回',
                        content: '',
                        onOk() {
                            window.close();
                        }
                    });
                });
            }
        },
        /** 退回任意节点 */
        event_RecedeToAnyStep: { 
             displayText: '退回任意节点',
             verification: true,
             click: vue => {
                vue.$common.post('ExtenalApi/ReturnToPrevious', {
                    EnterpriseId: vue.getEnterpriseId,
                    PostUserId: vue.getUserId,
                    comments: vue.formData.sysRemark,
                    ProcId: vue.procId,
                    ActionId: vue.actionId,
                    NodeId: vue.nodeId
                }).then(d => {
                    this.$success({
                        title: '已退回',
                        content: '',
                        onOk() {
                            window.close();
                        }
                    });
                });
            }
        },
        /** 退回指定节点 */
        event_RecedeToSepcificStep: { 
            displayText: '退回指定节点',
             verification: true,
             click: vue => {
                vue.$common.post('ExtenalApi/ReturnToPrevious', {
                    EnterpriseId: vue.getEnterpriseId,
                    PostUserId: vue.getUserId,
                    comments: vue.formData.sysRemark,
                    ProcId: vue.procId,
                    ActionId: vue.actionId,
                    NodeId: vue.nodeId
                }).then(d => {
                    this.$success({
                        title: '已退回指定节点',
                        content: '',
                        onOk() {
                            window.close();
                        }
                    });
                });
            } 
        },
        /** 自动处理完成 */
        event_AutoHandle: { displayText: '自动处理完成' },
        /** 与节点处理完成 */
        event_And: { displayText: '与节点处理完成' },
        /** 连接节点处理完成 */
        event_Connect: { displayText: '连接节点处理完成' },
        /** 判断节点处理完成 */
        event_Judge: { displayText: '判断节点处理完成' },
        /** 流程结束 */
        event_Finish: { 
            displayText: '结束' ,
            verification: true,
            click: vue => {
                vue.$common.post('ExtenalApi/EndTask', {
                    EnterpriseId: vue.getEnterpriseId,
                    comments: "流程结束",
                    ProcId: vue.procId,
                    ActionId: vue.actionId,
                    NodeId: vue.nodeId,
                    wfdId: "3eeeda98-d919-445f-a573-4d73e5b28c24"
                }).then(d => {
                    this.$success({
                        title: '流程已结束',
                        content: '',
                        onOk() {
                            window.close();
                        }
                    });
                });
            }
        
        },
        /** 结束节点打印 */
        event_FinishPrint: {
             displayText: '打印' 
             /**前端打印，不涉及后端 */
        },
        /** 打印 */
        event_Print: { displayText: '打印' }
    };

    /** 当前表单按钮列表 */
    btnList: Array<ActionButton> = [
        {
            actionName: '提交',
            type: 'event_Submit',
            displayOrder: 0,
            primary: true,
            btnType: 'primary'
        }, {
            actionName: '同意',
            type: 'event_Agree',
            displayOrder: 1,
            primary: true,
            btnType: 'primary'
        }, {
            actionName: '拒绝',
            type: 'event_Reject',
            displayOrder: 2,
            primary: true,
            btnType: 'danger'
        }, {
            actionName: '转发',
            type: 'event_TurnOver',
            displayOrder: 2,
            btnType: 'default'
        }, {
            actionName: '加签',
            type: 'event_Reject',
            displayOrder: 2,
            btnType: 'default'
        }
    ];

    get getBtnList() {
        if (this.primary) {
            return this.btnList.filter(i => i.primary);
        } else {
            return this.btnList;
        }
    }

    created() {
        this.init();
    }

    /** 校验 */
    check() {
        return new Promise((resolve, reject) => {
            this.form.validateFieldsAndScroll(
                undefined,
                {
                    scroll: {
                        offsetTop: 50
                    }
                },
                function(errors, values) {
                    if (errors && Object.keys(errors).length) {
                        reject('表单校验失败。');
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    /** 执行失败 */
    showErrors(errors) {
        console.error(errors);
    }

    /** 初始化 */
    init() {
        this.wfCode = this.$route.query.wfCode as string;
        this.nodeId = this.$route.query.nodeId as string;
        this.procId = this.$route.query.procId as string;
        this.snNumber = this.$route.query.snNumber as string;
        post('ExtenalApi/GetApproveButton', {
            nodeId: this.nodeId,
            enterpriseId: this.getEnterpriseId,
            languageCulture:"zh-CN"
        }).then(d => {
            this.btnList = d as Array<ActionButton>;
        });
    }

    /** 点击按钮 */
    btnClick(e, btn) {
        this.activeBtnType = btn.type;
        const _btn = this.btnType[btn.type];
        this.actionId = btn.actionId;
        this.activeBtn = btn;
        if (_btn.verification === true) {
            this.check().then(() => new Promise((resolve, reject) => {
                let _re = _btn?.click?.(this, btn);
                if (_re) reject(_re);
                else resolve();
            })).catch(this.showErrors);
        } else {
            _btn?.click?.(this, btn);
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
