<template lang="html">
    <div class="form-flex" :style="control.control.attrs">
        <slot :name="'child0'" class="form-flex-item">
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
    .form-flex {
        display: flex;
        min-height: 44px;
        background-color: white;
        outline: 1px solid #EEE;
        padding-bottom: 10px;
    }
</style>