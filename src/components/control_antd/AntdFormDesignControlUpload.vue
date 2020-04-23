<template>
    <div>
        <a-upload 
            style="width: 100%;" 
            v-bind="attrs"
            :action="uploadUrl"
            :data="getData"
            :headers="getHeaders"
        >
            <a-button v-if="$attrs.disabled !== true">
                <a-icon :type="'upload'" />
                {{$attrs['btn-text']}}
            </a-button>
            <p class="upload-tip">{{$attrs['upload-tip']}}</p>
        </a-upload>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { get, post, filterObj } from '@/tools/common';
import FormDesign from '@/@types/form-design';
import { getDataSource } from '@/tools/formCommon';

@Component({})
export default class AntdFormDesignControlUpload extends Vue {
    @Prop({ type: Object }) control!: FormDesign.FormControl;

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

    get uploadUrl() {
        if (this.$attrs?.url?.['id']) {
            return this.getApiList.find(i => i.id == this.$attrs.url?.['id'])?.address || '';
        } else {
            return '';
        }
    }

    get attrs() {
        return filterObj(this.$attrs, ['data', 'headers']);
    }

    get getData() {
        return new Function('return ' + this.$attrs.data)();
        // console.log(this.$attrs.data);
        // return this.$attrs.data;
    }

    get getHeaders() {
        return new Function('return ' + this.$attrs.headers)();
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

    /** 初始化 */
    init() {
        this.searchData();
    }

    mounted() {
    }

    /** 重新查询用户 */
    async searchData() {
    }
}
</script>

<style lang="scss" scoped>
    .upload-tip {
        color: #BBB;
        padding: 6px 0px;
    }
    
</style>
