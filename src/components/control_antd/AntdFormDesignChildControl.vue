<template lang="html">
    <component v-bind="control.control.attrs" :control="control" :is="control.control.control">
        <span v-if="control.control.attrs.text" v-html="control.control.attrs.text"></span>
        <template v-for="(controls, slotIndex) in children" #[`child${slotIndex}`]>
            <antd-form-design-control
                v-for="(control, index) in controls"
                :control-id="control.id"
                :ref="control.id"
                :class="{
                    'form-control-layout': control.type == 'layout',
                    active: currentSelectedControl.find(i => i.id == control.id),
                    'is-drag': dragConfig.targetFormControlId == control.id
                }"
                :currentSelectedControl="currentSelectedControl"
                :dragConfig="dragConfig"
                @mouseDownEvent="mouseDownEvent($event, control)"
                :children="control.children"
                :control="control"
                :key="index"
            >
            </antd-form-design-control>
        </template>
        <template v-for="slot in Object.keys(control.control.slot)" #[slot]>
            <div :key="slot">
                <component 
                    v-for="detailControl in control.control.slot[slot]" 
                    :key="slot + detailControl.control.name"
                    v-bind="detailControl.attrs" 
                    :is="detailControl.control" 
                >

                    <template v-for="defaultSlot in Object.keys(detailControl.slot)" #[defaultSlot]>
                        <component 
                            v-for="detail2Control in detailControl.slot[defaultSlot]" 
                            :key="defaultSlot + detail2Control.control.name"
                            v-bind="detail2Control.attrs" 
                            :is="detail2Control.control" 
                        >
                        
                        </component>
                    </template>

                </component>
            </div>
        </template>
    </component>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import FormDesign from '@/@types/form-design';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class AntdFormDesignChildControl extends Vue {
    @Prop({ type: String }) controlId!: string;
    @Prop({ }) control!: any;
    @Prop({ type: Array, default: () => [] }) children!: Array<any>;
    @Prop({ type: Number }) index!: number;
    @Prop({ }) dragConfig!: FormDesign.DragConfig;
    @Prop({ }) currentSelectedControl!: Array<FormDesign.FormControl>;
    /** 设计器事件总线 */
    @Prop({}) bus!: Vue;

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

        console.log();
    }

    /** 判断节点是否为某节点的子节点 */
    get isFormChild() {
        return this.panel.children
            .filter(i => i.name == 'complex-childform')
            .map(i => i.children)
            .flat(2)
            .map(i => i.id)
            .includes(this.control.id);
    }
}
</script>

<style lang="scss" scoped>
</style>