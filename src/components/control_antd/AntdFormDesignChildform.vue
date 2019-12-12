<template lang="html">
    <a-table v-bind="control.control.attrs" :scroll="{ x: control.control.attrs.scrollX, y: control.control.attrs.scrollY }">
    </a-table>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class AntdFormDesignChildform extends Vue {
    @Prop({ type: Object }) control!: any;
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;
}
</script>

<style lang="scss" scoped>
</style>