<template lang="html">
    <van-row v-bind="control.attrs">
        <van-col v-for="(item, index) in control.attrs.options" :span="item.span" :offset="item.offset" icon="photo-o" text="文字">
            <slot :name="'child' + index">
                <gj-form-design-blank-control />
            </slot>
        </van-col>
    </van-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class GjFormDesignControlRow extends Vue {
    @Prop({ type: Object }) control!: any;
    @Prop({ type: String }) value!: string;
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
</style>