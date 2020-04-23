<template>
    <div>
        <span class="form-label" v-if="$attrs.onlyText">
            {{getText}}
        </span>
        <a-checkbox-group v-else v-bind="$attrs" v-model="inputValue" @change="change" :options="data" :loading="loading">

        </a-checkbox-group>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { get, post } from '@/tools/common';
import FormDesign from '@/@types/form-design';
import { getDataSource } from '@/tools/formCommon';

@Component({})
export default class AntdFormDesignControlCheckboxGroup extends Vue {
    @Prop({ type: Object }) control!: any;
    @Prop({ type: Array, default: () => ([]) }) value!: string[];

    @Prop({ type: Object }) options!: any;

    /** 接口列表 */
    @Getter('getApiList') getApiList!: FormDesign.Api[];
    
    /** 是否加载中 */
    loading: boolean = false;

    inputValue: string[] = [];

    /** 数据列表 */
    data: Array<Record<string, any>> = [];
    /** 选择的数据 */
    selectedData: Array<Record<string, any>> = [];

    created() {
        this.init();
    }

    get getText() {
        return this.options.filter(i => this.inputValue.includes(i[this.$attrs.valueField])).map(i => i?.[this.$attrs.labelField]).join(', ');
    }
    
    @Watch('options', {
        deep: true
    })
    changeOptions(val, oldVal) {
        this.searchData();
    }

    @Watch('control.propertyEditors.options', {
        deep: true
    })
    changeDataType(val, oldVal) {
        this.searchData();
    }

    /** 初始化 */
    init() {
        this.change(this.value);
        this.searchData();
    }

    mounted() {
    }

    change(val) {
        if (val !== undefined) {
            this.inputValue = val;
        }
        this.$emit('input', this.inputValue);
    }

    /** 重新查询用户 */
    searchData() {
        getDataSource(this.$attrs.__options ?? this.options, this?.control?.propertyEditors?.options || this.$attrs.options_type, {
            map: item => ({ ...item, value: item[this.$attrs.valueField], label: item[this.$attrs.labelField] })
        }).then(d => {
            this.data = d;
        });
    }
}
</script>

<style lang="scss" scoped>
</style>
