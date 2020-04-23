<template>
    <div class="task-form-shadow">
        <span v-if="!isInit">加载中.....</span>
        <component v-else :is="isInit ? 'todo' : 'div'" />
    </div>
</template>

<script>
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
import { get, post } from '@/tools/common';
import moment from 'moment';

let isMouseDown = false;

export default {
    name: 'TaskForm',
    provide: {
        bus: new Vue({
            data: {
                /** 备注 */
                remarks: []
            }
        }),
        preview: true
    },
    computed: {
        getUserId() {
            return this.$store.getters.getUserId;
        }
    },
    data: () => ({
        isInit: false
    }),
    async created() {
        const pageId = this.$route.query.pageId;
        const procId = this.$route.query.procId;
        const taskId = this.$route.query.taskId;
        Promise.all(procId || taskId ? [
            get('http://bpmformdesigner.gejinet.com/api/Form/GetForm', {
                id: pageId
            }),
            post('ExtenalApi/GetApplicantData', {
                procId, taskId
            }),
            post('ExtenalApi/GetFormData', {
                procId, taskId
            })
        ] : [
            get('http://bpmformdesigner.gejinet.com/api/Form/GetForm', {
                id: pageId
            })
        ]).then(([d, applicationData, formData]) => {
            if (d?.form) {
                let _form = JSON.parse(d.form);
                let _script = Function(_form.formScript)();
                console.log(_form);
                var todoItem = Vue.extend({
                    // template: `<task-form></task-form>`,
                    template: `
        <a-form
            class="task-form task-form-body task-form-theme-new"
            :form="form"
            layout="horizontal"
            @submit="submitForm"
            :selfUpdate="true"
            @mouseup="onMouseUp"
            @mousedown="onMouseDown"
        >
        
            ${_form.form}

            <form-control
                label="审批备注"
                name="sysRemark"
                class="ant-form-item-mini"
                control="a-textarea"
                :extra="'最大长度1000字符，已输入：' + (formData.sysRemark ? formData.sysRemark.length : 0) + '字符'"
                :onlyText="isOnlyText"
                :labelSpan="3"
                :wrapperSpan="21"
                v-model="formData.sysRemark"
            />

            <a-anchor>
                <a-anchor-link href="#d" title="${_form?.formConfig?.formTitle}">
                
                    ${
                        _form?.controls?.children?.filter(i => i.name === 'divider' && i?.control?.attrs?.remark).map((i, index) => '<a-anchor-link href="#d' + index + '" title="' + i?.control?.attrs?.text + '" />').join('')
                    }
                </a-anchor-link>
            </a-anchor>

            <div class="task-form-footer">
                <div class="task-form-footer-tools">
                    <!-- <a-button size="large" type="link" icon="message">添加评论</a-button>
                    <a-button size="large" type="link" icon="save">保存草稿</a-button> -->
                </div>

                <action-btns
                    size="large"
                    :form="form"
                    :procId="taskData.procId"
                    :applicationData="applicationData"
                    :formData="formData"
                >
                    <!-- <a-button size="large" @click="isOnlyText = !isOnlyText">切换状态</a-button> -->
                </action-btns>
            </div>

            <!-- 左侧审批记录 -->
            <approval-record :procId="taskData.procId" />

            <!-- 添加批注 -->
            <a-tooltip placement="right" arrowPointAtCenter>
                <template slot="title">
                    <span>添加批注</span>
                </template>
                <a-icon class="add-remark" type="form" />
            </a-tooltip>
        </a-form>
    `,
                    components: {
                    },
                    ..._script,
                    data: () => ({
                        /** 是否纯文本 */
                        isOnlyText: false,
                        /** 流程表单 */
                        form: undefined,
                        /** 备注 */
                        sysRemark: '',
                        /** 页面状态（approval/raised/handled） */
                        formType: '',
                        ..._script.data,
                        formData: {
                            ..._script.data.formData,
                            ...formData?.formData
                        },
                        applicationData: {
                            ..._script.data.applicationData,
                            ...applicationData
                        }
                    }),
                    methods: {
                        /** 上传文件 */
                        handleChange(info) {
                            if (info.file.status !== 'uploading') {
                                console.log(info.file, info.fileList);
                            }
                            if (info.file.status === 'done') {
                                this.$message.success(`${info.file.name} file uploaded successfully`);
                            } else if (info.file.status === 'error') {
                                this.$message.error(`${info.file.name} file upload failed.`);
                            }
                        },
                        onMouseDown() {
                            isMouseDown = true;
                        },
                        /** 记录选中文字 */
                        onMouseUp() {
                            if (isMouseDown) {
                                isMouseDown = false;
                                const _selection = window.getSelection();

                                if (_selection) {
                                    const _text = _selection.toString();

                                    if (_text) {
                                        const _nodeType = _selection.anchorNode?.nodeType;

                                        if (_nodeType == 1) {
                                            //元素
                                            let _el = _selection.anchorNode?.lastChild;
                                            //@ts-ignore
                                            let _id = _el?.getAttribute('id');
                                            console.log(_selection);
                                            this.bus.$emit('selection', _id, _text, {
                                                el: _el
                                            });
                                        } else if (_nodeType == 3) {
                                            //文本
                                            //@ts-ignore
                                            let _id = _selection.anchorNode?.parentNode?.getAttribute('id');
                                            let _forward = _selection.focusOffset > _selection.anchorOffset;
                                            this.bus.$emit('selection', _id, _text, {
                                                start: _forward ? _selection.anchorOffset : _selection.focusOffset,
                                                end: _forward ? _selection.focusOffset : _selection.anchorOffset
                                            });
                                        }
                                    }
                                }
                            }
                        },
                        /** 提交表单 */
                        submitForm(e, type) {
                            e.preventDefault();
                            this.form.validateFields((err, values) => {
                                if (!err) {
                                    console.log('Received values of form: ', values);
                                }
                            });
                        },
                        ..._script.methods
                    },
                    created() {
                        this.formType = this.$route.query.type;
                        this.isOnlyText = this.$route.query.type !== 'approval';
                        this.$root.login();
                        this.form = this.$form.createForm(this);
                        this.taskData.procId = this.$route.query.procId;
                        this.applicationData.applicantUserId = this.getUserId;
                    }
                });
                Vue.component('todo', todoItem);
                this.$nextTick(() => {
                    this.isInit = true;
                });
            } else {
                this.$message.error('未获取到表单数据');
            }
        })
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
@import '../assets/scss/task-form';
@import '../assets/scss/task-form-new';
</style>
