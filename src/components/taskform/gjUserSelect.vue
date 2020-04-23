<template>
    <a-modal
        class="gj-user-select"
        :title="title"
        :initValue="initValue"
        :width="width"
        :maskClosable="false"
        :visible="show"
        @ok="confirm"
        @cancel="cancel"
    >
        <a-row type="flex" :gutter="16">
            <a-col :span="6" style="position: relative;">
                <a-input-search size="small" placeholder="搜索组织" @change="searchGroup" />
                <hr />
                <a-spin
                    :spinning="treeLoading"
                    style="
                        position: absolute;
                        width: calc(100% - 10px);
                        height: calc(100% - 50px);
                        overflow: auto;
                    "
                >
                    <a-tree
                        @expand="onExpand"
                        showLine
                        :autoExpandParent="autoExpandParent"
                        :expandedKeys="expandedKeys"
                        :selectedKeys="selectedGroup"
                        :treeData="groups"
                        @select="onGroupSelect"
                    >
                        <template #title="{title}">
                            <span v-if="title.indexOf(groupSearchValue) > -1">
                                {{ title.substr(0, title.indexOf(groupSearchValue)) }}
                                <span
                                    style="color: #f50"
                                >{{ groupSearchValue }}</span>
                                {{ title.substr(title.indexOf(groupSearchValue) + groupSearchValue.length) }}
                            </span>
                            <span v-else>{{ title }}</span>
                        </template>
                    </a-tree>
                </a-spin>
            </a-col>
            <a-col :span="18">
                <div v-if="multiple">
                    <div style="min-height: 24px;">
                        <span
                            v-if="!selectedUsers.length"
                            style="font-size: 14px; color: #BBB;"
                        >暂未选择用户</span>
                        <strong v-else :style="{ marginRight: 8 }">已选择：</strong>
                        <a-tag
                            v-for="(item, index) in selectedUsers"
                            :key="index"
                            closable
                            @close="removeUser"
                        >{{ item.chName }}</a-tag>
                    </div>
                    <hr />
                </div>
                <a-table
                    size="small"
                    :rowSelection="{
                        columnTitle: '选择',
                        hideDefaultSelections: true,
                        selectedRowKeys: value,
                        onChange: selectUsers,
                        type: multiple ? 'checkbox' : 'radio',
                        fixed: true
                    }"
                    :customRow="record => ({
                        on: { // 事件
                            click: (event) => rowClick(event, record)
                        }
                    })"
                    :columns="userColumns"
                    rowKey="account"
                    :dataSource="users"
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
                            :placeholder="`输入${column.title}查询`"
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
                        >查询</a-button>
                        <a-button
                            @click="() => handleReset(clearFilters)"
                            size="small"
                            style="width: 90px"
                        >清空</a-button>
                    </div>
                </a-table>
            </a-col>
        </a-row>
    </a-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import { Route } from 'vue-router';
import { Group, User } from 'model';

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

const generateData = function(treeData: Array<Group>): Array<Group> {
    let re: Array<Group> = [];
    const _fn = (data: Group) => {
        re.push(data);
        data.scopedSlots = { title: 'title' };
        if (data && data.children && data.children.length) {
            for (let i = 0; i < data.children.length; i++) {
                _fn(data.children[i]);
            }
        }
    };
    treeData.forEach(i => _fn(i));
    return re;
};

@Component({})
export default class GjUserSelect extends Vue {
    /** 是否多选 */
    @Prop({ default: false }) multiple!: boolean;
    /** 是否显示弹出框 */
    @Prop({ default: false }) show!: boolean;
    /** 标题 */
    @Prop({ default: '选择用户' }) title!: string;
    /** 宽度 */
    @Prop({ default: '60%' }) width!: string | number;
    /** 是否调用时加载 */
    @Prop({ default: true }) lazy!: boolean;

    /** 企业编号 */
    @Getter('getEnterpriseId') getEnterpriseId!: string;

    /** 初始化选择项 */
    @Prop({ default: () => [] }) initValue!: Array<any>;
    users: Array<User> = [];
    groups: Array<Group> = [];
    groupMaps: Array<Group> = [];
    /** 选择的组织Id */
    selectedGroup: Array<string> = [];
    /** 选择的用户Id */
    value: Array<string> = [];
    /** 选择的用户 */
    selectedUsers: Array<User> = [];
    /** 姓名筛选框 */
    scopedSlots = {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'customRender'
    };
    /** 姓名搜索文本 */
    searchInput?: HTMLElement;
    /** 默认展开项 */
    expandedKeys = ['1'];
    /** 是否自动展开 */
    autoExpandParent = true;
    /** 组织搜索内容 */
    groupSearchValue = '';
    /** 姓名搜索内容 */
    userNameSearchText = '';
    /** 树状图是否处于加载状态 */
    treeLoading = false;
    /** 表格是否处于加载状态 */
    tableLoading = false;
    /** 分页参数 */
    pagination = this.$root.getPagination();

    @Watch('show') changeShow(newVal) {
        newVal && this.loadData();
        if (newVal) {
            this.value = this.initValue;
        }
    }

    userColumns = [
        {
            title: '姓名',
            dataIndex: 'chName',
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'customRender'
            },
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => {
                        this.searchInput && this.searchInput.focus();
                    }, 0);
                }
            }
        },
        {
            title: '工号',
            dataIndex: 'employeeNumber'
        },
        { title: '手机号码', dataIndex: 'mobile' },
        { title: '电子邮箱', dataIndex: 'emailAddress' }
    ];

    created(): void {
        if (this.lazy || this.show) this.loadData();
    }

    /** 加载数据 */
    loadData() {
        this.treeLoading = true;
        this.tableLoading = true;
        Promise.all([
            this.$common.post('ExtenalApi/GetAllGroup', {
                EnterpriseId: this.getEnterpriseId
            }),
            this.$common.post('ExtenalApi/GetAllUsers', {
                EnterpriseId: this.getEnterpriseId,
                PageIndex: 1,
                PageSize: 10,
                orderBy: 'chName'
            })
        ]).then(([groups, users]) => {
            this.users = users.pageResult;
            let _group = groups.map(i => ({
                ...i,
                key: i.id,
                title: i.chName
            }));
            _group = _group.map(i => ({
                ...i,
                children: _group.filter(o => i.id == o.parentGroupId)
            })).filter(i => !i.parentGroupId);
            this.groups = _group;
            this.groupMaps = generateData(groups);
            this.treeLoading = false;
            this.tableLoading = false;
            if (this.value.length) {
                this.$common.post('ExtenalApi/GetAllUsers', {
                    EnterpriseId: this.getEnterpriseId,
                    PageIndex: this.pagination.current,
                    PageSize: 10,
                    orderBy: 'chName'
                }).then(d => {
                    this.selectedUsers = d.pageResult;
                });
            }
        });
    }

    onExpand(expandedKeys) {
        this.expandedKeys = expandedKeys;
        this.autoExpandParent = false;
    }

    /** 搜索组织 */
    searchGroup(e) {
        const value = e.target.value;
        const expandedKeys = this.groupMaps
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, this.groups);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        Object.assign(this, {
            expandedKeys,
            groupSearchValue: value,
            autoExpandParent: true
        });
    }

    /** 选择用户 */
    rowClick(e, record) {
        this.selectUsers([record.account]);
    }

    /** 选择用户 */
    selectUsers(selectedRowKeys: Array<string>) {
        this.value = this.multiple ? selectedRowKeys : selectedRowKeys.slice(-1);
        this.selectedUsers = this.selectedUsers.concat(
            this.value.filter(i => !this.selectedUsers.find(u => u.account == i)).map(i => {
                let re = this.users.find(u => u.account == i);
                return re as User;
            })
        ).filter(i => i && this.value.includes(i.account));
    }

    /** 选择完成 */
    complete() {}

    /** 根据条件查询（username） */
    handleSearch(selectedKeys: Array<string>, confirm: Function) {
        confirm && confirm();
        this.userNameSearchText = selectedKeys[0];
    }

    /** 清空条件（username） */
    handleReset(clearFilters: Function) {
        clearFilters();
        this.userNameSearchText = '';
    }

    /** 重新查询用户 */
    searchUsers() {
        this.tableLoading = true;
        this.pagination.filters = { groupId: this.selectedGroup[0] };
        this.$common.post('ExtenalApi/GetAllUsers', {
            EnterpriseId: this.getEnterpriseId,
            PageIndex: this.pagination.current,
            groupId: this.selectedGroup[0],
            PageSize: 10,
            orderBy: 'chName'
        }).then(d => {
            this.users = d.pageResult;
        }).finally(() => {
            this.tableLoading = false;
        });
    }

    /** 选择组织 */
    onGroupSelect(selectedKeys, info) {
        this.pagination.current = 1;
        this.selectedGroup = selectedKeys;
        this.searchUsers();
    }

    changePage(e) {
        this.pagination.pageSize = e.pageSize;
        this.pagination.current = e.current;
        this.searchUsers();
    }

    /** 确定返回所选用户 */
    public confirm(e) {
        if (this.selectedUsers.length) {
            this.$emit('update:show', false);
            this.$emit('confirm', this.selectedUsers);
        } else {
            this.$message.error('请选择至少一个用户。');
        }
    }

    /** 确定返回所选用户 */
    public cancel(e) {
        this.$emit('update:show', false);
        this.$emit('cancel', this.selectedUsers);
    }

    /** 快速移除用户 */
    public removeUser(e) {
        console.log(e);
    }

    /** 一般在初始化时手动设置已选择用户 */
    public setUsers(users: Array<User | string>) {
        if (users.length) {
            if (typeof users[0] == 'string') {
                this.value = users as Array<string>;
                
                this.$common.post(`${this.$config.CLIENT_INTERFACE}ExtenalApi/GetAllUsers`, this.pagination).then(d => {
                    this.selectedUsers = d;
                });
            } else {
                this.selectedUsers = users as Array<User>;
                this.value = (users as Array<User>).map(i => i.account);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.gj-user-select {
    ::v-deep .ant-modal-body {
        padding-bottom: 0px;
    }

    .custom-filter-dropdown {
        padding: 8px;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .highlight {
        background-color: rgb(255, 192, 105);
        padding: 0px;
    }

    .gj-user-select-btns {
        text-align: right;

        > .ant-btn {

            + .ant-btn {
                margin-left: 10px;
            }
        }
    }
}
</style>
