<template>
    <div>
        <span class="form-label" v-if="$attrs.onlyText">
            {{getText}}
        </span>
        <a-select v-else style="width: 100%;" v-bind="$attrs" v-model="inputValue" :options="data" :loading="loading" @change="change"></a-select>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { get, post } from '@/tools/common';
import FormDesign from '@/@types/form-design';
import { getDataSource } from '@/tools/formCommon';

@Component({})
export default class AntdFormDesignControlSelect extends Vue {
    @Prop({ type: Object }) control!: FormDesign.FormControl;
    @Prop({}) value!: any;

    @Prop() options!: any;

    /** 接口列表 */
    @Getter('getApiList') getApiList!: FormDesign.Api[];
    
    /** 是否加载中 */
    loading: boolean = false;

    inputValue: string[] = [];

    /** 数据列表 */
    data: Array<Record<string, any>> = [];
    /** 选择的数据 */
    selectedData: Array<Record<string, any>> = [];

    get getText() {
        return (this.options || []).find(i => i[this.$attrs.valueField] == this.inputValue)?.[this.$attrs.labelField] || '';
    }

    created() {
        this.init();
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

    change() {
        this.$emit('change', this.inputValue);
    }

    /** 初始化 */
    init() {
        this.inputValue = this.value;
        this.searchData();
    }

    mounted() {
    }

    /** 重新查询用户 */
    async searchData() {
        this.data = await getDataSource(this.$attrs.__options ?? this.options, this.control?.propertyEditors?.options || this.$attrs.options_type, {
            map: item => ({ ...item, value: item[this.$attrs.valueField], label: item[this.$attrs.labelField] })
        });
    }
}
</script>

<style lang="scss" scoped>
    ::v-deep .approval-record-item {

        .ant-card.ant-card-small {

            > .ant-card-body {
                padding: 3px 6px;
            }
        }
    }
    
</style>
