<template lang="html">
    <van-cell-group :title="title">
        <slot name="child0">
            <gj-form-design-blank-control />
        </slot>
    </van-cell-group>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class GjFormDesignControlCellGroup extends Vue {
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;

    @Prop({ type: String, default: '表单区域' }) title!: string;
}
</script>

<style lang="scss" scoped>
</style>