<template lang="html">
    <a-collapse v-bind="control.control.attrs" v-model="control.control.attrs.value">
        <a-collapse-panel
            v-for="(item, index) in control.control.attrs.options" 
            :key="'a' + index"
        >
            <span slot="header">
                <van-icon :name="item.icon" />&nbsp; {{item.title}}
            </span>
            <slot :name="'child' + index">
                <form-design-blank-control />
            </slot>
        </a-collapse-panel>
    </a-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
    components: {
    }
})
export default class VantFormDesignControlCollapse extends Vue {
    @Prop({ type: Object }) control!: any;
    @Prop({ type: String }) controlId!: string;
}
</script>

<style lang="scss" scoped>
    ::v-deep .ant-collapse-content-box {
        position: relative;
        min-height: 44px;
    }
</style>