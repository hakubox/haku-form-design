<template lang="html">
    <div>
        <a-table v-if="preview" :columns="columns" v-bind="control.control.attrs" :dataSource="data" :scroll="{ x: control.control.attrs.scrollX, y: control.control.attrs.scrollY }">
            <template v-for="(item, index) in contentColumns" #[item.dataIndex]="text, record, index">
                <span :key="index" v-if="item.onlyText">{{text}}</span>
                <template v-else>
                    <component 
                        :key="index"
                        v-bind="item.control.control.attrs" 
                        :is="item.control.control.control" 
                        :control="item.control"
                        :value="data[index][item.dataIndex]"
                        @change="childChange($event, index, item.control.control.attrs.dataIndex)">
                        <span v-if="item.control.control.attrs.text">{{item.control.control.attrs.text}}</span>
                    </component>
                </template>
            </template>
        </a-table>
        <div class="complex-child-form" v-else>
            <slot :name="'child0'">
                <form-design-blank-control />
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import { get, post } from '@/tools/common';
import { getDataSource } from '@/tools/formCommon';

@Component({
  components: {
  }
})
export default class AntdFormDesignChildform extends Vue {
    @Prop({ type: Object }) control!: any;
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;

    /** 数据列表 */
    data: Array<Record<string, any>> = [];

    /** 是否为预览模式 */
    @Inject() preview!: boolean;

    @Watch('control.propertyEditors.dataSource', { deep: true }) 
    changeOptions() {
        this.searchData();
    }

    @Watch('$attrs.dataSource', { deep: true }) 
    changeData() {
        this.searchData();
    }

    created() {
        this.init();
    }

    init() {
        this.searchData();
    }

    /** 重新查询用户 */
    searchData() {
        getDataSource(this.$attrs.dataSource, this.control.propertyEditors.dataSource).then(d => {
            this.data = d;
        });
    }

    /** 子项变更 */
    childChange(e, index, dataIndex) {
        this.$set(this.data, index, {
            ...this.data[index],
            [dataIndex]: e
        });
        console.log(e, this.control.control.attrs.dataSource + '.' + dataIndex, dataIndex);
    }

    get columns() {
        return this.control.children[0].map(i => ({
            ...i.control.attrs,
            control: i,
            scopedSlots: { customRender: i.control.attrs.dataIndex },
        }));
    }

    get contentColumns() {
        return this.columns.filter(i => i.dataIndex);
    }
}
</script>

<style lang="scss" scoped>
.complex-child-form {
    min-height: 100px;
    border: 1px solid #e8e8e8;
    background-color: #FAFAFA;
    padding: 5px;
    padding-bottom: 15px;

    > .blank-control {
        border: 1px solid #e8e8e8;
        background-color: #FAFAFA;
    }
}
</style>