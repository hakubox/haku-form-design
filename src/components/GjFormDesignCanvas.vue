<template>
    <div class="form-design-canvas" 
        :class="{ 'preview': preview }"
        :style="{ 
            width: devices[formConfig.deviceId].width + 'px', 
            'min-height': devices[formConfig.deviceId].height + 'px' 
        }"
        @scroll="refresh">
        <van-nav-bar :title="formConfig.formTitle" left-arrow />

        <div ref="form-design-canvas-mainpanel" class="form-design-canvas-mainpanel">

            <gj-form-design-control v-for="(control, index) in panel.children" 
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
                :panel="panel"
                :index="index"
                :bus="bus"
            />
        </div>
        
        <div class="fixed-bottom">
            <div v-if="formConfig.footer.isShow" class="fixed-bottom-content">
                <van-button v-if="formConfig.footer.cancelButton" style="width: 50%;" type="default" size="large" @click="cancelForm()">{{formConfig.footer.cancelButtonText}}</van-button>
                <van-button type="primary" size="large" @click="submitForm()">{{formConfig.footer.submitButtonText}}</van-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { FormDesign } from '@/@types/form-design.d';
import Vant, { Toast } from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Toast);


@Component({
    components: {
    }
})
export default class GjFormDesignCanvas extends Vue {

    /** 是否为预览模式 */
    @Prop({ default: true }) preview!: boolean;

    /** 当前选择的组件 */
    @Prop({ default: [] }) currentSelectedControl!: Array<FormDesign.FormControl>;

    /** 画布上的组件列表 */
    @Prop({}) panel!: FormDesign.FormPanel;

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

    

    /** 组件放置游标 */
    controlCursorEl: any = document.createElement('div');

    // 画布主panel
    rootPanelEl!: any;
    // 下方按钮dom
    bottomContent: any;

    created() {
        // document.body.append(this.controlCursorEl);
        this.controlCursorEl.classList.add('form-design-canvas-cursor');
    }

    mounted() {
        let _el: any = this.$vnode.elm;
        this.rootPanelEl = _el.querySelector('.form-design-canvas-mainpanel');
        this.formConfig.width = this.devices[this.formConfig.deviceId].width;
        this.formConfig.height = this.devices[this.formConfig.deviceId].height;

        this.bottomContent = _el.querySelector('.fixed-bottom-content');
        this.$nextTick(() => this.refresh());
    }

    // 表单刷新
    refresh() {
        if (this.bottomContent) {
            let el: any = this.$vnode.elm;
            // this.bottomContent.style.top = (el.clientHeight - el.scrollHeight + el.scrollTop - 2) + 'px';
        }
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
    .form-design-canvas {
        position: relative;
        display: flex;
        flex-direction: column;
        background-color: #F7F7F7;
        border-radius: 6px;
        // overflow-x: hidden;
        // overflow-y: auto;

        > .van-nav-bar {
            flex-grow: 0;
            flex-shrink: 0;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
        }

        > .form-design-canvas-mainpanel {
            flex-grow: 1;
            flex-shrink: 1;
        }
    }

    // 表单控件
    .form-control {
        position: relative;
        transition: 0.2s;
        user-select: none;

        &:hover,
        &.active {
            
            &:after {
                background-color: rgba(137, 217, 255, 0.2);
            }
        }

        &:active {
            &:after {
                cursor: grabbing;
                background-color: rgba(137, 217, 255, 0.2);
            }
        }

        &:not(:last-child):after {
            border-bottom: 1px solid #ebedf0;
        }

        &:not(.form-control-layout):after {
            content: '';
            cursor: grab;
            user-select: none;
            position: absolute;
            display: block;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            transition: 0.2s;
        }

        > .form-control-border-top {
            position: absolute;
            transition: 0.2s;
            opacity: 0.0;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 1px;
            background-color: $-primary-color;
        }

        > .form-control-border-right {
            position: absolute;
            transition: 0.2s;
            opacity: 0.0;
            top: 0px;
            right: 0px;
            width: 1px;
            height: 100%;
            background-color: $-primary-color;
        }

        > .form-control-border-bottom {
            position: absolute;
            transition: 0.2s;
            opacity: 0.0;
            bottom: 1px;
            left: 0px;
            width: 100%;
            height: 1px;
            background-color: $-primary-color;
        }
        &:last-child {
            > .form-control-border-bottom {
                bottom: 0px;
            }
        }

        > .form-control-border-left {
            position: absolute;
            transition: 0.2s;
            opacity: 0.0;
            top: 0px;
            left: 0px;
            width: 1px;
            height: 100%;
            background-color: $-primary-color;
        }

        &.active {
            cursor: grab;
            box-shadow: 0px 0px 1px 0px rgba(48, 166, 121, 0.80),
                0 3px 14px 3px rgba(40, 120, 255, 0.08), 
                0 8px 10px 1px rgba(0, 0, 0, 0.05);
            z-index: 1;

            &:after {
                // box-shadow: 0px 0px 0px 1px $-primary-color inset;
            }

            > .form-control-border-top {
                opacity: 1.0;
            }
            > .form-control-border-right {
                opacity: 1.0;
            }
            > .form-control-border-bottom {
                opacity: 1.0;
            }
            > .form-control-border-left {
                opacity: 1.0;
            }
        }

        &.is-drag {
            filter: blur(2px);
        }

        > .van-cell {
            // align-items: baseline;
        }

        > .van-uploader {
            width: 100%;
            background-color: white;

            .van-uploader__upload {
                margin: 8px;
            }
        }

        > .form-control-label {
            position: absolute;
            display: inline-block;
            cursor: default;
            top: -28px;
            left: 5px;
            color: white;
            background-color: $-primary-color;
            padding: 0px 8px;
            border-radius: 3px;
        }

        .van-cell-group {
            min-height: 50px;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    /** 加大行按钮的图标大小 */
    .van-button__icon {
        font-size: 1.5em;
    }

    /** 解决多行文本框没办法指定行数的bug */
    textarea.van-field__control {
        height: auto !important;
    }

    /** 控件游标 */
    .form-design-canvas-cursor {
        position: relative;
        height: 2px;
        width: 100%;
        margin-top: 1px;
        margin-bottom: 1px;
        background-color: $-primary-color;

        &:before {
            content: '';
            position: absolute;
            display: inline-block;
            top: -3px;
            left: -5px;
            width: 0px;
            height: 0px;
            border-left: 4px solid transparent;
            border-right: 4px solid $-primary-color;
            border-top: 4px solid $-primary-color;
            border-bottom: 4px solid transparent;
            transform: rotate(45deg);
            z-index: 1;
        }

        &:after {
            content: '';
            position: absolute;
            display: inline-block;
            top: -3px;
            right: -5px;
            width: 0px;
            height: 0px;
            border-left: 4px solid transparent;
            border-right: 4px solid $-primary-color;
            border-top: 4px solid $-primary-color;
            border-bottom: 4px solid transparent;
            transform: rotate(-135deg);
            z-index: 1;
        }
    }


    /** 预览模式 */
    .form-design-canvas.preview {

        .blank-control {
            display: none;
        }
        
        .van-cell-group {
            min-height: 0px;
        }
    }
</style>