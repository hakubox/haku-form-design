<template>
    <div>
        <a-date-picker style="width: 100%;" v-bind="$attrs" :value="inputValue" :options="data" :loading="loading" @change="change"></a-date-picker>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { get, post } from '@/tools/common';
import FormDesign from '@/@types/form-design';
import { getDataSource } from '@/tools/formCommon';
import moment, { Moment } from 'moment';

@Component({})
export default class AntdFormDesignControlDatePicker extends Vue {
    @Prop({ type: Object }) control!: FormDesign.FormControl;
    @Prop({}) value!: any;

    @Prop() options!: any;

    /** 接口列表 */
    @Getter('getApiList') getApiList!: FormDesign.Api[];
    
    /** 是否加载中 */
    loading: boolean = false;

    /** 数据列表 */
    data: Array<Record<string, any>> = [];
    /** 选择的数据 */
    selectedData: Array<Record<string, any>> = [];

    get inputValue() {
        return moment(this.value);
    }

    created() {
        this.init();
    }

    change() {
        this.$emit('change', this.value);
    }

    /** 初始化 */
    init() {
    }

    mounted() {
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
