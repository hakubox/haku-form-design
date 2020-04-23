<template lang="html">
    <a-table v-bind="$attrs" :dataSource="data" :columns="columns" :scroll="{ x: $attrs.scrollX || 0, y: $attrs.scrollY || 0 }">
    </a-table>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';
import FormDesign from '@/@types/form-design';
import { getDataSource } from '@/tools/formCommon';

@Component({
  components: {
  }
})
export default class AntdFormDesignChildform extends Vue {
    @Prop({ type: Object, default: () => ({  }) }) control!: FormDesign.FormControl;
    @Prop({ type: String }) value!: string;
    @Prop({ type: String }) controlId!: string;
    /** 列头 */
    @Prop({ type: Array, default: () => [] }) columns!: Array<any>;
    
    /** 数据列表 */
    data: Array<Record<string, any>> = [];

    @Watch('control.propertyEditors.dataSource', {
        deep: true
    })
    changeDataType(val, oldVal) {
        this.searchData();
    }

    @Watch('$attrs.dataSource', {
        deep: true
    })
    changeDataSource(val, oldVal) {
        this.searchData();
    }

    created() {
        this.init();
    }

    /** 初始化 */
    init() {
        this.searchData();
    }
    
    /** 重新查询用户 */
    searchData() {
        // this.pagination.filters = { groupId: this.selectedGroup[0] };

        // 查询数据
        let _type = this?.control?.propertyEditors?.dataSource || this.$attrs.dataSource_type;
        getDataSource(this.$attrs?.dataSource, _type).then(d => {
            this.data = d;
        });
    }
}
</script>

<style lang="scss" scoped>
</style>