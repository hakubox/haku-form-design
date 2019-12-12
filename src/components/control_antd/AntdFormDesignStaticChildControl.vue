<template lang="html">
    <component v-bind="control.control.attrs" :control="control" :is="control.control.control">
        <span v-if="control.control.attrs.text" v-html="control.control.attrs.text"></span>
    </component>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import FormDesign from '@/@types/form-design';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class AntdFormDesignStaticChildControl extends Vue {
    @Prop({ }) control!: any;

    mounted() {
    }
}
</script>

<style lang="scss" scoped>
</style>