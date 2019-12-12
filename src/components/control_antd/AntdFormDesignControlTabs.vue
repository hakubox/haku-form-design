<template lang="html">
    <a-tabs 
        v-bind="control.control.attrs"
    >
        <a-tab-pane
            v-for="(item, index) in control.control.attrs.options" 
            :key="index"
        >
            <span slot="tab">
                <van-icon :name="item.icon" />&nbsp; {{item.title}}
            </span>
            <slot :name="'child' + index">
                <form-design-blank-control />
            </slot>
        </a-tab-pane>
    </a-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
    components: {
    }
})
export default class AntdFormDesignControlTabs extends Vue {
    @Prop({ type: Object }) control: any;
    @Prop({ type: String }) controlId!: string;
    @Prop({ default: 0 }) value!: number;
}
</script>

<style lang="scss" scoped>
    .ant-tabs-tabpane {
        position: relative;
        min-height: 44px;
    }
</style>