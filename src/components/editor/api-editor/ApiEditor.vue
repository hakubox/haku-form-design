<template>
    <div class="api-editor">
        <a-select
            showSearch
            :value="inputValue"
            style="width: 100%;"
            placeholder="查询接口列表"
            :defaultActiveFirstOption="false"
            :showArrow="false"
            :filterOption="false"
            @search="handleSearch"
            @change="handleChange"
            :notFoundContent="null"
            size="small"
        >
            <a-select-option v-for="d in data" :value="d.id" :key="d.id">{{d.name}}: {{d.remark || d.address}}</a-select-option>
        </a-select>

        <template v-if="hasParams !== false">
            <a-divider :dashed="true" orientation="left" style="font-size: 14px;margin: 6px 0px;">参数</a-divider>
            <code-editor language="javascript" height="80px" v-model="params" />
        </template>

        <template v-if="hasFormatter !== false">
            <a-divider :dashed="true" orientation="left" style="font-size: 14px;margin: 6px 0px;">格式化函数</a-divider>
            <code-editor language="javascript" height="80px" v-model="formatter" />
        </template>
    </div>
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
export default class ApiEditor extends Vue {

    @Watch('params')
    changeParams() {
        this.$emit('input', {
            id: this.inputValue,
            type: 'api',
            params: this.params,
            formatter: this.formatter
        });
    }

    @Watch('formatter')
    changeFormatter() {
        this.$emit('input', {
            id: this.inputValue,
            type: 'api',
            params: this.params,
            formatter: this.formatter
        });
    }

    /** 接口列表 */
    @Getter('getApiList') getApiList!: FormDesign.Api[];

	/** 当前变量 */
    @Prop({ default: () => ({ type: 'api' }), type: Object }) value!: any;
    /** 样式类型 */
    @Prop({ default: 'padding' }) styleName!: 'padding' | 'margin';
    /** 是否包含格式化区域 */
    @Prop({ default: true }) hasFormatter!: boolean;
    /** 是否包含参数区域 */
    @Prop({ default: true }) hasParams!: boolean;

    /** 绑定Id */
    inputValue: string = '';

    initData: FormDesign.Api[] = [];
    data: FormDesign.Api[] = [];

    params: string = '{}';
    formatter: string = 'd => d';
    
	created(){
        this.init();
    }

    /** 初始化 */
    init() {
        this.inputValue = this.value.id;
        this.initData = this.getApiList.filter(i => i.address);
        this.data = this.getApiList.filter(i => i.address);
        this.params = this.value.params || 'return {};';
        this.formatter = this.value.formatter || 'return d => d;';
    }

    destroy() {
    }

    /** 改变值 */
    change() {
    }

    handleSearch(value) {
        this.data = this.initData.filter(i => i.name.indexOf(value) || i.address.indexOf(value));
    }

    handleChange(id) {
        this.inputValue = id;
        this.data = this.initData.filter(i => i.name.indexOf(id) || i.address.indexOf(id));
        this.$emit('input', {
            id,
            type: 'api',
            params: this.params,
            formatter: this.formatter
        });
    }
}
</script>

<style lang="scss" scoped>
</style>