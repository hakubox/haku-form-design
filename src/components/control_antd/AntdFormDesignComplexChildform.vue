<template lang="html">
    <div>
        <!-- {{control.children[0][0].control.attrs}} -->
        <a-table v-if="preview" :columns="columns" v-bind="control.control.attrs" :scroll="{ x: control.control.attrs.scrollX, y: control.control.attrs.scrollY }">
            <span v-for="(item, index) in contentColumns" :key="index" :slot="item.dataIndex" slot-scope="text, record, index">
                <span v-if="item.onlyText">{{text}}</span>
                <template v-else>
                    <component 
                        v-bind="item.control.control.attrs" 
                        :is="item.control.control.control" 
                        v-model="control.control.attrs.dataSource[index][item.dataIndex]">
                        <span v-if="item.control.control.attrs.text">{{item.control.control.attrs.text}}</span>
                    </component>
                </template>
            </span>
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

@Component({
  components: {
  }
})
export default class AntdFormDesignChildform extends Vue {
    @Prop({ type: Object }) control!: any;
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;

    /** 是否为预览模式 */
    @Inject() preview!: boolean;

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