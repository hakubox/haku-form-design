<template lang="html">
    <div class="form-flex" :style="$attrs">
        <slot :name="'child0'">
            <form-design-blank-control />
        </slot>
    </div>
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
    .form-design-canvas-mainpanel {

        .form-flex {
            outline: 1px solid #EEE;
        }
    }

    .form-flex {
        display: flex;
        min-height: 44px;
        background-color: white;
        padding-bottom: 10px;

        > div {
            flex-grow: 1;
        }
    }
</style>