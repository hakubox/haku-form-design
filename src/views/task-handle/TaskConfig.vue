<template>
    <!-- 流程配置 -->
    <div class="task-list">
        <div class="task-list-tools">
            <!-- <a-button type="primary" size="small" icon="export" class="task-btn">导出</a-button> -->
            <a-button type="primary" size="small" icon="export" class="task-btn" @click="save">保存</a-button>
        </div>

        <div class="task-my-raised">
            <a-table 
                row-key="id"
                :components="tableComponents"
                :pagination="false"
                :customHeaderRow="record => ({
                    class: 'task-table-header'
                })"
                :customRow="record => ({
                    class: 'task-table-row'
                })"
                :columns="columns" 
                :dataSource="data" 
                :loading="isLoading"
                size="small" 
                bordered
                @change="handleTableChange"
            >

                <template #nameRender="text, record">
                    {{record.name}}
                </template>
                <template #valueRender="text, record">
                    <a-input v-model="record.value" placeholder="值" />
                </template>
                <template #descriptionRender="text, record">
                    {{record.description}}
                </template>
                
                <template #blank></template>
            </a-table>
        </div>
    </div>
</template>

<script lang="tsx">
import { State, Getter, Mutation } from 'vuex-class';
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueDraggableResizable from 'vue-draggable-resizable';
import { Base64 } from 'js-base64';
import '@/assets/scss/task-list.scss';

Vue.component('vue-draggable-resizable', VueDraggableResizable);

@Component({
    components: {}
})
export default class MyRaised extends Vue {
    
    /** 用户账号 */
    @Getter('getUserId') readonly getUserId!: string;

    /** 企业编号 */
    @Getter('getEnterpriseId') readonly getEnterpriseId!: string;
    
    /** 系统Code */
    @Getter('getSysCode') readonly getSysCode!: string;

    tableComponents: any = {};

    /** 各列的拖拽宽度 */
    draggingMap: any = {};
    draggingState: any = {};

    /** 是否加载中 */
    isLoading: boolean = false;

    filter: any = {};

    /** 表格列 */
    columns: Record<string, any>[] = [
        { 
            key: 'name',
            dataIndex: 'name', 
            title: '名称', 
            width: 100, 
            scopedSlots: {
                customRender: 'nameRender',
            }
        }, { 
            key: 'value',
            dataIndex: 'value', 
            title: '值', 
            width: 200, 
            scopedSlots: {
                customRender: 'valueRender',
            }
        }, { 
            key: 'description',
            dataIndex: 'description', 
            title: '描述', 
            width: 300, 
            scopedSlots: {
                customRender: 'descriptionRender',
            }
        }
    ];

    /** 表格数据 */
    data: Record<string, any>[] = [];

    save() {
        this.$common.post('ExtenalApi/saveSetting', {
            appSettings: this.data
        }).then(d => {
            this.$message.success('流程配置保存完毕。');
        });
    }

    created() {
        this.$root.login();
        let cols: any = [{}].concat(this.columns.map(i => ({ [i.dataIndex]: i.width })));
        this.draggingMap = Object.assign.apply([{}], cols);

        this.tableComponents = {
            header: {
                cell: (h1, props, children) => {
                    let thDom: any = null;
                    const { key, ...restProps } = props;
                    if (key == 'selection-column') {
                        return (
                            <th {...restProps}>
                                {children}
                            </th>
                        );
                    }
                    const col: any = this.columns.find(col => {
                        const k = col.dataIndex || col.key;
                        return k === key;
                    });
                    if (!col.width) {
                        return <th {...restProps}>{children}</th>;
                    }
                    const onDrag = (x, y) => {
                        this.draggingState[key] = 0;
                        col.width = Math.max(x, 1);
                    };

                    const onDragstop = () => {
                        this.draggingState[key] = thDom.getBoundingClientRect().width;
                    };
                    return (
                        <th {...restProps} v-ant-ref={r => (thDom = r)} width={col.width} class="resize-table-th">
                            {children}
                            <vue-draggable-resizable
                                key={col.key}
                                class="table-draggable-handle"
                                w={10}
                                x={this.draggingState[key] || col.width}
                                z={1}
                                axis="x"
                                draggable={true}
                                resizable={false}
                                onDragging={onDrag}
                                onDragstop={onDragstop}
                            ></vue-draggable-resizable>
                        </th>
                    );
                },
            },
        };

        this.handleTableChange();
    }

    mounted() {
    }

    handleTableChange(pagination?, filters?, sorter? ) {
        console.log(filters);
        this.isLoading = true;
        this.$common.post('ExtenalApi/getAllSetting', {
            currentStatus: '',
            searchStartTime: '',
            searchEndTime: '',
            languageCulture: 'zh-CN',
            enterpriseId: this.getEnterpriseId,
            orderByProperty: 'creationTime',
            filters: {
                moduleId: '',
                filterText: '',
                sysCode: this.getSysCode,
            }
        }).then(d => {
            this.data = d;
        }).finally(() => {
            this.isLoading = false;
        })
    }

    handleSearch(selectedKeys, confirm, dataIndex, isfull = false) {
        console.log('值', selectedKeys);
        this.filter[dataIndex] = isfull ? selectedKeys : selectedKeys[0];
        confirm();
    }

    turnTaskPage(record) {
        const _query = Object.entries({
            type: 'raised',
            procId: record.procId,
            wfCode: record.workflowName,
            pageId: record.appPageId,
            nodeId: record.wfdWorkflowNodeId,
            snNumber: record.sn
        }).filter(([key, value]) => key !== undefined); //.map(([key, value]) => ({[key]: value}))
        // @ts-ignore
        // this.$router.push({ path: '/taskform', query: Object.assign.apply([], [{}].concat(_query)) });
        const _vue = this;
        const _win = window.open(`${location.origin}/taskform?${_query.map(([key, value]) => key + '=' + value).join('&')}`);
        if (_win) {
            _win['refreshOriginPage'] = () => {
                _vue.handleTableChange();
            }
        }
    }
}
</script>

<style lang="scss">
    .page-form-design {
        
    }

    .resize-table-th {
        position: relative;

        .table-draggable-handle {
            height: 100% !important;
            bottom: 0;
            left: auto !important;
            right: -5px;
            cursor: col-resize;
            touch-action: none;
        }
    }
</style>