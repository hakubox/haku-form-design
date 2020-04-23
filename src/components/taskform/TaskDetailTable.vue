<template>
    <div>
        <a-table row-key="index" size="small" :pagination="false" :rowSelection="rowSelection" :dataSource="dataSource" bordered>
            <a-table-column title="序号" dataIndex="index">
                <template slot-scope="text, record, index">
                    <div class="tac form-label">{{index + 1}}</div>
                </template>
            </a-table-column>
            
            <!-- <template #[col.scopedSlots.customRender]="text, record, index">
                <blank-control :key="'d' + index + colIndex" :field-name="`detail_${index}_${col.dataIndex}`" :notCheck="index == lastIndex">
                    <slot :name="col.scopedSlots.customRender" v-bind="{ text, record, index }">
                        {{text}}
                    </slot>
                </blank-control>
            </template> -->
            <slot>

            </slot>

            <a-table-column title="操作" dataIndex="id" >
                <template slot-scope="text, record, index">
                    <div class="btn-list" v-if="index < dataSource.length - 1">
                        <a-tooltip placement="bottom">
                            <template slot="title">
                                <span>新增</span>
                            </template>
                            <a-button size="small" type="primary" icon="plus" @click="addRow(index)" />
                        </a-tooltip>
                        <a-tooltip placement="bottom">
                            <template slot="title">
                                <span>复制</span>
                            </template>
                            <a-button size="small" type="default" icon="copy" />
                        </a-tooltip>
                        <a-popconfirm placement="topRight" title="确认删除行？" @confirm="removeRow(index)" okText="确认" cancelText="取消" >
                            <a-tooltip placement="bottom">
                                <template slot="title">
                                    <span>删除</span>
                                </template>
                                <a-button size="small" type="danger" icon="close" />
                            </a-tooltip>
                        </a-popconfirm>
                    </div>
                    <div class="btn-list" v-else>
                    </div>
                </template>
            </a-table-column>
        </a-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { get, post } from '@/tools/common';
import { cloneForce } from '@/lib/clone'

/** 明细配置 */
interface DetailConfig {
    /** 添加行 */
    addRow: (index: number) => Record<string, any>
}

@Component({})
export default class TaskDetailTable extends Vue {
    /** 表格数据 */
    @Prop({ type: Array }) dataSource!: Array<any>;

    /** 是否可编辑 */
    @Prop({ type: Boolean, default: true }) isEdit!: boolean;

    @Prop({ type: Object }) config!: DetailConfig;

    @Watch('dataSource', {
        deep: true
    }) changeValue(newValue) {
        this.refresh(newValue);
    }

    get lastIndex() {
        return this.dataSource.length - 1;
    }

    baseConfig: DetailConfig = {
        addRow: index => ({}),
    };

    /** 选择项配置 */
    rowSelection = {
        columnWidth: 50,
        fixed: true,
        type: 'checkbox',
        hideDefaultSelections: false
    };

    /** 分页器配置 */
    paginationConfig = {
        hideOnSinglePage: true,
        showQuickJumper: true,
        showSizeChanger: true,
        total: 100
    };

    created() {
        this.baseConfig = {
            ...this.baseConfig,
            ...this.config
        }
        this.refresh(this.dataSource);
    }

    refresh(value) {
        if (this.isEdit && value) {
            if (!value.length || (value.length && Object.keys(value[value.length - 1]).length > 1)) {
                let _value = value;
                _value = _value.concat([{ index: value.length + 1 }]);
                this.$emit('update:dataSource', _value);
            }
        }
    }

    /** 新增行 */
    addRow(index) {
        let _data = this.dataSource.slice(0, index).concat([this.baseConfig.addRow(index)]).concat(this.dataSource.slice(index)).map((i, index) => ({ ...i, index: index + 1 }));
        this.$emit('update:dataSource', _data);
    }

    /** 删除行 */
    removeRow(index) {
        let _data = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1)).map((i, index) => ({ ...i, index: index + 1 }));
        this.$emit('update:dataSource', _data);
    }

    mounted() {
        console.log(this);
    }
}
</script>

<style lang="scss" scoped>
    .btn-list {
        white-space: nowrap;

        > button + button {
            margin-left: 8px;
        }
    }
</style>
