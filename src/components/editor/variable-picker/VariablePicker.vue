<template>
    <a-tree-select v-model="inputValue" placeholder="请选择页面变量" searchPlaceHolder="搜索变量" @change="change" :size="size" 
        treeNodeFilterProp="name"
        treeNodeLabelProp="remark" 
        :tree-data="variableList"
        :treeExpandedKeys.sync="extendNodes"
        class="variable-picker"
        :allowClear="true"
        :searchValue.sync="searchTxt"
        :showSearch="true"
        :filterTreeNode="search"
        :dropdownStyle="{
            maxHeight: '500px'
        }"
        ref="editor"
    >
    </a-tree-select>
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
    @Getter('getFormVariables') formVariables!: Array<FormDesign.FormVariable>;

    /** 搜索文本 */
    searchTxt: string = '';

    /** 真实值 */
    inputValue: Array<string> = [''];

    extendNodes: Array<string> = [];

    @Watch('variableList')
    checkChange() {
        this.extendNodes = this.variableList.map(i => i.key);
    }
    
	mounted(){
        this.init();

        this.extendNodes = this.variableList.map(i => i.key);
    }

    search(inputValue: string, treeNode: any) {
        return (''+treeNode.data.props.value).includes(inputValue) || treeNode.data.props.title.includes(inputValue);
    }

    get variableList(): Array<Record<string, any>> {
        return recursive(this.formVariables, {
            map: (i, keyChain) => ({ label: (i.remark ? (i.remark + ': ') : '') + i.name, key: i.name, value: keyChain.map(i => i.name), children: i?.children, disabled: !!i?.children?.length })
        });
    }

    /** 初始化 */
    init() {
        this.inputValue = this.value.split('.');
    }

    destroy() {
    }

    /** 改变值 */
    change() {
        this.$emit('input', this.inputValue.join('.'));
    }
    
}
</script>

<style lang="scss" scoped>
</style>