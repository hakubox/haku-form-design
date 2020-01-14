<template lang="html">
    <div>
        <component 
            v-bind="getProps(control.control.attrs)" 
            v-on="controlEvents(control.control)" 
            :control="control" 
            :is="control.control.control" 
            :class="{
                'form-control-hidden': !getProp('visible')
            }"
        >
            <span v-if="control.control.attrs.text">{{control.control.attrs.text}}</span>
            <template v-for="(controls, slotIndex) in children" #[`child${slotIndex}`]>
                <antd-form-design-control
                    v-for="(control, index) in controls"
                    :control-id="control.id"
                    :ref="control.id"
                    :class="{
                        'form-control-layout': control.type == 'layout',
                        'form-control-hidden': !getProp('visible'),
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
                        v-bind="getProps(detailControl.attrs)"
                        v-on="controlEvents(detailControl)" 
                        :is="detailControl.control" 
                        :class="{
                            'form-control-hidden': !getProp('visible')
                        }"
                    >

                        <template v-for="defaultSlot in Object.keys(detailControl.slot)" #[defaultSlot]>
                            <component 
                                v-for="detail2Control in detailControl.slot[defaultSlot]" 
                                :key="defaultSlot + detail2Control.control.name"
                                v-bind="getProps(detail2Control.attrs)" 
                                v-on="controlEvents(detail2Control)" 
                                :is="detail2Control.control" 
                            >
                            
                            </component>
                        </template>

                    </component>
                </div>
            </template>
        </component>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import FormDesign from '@/@types/form-design';
import { get, post } from '@/tools/common';
import { getRealProp, getRealProps } from '@/tools/formCommon';

@Component({
  components: {
  }
})
export default class AntdFormDesignChildControl extends Vue {
    @Prop({ type: String }) controlId!: string;
    @Prop({ }) control!: FormDesign.FormControl;
    @Prop({ type: Array, default: () => [] }) children!: Array<any>;
    @Prop({ type: Number }) index!: number;
    @Prop({ }) dragConfig!: FormDesign.DragConfig;
    @Prop({ }) currentSelectedControl!: Array<FormDesign.FormControl>;
    /** 设计器事件总线 */
    @Prop({}) bus!: Vue;

    /** 是否为预览模式 */
    @Inject() readonly preview!: boolean;
    
    /** 画布组件列表 */
    @Inject() readonly controlList!: Array<FormDesign.FormControl>;

    /** 画布组件树 */
    @Inject() readonly panel!: FormDesign.FormPanel;
    
    /** 表单变量 */
    @Getter('getFormVariables') formVariables!: Array<FormDesign.FormVariable>;
    /** 表单函数 */
    @Getter('getFormFunctions') formFunctions!: Array<FormDesign.FormFunction>;

    getProp(propName: string) {
        return getRealProp(this.control, propName, this.formVariables, this.formFunctions);
    }

    get variables(): Record<string, any> {
        return Object.assign.apply({}, [{}].concat(this.formVariables.map((i, index) => ({[i.name]: i.default}))) as [object, ...any[]]);
    }

    get functions(): Record<string, any> {
        return Object.assign.apply({}, [{}].concat(this.formFunctions.map((i, index) => ({[i.name]: Function('data', 'const {' + this.formVariables.map(i => i.name).join(', ') + '} = data; return' + i.body)(this.variables) }))) as [object, ...any[]]);
    }

    mouseDownEvent(e, control) {
        this.$emit('mouseDownEvent', e, control);
    }

    mounted() {
    }

    /** 获取真实属性 */
    getProps(props: Record<string, any>) {
        let re = [{}].concat(Object.entries(props).map(([key, value]) => {
            if (!props['__' + key]) return {[key]: value};

            let _editor = this.control.propertyEditors?.[key];
            let _value = props['__' + key];
            switch (_editor) {
                case 'expression':
                    _value = Function('__data', 'fns', ('let { ' + Object.keys(this.variables).join(', ') + ' } = __data; const { ' + Object.keys(this.functions).join(', ') + ' } = fns; ') + 'return ' + _value)(this.variables, this.functions);
                    break;
            }

            return {[key]: _value};
        }))
        return Object.assign.apply({}, re as [object, ...any[]]);
    }

    controlEvents(detailControl: FormDesign.BasicControl) {
        if (detailControl?.events) {
            let events = [{}].concat(Object.entries(detailControl.events).map(([eventName, event]) => {
                let _event: FormDesign.FormFunction | undefined = this.formFunctions.find(i => i.name == detailControl.events?.[eventName]);
                if (_event) return {[eventName]: Function('return ' + _event.body)().bind(this)};
                else return {};
            })) as [object, ...any[]];
            return Object.assign.apply({}, events);
        } else return {};
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