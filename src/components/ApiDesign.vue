<template lang="html">

    <div>
        <div style="margin-bottom: 5px;">
            <a-button type="primary" @click="addApi()">新增</a-button>
        </div>
        <a-table
            size="middle"
            :columns="columns"
            :dataSource="apiList"
            :pagination="false"
            :scroll="{ y: 240 }"
        >
            <template #id="text, record, index">
                <div class="tac">{{index + 1}}</div>
            </template>
            <template #name="text, record, index">
                <a-input v-if="record.isEdit" v-model="record.name" />
                <span v-else>{{text}}</span>
            </template>
            <template #type="text, record, index">
                <a-select v-if="record.isEdit" v-model="record.type" defaultValue="get" :dropdownMatchSelectWidth="false">
                    <a-select-option value="get">GET</a-select-option>
                    <a-select-option value="post">POST</a-select-option>
                </a-select>
                <a-tag v-else :color="{
                    post: 'blue',
                    get: 'green'
                }[text]" style="cursor: default;user-select: none;">{{text.toUpperCase()}}</a-tag>
            </template>
            <template #state="text, record, index">
                <a-tag v-if="!record.address" color="#f50">地址无效</a-tag>
                <a-tooltip v-else-if="text === undefined" placement="bottom">
                    <template slot="title">点击测试接口</template>
                    <a-tag color="#BBB" style="user-select: none;" @click="testApi(record)">未验证</a-tag>
                </a-tooltip>
                <a-tooltip v-else placement="bottom">
                    <template slot="title">点击测试接口</template>
                    <a-tag :color="text ? '#52c41a' : '#f5222d'" style="user-select: none;" @click="testApi(record)">{{text ? '正常' : '失败'}}</a-tag>
                </a-tooltip>
                
            </template>
            <template #address="text, record, index">
                <a-input v-if="record.isEdit" v-model="record.address" />
                <span v-else>{{text}}</span>
            </template>
            <template #remark="text, record, index">
                <a-input v-if="record.isEdit" v-model="record.remark" />
                <span v-else>{{text}}</span>
            </template>
            <template #handle="text, record, index">
                <template v-if="record.isEdit">
                    <a href="javascript:;" @click="saveApi(index, { ...record, isEdit: false });">保存</a>
                    <a-divider type="vertical" />
                    <a href="javascript:;" style="color: #fa8c16;" @click="cancelSaveApi(index, { ...record, isEdit: false });">取消</a>
                </template>
                <template v-else>
                    <a href="javascript:;" @click="saveApi(index, { ...record, isEdit: true });">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="是否确认移除当前接口?" @confirm="removeApi(index)">
                        <a href="javascript:;" style="color: #f5222d;">删除</a>
                    </a-popconfirm>
                </template>
                <!-- <a-divider v-if="record.address" type="vertical" /> -->
                <!-- <a v-if="record.address" @click="testApi(record);" style="color: #52c41a;">测试</a> -->
            </template>
        </a-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import { get, post } from '@/tools/common';
import { cloneForce } from '@/lib/clone/index';
import FormDesign from '@/@types/form-design';
import axios from 'axios';

interface EditApi extends FormDesign.Api {
    /** Id */
    id: string;
    /** 测试是否通过 */
    state?: boolean;
    /** 是否允许编辑 */
    isEdit: boolean;
}

@Component({
  components: {
  }
})
export default class ApiDesign extends Vue {
    @Prop({ type: Object }) control!: any;
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;

    /** 接口列表 */
    @Getter('getApiList') getApiList!: FormDesign.Api[];
    
    /** 更新Vue代码 */
    @Mutation('setApiList') setApiList!: (apiList: FormDesign.Api[]) => void;

    /** 表格展示字段 */
    columns = [
        { title: '序号', width: 45, dataIndex: 'id', scopedSlots: { customRender: 'id' } },
        { title: '名称/别名', width: 150, dataIndex: 'name', scopedSlots: { customRender: 'name' } },
        { title: '接口类型', width: 110, dataIndex: 'type', scopedSlots: { customRender: 'type' } },
        { title: '状态', width: 80, dataIndex: 'state', scopedSlots: { customRender: 'state' } },
        { title: '接口地址', width: 350, dataIndex: 'address', scopedSlots: { customRender: 'address' } },
        { title: '接口描述', dataIndex: 'remark', scopedSlots: { customRender: 'remark' } },
        { title: '操作', width: 90, dataIndex: 'handle', scopedSlots: { customRender: 'handle' } },
    ];

    apiList: EditApi[] = [];

    created() {
        this.apiList = this.getApiList.map((i, index) => ({
            ...i,
            id: this.$common.createModelId(16),
            isEdit: false,
        })) as EditApi[];
    }

    /** 新增一个API */
    addApi() {
        this.apiList.push({
            id: this.$common.createModelId(16),
            name: '',
            type: 'post',
            state: undefined,
            address: '',
            remark: '',
            isEdit: true
        });
        this.setApiList(this.apiList);
    }

    tempApi: EditApi | null = null;

    saveApi(index, record) {
        if (record.isEdit === false) {
            if (!record.address) {
                this.$message.error('接口地址不能为空。');
                return;
            } else {
                this.testApi(record);
            }
        } else {
            this.apiList.forEach((i, apiIndex) => {
                if (apiIndex !== index && i.isEdit === true) {
                    this.cancelSaveApi(apiIndex, this.apiList[apiIndex]);
                }
            })
            this.tempApi = cloneForce(record);
        }
        this.apiList.splice(index, 1, record);
        this.setApiList(this.apiList);
    }

    cancelSaveApi(index, record) {
        this.$set(this.apiList, index, cloneForce({
            ...this.tempApi,
            isEdit: false
        }));
    }

    testApi(record, hasTip = true) {
        axios.request({
            url: record.address,
            method: record.type
        }).then(d => {
            this.$set(record, 'state', true);
            if (hasTip !== false) this.$message.success('测试成功。');
        }).catch(err => {
            this.$set(record, 'state', false);
            if (hasTip !== false) this.$message.error('测试失败。');
        });
    }

    removeApi(index: number) {
        this.apiList.splice(index, 1);
        this.setApiList(this.apiList);
    }
}
</script>

<style lang="scss" scoped>

</style>