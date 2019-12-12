<template>
    <a-select v-model="inputValue" placeholder="请输入变量" @change="change" :size="size" :options="variableList" class="variable-picker" ref="editor">
        
    </a-select>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';
import FormDesign from '@/@types/form-design';

@Component({
  components: {
  }
})
export default class VariablePicker extends Vue {
	/** 当前变量 */
    @Prop({
        default: ''
    }) value!: string;
    /** 筛选变量类型 */
    @Prop({
        type: String,
        default: 'any'
    }) type!: string;
    @Prop({
        type: String,
        default: 'default'
    }) size!: ('large' | 'default' | 'small');
    /** 表单变量 */
    @Prop({
        type: Array,
        default: () => []
    }) variables!: Array<FormDesign.FormVariable>;

    /** 真实值 */
    inputValue: string = '';
    
	mounted(){
        this.init();
    }

    get variableList() {
        return this.variables.filter(i => {
            if (i.type == 'any' || this.type == 'any') {
                return true;
            } else if (i.type) {
                // 需过滤的类型集合
                let types = this.type.split('|').map(o => o.trim());
                // 实际数据的类型集合
                let dataTypes = i.type.split('|').map(p => p.trim());
                return types.some(o => dataTypes.includes(o));
            } else {
                return true;
            }
        }).map(i => ({
            value: i.name,
            label: i.name + (i.remark ? (': ' + i.remark) : ''),
            title: i.remark
        }))
    }

    /** 初始化 */
    init() {
        this.inputValue = this.value;
    }

    destroy() {
    }

    /** 改变值 */
    change() {
        this.$emit('input', this.inputValue);
    }
    
}
</script>

<style lang="scss" scoped>
</style>