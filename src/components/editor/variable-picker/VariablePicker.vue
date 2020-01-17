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
    @Getter('getFormScript') formScript!: FormDesign.FormScript;
    /** 表单变量 */
    @Getter('getFormScriptComment') formScriptComment!: Record<string, string>;

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

    /** 递归函数 */
    recursiveObject(obj: Record<string, any>, callback: {
        filter?: (variable: Record<string, any>, chain: Array<Record<string, any>>) => boolean,
        map?: (variable: Record<string, any>, chain: Array<Record<string, any>>) => any
    }, childField: string = 'children'): Array<Record<string, any>> {

        let _list: Array<Record<string, any>> = [];

        // 递归
        const _cb = (newParent: Record<string, any>, [key, value]: [string, any], chain: Array<Record<string, any>>) => {
            if (callback?.filter?.(newParent, chain) === false) {
                return;
            }
            let _item = {
                label: this.formScriptComment[key],
                value: key,
                children: []
            };
            chain.push(_item);
            if (value instanceof Object) {
                let children = Object.entries(value);
                if (children.length) {
                    for (let i = 0; i < children.length; i++) {
                        _cb(_item, children[i], chain);
                    }
                }
            }
            newParent.children.push(callback.map?.(_item, chain) || _item);
        };

        Object.entries(obj).forEach(([key, value]) => {
            let _item = {
                label: this.formScriptComment[key],
                value: key,
                children: []
            };
            if (callback?.filter?.(_item, []) === false) {
                return;
            }

            if (value instanceof Object) {
                let children = Object.entries(value);
                if (children.length) {
                    for (let i = 0; i < children.length; i++) {
                        _cb(_item, children[i], [_item]);
                    }
                }
            }

            _list.push(callback.map?.(_item, [_item]) || _item);
        });

        return _list;
    }

    search(inputValue: string, treeNode: any) {
        return (''+treeNode.data.props.value).includes(inputValue) || treeNode.data.props.title.includes(inputValue);
    }

    get variableList(): Array<Record<string, any>> {
        return this.recursiveObject(this.formScript.data, {
            map: (i, keyChain) => ({ label: (i.label ? (i.label + ': ') : '') + i.value, key: i.value, value: keyChain.map(i => i.value), children: i?.children, disabled: !!i?.children?.length })
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