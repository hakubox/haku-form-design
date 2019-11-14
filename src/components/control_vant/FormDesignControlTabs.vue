<template lang="html">
    <van-tabs 
        v-bind="control.attrs"
    >
        <van-tab
            v-for="(item, index) in control.attrs.options" 
            :key="index"
            :title="item.title"
            :name="index"
        >
            <div slot="title">
                <van-icon :name="item.icon" />&nbsp; {{item.title}}
            </div>
            <slot :name="'child' + index">
                <form-design-blank-control />
            </slot>
        </van-tab>
    </van-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
    components: {
    }
})
export default class FormDesignControlTabs extends Vue {
    @Prop({ type: Object }) control: any;
    @Prop({ type: String }) controlId!: string;
    @Prop({ default: 0 }) value!: number;
}
</script>

<style lang="scss" scoped>
    .van-row {

        > .van-col {
            min-height: 44px;
            background-color: white;
            outline: 1px solid #EEE;
        }
    }

    ::v-deep .van-tab__pane {
        position: relative;
        min-height: 44px;
    }
</style>