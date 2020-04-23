<template>
    <div class="data-search">
        <span class="form-label" v-if="$attrs.onlyText">
            {{getText}}
        </span>
        <template v-else>
            <a-input-search readonly :placeholder="placeholder" @search="openDialog" :size="size" :value="inputValue.map(i => i.text).join(', ')">
                <a-button type="primary" slot="enterButton">搜索</a-button>
            </a-input-search>

            <a-modal
            :title="dialogTitle"
            :width="width"
            :footer="multiple ? undefined : null"
            :visible="show"
            @ok="confirm"
            @cancel="cancel">
                <div v-if="multiple">
                    <div style="min-height: 24px;">
                        <span v-if="!selectedData.length" style="font-size: 14px; color: #BBB;">暂未选择数据</span>
                        <strong v-else :style="{ marginRight: 8 }">已选择：</strong>
                        <a-tag v-for="(item, index) in selectedData" :key="index" closable @close="removeData">
                            {{ item.chName }}
                        </a-tag>
                    </div>
                    <hr />
                </div>
                <a-table
                    size="small"
                    :rowSelection="{
                        columnTitle: '选择',
                        selectedRowKeys: inputValue.map(i => i.value),
                        onChange: onSelectChange,
                        type: multiple ? 'checkbox' : 'radio',
                        fixed: true
                    }"
                    :customRow="customRow"
                    :columns="columns"
                    :rowKey="rowKey"
                    :dataSource="data"
                    :pagination="pagination"
                    :loading="tableLoading"
                    @change="changePage"
                >
                    <div
                        slot="filterDropdown"
                        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                        class="custom-filter-dropdown"
                    >
                        <a-input
                            v-ant-ref="c => (searchInput = c)"
                            placeholder="点击按钮查询"
                            :value="selectedKeys[0]"
                            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                            @pressEnter="() => handleSearch(selectedKeys, confirm)"
                            style="width: 188px; margin-bottom: 8px; display: block;"
                        />
                        <a-button
                            type="primary"
                            @click="() => handleSearch(selectedKeys, confirm)"
                            icon="search"
                            size="small"
                            style="width: 90px; margin-right: 8px"
                        >
                            查询
                        </a-button>
                        <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">
                            清空
                        </a-button>
                    </div>
                </a-table>
            </a-modal>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { get, post } from '@/tools/common';
import FormDesign from '@/@types/form-design';
import { getDataSource } from '@/tools/formCommon';

@Component({})
export default class AntdFormDesignControlDataSearch extends Vue {
    @Prop({ type: Object }) control!: any;
    /** 文本框大小 */
    @Prop({ type: String, default: 'default' }) size!: 'small' | 'default' | 'large';
    /** 是否多选 */
    @Prop({ default: false }) multiple!: boolean;
    @Prop({ type: String, default: 'id' }) rowKey!: string;
    @Prop({ type: String, default: 'text' }) rowTextKey!: string;
    /** 是否显示弹出框 */
    // @Prop({ default: false }) show!: boolean;
    /** 标题 */
    @Prop({ default: '选择用户' }) dialogTitle!: string;
    /** 宽度 */
    @Prop({ default: '60%' }) width!: string | number;
    /** 是否调用时加载 */
    @Prop({ default: true }) lazy!: boolean;
    /** 提示 */
    @Prop({ default: '' }) placeholder!: string;
    /** 选择的数据Ids */
    @Prop({ type: Array, default: () => [] }) value!: Array<{ text: string, value: any }>;
    /** 列头 */
    @Prop({ type: Array, default: () => [] }) columns!: Array<any>;

    /** 接口列表 */
    @Getter('getApiList') getApiList!: FormDesign.Api[];

    show: boolean = false;
    inputValue: Array<{ text: string, value: any }> = [];

    /** 数据列表 */
    data: Array<Record<string, any>> = [];
    /** 选择的数据 */
    selectedData: Array<Record<string, any>> = [];
    /** 筛选条件 */
    searchText: string = '';
    /** 搜索文本 */
    searchInput?: HTMLElement;
    /** 表格是否处于加载状态 */
    tableLoading = false;
    /** 分页参数 */
    pagination = {
        pageSizeOptions: ['5', '10', '20', '40'],
        showQuickJumper: true,
        showSizeChanger: true,
        defaultCurrent: 1,
        current: 1,
        pageSize: 10,
        defaultPageSize: 10,
        total: 0
    };

    get getValue() {
        if (this.selectedData.length) {
            if (this.multiple) {
                return this.selectedData.map(i => i[this.rowTextKey]).join(', ');
            } else {
                return this.selectedData[0][this.rowTextKey];
            }
        }
    }
    
    get getText() {
        return this.inputValue.map(i => i.text).join(', ');
    }

    /** 清空条件（username） */
    handleReset(clearFilters: Function) {
        clearFilters();
        this.searchText = '';
    }

    created() {
        this.init();
    }

    /** 初始化 */
    init() {
        this.inputValue = this.value || [];
        this.searchData();
    }

    /** 打开弹出框 */
    openDialog() {
        this.show = true;
        // this.$emit('update:show', true);
        this.searchData();
    }

    customRow(record) {
        return {
            on: {
                click: () => {
                    if (this.multiple) {
                        let _index = this.inputValue.findIndex(i => i.value == record[this.rowKey]);
                        if (_index >= 0) {
                            this.inputValue.splice(_index, 1);
                            this.selectedData.splice(_index, 1);
                        } else {
                            this.inputValue.splice(_index, 0, { text: record[this.rowTextKey], value: record[this.rowKey] });
                            this.selectedData.splice(_index, 0, record);
                        }
                    } else {
                        this.inputValue = [{ text: record[this.rowTextKey], value: record[this.rowKey] }];
                        this.selectedData = [record];
                        this.confirm();
                    }
                }
            }
        }
    }

    mounted() {
    }

    /** 根据条件查询 */
    handleSearch(selectedKeys: Array<string>, confirm: Function) {
        confirm && confirm();
        this.searchText = selectedKeys[0];
    }

    /** 点击按钮 */
    btnClick(e, type) {
    }

    /** 移除数据 */
    removeData() {

    }

    /** 重新查询用户 */
    async searchData() {
        this.tableLoading = true;
        // this.pagination.filters = { groupId: this.selectedGroup[0] };

        // 查询数据
        let _type = this?.control?.propertyEditors?.dataSource || this.$attrs.dataSource_type;
        this.data = await getDataSource(this.$attrs?.dataSource, _type);
        this.tableLoading = false;
        
    }

    changePage(e) {
        this.pagination.pageSize = e.pageSize;
        this.pagination.current = e.current;
        this.searchData();
    }

    /** 选择行 */
    onSelectChange() {
        this.$emit('confirm', this.selectedData);
        this.$emit('change', this.inputValue);
    }

    /** 确定返回所选数据 */
    public confirm() {
        this.show = false;
        // this.$emit('update:show', false);
        this.$emit('confirm', this.selectedData);
        this.$emit('change', this.inputValue);
    }

    /** 确定返回所选用户 */
    public cancel(e) {
        this.show = false;
        // this.$emit('update:show', false);
        this.$emit('cancel', this.selectedData);
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
