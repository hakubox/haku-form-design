<template>
    <a-select v-model="inputValue" placeholder="请选择页面函数" @change="change" :size="size" 
        :options="functionList"
        class="variable-picker"
        :allowClear="true"
        :showSearch="true"
        ref="editor"
    >
    </a-select>
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
export default class FunctionPicker extends Vue {
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
    @Getter('getFormFunctions') formFunctions!: Array<FormDesign.FormFunction>;

    /** 真实值 */
    inputValue: string = '';
    
	mounted(){
        this.init();
    }

    search(inputValue: string, treeNode: any) {
        return (''+treeNode.data.props.value).includes(inputValue) || treeNode.data.props.title.includes(inputValue);
    }

    get functionList(): Array<Record<string, any>> {
        return this.formFunctions.map(i => ({ label: i.remark + ': ' + i.name, value: i.name }));
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