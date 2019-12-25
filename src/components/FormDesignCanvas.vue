<template>
    <div class="form-design-canvas" 
        :class="{ 
            'preview': preview, 
            'pc': currentComponentLibrary.type == 'pc', 
            'mobile': currentComponentLibrary.type == 'mobile' 
        }"
        :style="{ 
            width: devices[formConfig.deviceId].width + 'px', 
            'min-height': devices[formConfig.deviceId].height + 'px',
            height: preview ? devices[formConfig.deviceId].height + 'px' : 'auto'
        }"
        @scroll="refresh">
        <van-nav-bar v-if="currentComponentLibrary.type == 'mobile'" :title="formConfig.formTitle" left-arrow />

        <h1 class="form-title" v-if="currentComponentLibrary.type == 'pc'">{{formConfig.formTitle}}</h1>

        <div ref="form-design-canvas-mainpanel" class="form-design-canvas-mainpanel">

            <a-form v-if="currentComponentLibrary.code == 'antd'" :form="form">
                <component 
                    :is="`${currentComponentLibrary.code}-form-design-control`" 
                    v-for="(control, index) in panel.children" 
                    :control-id="control.id"
                    :ref="control.id"
                    :class="{
                        'form-control-layout': control.type == 'layout',
                        active: currentSelectedControl.find(i => i.id == control.id),
                        'is-drag': dragConfig.targetFormControlId == control.id
                    }"
                    :currentSelectedControl="currentSelectedControl"
                    :dragConfig="dragConfig"
                    :children="control.children"
                    @mouseDownEvent="changeSelectedFormControl"
                    :control="control"
                    :key="index"
                    :index="index"
                    :bus="bus"
                />
            </a-form>

            <template v-else>
                <component 
                    :is="`${currentComponentLibrary.code}-form-design-control`" 
                    v-for="(control, index) in panel.children" 
                    :control-id="control.id"
                    :ref="control.id"
                    :class="{
                        'form-control-layout': control.type == 'layout',
                        active: currentSelectedControl.find(i => i.id == control.id),
                        'is-drag': dragConfig.targetFormControlId == control.id
                    }"
                    :currentSelectedControl="currentSelectedControl"
                    :dragConfig="dragConfig"
                    :children="control.children"
                    :preview="preview"
                    @mouseDownEvent="changeSelectedFormControl"
                    :control="control"
                    :key="index"
                    :index="index"
                    :bus="bus"
                />
            </template>
        </div>
        
        <div class="fixed-bottom" v-if="currentComponentLibrary.type == 'mobile'">
            <div v-if="formConfig.footer.isShow" class="fixed-bottom-content">
                <van-button v-if="formConfig.footer.cancelButton" style="width: 50%;" type="default" size="large" @click="cancelForm()">{{formConfig.footer.cancelButtonText}}</van-button>
                <van-button type="primary" size="large" @click="submitForm()">{{formConfig.footer.submitButtonText}}</van-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue, Provide, Inject } from 'vue-property-decorator';
import FormDesign from '@/@types/form-design';
import Vant, { Toast } from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Toast);


@Component({
    components: {
    }
})
export default class FormDesignCanvas extends Vue {

    /** 是否为预览模式 */
    @Provide()
    @Prop({ default: true }) 
    preview!: boolean;

    /** 当前选择的组件 */
    @Prop({ default: [] }) currentSelectedControl!: Array<FormDesign.FormControl>;

    /** 组件库列表 */
    @Prop({ default: [] }) componentLibraryList!: Array<FormDesign.ComponentLibrary>;

    /** 当前组件库 */
    get currentComponentLibrary() {
        return this.componentLibraryList.find(i => i.name == this.formConfig.formComponentLib) || this.componentLibraryList[0];
    }

    /** 画布组件树 */
    @Inject() readonly panel!: FormDesign.FormPanel;

    /** 表单配置 */
    @Prop({}) formConfig!: FormDesign.FormConfig;

    /** 拖拽状态 */
    @Prop({}) dragConfig!: FormDesign.DragConfig;

    /** 表单配置 */
    @Prop({}) devices!: Record<string, FormDesign.RemoteDevice>;

    /** 画板滚动坐标 */
    @Prop({ default: { x: 0, y: 0 } }) location!: FormDesign.Location;

    /** 正在拖拽的控件Id */
    @Prop({}) dragFormControlId!: string;

    /** 设计器事件总线 */
    @Prop({}) bus!: Vue;

    form: any = null;

    /** 组件放置游标 */
    controlCursorEl: any = document.createElement('div');

    // 画布主panel
    rootPanelEl!: any;

    created() {
        // document.body.append(this.controlCursorEl);
        this.controlCursorEl.classList.add('form-design-canvas-cursor');
    }

    mounted() {
        let _el: any = this.$vnode.elm;
        this.rootPanelEl = _el.querySelector('.form-design-canvas-mainpanel');
        this.formConfig.width = this.devices[this.formConfig.deviceId].width;
        this.formConfig.height = this.devices[this.formConfig.deviceId].height;

        this.$nextTick(() => this.refresh());

        this.form = this.$form.createForm(this);
    }

    // 表单刷新
    refresh() {
        let _el: any = this.$vnode.elm;
        this.rootPanelEl = _el.querySelector('.form-design-canvas-mainpanel');
        this.$emit('refresh');
    }

    // 根据Id获取表单控件
    getFormControlElementById(id: string) {
        try {
            // @ts-ignore
            return this.$refs[id].length ? this.$refs[id][0].$el : this.$refs[id].parentElement;
        } catch (error) {
            debugger;
        }
    }

    /** 显示或隐藏游标 */
    changeControlCursor(isShow: boolean, control?: HTMLElement, inside: boolean = false) {
        
        if (isShow) {
            if(!control) {
                this.rootPanelEl.insertAdjacentElement('beforeend', this.controlCursorEl);
            } else if (this.controlCursorEl.parentElement != control) {
                if (inside) {
                    control.insertAdjacentElement('beforeend', this.controlCursorEl);
                } else {
                    control.insertAdjacentElement('beforebegin', this.controlCursorEl);
                }
            }
        } else if (this.controlCursorEl && this.controlCursorEl.parentElement) {
            this.controlCursorEl.parentElement.removeChild(this.controlCursorEl);
        }
    }

    /** 选择控件 */
    changeSelectedFormControl(e, control: FormDesign.FormControl) {
        if (!this.preview) {
            this.$emit('startDragFormControl', e, control);
            this.$emit('changeSelectedFormControl', [control]);
        }
    }

    /** 提交表单（模拟） */
    submitForm() {
        if (this.preview) {
            Toast.loading({ mask: true, message: '提交中' });
        }
    }

    /** 取消提交（模拟） */
    cancelForm() {
        if (this.preview) {
        }
    }

    /** 清空选择项 */
    clearSelectedFormControl() {
        if (!this.preview) {
            this.$emit('changeSelectedFormControl', []);
        }
    }
}
</script>

<style lang="scss">
</style>