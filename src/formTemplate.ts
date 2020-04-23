import { FormTemplate } from './@types/form-design/form-template';

const _formTemplates: Array<FormTemplate> = [
    {
        code: 'pc_00',
        title: '空模板',
        description: '标准空模板。',
        deviceType: 'pc',
        library: 'ant-design',
        controls: [],
        script: `return {
    data: {

    },
    methods: {
        test() {

        }
    },
    created() {
        
    }
}`,
        style: ``
    }, {
        code: 'pc_01',
        title: '标准流程模板',
        description: '戈吉网络标准流程模板。',
        deviceType: 'pc',
        library: 'ant-design',
        controls: [
            {
                id: "", name: "divider", events: [], propertys: [],
                control: { control: "a-divider", slot: {}, propAttrs: {}, events: {}, attrs: { text: "基本信息", remark: "基本信息" } }
            }, {
                id: "", name: "row", icon: "", childrenSlot: ".ant-col", propertys: [], events: [],
                children: [
                    [ { 
                        id: "", name: "custom", events: [], propertys: [], 
                        control: { control: 'antd-form-design-control-custom', attrs: { label: "申请人", remark: "申请人", renderFn: "me.applicationData.applicantUserName" }, events: {}, propAttrs: {}, slot: {} } 
                    } ], [ { 
                        id: "", name: "custom", events: [], propertys: [], 
                        control: { control: 'antd-form-design-control-custom', attrs: { label: "申请时间", remark: "申请时间", renderFn: "me.applicationData.requestTime" }, events: {}, propAttrs: {}, slot: {} } 
                    } ]
                ],
                control: {
                    control: "antd-form-design-control-row",
                    slot: {}, propAttrs: {}, events: {}, attrs: { options: [ { span: 12, offset: 0 }, { span: 12, offset: 0 } ], remark: "基本信息" }
                }
            }, {
                id: "", name: "row", icon: "", childrenSlot: ".ant-col", propertys: [], events: [],
                children: [
                    [ { 
                        id: "", name: "custom", events: [], propertys: [], 
                        control: { control: 'antd-form-design-control-custom', attrs: { label: "所属部门", remark: "所属部门", renderFn: "me.applicationData.applicantDepartment" }, events: {}, propAttrs: {}, slot: {} } 
                    } ], [ { 
                        id: "", name: "custom", events: [], propertys: [], 
                        control: { control: 'antd-form-design-control-custom', attrs: { label: "申请单号", remark: "申请单号", renderFn: "me.applicationData.snNumber" }, events: {}, propAttrs: {}, slot: {} } 
                    } ]
                ],
                control: {
                    control: "antd-form-design-control-row",
                    slot: {}, propAttrs: {}, events: {}, attrs: { options: [ { span: 12, offset: 0 }, { span: 12, offset: 0 } ], remark: "基本信息" }
                }
            }, {
                id: "", name: "row", icon: "", childrenSlot: ".ant-col", propertys: [], events: [],
                children: [
                    [ { 
                        id: "", name: "custom", events: [], propertys: [], 
                        control: { control: 'antd-form-design-control-custom', attrs: { label: "公司信息", remark: "公司信息", renderFn: "me.applicationData.company" }, events: {}, propAttrs: {}, slot: {} } 
                    } ], [ { 
                        id: "", name: "custom", events: [], propertys: [], 
                        control: { control: 'antd-form-design-control-custom', attrs: { label: "成本中心", remark: "成本中心", renderFn: "me.applicationData.costcenter" }, events: {}, propAttrs: {}, slot: {} } 
                    } ]
                ],
                control: {
                    control: "antd-form-design-control-row",
                    slot: {}, propAttrs: {}, events: {}, attrs: { options: [ { span: 12, offset: 0 }, { span: 12, offset: 0 } ], remark: "基本信息" }
                }
            }, {
                id: "", name: "divider", events: [], propertys: [],
                control: { control: "a-divider", slot: {}, propAttrs: {}, events: {}, attrs: { text: "详细信息", remark: "详细信息" } }
            }
        ],
        script: `return {
    data: {
        /** 流程数据 */
        taskData: {
            /** 流程编号 */
            nodeCode: '',
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
            /** 公司名称 */
            company: '',
            /** 成本中心名称 */
            costcenter: '',
            /** 表单发起时间 */
            requestTime: '',
            /** 业务流水号 */
            snNumber: '',
            /** 表单打开时的登录账号 */
            openFormUserAccount: '',
            /** 审批人Id */
            procUserId: '',
            /** 当前用户姓名 */
            currentUserName: '',
            /** 当前用户账号 */
            currentUserAccount: '',
            /** 申请人UserId */
            applicantUserId: '',
            /** 申请人是否有效 */
            applicantActive: '',
            /** 申请人姓名 */
            applicantUserName: '',
            /** 申请人邮箱 */
            applicantEMail: '',
            /** 申请人部门 */
            applicantDepartment: '',
            /** 发起人Id */
            initiatorUserId: '',
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
    },
    methods: {
        /** 获取控件 */
        getControl(controlId) {
            let _el = null;
            const _cb = el => {
                if (el.$children.length && !_el) {
                    for (let i = 0; i < el.$children.length; i++) {
                        if (el.$children[i].controlId == id) {
                            _el = el.$children[i].$el;
                            return;
                        } else {
                            _cb(el.$children[i]);
                        }
                    }
                }
            }
            _cb(this);
            return _el;
        },
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
}`,
    style: ``,
    api: [
        { name: 'uploadFile', type: 'POST', address: 'http://file.bpm.gejinet.com/api/File/UploadFile', remark: '文件上传接口' }
    ]
    }, {
        code: 'mobile_00',
        title: 'Vant空模板',
        description: '标准空模板。',
        deviceType: 'mobile',
        library: 'vant',
        controls: [],
        script: `return {
    data: {

    },
    methods: {
        test() {

        }
    },
    created() {
        
    }
}`,
        style: ``
    }, {
        code: 'pc_02',
        title: '调试模板',
        description: '戈吉网络调试模板。',
        deviceType: 'pc',
        library: 'ant-design',
        controls: [],
        script: `return {
    data: {
        /** 流程数据 */
        taskData: {
            /** 流程编号 */
            nodeCode: '',
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
            /** 公司名称 */
            company: '{{公司名称}}',
            /** 成本中心名称 */
            costcenter: '{{成本中心}}',
            /** 表单发起时间 */
            requestTime: '{{申请时间}}',
            /** 业务流水号 */
            snNumber: '{{申请单号}}',
            /** 表单打开时的登录账号 */
            openFormUserAccount: '',
            /** 审批人Id */
            procUserId: '',
            /** 当前用户姓名 */
            currentUserName: '',
            /** 当前用户账号 */
            currentUserAccount: '',
            /** 申请人UserId */
            applicantUserId: '',
            /** 申请人是否有效 */
            applicantActive: '',
            /** 申请人姓名 */
            applicantUserName: '{{申请人姓名}}',
            /** 申请人邮箱 */
            applicantEMail: '{{申请人邮箱}}',
            /** 申请人部门 */
            applicantDepartment: '{{所属部门}}',
            /** 发起人Id */
            initiatorUserId: '',
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
    },
    methods: {
        /** 获取控件 */
        getControl(controlId) {
            let _el = null;
            const _cb = el => {
                if (el.$children.length && !_el) {
                    for (let i = 0; i < el.$children.length; i++) {
                        if (el.$children[i].controlId == id) {
                            _el = el.$children[i].$el;
                            return;
                        } else {
                            _cb(el.$children[i]);
                        }
                    }
                }
            }
            _cb(this);
            return _el;
        }
    },
    created() {
        
    }
}`,
    style: ``,
    api: [
        { name: 'uploadFile', type: 'POST', address: 'http://file.bpm.gejinet.com/api/File/UploadFile', remark: '文件上传接口' }
    ]
    }
    
    
    // {
    //     code: 'miniapp_01',
    //     title: 'Uni空模板',
    //     description: '标准空模板。',
    //     deviceType: 'mobile',
    //     library: 'uni',
    //     controls: [],
    //     variables: ``,
    //     functions: ``
    // }, 
];

export default function() {
    return _formTemplates;
};