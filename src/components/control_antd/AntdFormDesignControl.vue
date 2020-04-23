<template lang="html">
    <div class="form-control" :control-id="controlId" @mousedown.stop="mouseDownEvent($event, control)" 
        :style="{
            order: control.control.attrs.order,
            flexGrow: '' + control.control.attrs.flexGrow,
            flexShrink: '' + control.control.attrs.flexShrink,
            flexBasis: '' + control.control.attrs.flexBasis,
            alignSelf: '' + control.control.attrs.alignSelf,
            margin: getBoxAttr(control.control.attrs.margin, 'margin'),
            padding: getBoxAttr(control.control.attrs.padding, 'padding')
        }"
    >
        <div class="complex-child-form-item" v-if="isComplexFormChild">
            <span class="complex-child-form-item-label">{{control.control.attrs.title}}</span>
            <div class="complex-child-form-item-content">
                <antd-form-design-child-control 
                    :children="children"
                    :control="control"
                    :bus="bus"
                    :dragConfig="dragConfig"
                    :currentSelectedControl="currentSelectedControl"
                    @mouseDownEvent="mouseDownEvent"
                >
                </antd-form-design-child-control>
            </div>
        </div>
        
        <a-form-item v-else-if="control.isFormItem" 
            :label-col="{ span: control.control.attrs.labelSpan, offset: control.control.attrs.labelOffset }"
            :wrapper-col="{ span: control.control.attrs.wrapperSpan, offset: control.control.attrs.wrapperOffset }"
            v-bind="control.control.attrs" 
        >
            <antd-form-design-child-control
                v-bind="control.control.attrs" 
                :control="control"
            >
            </antd-form-design-child-control>
        </a-form-item>
        
        <antd-form-design-child-control v-else
            :children="children"
            :control="control"
            :bus="bus"
            :dragConfig="dragConfig"
            :currentSelectedControl="currentSelectedControl"
            @mouseDownEvent="mouseDownEvent"
        >
        </antd-form-design-child-control>
        
        <!-- 一堆边框 -->
        <i class="form-control-border-top"></i>
        <i class="form-control-border-left"></i>
        <i class="form-control-border-right"></i>
        <i class="form-control-border-bottom"></i>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import FormDesign from '@/@types/form-design';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class AntdFormDesignControl extends Vue {
    @Prop({ type: String }) controlId!: string;

    @Prop({ }) control!: FormDesign.FormControl;
    @Prop({ type: Array, default: () => [] }) children!: Array<any>;
    @Prop({ type: Number }) index!: number;
    @Prop({ }) dragConfig!: FormDesign.DragConfig;
    @Prop({ }) currentSelectedControl!: Array<FormDesign.FormControl>;
    /** 设计器事件总线 */
    @Prop({}) bus!: Vue;

    /** 表单变量 */
    @Getter('getFormVariables') formVariables!: Array<FormDesign.FormVariable>;
    /** 表单函数 */
    @Getter('getFormFunctions') formFunctions!: Array<FormDesign.FormFunction>;

    /** 是否为预览模式 */
    @Inject() preview!: boolean;
    
    /** 画布组件列表 */
    @Inject() readonly controlList!: Array<FormDesign.FormControl>;

    /** 画布组件树 */
    @Inject() readonly panel!: FormDesign.FormPanel;

    mouseDownEvent(e, control) {
        this.$emit('mouseDownEvent', e, control);
    }

    mounted() {
    }

    /** 判断节点是否为高级子表单的子节点 */
    get isComplexFormChild() {
        return this.panel.children
            .filter(i => i.name == 'complex-childform')
            .map(i => i.children)
            .flat(2)
            .map(i => i.id)
            .includes(this.control.id);
    }

    /** 判断节点是否为某节点的子节点 */
    get isFormChild() {
        return this.panel.children
            .filter(i => i.children?.length)
            .map(i => i.children)
            .flat(2)
            .map(i => i.id)
            .includes(this.control.id);
    }

    getBoxAttr(attr: number[], propName: string) {
        let _propName = propName[0].toUpperCase() + propName.slice(1);
        return (attr || []).map((i, index) => `${i}px`).join(' ');
    }
}
</script>

<style lang="scss" scoped>
</style>