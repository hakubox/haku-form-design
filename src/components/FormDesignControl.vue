<template lang="html">
    <div class="form-control" :control-id="controlId" @mousedown.stop="mouseDownEvent($event, control)" >
        <component 
            v-bind="control.control.attrs" 
            :control="control.control"
            :is="control.control.control" 
        >
            <template v-for="(controls, slotIndex) in children" #[`child${slotIndex}`]>
                <form-design-control
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
                </form-design-control>
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
        <i class="form-control-border-top"></i>
        <i class="form-control-border-left"></i>
        <i class="form-control-border-right"></i>
        <i class="form-control-border-bottom"></i>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FormDesign } from '@/@types/form-design.d';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class FormDesignControl extends Vue {
    @Prop({ type: String }) controlId!: string;

    @Prop({ }) control!: any;
    @Prop({ type: Array, default: () => [] }) children!: Array<any>;
    @Prop({ type: Object }) panel!: FormDesign.FormPanel;
    @Prop({ type: Number }) index!: number;
    @Prop({ }) dragConfig!: FormDesign.DragConfig;
    @Prop({ }) currentSelectedControl!: Array<FormDesign.FormControl>;
    /** 设计器事件总线 */
    @Prop({}) bus!: Vue;

    mouseDownEvent(e, control) {
        this.$emit('mouseDownEvent', e, control);
    }
}
</script>

<style lang="scss" scoped>
</style>