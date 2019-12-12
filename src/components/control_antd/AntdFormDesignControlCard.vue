<template lang="html">
    <a-card :title="title">
        <slot name="child0">
            <form-design-blank-control />
        </slot>
    </a-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class AntdFormDesignControlCard extends Vue {
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;

    @Prop({ type: String, default: '表单区域' }) title!: string;
}
</script>

<style lang="scss" scoped>
::v-deep .ant-card-body {
    position: relative;
    min-height: 44px;
}
</style>