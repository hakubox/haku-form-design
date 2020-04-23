<template>
    <div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { get, post } from '@/tools/common';

@Component({})
export default class BlankControl extends Vue {
}
</script>

<style lang="scss" scoped>

</style>
