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
        @scroll="refresh"
    >
        <van-nav-bar v-if="currentComponentLibrary.type == 'mobile'" :title="formConfig.formTitle" left-arrow />

        <h1 class="form-title" v-if="currentComponentLibrary.type == 'pc'">{{formConfig.formTitle}}</h1>

        <div ref="form-design-canvas-mainpanel" class="form-design-canvas-mainpanel">
            <component 
                :is="`${currentComponentLibrary.code}-form-design-control`" 
                v-for="(control, index) in panel.children.filter(function(i) { return i.type !== 'hidden'; })" 
                :control-id="control.id"
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
            <template v-if="preview">
                <component 
                    :is="control.control.control" 
                    v-for="(control, index) in panel.children.filter(function(i) { return i.type === 'hidden'; })" 
                    :control-id="control.id"
                    :key="'hidden_' + index"
                />
            </template>
        </div>
        
        <div class="fixed-bottom" v-if="currentComponentLibrary.type == 'mobile'">
            <div v-if="formConfig.footer.isShow" class="fixed-bottom-content">
                <van-button v-if="formConfig.footer.cancelButton" style="width: 50%;" type="default" size="large" @click="cancelForm()">{{formConfig.footer.cancelButtonText}}</van-button>
                <van-button type="primary" size="large" @click="submitForm()">{{formConfig.footer.submitButtonText}}</van-button>
            </div>
        </div>

        <!-- 编辑器 -->
        <div class="canvas-data-editor" v-if="preview">
            <h3>表单属性调试器</h3>
            <div class="canvas-data-editor-body">
                <ul>
                    <li 
                        :class="(v1value).__proto__.constructor === Object ? 'canvas-data-editor-obj-name' : 'canvas-data-editor-name'" 
                        v-for="[v1key, v1value] in Object.entries(previewRealFormData)" 
                        :key="v1key"
                    >
                        <span>{{v1key}}</span>
                        <ul v-if="(v1value).__proto__.constructor === Object">
                            <li 
                                :class="(v2value).__proto__.constructor === Object ? 'canvas-data-editor-obj-name' : 'canvas-data-editor-name'" 
                                v-for="[v2key, v2value] in Object.entries(v1value)"
                                :key="v2key"
                            >
                                <span>{{v2key}}</span>
                                <ul v-if="(v2value).__proto__.constructor === Object">
                                    <li 
                                        :class="(v3value).__proto__.constructor === Object ? 'canvas-data-editor-obj-name' : 'canvas-data-editor-name'" 
                                        v-for="[v3key, v3value] in Object.entries(v2value)"
                                        :key="v3key"
                                    >
                                        <span class="canvas-data-editor-key">{{v3key}}</span>
                                    </li>
                                </ul>
                                <simple-editor v-else :value="previewRealFormData[v1key][v2key]" @change="previewFormData(`${v1key}.${v2key}`, $event)" />
                            </li>
                        </ul>
                        <simple-editor v-else :value="previewRealFormData[v1key]" @change="previewFormData(`${v1key}`, $event)" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue, Provide, Inject } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import FormDesign from '@/@types/form-design';
import Vant, { Toast } from 'vant';
import { cloneForce } from '@/lib/clone/index';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Toast);


@Component({
    components: {
    }
})
export default class FormDesignCanvas extends Vue {

    /** 是否为预览模式 */
    @Provide() @Prop({ default: true }) preview!: boolean;

    /** 表单数据（预览界面） */
    @Provide() previewFormData(key?: string, value?: any): any {
        if (value !== undefined && key) {
            const _arr = key.split('.');
            let _var = this.previewRealFormData;
            let i = 0;
            for (; i < _arr.length - 1; i++) {
                _var = _var[_arr[i]];
            }
            _var[_arr[i]] = value;
            this.$bus.$emit('scriptUpdate', key, value);
            return true;
        } else if (key) {
            return this.previewRealFormData[key];
        } else {
            return this.previewRealFormData;
        }
    };

    previewRealFormData: Record<string, any> = {};

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
    
    /** Vue对象 */
    @Getter('getFormScript') formScript!: FormDesign.FormScript;

    form: any = null;

    /** 组件放置游标 */
    controlCursorEl: any = document.createElement('div');

    // 画布主panel
    rootPanelEl!: any;

    created() {
        // document.body.append(this.controlCursorEl);
        this.controlCursorEl.classList.add('form-design-canvas-cursor');

        if (this.preview) {
            this.$set(this, 'previewRealFormData', cloneForce(this.formScript.data));
        }
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
        let _el: any = null;
        const _cb = (el) => {
            if (el.$children.length && !_el) {
                for (let i = 0; i < el.$children.length; i++) {
                    // @ts-ignore
                    if (el.$children[i].controlId == id) {
                        _el = el.$children[i].$el;
                        return;
                    } else {
                        _cb(el.$children[i]);
                    }
                }
            }
        }
        _cb(this);
        if (!_el) {
            console.error('获取不到控件。', id);
        }
        return _el;
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
    .canvas-data-editor {
        position: absolute;
        top: 0px;
        left: calc(100% + 60px);
        width: 300px;
        height: calc(100vh - 120px);
        background-color: white;
        border-radius: 6px;


        > h3 {
            width: 100%;
            padding: 10px 10px 10px 20px;
            border-bottom: 1px solid #f2f2f2;
            margin-bottom: 0px;
            font-size: 18px;
        }

        > .canvas-data-editor-body {
            position: relative;
            height: calc(100% - 55px);
            overflow-x: hidden;
            overflow-y: auto;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            padding-top: 10px;
        }

        li {
            line-height: 30px;
                
            &.canvas-data-editor-obj-name {
                
                > span {
                    cursor: default;
                    display: inline-block;
                    width: 100%;
                    background-color: $-primary-color;
                    color: white;
                    margin-bottom: 4px;
                    padding-left: 10px;
                }
            }

            &.canvas-data-editor-name {
                display: flex;
                padding-left: 10px;

                &:hover {
                    
                    > span {
                        color: #333;
                    }

                    > input {
                        background-color: #F5F5F5;
                    }
                }

                > span {
                    color: #AAA;
                }

                > input {
                    width: 100%;
                    border: none !important;
                    margin-left: 5px;
                    padding-left: 5px;
                    border-bottom: 1px solid #F5F5F5;
                    height: 30px;

                    &[type="checkbox"] {
                        width: 30px;
                    }

                    &:focus {
                        background-color: #EEE;
                    }
                }
            }
                
            .canvas-data-editor-key {
                display: inline-block;
                width: 100%;
                margin-bottom: 4px;
                padding-left: 10px;
            }
        }
    }
</style>