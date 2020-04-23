<template>
    <div>
        <span class="form-label" v-if="$attrs.onlyText">
            {{getText}}
        </span>
        <a-radio-group v-else v-bind="$attrs" v-model="inputValue" @change="change" :options="data" :loading="loading">
        </a-radio-group>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { get, post } from '@/tools/common';
import FormDesign from '@/@types/form-design';
import { getDataSource } from '@/tools/formCommon';

@Component({})
export default class AntdFormDesignControlRadioGroup extends Vue {
    @Prop({ type: Object }) control!: any;
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

    get getText() {
        return (this.options || []).find(i => i[this.$attrs.valueField] == this.inputValue)?.[this.$attrs.labelField] || '';
    }

    /** 初始化 */
    init() {
        this.inputValue = this.value;
        this.searchData();
    }

    mounted() {
    }

    change(val) {
        console.log(val, this.inputValue);
        if (val !== undefined) {
            this.inputValue = val?.target?.value;
        }
        this.$emit('change', this.inputValue);
    }

    /** 重新查询用户 */
    async searchData() {
        this.data = await getDataSource(this.$attrs.__options ?? this.options, this?.control?.propertyEditors?.options || this.$attrs.options_type, {
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
