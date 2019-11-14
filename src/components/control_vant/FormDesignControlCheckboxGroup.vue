<template lang="html">
    <van-checkbox-group v-model="value">
        <van-cell-group>
            <van-cell v-for="item in options" :key="item.id" :left-icon="item.icon" :title="item.title" clickable @click="$emit('input', item.id)">
                <van-checkbox slot="right-icon" :name="item.id" />
            </van-cell>
        </van-cell-group>
    </van-checkbox-group>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class FormDesignControlCheckboxGroup extends Vue {
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;

    @Prop({ }) options!: any;
}
</script>

<style lang="scss" scoped>
</style>