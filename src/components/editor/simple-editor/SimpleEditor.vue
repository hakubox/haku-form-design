<template>
    <input v-if="type === 'string'" type="text" :value="value" @input="change($event.target.value)" />
    <input v-else-if="type === 'number'" type="number" :value="value" @input="change($event.target.value)" />
    <input v-else-if="type === 'boolean'" type="checkbox" :value="value" @input="change($event.target.checked)" />
    <input v-else-if="type === 'date'" type="datetime" :value="value.format('yyyy-MM-dd')" @change="change($event.target.value)" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post, recursive } from '@/tools/common';
import FormDesign from '@/@types/form-design';
import { Getter } from 'vuex-class';

@Component({
  components: {
  }
})
export default class SimpleEditor extends Vue {
	/** 当前变量 */
    @Prop({}) value!: string;

    get type() {
        return Object.prototype.toString.call(this.value).slice(8, -1).toLowerCase();
    }

    /** 改变值 */
    change(val) {
        let _val: any = undefined;
        switch (this.type) {
            case 'string': _val = '' + val; break;
            case 'number': _val = Number(val); break;
            case 'boolean':
                if (val === 'true') _val = true;
                else if (val === 'false') _val = false;
                else _val = Boolean(val);
                break;
            case 'date': _val = new Date(val); break;
        }
        this.$emit('change', _val);
    }
    
}
</script>

<style lang="scss" scoped>
</style>