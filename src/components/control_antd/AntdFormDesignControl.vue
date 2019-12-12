<template lang="html">
    <div class="form-control" :control-id="controlId" @mousedown.stop="mouseDownEvent($event, control)" >
        
        <div class="complex-child-form-item" v-if="isFormChild">
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
                :control="control.control"
                :is="control.control.control"
            >
            </antd-form-design-child-control>
            <!-- v-decorator="[control.id, { rules: control.rules }]" -->
            <!-- <component 
                v-bind="control.control.attrs" 
                :control="control.control"
                :is="control.control.control" 
            >
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
            </component> -->
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

        <!-- <component v-else
            v-bind="control.control.attrs" 
            :control="control.control"
            :is="control.control.control" 
        >
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
        </component> -->
        
        <!-- 一堆边框 -->
        <i class="form-control-border-top"></i>
        <i class="form-control-border-left"></i>
        <i class="form-control-border-right"></i>
        <i class="form-control-border-bottom"></i>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import FormDesign from '@/@types/form-design';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class AntdFormDesignControl extends Vue {
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