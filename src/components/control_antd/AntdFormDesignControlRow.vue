<template lang="html">
    <a-row v-bind="control.control.attrs">
        <a-col 
            class="ant-col"
            v-for="(item, index) in control.control.attrs.options"
            :key="index" 
            :span="item.span"
            :offset="item.offset"
        >
            <slot :name="'child' + index">
                <form-design-blank-control />
            </slot>
        </a-col>
    </a-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class AntdFormDesignControlRow extends Vue {
    @Prop({ type: Object }) control!: any;
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;
}
</script>

<style lang="scss" scoped>
    .ant-row-flex,
    .ant-row {

        > .ant-col {
            min-height: 44px;
            background-color: white;
            outline: 1px solid #EEE;
        }
    }
</style>