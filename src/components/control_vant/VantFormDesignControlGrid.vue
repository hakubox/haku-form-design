<template lang="html">
    <van-grid v-bind="control.attrs">
        <van-grid-item 
            v-for="(item, index) in control.attrs.options"
            :key="index"
            :icon="item.icon" 
            :text="item.text" />
    </van-grid>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class VantFormDesignControlGrid extends Vue {
    @Prop({ type: Object }) control!: any;
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;
}
</script>

<style lang="scss" scoped>
</style>