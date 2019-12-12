<template lang="html">
    <van-collapse v-bind="control.attrs" v-model="control.attrs.value">
        <van-collapse-item 
            v-for="(item, index) in control.attrs.options" 
            :key="index"
            :name="index"
            :title="item.title" 
            :icon="item.icon"
            :right-icon="item.rightIcon"
        >
            <slot :name="'child' + index">
                <form-design-blank-control />
            </slot>
        </van-collapse-item>
    </van-collapse>
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
    .van-row {

        > .van-col {
            min-height: 44px;
            background-color: white;
            outline: 1px solid #EEE;
        }
    }

    ::v-deep .van-collapse-item__content {
        position: relative;
        min-height: 44px;
    }
</style>