<template>
    <!-- 我的申请列表 -->
    <div class="task-list">
        <div class="task-list-tools">
            <!-- <a-button type="primary" size="small" icon="export" class="task-btn">导出</a-button> -->
            <a-button type="primary" size="small" icon="export" class="task-btn" @click="filter = {};">清除筛选</a-button>
        </div>

        <div class="task-my-raised">
            <a-table 
                row-key="taskId"
                :components="tableComponents"
                :pagination="pagination"
                :rowSelection="{
                    hideDefaultSelections: true,
                    selectedRowKeys: selectedRowKeys, 
                    onChange: onSelectChange
                }"
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
                <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
                    <div style="padding: 8px;">
                        <a-input
                            v-ant-ref="c => searchInput = c"
                            :placeholder="`搜索${column.title}`"
                            :value="selectedKeys[0]"
                            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                            @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            style="width: 188px; margin-bottom: 8px; display: block;"
                        />
                        <a-button
                            type="primary"
                            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                            icon="search"
                            size="small"
                            style="width: 90px; margin-right: 8px"
                        >查询</a-button
                        >
                        <a-button @click="() => handleReset(clearFilters, column.dataIndex)" size="small" style="width: 90px">重置</a-button>
                    </div>
                </template>
                <template #filterIcon="filtered">
                    <a-icon type="search" :style="{ color: filtered ? '#108ee9' : undefined }" />
                </template>
                
                <template #dateFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
                    <div style="padding: 8px;">
                        <a-row>
                            <a-col :span="4" style="text-align: center;line-height: 30px;">从：</a-col>
                            <a-col :span="20">
                                <a-date-picker 
                                    :value="selectedKeys[0]" 
                                    @change="e => setSelectedKeys([e, selectedKeys[1]])" 
                                    style="margin-bottom: 8px; display: block;"
                                />
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="4" style="text-align: center;line-height: 30px;">到：</a-col>
                            <a-col :span="20">
                                <a-date-picker 
                                    :value="selectedKeys[1]" 
                                    @change="e => setSelectedKeys([selectedKeys[0], e])" 
                                    style="margin-bottom: 8px; display: block;"
                                />
                            </a-col>
                        </a-row>
                        <a-button
                            type="primary"
                            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex, true)"
                            icon="search"
                            size="small"
                            style="width: 90px; margin-right: 8px"
                        >查询</a-button>
                        <a-button @click="() => handleReset(clearFilters, column.dataIndex)" size="small" style="width: 90px">重置</a-button>
                    </div>
                </template>
                <template #filterIcon="filtered">
                    <a-icon type="search" :style="{ color: filtered ? '#108ee9' : undefined }" />
                </template>
                <template #dateFilterIcon="filtered">
                    <a-icon type="filter" :style="{ color: filtered ? '#108ee9' : undefined }" />
                </template>

                <template #snRender="text">
                    <span v-if="filter.sn">
                        <template v-for="(fragment, i) in ('' + text).split(new RegExp(`(?<=${filter.sn})|(?=${filter.sn})`, 'i'))">
                            <mark v-if="fragment.toLowerCase() === filter.sn.toLowerCase()" :key="i" class="highlight">{{fragment}}</mark>
                            <template v-else>{{fragment}}</template>
                        </template>
                    </span>
                    <template v-else>{{text}}</template>
                </template>
                <template #topicRender="text">
                    <a v-if="filter.topic" @click="turnTaskPage(record)">
                        <template v-for="(fragment, i) in ('' + text).split(new RegExp(`(?<=${filter.topic})|(?=${filter.topic})`, 'i'))">
                            <mark v-if="fragment.toLowerCase() === filter.topic.toLowerCase()" :key="i" class="highlight">{{fragment}}</mark>
                            <template v-else>{{fragment}}</template>
                        </template>
                    </a>
                    <a v-else @click="turnTaskPage(record)">{{text}}</a>
                </template>

                <template #creationTimeRender="text">
                    <template>{{text | format('yyyy-MM-dd HH:mm:ss')}}</template>
                </template>

                <template #priorityRender="text, record, index">
                    {{record.priority}}
                </template>

                <template #actions="text, record, index">
                    <a-button type="primary" size="small" icon="form" class="task-btn" @click="turnTaskPage(record)">打开</a-button>
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

    /** 已选择数据 */
    selectedRowKeys: string[] = [];

    tableComponents: any = {};

    /** 各列的拖拽宽度 */
    draggingMap: any = {};

    draggingState: any = {};
    
    searchInput: any = null;

    /** 是否加载中 */
    isLoading: boolean = false;

    filter: any = {};

    pagination: any = {
        showTotal: (total, range) => `第 ${range[0]} 条到 ${range[1]} 条，共 ${total} 条`,
        showSizeChange(current, size) {
            this.pagination.pageSize = size;
            this.pagination.current = 1;
            this.handleTableChange();
        },
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['10', '15', '20', '30', '40'],
        defaultPageSize: 10,
        hideOnSinglePage: true,
        pageSize: 10,
        current: 1,
        total: 0
    };

    /** 表格列 */
    columns: Record<string, any>[] = [
        { 
            key: 'sn',
            dataIndex: 'sn', 
            title: '单号', 
            width: 150, 
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'snRender',
            }
        }, { 
            dataIndex: 'workflowName', 
            title: '流程名称',
            width: 300,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
            }
        }, { 
            dataIndex: 'creationTime', 
            title: '创建日期', 
            width: 200,
            scopedSlots: {
                filterDropdown: 'dateFilterDropdown',
                filterIcon: 'dateFilterIcon',
                customRender: 'creationTimeRender',
            }
        },
        { 
            dataIndex: 'topic', 
            title: '标题',
            width: 300,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'topicRender',
            }
        },
        { dataIndex: 'procUserName', title: '当前状态', width: 400 },
        { 
            key: 'priority',
            dataIndex: 'priority', 
            title: '优先级', 
            width: 150, 
            scopedSlots: {
                customRender: 'priorityRender',
            }
        }, 
        { dataIndex: 'taskId', title: '操作', width: 150, scopedSlots: { customRender: 'actions' } },
        { dataIndex: 'wfId', title: '', scopedSlots: { customRender: 'blank' } },
    ];

    /** 表格数据 */
    data: Record<string, any>[] = [];

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

        // this.$common.post('ExtenalApi/GetMyRaisedTasksDataTable', {
        //     currentPage: this.pagination.current,
        //     pageSize: this.pagination.pageSize,
        //     filterText: '',
        //     sysCode: this.getSysCode,
        //     currentStatus: '',
        //     searchStartTime: '',
        //     searchEndTime: '',
        //     moduleId: '',
        //     snNumber: '',
        //     userId: 'admin', //this.getUserId,
        //     languageCulture: 'zh-CN',
        //     enterpriseId: this.getEnterpriseId
        // }).then(d => {
        //     this.pagination.total = d.totalCount;
        //     this.data = d.list;
        // })

        this.handleTableChange();
    }

    mounted() {
    }

    handleTableChange(pagination?, filters?, sorter? ) {
        console.log(filters);
        const pager = { ...this.pagination };
        pager.current = (pagination || this.pagination).current;
        this.pagination = pager;
        this.isLoading = true;
        this.$common.post('ExtenalApi/GetMyRaisedTasksDataTable', {
            currentPage: this.pagination.current || 1,
            pageSize: this.pagination.pageSize,
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
            this.pagination.total = d.totalCount;
            this.data = d.data;
        }).finally(() => {
            this.isLoading = false;
        })
    }

    handleSearch(selectedKeys, confirm, dataIndex, isfull = false) {
        console.log('值', selectedKeys);
        this.filter[dataIndex] = isfull ? selectedKeys : selectedKeys[0];
        confirm();
    }

    handleReset(clearFilters, dataIndex) {
        clearFilters();
        this.filter[dataIndex] = null;
    }

    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
    }

    turnTaskPage(record) {
        const _query = Object.entries({
            type: 'raised',
            procId: record.procId,
            taskId: record.taskId,
            wfCode: record.workflowName,
            pageId: record.appPageId,
            nodeId: record.wfdWorkflowNodeId,
            snNumber: record.sn
        }).filter(([key, value]) => key !== undefined && value !== undefined); //.map(([key, value]) => ({[key]: value}))
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