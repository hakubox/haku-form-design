<template>
    <div class="form-design">

        <!-- 头部菜单 -->
        <div class="form-design-header">
            <h1>移动端表单设计器 v1.0.0</h1>
            <a-menu v-model="currentMenu" mode="horizontal">
                <a-sub-menu>
                    <span slot="title" class="submenu-title-wrapper">
                        <a-icon type="appstore" />文件
                    </span>
                    
                    <a-menu-item key="newFile">新建</a-menu-item>
                    <a-menu-divider></a-menu-divider>
                    <a-menu-item class="label-menu-item" key="import"><label for="importjson">导入</label></a-menu-item>
                    <a-menu-item key="historyForm">最近的表单</a-menu-item>
                    <a-menu-divider></a-menu-divider>
                    <a-menu-item key="demo">示例表单</a-menu-item>
                </a-sub-menu>
                <a-sub-menu>
                    <span slot="title" class="submenu-title-wrapper">
                        <a-icon type="appstore" />编辑
                    </span>
                    
                    <a-menu-item key="undo">撤销</a-menu-item>
                    <a-menu-item key="recover">恢复</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="preview" @click="preview()">
                    <a-icon type="eye" />预览
                </a-menu-item>

                <a-sub-menu>
                    <span slot="title" class="submenu-title-wrapper">
                        <a-icon type="cloud-download" />导出
                    </span>
                    
                    <a-menu-item key="export-json" @click="menu_exportJSON()">导出为JSON</a-menu-item>
                    <a-menu-item key="export-file" @click="menu_exportVuePage()">导出为Vue页面文件</a-menu-item>
                </a-sub-menu>

                <a-menu-item key="editdata">
                    <a-icon type="edit" />编辑数据
                </a-menu-item>
                <a-menu-item key="about">
                    <a-icon type="info-circle" />关于
                </a-menu-item>
            </a-menu>
        </div>

        <!-- 主体区域 -->
        <div class="form-design-body">

            <!-- 控件栏 -->
            <div class="form-design-body-controlpanel" style="width: 300px;">
                <dl v-for="group in controlGroups" :key="group.name">
                    <dt><a-icon v-if="group.icon" :type="group.icon" :style="{ marginRight: '3px' }" /> {{group.title}}</dt>
                    <dd v-for="control in group.controls" :key="control.name" @mousedown="dragStart($event, control)">
                        <a-icon v-if="control.icon" :type="control.icon" />{{control.title}}
                    </dd>
                </dl>
            </div>

            <!-- 画布 -->
            <div class="form-design-body-canvas">
                <div class="form-design-body-canvas-page-list">
                    <div class="form-design-body-canvas-page-item" @mousedown="changeSelectedFormControl([])">
                        <h3>{{formConfig.canvasTitle}}</h3>
                        <gj-form-design-canvas 
                            ref="controlCanvas"
                            :preview="false"
                            :panel="panel"
                            :formConfig="formConfig"
                            :devices="devices"
                            :currentSelectedControl="currentSelectedControl" 
                            :dragConfig="dragConfig"
                            :location="canvasLocation"
                            :dragFormControlId="dragFormControlId"
                            :bus="bus"
                            @refresh="refresh"
                            @changeSelectedFormControl="changeSelectedFormControl" 
                            @startDragFormControl="startDragFormControl"
                        />
                        <div class="form-control-tools" :class="{ 'form-control-tools-hidden': !currentSelectedControl.length }" @mousedown.stop>
                            <div class="form-control-tools-split-item">
                                <a-tooltip placement="right" title="前移" arrowPointAtCenter @mousedown.stop="control_handle('controlMovePrev', $event)">
                                    <a-icon class="form-control-tools-item" type="arrow-up" />
                                </a-tooltip>
                                <hr class="form-control-tools-line" />
                                <a-tooltip placement="right" title="后移" arrowPointAtCenter @mousedown.stop="control_handle('controlMoveNext', $event)">
                                    <a-icon class="form-control-tools-item" type="arrow-down" />
                                </a-tooltip>
                            </div>
                            <a-tooltip placement="right" title="复制" arrowPointAtCenter @mousedown.stop="control_handle('controlCopy', $event)">
                                <a-icon class="form-control-tools-item form-control-tools-item-warning" type="copy" />
                            </a-tooltip>
                            <a-tooltip placement="right" title="删除" arrowPointAtCenter @mousedown.stop="control_handle('controlRemove', $event)">
                                <a-icon class="form-control-tools-item form-control-tools-item-danger" type="delete" />
                            </a-tooltip>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 属性栏 -->
            <ul class="form-design-body-propertypanel" style="width: 400px;">
                <a-select :showSearch="true" optionFilterProp="children" placeholder="界面控件清单" class="form-design-body-propertypanel-current-formcontrol" @change="changeSelectedFormControlBySelect" v-model="currentSelectedFirstControlId">
                    <a-select-opt-group v-for="controlGroup in controlListByGroup" :key="controlGroup.name">
                        <span slot="label"><a-icon :type="controlGroup.icon" /> {{controlGroup.title}}</span>
                        <a-select-option v-for="item in controlGroup.controls" :value="item.id" :key="item.id">{{ item.title }}: {{ item.name }}</a-select-option>
                    </a-select-opt-group>
                </a-select>
                <a-tabs defaultActiveKey="prop">
                    <a-tab-pane tab="属性" key="prop">
                        <a-empty v-show="!currentSelectedControlPropertyGroups.length" description="请选择控件" :style="{ marginTop: '100px' }"></a-empty>
                        <a-collapse :activeKey="['p0','p1','p2','p3']" :bordered="false">
                            <a-collapse-panel v-for="(propGroup, index) in currentSelectedControlPropertyGroups" :key="'p' + index" :header="propGroup.title">
                                <template v-for="prop in propGroup.propertys">
                                    <label class="form-design-body-property-item" v-if="prop.visible !== false" :key="prop.name">
                                        <span class="form-design-body-property-item-label" :class="{ require: prop.require, leaf: prop.leaf }">{{prop.title}}</span>
                                        <div class="form-design-body-property-item-value">
                                            <template v-for="(control, index2) in propertyEditors[prop.editor].control">
                                                    <component
                                                        :key="index2"
                                                        :ref="control.id"
                                                        v-bind="Object.assign({}, prop.attrs, control.attrs)" 
                                                        v-model="currentSelectedControl[0].control.attrs[prop.name]" 
                                                        @change="propChangeListener($event, prop, currentSelectedControlPropertyMap, currentSelectedControl)"
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
                                            
                                        </div>
                                    </label>
                                </template>
                            </a-collapse-panel>
                        </a-collapse>
                    </a-tab-pane>
                    <a-tab-pane tab="事件" key="event">
                    </a-tab-pane>
                    <a-tab-pane tab="表单配置" key="config">
                        <a-collapse :activeKey="['c0','c1','c2','c3']" :bordered="false">
                            <a-collapse-panel key="c1" header="基础配置" :force-render="true">
                                <!-- 面板标题 -->
                                <label class="form-design-body-property-item">
                                    <span class="form-design-body-property-item-label">面板标题</span>
                                    <div class="form-design-body-property-item-value">
                                        <a-input size="small" placeholder="表单标题" allowClear v-model="formConfig.canvasTitle" />
                                    </div>
                                </label>
                                <!-- 表单标题 -->
                                <label class="form-design-body-property-item">
                                    <span class="form-design-body-property-item-label">表单标题</span>
                                    <div class="form-design-body-property-item-value">
                                        <a-input size="small" placeholder="表单标题" allowClear v-model="formConfig.formTitle" />
                                    </div>
                                </label>
                                <!-- 表单文件名 -->
                                <label class="form-design-body-property-item">
                                    <span class="form-design-body-property-item-label require">表单名称</span>
                                    <div class="form-design-body-property-item-value">
                                        <a-input size="small" placeholder="表单文件名" allowClear v-model="formConfig.formName" />
                                    </div>
                                </label>
                                <!-- 设备型号 -->
                                <label class="form-design-body-property-item">
                                    <span class="form-design-body-property-item-label">设备型号</span>
                                    <div class="form-design-body-property-item-value">
                                        <a-select style="width: 100%;" size="small" v-model="formConfig.deviceId">
                                            <div slot="dropdownRender" slot-scope="menu">
                                                <v-nodes :vnodes="menu" />
                                                <a-divider style="margin: 4px 0;" />
                                                <div style="padding: 8px; cursor: pointer;"><a-icon type="plus" /> 新增设备</div>
                                            </div>
                                            <a-select-option v-for="device in Object.entries(devices)" :value="device[0]" :key="device[0]">{{device[1].name}}: {{device[1].width}}×{{device[1].height}}</a-select-option>
                                        </a-select>
                                    </div>
                                </label>
                            </a-collapse-panel>
                            <a-collapse-panel key="c2" header="底部按钮配置" :force-render="true">
                                <!-- 是否显示底部提交区域 -->
                                <label class="form-design-body-property-item">
                                    <span class="form-design-body-property-item-label">显示底部区域</span>
                                    <div class="form-design-body-property-item-value">
                                        <a-switch checkedChildren="开" unCheckedChildren="关" v-model="formConfig.footer.isShow" />
                                    </div>
                                </label>
                                <!-- 提交按钮文本 -->
                                <label v-show="formConfig.footer.isShow" class="form-design-body-property-item">
                                    <span class="form-design-body-property-item-label">提交按钮文本</span>
                                    <div class="form-design-body-property-item-value">
                                        <a-input size="small" allowClear v-model="formConfig.footer.submitButtonText" />
                                    </div>
                                </label>
                                <!-- 是否显示取消按钮 -->
                                <label v-show="formConfig.footer.isShow" class="form-design-body-property-item">
                                    <span class="form-design-body-property-item-label">显示取消按钮</span>
                                    <div class="form-design-body-property-item-value">
                                        <a-switch checkedChildren="开" unCheckedChildren="关" v-model="formConfig.footer.cancelButton" />
                                    </div>
                                </label>
                                <!-- 取消按钮文本 -->
                                <label v-show="formConfig.footer.isShow && formConfig.footer.cancelButton" class="form-design-body-property-item">
                                    <span class="form-design-body-property-item-label leaf">取消按钮文本</span>
                                    <div class="form-design-body-property-item-value">
                                        <a-input size="small" allowClear v-model="formConfig.footer.cancelButtonText" />
                                    </div>
                                </label>
                            </a-collapse-panel>
                        </a-collapse>
                    </a-tab-pane>
                </a-tabs>
            </ul>

        </div>

        <!-- 状态栏 -->
        <div class="form-design-status">
            <ul class="form-design-status-left">
                <li>
                    <a-icon type="close-circle" /> 0个错误
                </li>
                <li>
                    <a-icon type="close-circle" /> 0个警告
                </li>
            </ul>
            <ul class="form-design-status-right">
                
            </ul>
        </div>

        <!-- JSON -->
        <a-drawer width="800px" title="导出JSON" :mask-closable="false" @close="jsonEditorVisible = false" :visible="jsonEditorVisible">
            <gj-code-editor class="json-editor page-config-editor" language="json" ref="jsonEditor" v-model="editorJson">
            </gj-code-editor>
            <div class="bottom-btn-list">
                <a-button @click="editorJson = generateJSON()" type="link">重新生成</a-button>
                <a-button @click="exportJSONFile()" type="primary">导出JSON文件</a-button>
            </div>
        </a-drawer>

        <!-- 预览界面 -->
        <a-modal wrap-class-name="preview-modal" :footer="null" :centered="true" :width="devices[formConfig.deviceId].width + 58" :height="devices[formConfig.deviceId].height" title="预览界面" @cancel="previewVisible = false" :visible="previewVisible">
            <gj-form-design-canvas 
                ref="controlCanvas"
                :preview="true"
                :panel="panel"
                :formConfig="formConfig"
                :devices="devices"
                :currentSelectedControl="currentSelectedControl" 
                :dragConfig="dragConfig"
                :location="canvasLocation"
                :dragFormControlId="dragFormControlId"
                @changeSelectedFormControl="changeSelectedFormControl" 
                @startDragFormControl="startDragFormControl"
            />
        </a-modal>

        <input type="file" id="importjson" style="display: none;" />
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FormDesign } from '@/@types/form-design.d';
import { initPropertyEditors } from '@/lib/form-design/propertyEditor';
import { Enum } from '@/config/enum';
import { initControls } from '@/lib/form-design/formControls';
import { initFormControlGroups } from '@/lib/form-design/formControlGroups';
import { cloneForce } from '@/lib/clone/index';
import { base64 } from '@/lib/base64/base64';

import Icon from 'vant/lib/icon';
import 'vant/lib/index.css';

Vue.use(Icon);

/** 拖拽的节点 */
let dragDom: any;

/** 所有组件 */
let _controls: Array<FormDesign.FormControl> = initControls();

let _controlGroups: Array<FormDesign.FormControlGroup> = initFormControlGroups();

@Component({
    components: {
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        }
    }
})
export default class GjFormDesign extends Vue {

    /** JSON编辑器弹出框是否显示 */
    jsonEditorVisible: boolean = false;
    /** 预览界面是否显示 */
    previewVisible: boolean = false;
    /** JSON编辑器的值 */
    editorJson: string = '';

    /** 当前选择菜单 */
    currentMenu: Array<string> = [];

    /** 画板 */
    canvasEl: any;
    /** 画板主面板元素 */
    canvasPanelEl: any;
    /** 工具栏元素 */
    toolsEl: any;
    /** 正在被拖拽的组件Id */
    dragFormControlId: string = '';
    /** 画板滚动坐标 */
    canvasLocation: FormDesign.Location = {
        x: 0,
        y: 0
    };

    /** 是否开始拖拽 */
    dragConfig: FormDesign.DragConfig = {
        isPreDrag: false,
        isDrag: false,
        isDragArea: false,
        control: null,
        insertControlId: '',
        insertControlSlotIndex: 0,
        targetFormControlId: '',
        startLoc: {
            x: 0,
            y: 0
        },
        endLoc: {
            x: 0,
            y: 0
        },
    };

    /** 表单基本配置 */
    formConfig: FormDesign.FormConfig = {
        canvasTitle: '主页',
        formTitle: '测试流程',
        formName: 'TestTask',
        width: 0,
        height: 0,
        headerHeight: 46,
        deviceId: 'iphone678',
        footer: {
            isShow: true,
            submitButtonText: '提交',
            cancelButton: false,
            cancelButtonText: '取消'
        },
        data: {

        }
    };

    /** 设备类型列表 */
    devices: Record<string, FormDesign.RemoteDevice> = {
        galaxys5: { name: 'Galaxy S5', width: 360, height: 640, pixelRatio: 3 },
        pixel2: { name: 'Pixel 2', width: 411, height: 731, pixelRatio: 2.625 },
        pixel2xl: { name: 'Pixel 2 XL', width: 411, height: 823, pixelRatio: 3.5 },
        iphone5se: { name: 'iPhone 5/SE', width: 320, height: 568, pixelRatio: 2 },
        iphone678: { name: 'iPhone 6/7/8', width: 375, height: 667, pixelRatio: 2 },
        iphone678plus: { name: 'iPhone 6/7/8 Plus', width: 414, height: 736, pixelRatio: 3 },
        iphonex: { name: 'iPhone X', width: 375, height: 812, pixelRatio: 3 },
        ipad: { name: 'iPad', width: 768, height: 1024, pixelRatio: 2 },
        ipadpro: { name: 'iPad Pro', width: 1024, height: 1366, pixelRatio: 2 }
    };

    /** 画布组件列表 */
    controlList: Array<FormDesign.FormControl> = [];

    /** 画布组件树 */
    panel: FormDesign.FormPanel = {
        name: 'main',
        direction: 'row',
        children: []
    };

    /** 当前选择控件 */
    currentSelectedControl: Array<FormDesign.FormControl> = [];
    /** 当前选中的第一个控件Id */
    currentSelectedFirstControlId?: string = '';
    /** 当前选择控件所带来的控件属性组 */
    currentSelectedControlPropertyGroups: Array<FormDesign.PropertyGroup> = [];
    /** 当前选择控件所带来的控件属性哈希表 */
    currentSelectedControlPropertyMap: Array<FormDesign.FormControlProperty> = [];

    /** 设计器事件总线 */
    bus: Vue = new Vue();

    /** 组件库 */
    controlGroups = _controlGroups.map(i => ({
        ...i,
        controls: _controls.filter(o => o.type == i.name)
    }));

    /** 属性编辑器库 */
    propertyEditors = initPropertyEditors();

    /** 分组画布组件列表 */
    get controlListByGroup() {
        return _controlGroups.map(i => ({
            ...i,
            controls: this.controlList.filter(o => o.type == i.name)
        })).filter(i => i.controls.length);
    }

    /** 切换当前选择的控件 */
    changeSelectedFormControl(formControlList) {
        this.currentSelectedControl = formControlList;
        if (formControlList && formControlList.length) {
            this.currentSelectedFirstControlId = formControlList[0].id;
            this.refreshControlTools();
        } else {
            this.currentSelectedFirstControlId = undefined;
        }
        
        //@ts-ignore
        this.currentSelectedControlPropertyMap = formControlList.length ? Object.assign.apply({}, [{}].concat(formControlList[0].propertys.map(i => ({[i.name]: i})))) : [];
        this.currentSelectedControlPropertyGroups = formControlList.length ? Object.entries(Enum.FormControlPropertyGroup).map(([key, value]) => ({
            title: value,
            propertys: formControlList ? formControlList[0].propertys.filter(i => 
                i.group == value
            ) : []
        })).filter(i => i.propertys.length) : [];
    }

    /** 重绘工具栏（调整位置） */
    refreshControlTools() {
        if (this.currentSelectedControl.length) {
            let rect = (document.querySelector(`[control-id="${this.currentSelectedControl[0].id}"]`) as HTMLElement).getBoundingClientRect();
            let bottom = document.body.offsetHeight - rect.bottom;
            if (bottom > 200) {
                this.toolsEl.style.transform = `translateY(${rect.top + this.canvasEl.scrollTop - 180}px)`;
            } else if (rect.top > 200) {
                this.toolsEl.style.transform = `translateY(${rect.bottom + this.canvasEl.scrollTop - 380}px)`;
            }
        }
    }

    changeSelectedFormControlBySelect(e) {
        if(e) {
            this.changeSelectedFormControl([ this.controlList.find(i => i.id == e) ]);
        } else {
            this.changeSelectedFormControl([  ]);
        }
    }
    
    /** 触发属性选择器事件 */
    eventListener(e, control, eventType, prop) {
        if (control && control.event && control.event[eventType]) {
            return control.event[eventType].call(this, e, prop);
        }
    }

    /** 属性修改触发的事件 */
    propChangeListener(e, prop, propMap, control) {
        if (prop && prop.change) {
            return prop.change.call(this, prop, propMap, control, e.target ? e.target.value : e, (this.$refs.controlCanvas as Vue).$refs);
        }
    }

    /** 改变属性 */
    changeProperty(e, property) {
    }

    get controlCanvas(): any {
        return this.$refs.controlCanvas;
    }

    /** 拖拽已存在的组件 */
    startDragFormControl(e, control: FormDesign.FormControl) {
        this.dragConfig.targetFormControlId = control.id;
        let _el = document.createElement('div');
        _el.classList.add('form-design-drag-control');
        _el.innerHTML = control.title;
        this.dragStart({
            target: _el,
            button: e.button,
            layerY: 16,
            layerX: 60
        }, control);
    }

    /** 开始拖拽组件 */
    dragStart(e, control: FormDesign.FormControl) {
        if (e.button != 0) return;
        if (dragDom) {
            document.body.removeChild(dragDom);
            dragDom = null;
        }
        dragDom = e.target.cloneNode(true);
        document.body.appendChild(dragDom);
        this.dragConfig.startLoc.y = e.layerY;
        this.dragConfig.startLoc.x = e.layerX;
        dragDom.style.top = e.clientY - this.dragConfig.startLoc.y + 'px';
        dragDom.style.left = e.clientX - this.dragConfig.startLoc.x + 'px';
        dragDom.classList.add('form-design-drag-control', 'hidden');
        this.dragConfig.isPreDrag = true;
        this.dragConfig.control = control;
    }

    /** 组件拖拽中 */
    dragMove(e) {
        this.dragConfig.insertControlSlotIndex = undefined;
        if (this.dragConfig.isPreDrag) {
            /** 未完成的误操作处理 */
            if (Math.abs(this.dragConfig.startLoc.x - e.clientX) < 10 && Math.abs(this.dragConfig.startLoc.y - e.layerY) < 10) {
                return;
            } else {
                dragDom.classList.remove('hidden');
                this.dragConfig.isPreDrag = false;
                this.dragConfig.isDrag = true;
            }
        } else if (this.dragConfig.isDrag) {
            this.dragConfig.endLoc.y = e.clientY - this.dragConfig.startLoc.y;
            this.dragConfig.endLoc.x = e.clientX - this.dragConfig.startLoc.x;
            dragDom.style.top = this.dragConfig.endLoc.y + 'px';
            dragDom.style.left = this.dragConfig.endLoc.x + 'px';
            
            let _x = this.dragConfig.endLoc.x + this.dragConfig.startLoc.x + this.canvasLocation.x;
            let _y = this.dragConfig.endLoc.y + this.dragConfig.startLoc.y + this.canvasLocation.y;

            let _pageX = e.pageX;
            let _pageY = e.pageY;
            
            //  && _y < this.controlCanvas.formConfig.height
            if (_y > 0 && _x > 0 && _x < this.controlCanvas.formConfig.width) {
                this.dragConfig.isDragArea = true;
                let _height = 0;
                /** 计算应该把组件插入到什么地方 */
                let _currentHeight = 0;
                let index = 0;
                for (; index < this.panel.children.length; index++) {
                    let _id = this.panel.children[index].id;
                    let _control = this.getControlById(_id);
                    _height = (this.canvasPanelEl.querySelector(`[control-id=${_id}]`) as HTMLElement).offsetHeight || 0;
                    
                    if (_control.type === 'layout' && _id != this.dragConfig.targetFormControlId) {
                        
                        if (_y >= _currentHeight - _height && _y <= _currentHeight + _height) {
                            // 插入到子组件
                            let _panels: Array<HTMLElement> = Array.from(this.canvasPanelEl.querySelectorAll(`[control-id='${_control.id}'] ${_control.childrenSlot}`));
                            for (let i = 0; i < _panels.length; i++) {
                                let _rect = _panels[i].getBoundingClientRect();
                                if (_rect.top < _pageY && _rect.top + _rect.height > _pageY &&
                                    _rect.left < _pageX && _rect.left + _rect.width > _pageX) {
                                    this.dragConfig.insertControlId = _control.id;
                                    this.dragConfig.insertControlSlotIndex = i;
                                    this.controlCanvas.changeControlCursor(true, _panels[i], true);
                                    return;
                                }
                            }
                        } else {
                            console.log('其他情况')
                        }
                        
                    } else {
                        if (_y >= _currentHeight - _height / 2 && _y <= _currentHeight + _height / 2) {
                            this.dragConfig.insertControlId = _id;
                            _currentHeight += _height;
                            break;
                        } else if (_y > _currentHeight + _height / 2 && index < this.panel.children.length - 1) {
                            this.dragConfig.insertControlId = this.panel.children[index + 1].id;
                        }
                    }
                    _currentHeight += _height;
                    
                }
                if (_y >= _currentHeight - _height / 2 && index == this.panel.children.length) {
                    this.dragConfig.insertControlId = '';
                    this.controlCanvas.changeControlCursor(true);
                } else {
                    if (this.dragConfig.insertControlId) {
                        this.controlCanvas.changeControlCursor(true, this.controlCanvas.getFormControlElementById(this.dragConfig.insertControlId));
                    } else {
                        console.error('insertControlId出错');
                    }
                }
                
            } else {
                this.dragConfig.isDragArea = false;
                this.controlCanvas.changeControlCursor(false);
            }
            console.groupEnd();
        }
    }

    /** 拖拽结束 */
    dragUp(e) {
        if (this.dragConfig.isDrag || this.dragConfig.isPreDrag) {
            document.body.removeChild(dragDom);
            dragDom = null;

            /** 放置控件 */
            if (this.dragConfig.isDragArea) {
                let _newControl = cloneForce({
                    ..._controls.find(i => i.name == this.dragConfig.control.name),
                    height: 0
                });

                // 新控件和老控件以不同方式处理Id
                if (!this.dragConfig.targetFormControlId) {
                    _newControl.id = this.$common.createModelId(10);
                } else {
                    _newControl.id = this.dragConfig.targetFormControlId;
                }
                // 获取插入索引
                let _insertIndex = this.dragConfig.insertControlId ? this.panel.children.findIndex(i => i.id == this.dragConfig.insertControlId) : this.panel.children.length;
                
                if (this.dragConfig.targetFormControlId) {
                    // 插入到某个控件中处理方式
                    if (this.dragConfig.targetFormControlId != this.dragConfig.insertControlId) {
                        this.panel.children = this.$common.moveNodeOfTree(
                            this.panel.children, 
                            this.dragConfig.targetFormControlId,
                            this.dragConfig.insertControlId,
                            this.dragConfig.insertControlSlotIndex
                        );
                    }
                } else {
                    // 刚刚插入界面或添加到最后处理方式
                    this.controlList.push(_newControl);
                    this.panel.children.splice(_insertIndex, 0, _newControl);
                }
            }

            this.dragConfig = {
                control: null,
                insertControlId: '',
                insertControlSlotIndex: undefined,
                targetFormControlId: '',
                isDrag: false,
                isPreDrag: false,
                isDragArea: false,
                startLoc: { x: 0, y: 0 },
                endLoc: { x: 0, y: 0 }
            };
            this.dragFormControlId = '';
            this.controlCanvas.changeControlCursor(false);
            this.$nextTick(() => {
                this.controlCanvas.refresh();
                this.refreshControlTools();
            });
        }
    }

    /** 根据Id获取 */
    getControlById(id: string): FormDesign.FormControl {
        return this.controlList.find(i => i.id == id) as FormDesign.FormControl;
    }

    mounted() {
        this.toolsEl = document.querySelector('.form-control-tools');
        console.log(this.toolsEl);
        this.canvasPanelEl = document.querySelector('.form-design-canvas-mainpanel');
        let { y, x } = this.canvasPanelEl.getBoundingClientRect();
        this.canvasLocation.y = this.canvasPanelEl.scrollTop - y;
        this.canvasLocation.x = this.canvasPanelEl.scrollLeft - x;
        this.canvasEl = document.querySelector('.form-design-body-canvas');
        if (this.canvasEl != null) {

            let isStart = false;
            
            this.canvasLocation = {
                y: this.canvasEl.scrollTop - y,
                x: this.canvasEl.scrollLeft - x
            }
            this.canvasEl.addEventListener('scroll', e => {
                if (!isStart) {
                    isStart = true;
                    setTimeout(() => {
                        let rect = this.canvasPanelEl.getBoundingClientRect();
                        this.canvasLocation = {
                            y: this.canvasEl.scrollTop - rect.top - this.canvasEl.scrollTop,
                            x: this.canvasEl.scrollLeft - rect.left - this.canvasEl.scrollLeft
                        }
                        isStart = false;
                    }, 200);
                }
            });
        }

        //导入文件框的change事件初始化
        let _importJson: any = document.querySelector('#importjson');
        _importJson.addEventListener('change', (e: any) => {
            let _fileElement = e.target;
            
                let files = _fileElement.files;
                if (files.length) {
                    var render = new FileReader();
                    render.readAsDataURL(files[0]);
                    if (files[0].type != 'application/json') {
                        _importJson.value = '';
                        this.$message.error('JSON文件格式不正确。');
                        return;
                    }
                    if (files[0].size > 102400) {
                        _importJson.value = '';
                        this.$message.error('JSON文件过大。');
                        return;
                    }
                    render.onload = (e: any) => {
                        let _file = base64.decode(e.target.result.replace(/data:.*?;base64,/g, ''));
                        console.log(_file);
                        let config: any = { footer: {} };
                        if (_file) {
                            try {
                                config = JSON.parse(_file);
                            } catch (error) {
                                this.$message.error('导入JSON文件解析失败');
                                console.error(error.message);
                            }
                        } else {
                            this.$message.error('用于导入配置的文件不能为空');
                            console.error('用于导入配置的文件不能为空。');
                        }

                        //赋值
                        this.formConfig.canvasTitle = config.formConfig.canvasTitle || '';
                        this.formConfig.formTitle = config.formConfig.formTitle || '';
                        this.formConfig.formName = config.formConfig.formName || '';
                        this.formConfig.width = config.formConfig.width || '';
                        this.formConfig.height = config.formConfig.height || '';
                        this.formConfig.headerHeight = config.formConfig.headerHeight || '';
                        this.formConfig.data = config.formConfig.data || '';
                        this.formConfig.deviceId = config.formConfig.deviceId || '';
                        //表单底部配置
                        this.formConfig.footer.isShow = config.formConfig.footer.isShow || '';
                        this.formConfig.footer.submitButtonText = config.formConfig.footer.submitButtonText || '';
                        this.formConfig.footer.cancelButton = config.formConfig.footer.cancelButton || '';
                        this.formConfig.footer.cancelButtonText = config.formConfig.footer.cancelButtonText || '';
                        //控件配置
                        this.panel = config.controls;

                        _importJson.value = '';
                    }
                }
        });
    }

    created() {
        document.body.addEventListener('mousemove', this.dragMove);
        document.body.addEventListener('mouseup', this.dragUp);

        this.bus.$on('control_handle', (eventName, params) => {
            this[eventName].apply(this, params);
        });
    }

    destroy() {
        document.body.removeEventListener('mousemove', this.dragMove);
        document.body.removeEventListener('mouseup', this.dragUp);
    }

    /** 预览效果 */
    preview() {
        this.changeSelectedFormControl([]);
        this.previewVisible = true;
    }

    generateJSON() {
        let _exportJson = {
            formConfig: this.formConfig,
            controls: this.panel
        };

        return JSON.stringify(_exportJson, null, '    ');
    }

    /** 控件快捷操作 */
    control_handle(eventName, params) {
        let _panel: number | undefined, 
            _slotIndex: number | undefined,
            _index: number | undefined;
        const _cb = (parent, panel, slotIndex: number, index?: number) => {
            if (parent.id == this.currentSelectedFirstControlId) {
                _panel = panel;
                _slotIndex = slotIndex;
                _index = index;
                return;
            }
            if (parent?.children?.length) {
                for (let slotIndex = 0; slotIndex < parent.children.length; slotIndex++) {
                    for (let i = 0; i < parent.children[slotIndex].length; i++) {
                        _cb(parent.children[slotIndex][i], parent, slotIndex, i);
                    }
                }
            }
        }
        this.panel.children.forEach((i, index) => _cb(i, this.panel, index));
        this[eventName].apply(this, [params, _panel, _slotIndex, _index]);
    }

    /** 控件前移 */
    controlMovePrev(e, panel: FormDesign.FormPanel, slotIndex: number, index: number) {
        if (index > 0) {
            // @ts-ignore
            this.$set(panel.children, slotIndex, this.$common.arrChange(panel.children[slotIndex], index, index - 1));
        } else {
            if (slotIndex > 0) {
                this.$set(panel, 'children', this.$common.arrChange(panel.children, slotIndex, slotIndex - 1));
            }
        }
        this.$nextTick(() => {
            this.refreshControlTools();
        });
    }

    /** 控件后移 */
    controlMoveNext(e, panel: FormDesign.FormPanel, slotIndex: number, index: number) {
        // @ts-ignore
        if (index != undefined && index < panel.children[slotIndex].length - 1) {
            // @ts-ignore
            this.$set(panel.children, slotIndex, this.$common.arrChange(panel.children[slotIndex], index, index + 1));
        } else {
            if (slotIndex < panel.children.length - 1) {
                this.$set(panel, 'children', this.$common.arrChange(panel.children, slotIndex, slotIndex + 1));
            }
        }
        this.$nextTick(() => {
            this.refreshControlTools();
        });
    }

    /** 控件复制 */
    controlCopy(e, panel: FormDesign.FormPanel, slotIndex: number, index: number) {
        if (index != undefined) {

        } else {
            let _index = this.controlList.findIndex(i => i.id == panel.children[slotIndex].id);
            let _newControl = cloneForce({
                ...panel.children[slotIndex],
                id: this.$common.createModelId(10)
            });
            panel.children.splice(slotIndex + 1, 0, _newControl);
            this.controlList.splice(_index + 1, 0, _newControl);
        }
        this.$nextTick(() => this.controlCanvas.refresh());
    }
    
    /** 控件删除 */
    controlRemove(e, panel: FormDesign.FormPanel, slotIndex: number, index: number) {
        if (index != undefined) {
            let _id = panel.children[slotIndex][index].id;
            this.controlList.splice(this.controlList.findIndex(i => i.id == _id), 1);
            // @ts-ignore
            this.$set(panel.children, slotIndex, panel.children[slotIndex].filter((i, controlIndex) => index !== controlIndex));
        } else {
            let _id = panel.children[slotIndex].id;
            this.controlList.splice(this.controlList.findIndex(i => i.id == _id), 1);
            this.$set(panel, 'children', panel.children.filter((i, controlIndex) => slotIndex !== controlIndex));
        }
        this.changeSelectedFormControl([]);
        this.$nextTick(() => {
            this.controlCanvas.refresh();
            this.refreshControlTools();
        });
    }

    /** 导出为Json文件 */
    menu_exportJSON() {
        this.editorJson = this.generateJSON();
        this.jsonEditorVisible = true;
    }

    /** 导出为JSON */
    exportJSONFile() {
        this.$common.downLoadFile(`${this.formConfig.formTitle}_${this.formConfig.formName}_${new Date().format('yyyy-MM-dd')}.json`, this.editorJson);
    }

    /** 页面重绘 */
    refresh() {
        this.canvasPanelEl = document.querySelector('.form-design-canvas-mainpanel');
        this.canvasEl = document.querySelector('.form-design-body-canvas');
    }

    /** 导出为Vue页面文件 */
    menu_exportVuePage() {

        /** 递归构造控件 */
        const _generateControlStr = (controls) => {
            let _re = '';
            const _cb = (control, level) => {
                let _control:FormDesign.BasicControl = control.control.control ? control.control : control;
                _re += `${'    '.repeat(level)}<${_control.control} `;
                _re += Object.entries(_control.attrs || {}).map(([key, value]) => `${key}="${value}"`).join(' ');
                _re += `>`;
                
                let _slots = Object.entries(_control.slot || {})
                
                if (_slots.length) {
                    _re += '\n';
                    _slots.map(([key, value]) => {
                        _re += `${'    '.repeat(level + 1)}<template #${key}>\n`;
                        value.map(i => _cb(i, level + 2));
                        _re += `${'    '.repeat(level + 1)}</template>\n`;
                    }).join('\n\n');

                    _re += `${'    '.repeat(level)}`;
                }
                _re += `</${_control.control}>\n`;
            };

            controls.map(i => _cb(i, 2));
            return _re;
        }

        /** 构造Vue页面文件 */
        let _vueTxt = `<template>

    <!-- FormTitle  : ${this.formConfig.formTitle} -->
    <!-- FormName   : ${this.formConfig.formName} -->
    <!-- CreateDate : ${new Date().format('yyyy-MM-dd HH:mm')} -->

    <div class="page-${this.formConfig.formName}">

        <van-nav-bar class="home-title" title="${this.formConfig.formTitle}" left-arrow @click-left="$router.go(-1)">
        </van-nav-bar>

${_generateControlStr(this.panel.children)}
        <!-- 底部按钮组 -->
        <div class="fixed-bottom">
            ${ this.formConfig.footer.isShow ? `<div class="fixed-bottom-content">
                ${ this.formConfig.footer.cancelButton ? `<van-button style="width: 50%;" type="default" size="large" @click="cancelForm()">${this.formConfig.footer.cancelButtonText}</van-button>` : '' }
                <van-button type="primary" size="large" @click="submitForm()">${this.formConfig.footer.submitButtonText}</van-button>
            </div>` : ''}
        </div>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: { } })
export default class Task_01 extends Vue {

    detailData = {
        
    };

    showDateDropDown = false;
    ${ this.formConfig.footer.cancelButton ? `
    /** 取消流程 */
    cancelForm() {

    }` : '' }

    /** 提交流程 */
    submitForm() {
        Toast.loading({ mask: true, message: '提交中' });
    }
}
<\/script>

<style lang="scss" scoped>
    .page-${this.formConfig.formName} {
        
    }
</style>
        `;

        this.$common.downLoadFile(`${this.formConfig.formName}_${new Date().format('yyyy-MM-dd')}.vue`, _vueTxt);
    }
}
</script>

<style lang="scss" scoped>
    // 移动端表单编辑器样式
    .form-design {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        background-color: white;
        align-items: stretch;
        
        ::v-deep .ant-tabs-bar {
            margin-bottom: 0px;
        }

        // 表单编辑器头部
        > .form-design-header {
            display: flex;
            border-bottom: 1px solid #EEE;

            > h1 {
                font-size: 20px;
                line-height: 46px;
                padding-left: 20px;
                margin-right: 10px;
                margin-bottom: 0px;
            }

            > .ant-menu {
                text-align: right;
                flex-grow: 1;
                flex-shrink: 1;
            }
        }

        // 表单编辑器主体内容
        > .form-design-body {
            position: relative;
            display: flex;
            flex-grow: 1;
            flex-shrink: 1;
            flex-direction: row;
            align-items: stretch;
            overflow: auto;

            // 组件库
            > .form-design-body-controlpanel {
                user-select: none;
                position: relative;
                flex-grow: 0;
                flex-shrink: 0;
                box-sizing: border-box;
                padding: 15px;
                overflow: auto;

                > dl {
                    margin-bottom: 10px;

                    &:last-child {
                        margin-bottom: 0px;
                    }
                    
                    > dt {
                        margin-bottom: 6px;
                        color: #999;
                    }

                    > dd {
                        cursor: grab;
                        position: relative;
                        display: inline-block;
                        box-sizing: border-box;
                        background-color: #F4F6FC;
                        border-radius: 4px;
                        line-height: 30px;
                        width: calc(49.999% - 5px);
                        margin-right: 10px;
                        padding-left: 10px;

                        &:hover {
                            background-color: $-primary-color;
                            color: white;
                        }

                        &:active {
                            cursor: grabbing;
                        }

                        &:nth-child(2n + 1) {
                            margin-right: 0px;
                        }

                        > i {
                            margin-right: 6px;
                        }
                    }
                }
            }

            // 画布
            > .form-design-body-canvas {
                position: relative;
                flex-grow: 1;
                flex-shrink: 1;
                border-left: 1px solid #EEE;
                border-right: 1px solid #EEE;
                background-color: #F0F2F5;
                overflow: auto;

                > .form-design-body-canvas-page-list {
                    position: relative;
                    min-width: 100%;
                    min-height: 100%;
                    width: auto;
                    height: auto;

                    > .form-design-body-canvas-page-item {
                        position: absolute;
                        display: inline-block;
                        margin: 50px;

                        > h3 {
                            cursor: default;
                            user-select: none;
                            font-size: 20px;
                            color: #666;
                        }

                        > .form-design-canvas {
                            position: relative;
                            box-shadow: 0 2px 2px 0 rgba(40, 120, 255, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.12);
                            margin-bottom: 40px;
                        }
                    }
                }
            }

            // 属性栏
            > .form-design-body-propertypanel {
                flex-grow: 0;
                flex-shrink: 0;
                overflow: hidden;

                > .form-design-body-propertypanel-current-formcontrol {
                    width: 100%;
                    font-weight: bold;
                    border-bottom: 2px solid $-primary-color;

                    ::v-deep > .ant-select-selection {
                        border: none;
                        border-radius: 0px;
                    }
                }

                ::v-deep .ant-collapse {
                    height: calc(100vh - 155px);
                    overflow-y: auto;
                }
            }
        }

        // 表单编辑器下方状态栏
        > .form-design-status {
            display: flex;
            flex-grow: 0;
            flex-shrink: 0;
            flex-direction: row;
            align-items: stretch;
            background-color: $-primary-color;
            color: white;

            > .form-design-status-left {
                flex-grow: 1;
                text-align: left;
            }

            > .form-design-status-right {
                flex-grow: 1;
                text-align: right;
            }

            > .form-design-status-left, .form-design-status-right {
                
                > li {
                    display: inline-block;
                    cursor: pointer;
                    padding: 2px 10px;

                    &:hover {
                        background-color: rgba(0,0,0,0.2);
                    }
                }
            }
        }
    }

    // 属性栏-属性列表
    .form-design-body-property-item {
        display: flex;
        white-space: nowrap;
        line-height: 32px;
        margin-bottom: 5px;

        &:last-child {
            margin-bottom: 0px;
        }

        > .form-design-body-property-item-label {
            position: relative;
            cursor: pointer;
            display: inline-block;
            user-select: none;
            min-width: 100px;

            &.require:after {
                content: '*';
                position: absolute;
                display: inline-block;
                color: #f5222d;
                font-size: 16px;
                line-height: 1;
                top: 8px;
                left: -10px;
            }

            &.leaf:before {
                content: "";
                width: 10px;
                height: 10px;
                border-left: 1px solid #AAA;
                border-bottom: 1px solid #AAA;
                display: inline-block;
                margin-right: 3px;
                font-size: 16px;
                margin-bottom: 4px;
                margin-left: 3px;
                line-height: 1;
                border-bottom-left-radius: 2px;
            }
        }

        > .form-design-body-property-item-value {
            flex-grow: 1;
            margin-left: 20px;

            > .ant-input-group-wrapper {
                position: relative;
                height: 24px;
                top: 4px;
                
                ::v-deep .ant-btn {
                    padding: 0 12px;
                }
            }

            .ant-input-wrapper {
            }
        }
    }

    /** JSON编辑器样式 */
    .page-config-editor.json-editor {
        position: relative;
        height: calc(100vh - 150px);
        width: 100%;

        ::v-deep .CodeMirror {
            height: 100% !important;

            ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, .2);
            }
        }
    }
</style>