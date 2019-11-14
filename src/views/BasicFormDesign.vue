<template>
    <div class="page-form-design">
        <form-designer />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: {}
})
export default class BasicFormDesign extends Vue {

    created() {
    }
}
</script>

<style lang="scss">
    .page-form-design {
        position: relative;
        overflow: auto;
        width: 100vw;
        height: 100vh;
    }
</style>