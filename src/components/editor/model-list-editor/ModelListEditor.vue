<template lang="html">
	<div class="model-list-editor">
        
        <a-table :row-key="rowKey" :pagination="false" size="small" :columns="tableColumns" :dataSource="value">
            <template v-for="col in columns" #[`slot_${col.name}`]="item, record, index">
                <template v-for="(control, index2) in propertyEditors[col.editor].control">
                    <component
                        :key="index2"
                        :ref="control.id"
                        v-bind="Object.assign({}, record.attrs || {}, control.attrs || {}, col.attrs || {})" 
                        v-model="value[index][col.name]" 
                        :is="control.control"
                    >
                        {{control.html}}
                        <template v-for="slot in Object.keys(control.slot)" #[slot]>
                            <component 
                                v-for="(detailControl, index3) in control.slot[slot]" 
                                :key="slot + detailControl.control + index3"
                                v-bind="detailControl.attrs" 
                                :is="detailControl.control" 
                            >
                            
                                {{detailControl.html}}
                                <template v-for="detailSlot in Object.keys(detailControl.slot)" #[detailSlot]>
                                    <component 
                                        v-for="(detail2Control, index4) in detailControl.slot[detailSlot]" 
                                        :key="detailSlot + detail2Control.control + index4"
                                        v-bind="detail2Control.attrs" 
                                        :is="detail2Control.control" 
                                    >
                                    {{detail2Control.html}}
                                    </component>
                                </template>
                            
                            </component>
                        </template>
                    </component>
                </template>
            </template>
            <template #slot_operation="text, record, index">
                <a-dropdown :trigger="['click']">
                    <a-button type="primary" icon="ellipsis" size="small" />
                    <a-menu slot="overlay">
                        <a-menu-item key="1" @click="addRow(index)"><a-icon type="plus" />新增</a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="99" @click="removeRow(index)"><a-icon type="minus" />删除</a-menu-item>
                    </a-menu>
                </a-dropdown>
            </template>
        </a-table>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import { FormDesign } from '@/@types/form-design.d';
import { get, post } from '@/tools/common';
import { Enum } from '@/config/enum';
import Color from '@/lib/color/Color';

@Component({
  components: {
  }
})
export default class ModelListEditor extends Vue {
	/** 当前值 */
    @Prop({
        default: () => []
    }) value!: Array<any>;
    /** 删除判断函数 */
    @Prop({ }) onRemove!: Function;
    /** splice函数 */
    @Prop({ }) onChange!: Function;
    /** 主列名 */
    @Prop({ default: 'title', type: String }) rowKey!: string;

    @Prop({ }) control!: FormDesign.FormControl;
	/** 配置列 */
    @Prop({ }) columns!: Array<{ 
        name: string,
        title: string, 
        fixed?: ('left' | 'right'), 
        width?: string,
        attrs: Record<string, any>,
        editor: Enum.FormControlPropertyEditor
    }>;

    @Inject() readonly propertyEditors!: Record<string, FormDesign.PropertyEditor>;

    get tableColumns() {
        return this.columns.map(i => ({
            title: i.title,
            key: i.name,
            dataIndex: i.name,
            width: i.width,
            fixed: i.fixed,
            scopedSlots: { customRender: 'slot_' + i.name },
        })).concat([{
            title: '编辑',
            key: 'operation',
            dataIndex: 'operation',
            width: '40px',
            fixed: 'right',
            scopedSlots: { customRender: 'slot_operation' },
        }]);
    }
    
	mounted(){
        this.init();
    }

    /** 新增行 */
    addRow(index) {
        this.value.splice(index, 0, {});
        this.onChange?.(this.control, index, 0, 1);
    }

    /** 删除行 */
    removeRow(index) {
        let _re = this.onRemove?.(this.value, index, this.control);
        if (_re !== false) {
            this.value.splice(index, 1);
            this.onChange?.(this.control, index, 1, 0);
        } else {
            this.$message.warning('无法删除，请确认后重试');
        }
    }

    /** 初始化 */
    init() {
    }

    destroy() {
    }
}
</script>

<style lang="scss" scoped>
::v-deep .ant-table.ant-table-small {

    > .ant-table-content {
        
        .ant-table-body {
            margin: 0px;

            > table {

                > thead.ant-table-thead {

                    > tr {

                        > th {
                            padding: 4px;
                        }
                    }
                }

                > tbody.ant-table-tbody {

                    > tr.ant-table-row {

                        > td {
                            padding: 4px;
                        }
                    }
                }
            }
        }

        table.ant-table-fixed {

            > thead.ant-table-thead {

                > tr {

                    > th  {
                        padding: 4px;
                    }
                }
            }

            > tbody.ant-table-tbody {

                > tr.ant-table-row {

                    > td {
                        padding: 4px;
                    }
                }
            }
        }
    }
}

</style>