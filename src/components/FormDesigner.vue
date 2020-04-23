<template>
    <div class="form-design">
        <!-- 头部菜单 -->
        <div class="form-design-header">
            <h1>{{$config.TITLE}} v{{$root.packageInfo.version}} 
                <span class="form-design-header-subtitle">
                    
                </span>
            </h1>
            <div class="form-design-header-center-tools"></div>
            <a-menu :selectable="false" mode="horizontal" :forceSubMenuRender="true">
                <a-sub-menu>
                    <span slot="title" class="submenu-title-wrapper">
                        <a-icon type="file" />文件
                    </span>

                    <a-menu-item @click="templateSelectModalVisible = true"><a-icon type="file-add" />新建</a-menu-item>
                    <a-menu-item @click="onSaveForm()"><a-icon type="save" />保存</a-menu-item>
                    <a-menu-divider></a-menu-divider>
                    <a-menu-item class="label-menu-item" ><label for="importjson"><a-icon type="select" />导入</label></a-menu-item>
                    <a-sub-menu>
                        <span slot="title" class="submenu-title-wrapper">
                            <a-icon type="file-text" />最近的表单
                        </span>
                        <a-menu-item v-if="!historyForm.length" style="height: 130px;">
                            <a-empty />
                        </a-menu-item>
                        <a-menu-item v-if="historyForm.length" @click="clearHistoryForm">
                            清空历史
                        </a-menu-item>
                        <a-menu-divider v-if="historyForm.length"></a-menu-divider>
                        <a-menu-item v-for="(form, index) in historyForm" :key="'sub1-2-' + index" @click="selectHistoryForm(form)">
                            {{form.formConfig.formTitle}}
                        </a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu>
                        <span slot="title" class="submenu-title-wrapper">
                            <a-icon type="skin" />主题
                        </span>
                        <a-menu-item :class="{ 'ant-menu-item-active': formConfig.formTheme == theme.code }" v-for="(theme, index) in formThemes" :key="'sub1-2-' + index" @click="selectTheme(theme)">
                            <a-icon v-show="formConfig.formTheme == theme.code" type="check" />
                            {{theme.title}}
                        </a-menu-item>
                    </a-sub-menu>
                    <a-menu-item @click="templateSelectModalVisible = true"><a-icon type="fire" />表单模板</a-menu-item>
                </a-sub-menu>
                <a-sub-menu>
                    <span slot="title" class="submenu-title-wrapper">
                        <a-icon type="edit" />编辑
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

                <a-sub-menu>
                    <span slot="title" class="submenu-title-wrapper">
                        <a-icon type="edit" />数据配置
                    </span>
                    
                    <a-menu-item @click="scriptEditorVisible = true;"><a-icon type="profile" />Vue数据配置</a-menu-item>
                    <a-menu-item @click="styleEditorVisible = true;"><a-icon type="bg-colors" />样式配置</a-menu-item>
                    <a-menu-item @click="apiEditorVisible = true;"><a-icon type="api" />接口配置</a-menu-item>
                </a-sub-menu>

                <a-menu-item key="about">
                    <a-icon type="info-circle" />关于
                </a-menu-item>
            </a-menu>
        </div>

        <!-- 主体区域 -->
        <div class="form-design-body">

            <div class="form-design-body-left">
                <!-- 控件栏 -->
                <div class="form-design-body-controlpanel" style="width: 300px;">
                    <dl v-for="group in controlGroups" :key="group.name">
                        <dt><a-icon v-show="group.icon" :type="group.icon" :style="{ marginRight: '3px' }" /> {{group.title}}</dt>
                        <dd v-for="control in group.controls" :key="control.name" @mousedown="dragStart($event, control)">
                            <a-icon v-show="control.icon" :type="control.icon" />{{control.title}}
                        </dd>
                    </dl>
                </div>

                <!-- 大纲 -->
                <!-- <div class="form-design-body-outline">
                    <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onSearchOutline" />
                    <a-tree @expand="onOutlineExpand" :expandedKeys="expandedKeys" :autoExpandParent="autoExpandParent" :treeData="gData">
                        <template slot="title" slot-scope="{title}">
                            <span v-if="title.indexOf(searchValue) > -1">
                                {{title.substr(0, title.indexOf(searchValue))}}
                                <span style="color: #f50">{{searchValue}}</span>
                                {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
                            </span>
                            <span v-else>{{title}}</span>
                        </template>
                    </a-tree>
                </div> -->
                
            </div>

            <div class="form-design-body-content">
                <!-- 画布 -->
                <div class="form-design-body-canvas" @mousedown="changeSelectedFormControl([])" :class="currentComponentLibrary.type == 'mobile' ? 'form-design-body-canvas-mobile' : 'form-design-body-canvas-pc'" >
                    <div class="form-design-body-canvas-page">
                        <!-- <h3 v-if="currentComponentLibrary.type == 'mobile'">{{formConfig.canvasTitle}}</h3> -->
                        <form-design-canvas 
                            ref="controlCanvas"
                            :preview="false"
                            :componentLibraryList="componentLibraryList"
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
                                <a-tooltip :placement="currentComponentLibrary.type == 'mobile' ? 'right' : 'bottom'" title="前移" arrowPointAtCenter @mousedown.stop="control_handle('controlMovePrev', $event)">
                                    <a-icon class="form-control-tools-item" type="arrow-up" />
                                </a-tooltip>
                                <hr class="form-control-tools-line" />
                                <a-tooltip :placement="currentComponentLibrary.type == 'mobile' ? 'right' : 'bottom'" title="后移" arrowPointAtCenter @mousedown.stop="control_handle('controlMoveNext', $event)">
                                    <a-icon class="form-control-tools-item" type="arrow-down" />
                                </a-tooltip>
                            </div>
                            <a-tooltip :placement="currentComponentLibrary.type == 'mobile' ? 'right' : 'bottom'" title="复制" arrowPointAtCenter @mousedown.stop="control_handle('controlCopy', $event)">
                                <a-icon class="form-control-tools-item form-control-tools-item-warning" type="copy" />
                            </a-tooltip>
                            <a-tooltip :placement="currentComponentLibrary.type == 'mobile' ? 'right' : 'bottom'" title="删除" arrowPointAtCenter @mousedown.stop="control_handle('controlRemove', $event)">
                                <a-icon class="form-control-tools-item form-control-tools-item-danger" type="delete" />
                            </a-tooltip>
                        </div>
                    </div>
                </div>
                <!-- 隐藏控件区域 -->
                <div class="form-design-body-canvas-hidden-controls" v-show="panel.children.filter(i => i.type == 'hidden').length">
                    <label class="form-design-body-canvas-hidden-controls-label">隐藏控件：</label>
                    <div class="form-hidden-control" 
                        :class="{ active: currentSelectedControl.find(i => i.id == control.id) }"
                        v-for="control in panel.children.filter(i => i.type == 'hidden')" 
                        :control-id="control.id" 
                        :key="control.id"
                        @click="changeSelectedFormControl([control])"
                        @contextmenu.prevent="contextMenuOpen">
                        {{control.title}}
                    </div>
                </div>
            </div>
            
            <!-- 属性栏 -->
            <ul class="form-design-body-propertypanel" style="width: 500px;">
                <li class="form-design-body-propertypanel-controllist">
                    <a-select :showSearch="true" optionFilterProp="children" placeholder="界面控件清单" class="form-design-body-propertypanel-current-formcontrol" @change="changeSelectedFormControlBySelect" v-model="currentSelectedFirstControlId">
                        <a-select-opt-group v-for="controlGroup in controlListByGroup" :key="controlGroup.name">
                            <span slot="label"><a-icon :type="controlGroup.icon" /> {{controlGroup.title}}</span>
                            <a-select-option v-for="item in controlGroup.controls" :value="item.id" :key="item.id">{{ item.title }}: {{ item.control.attrs.remark || item.control.attrs.model }}</a-select-option>
                        </a-select-opt-group>
                    </a-select>
                </li>
                <li class="form-design-body-propertypanel-props">
                    <a-tabs defaultActiveKey="prop" @bus="changeMainPropertyPanel($event)">
                        <a-tab-pane key="prop">
                            <span slot="tab"><a-icon type="profile" />属性</span>
                            <a-empty v-show="!currentSelectedControlPropertyGroups.length" description="暂无属性" :style="{ marginTop: '100px' }"></a-empty>
                            <a-collapse :activeKey="['p0','p1','p2','p3','p4']" :bordered="false">
                                <a-collapse-panel v-for="(propGroup, index) in currentSelectedControlPropertyGroups" :key="'p' + index" :header="propGroup.title">
                                    <template v-for="prop in propGroup.propertys">
                                        <div class="form-design-body-property-item" :class="{ 'form-design-body-property-item-block': prop.layout == 'block' || (prop.attach && prop.attach.length) }" v-if="prop.visible !== false" :key="prop.name">
                                            <span class="form-design-body-property-item-label" :class="{ require: prop.require, leaf: prop.leaf }">
                                                {{prop.title}}&nbsp;
                                                <a-popover v-show="prop.remark" placement="topRight" trigger="hover" arrowPointAtCenter>
                                                    <template slot="content">
                                                        {{prop.remark}}
                                                    </template>
                                                    <template slot="title">
                                                        <span>{{prop.title}} {{prop.name}}</span>
                                                    </template>
                                                    <a-icon type="question-circle" style="font-size:12px;color: #AAA;" />
                                                </a-popover>
                                                <div style="float: right;" v-show="prop.attach">
                                                    <a-button-group size="small">
                                                        <a-button :type="currentPropertyEditors[prop.name] == prop.editor ? 'primary' : 'default'" value="default" @click="changePropAttach(prop, prop.editor)">常规</a-button>
                                                        <a-button :type="currentPropertyEditors[prop.name] == attach ? 'primary' : 'default'" v-for="attach in prop.attach" :key="attach" :value="attach" @click="changePropAttach(prop, attach);">{{ propertyEditors[attach].description }}</a-button>
                                                    </a-button-group>
                                                </div>
                                            </span>
                                            <div class="form-design-body-property-item-value">
                                                <div v-show="!prop.attach || !prop.attach.length || (prop.attach && currentPropertyEditors[prop.name] == prop.editor)">
                                                    <template v-for="(control, index2) in propertyEditors[prop.editor].control">
                                                        <component @focus="currentProp = prop"
                                                            :key="index2"
                                                            :ref="control.id"
                                                            :control="currentSelectedControl[0]"
                                                            v-bind="Object.assign({}, prop.attrs, control.attrs)" 
                                                            v-model.lazy="currentSelectedControl[0].control.attrs[prop.name]" 
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

                                                <div v-show="prop.attach && prop.attach.length && currentPropertyEditors[prop.name] != prop.editor">
                                                    <component 
                                                        v-for="(control, index2) in (propertyEditors[currentPropertyEditors[prop.name]] || {control:[]}).control"
                                                        @focus="currentProp = prop"
                                                        :key="index2"
                                                        :ref="control.id"
                                                        :control="currentSelectedControl[0]"
                                                        v-bind="Object.assign({}, prop.attrs, control.attrs)" 
                                                        v-model.lazy="currentSelectedControl[0].control.attrs['__' + prop.name]" 
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
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </a-collapse-panel>
                            </a-collapse>
                        </a-tab-pane>
                        <a-tab-pane key="event">
                            <span slot="tab"><a-icon type="thunderbolt" />事件</span>
                            <a-empty v-show="!currentSelectedControlEventList.length" description="暂无事件" :style="{ marginTop: '100px' }"></a-empty>
                            <div class="form-design-body-property-list">
                                <div class="form-design-body-property-item" v-for="event in currentSelectedControlEventList" :key="event.name">
                                    <span class="form-design-body-property-item-label">
                                        {{event.title}}
                                        <!-- <div style="float: right;">
                                            <a-button-group size="small">
                                                <a-button :type="currentPropertyEditors[prop.name] == prop.editor ? 'primary' : 'default'" value="default" @click="changePropAttach(prop, prop.editor)">常规</a-button>
                                                <a-button :type="currentPropertyEditors[prop.name] == attach ? 'primary' : 'default'" v-for="attach in prop.attach" :key="attach" :value="attach" @click="changePropAttach(prop, attach);">{{ propertyEditors[attach].description }}</a-button>
                                            </a-button-group>
                                        </div> -->
                                    </span>
                                    <div class="form-design-body-property-item-value">
                                        <function-picker v-model.lazy="currentSelectedControl[0].control.events[event.name]" @change="changeEvent" size="small" class="wfull">
                                        </function-picker>
                                    </div>
                                </div>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="config">
                            <span slot="tab"><a-icon type="setting" />表单配置</span>
                            <a-collapse :activeKey="['c0','c1','c2','c3']" :bordered="false">
                                <a-collapse-panel key="c1" header="基础配置" :force-render="true">
                                    <!-- 面板标题 -->
                                    <!-- <label class="form-design-body-property-item">
                                        <span class="form-design-body-property-item-label">面板标题</span>
                                        <div class="form-design-body-property-item-value">
                                            <a-input size="small" placeholder="表单标题" allowClear v-model.lazy="formConfig.canvasTitle" />
                                        </div>
                                    </label> -->
                                    <!-- 表单标题 -->
                                    <label class="form-design-body-property-item">
                                        <span class="form-design-body-property-item-label">表单标题</span>
                                        <div class="form-design-body-property-item-value">
                                            <a-input size="small" placeholder="表单标题" allowClear v-model.lazy="formConfig.formTitle" />
                                        </div>
                                    </label>
                                    <!-- 表单文件名 -->
                                    <label class="form-design-body-property-item">
                                        <span class="form-design-body-property-item-label require">表单名称</span>
                                        <div class="form-design-body-property-item-value">
                                            <a-input size="small" placeholder="表单文件名" allowClear v-model.lazy="formConfig.formName" />
                                        </div>
                                    </label>
                                    <!-- 设备型号 -->
                                    <label class="form-design-body-property-item">
                                        <span class="form-design-body-property-item-label">设备型号</span>
                                        <div class="form-design-body-property-item-value">
                                            <a-select style="width: 100%;" size="small" v-model.lazy="formConfig.deviceId" @change="refresh()">
                                                <div slot="dropdownRender" slot-scope="menu">
                                                    <v-nodes :vnodes="menu" />
                                                    <a-divider style="margin: 4px 0;" />
                                                    <div style="padding: 8px; cursor: pointer;"><a-icon type="plus" /> 新增设备</div>
                                                </div>
                                                <a-select-option v-for="device in Object.values(devices).filter(function(i) { return i.type == currentComponentLibrary.type})" :value="device.code" :key="device.code">{{device.name}}: {{device.width}}×{{device.height}}</a-select-option>
                                            </a-select>
                                        </div>
                                    </label>
                                </a-collapse-panel>
                                <a-collapse-panel key="c2" header="底部按钮配置" :force-render="true">
                                    <!-- 是否显示底部提交区域 -->
                                    <label class="form-design-body-property-item">
                                        <span class="form-design-body-property-item-label">显示底部区域</span>
                                        <div class="form-design-body-property-item-value">
                                            <a-switch checkedChildren="开" unCheckedChildren="关" v-model.lazy="formConfig.footer.isShow" />
                                        </div>
                                    </label>
                                    <!-- 提交按钮文本 -->
                                    <label v-show="formConfig.footer.isShow" class="form-design-body-property-item">
                                        <span class="form-design-body-property-item-label">提交按钮文本</span>
                                        <div class="form-design-body-property-item-value">
                                            <a-input size="small" allowClear v-model.lazy="formConfig.footer.submitButtonText" />
                                        </div>
                                    </label>
                                    <!-- 是否显示取消按钮 -->
                                    <label v-show="formConfig.footer.isShow" class="form-design-body-property-item">
                                        <span class="form-design-body-property-item-label">显示取消按钮</span>
                                        <div class="form-design-body-property-item-value">
                                            <a-switch checkedChildren="开" unCheckedChildren="关" v-model.lazy="formConfig.footer.cancelButton" />
                                        </div>
                                    </label>
                                    <!-- 取消按钮文本 -->
                                    <label v-show="formConfig.footer.isShow && formConfig.footer.cancelButton" class="form-design-body-property-item">
                                        <span class="form-design-body-property-item-label leaf">取消按钮文本</span>
                                        <div class="form-design-body-property-item-value">
                                            <a-input size="small" allowClear v-model.lazy="formConfig.footer.cancelButtonText" />
                                        </div>
                                    </label>
                                </a-collapse-panel>
                            </a-collapse>
                        </a-tab-pane>
                    </a-tabs>
                </li>

                <!-- 属性说明 -->
                <!-- <li class="form-design-body-propertypanel-prop-remark">
                    <strong>{{currentProp && currentProp.name}}</strong>
                    <p>{{currentProp ? (currentProp.remark || currentProp.title) : ''}}</p>
                </li> -->

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

        <!-- 右键菜单 -->
        <a-menu 
            v-show="contextMenuConfig.visible" 
            class="form-design-context-menu" 
            :style="{
                top: contextMenuConfig.x,
                left: contextMenuConfig.y
            }" 
            mode="vertical" 
            @click="handleClick">
            <a-menu-item key="1">
                <a-icon type="mail" />菜单A
            </a-menu-item>
            <a-menu-item key="2">
                <a-icon type="calendar" />菜单B
            </a-menu-item>
        </a-menu>

        <!-- JSON -->
        <a-drawer :width="800" title="导出JSON" wrap-class-name="form-json-editor-drawer" @close="jsonEditorVisible = false" :visible="jsonEditorVisible">
            <code-editor style="height: calc(100vh - 110px);" class="json-editor page-config-editor" language="json" v-model="editorJson">
            </code-editor>
            <template #footer>
                <a-button @click="editorJson = generateJSON()" type="link">重新生成</a-button>
                <a-button @click="exportJSONFile()" type="primary">导出JSON文件</a-button>
            </template>
        </a-drawer>

        <!-- 接口配置 -->
        <a-modal :footer="null" :width="1200" title="接口配置" :maskClosable="false" :centered="true" wrap-class-name="form-json-editor-drawer" v-model="apiEditorVisible">
            <api-design />
        </a-modal>

        <!-- 编辑Vue代码 -->
        <a-modal :width="1000" :maskClosable="false" :centered="true" title="Vue数据配置" wrap-class-name="form-json-editor-drawer" v-model="scriptEditorVisible">
            <code-editor ref="formVariable" class="page-config-editor" language="javascript" style="height: 500px;" v-model="editorScript">
            </code-editor>
            <div class="bottom-btn-list" slot="footer">
                <a-button @click="generateFormScript()" type="link">重新生成</a-button>
                <a-button @click="saveFormScript()" type="primary">保存</a-button>
            </div>
        </a-modal>

        <!-- 编辑页面样式 -->
        <a-modal :width="1000" :maskClosable="false" :centered="true" title="页面样式（SCSS）" wrap-class-name="form-json-editor-drawer" v-model="styleEditorVisible">
            <code-editor class="page-config-editor" language="scss" style="height: 500px;" v-model="editorStyle">
            </code-editor>
            <div class="bottom-btn-list" slot="footer">
                <a-button @click="saveFormStyle()" type="primary">保存</a-button>
            </div>
        </a-modal>

        <!-- 选择历史表单 -->
        <a-modal :width="1000" :bodyStyle="{ 'padding-top': '0px' }" title="选择表单" :footer="null" wrap-class-name="form-json-editor-drawer" v-model="formSelectModalVisible" @cancel="formSelectModalVisible = false;">
            
            <a-tabs>
                <a-tab-pane :key="category.id" v-for="category in categoryList">
                    <span slot="tab">
                        <a-icon type="file" />
                        {{ category.name }}
                    </span>

                    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :dataSource="formList.filter(item => item.categoryId == category.id)">
                        <a-list-item slot="renderItem" slot-scope="item">
                            <a-card hoverable style="width: 300px">
                                <img alt="预览图" @click="selectForm(item)" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" slot="cover" />
                                <template class="ant-card-actions" slot="actions">
                                    <!-- <a-icon type="setting" /> -->
                                    <a-tooltip placement="bottom" @click="selectForm(item)">
                                        <template slot="title">编辑表单</template>
                                        <a-icon type="form" />
                                    </a-tooltip>
                                    <a-tooltip placement="bottom" @click="removeForm(item)">
                                        <template slot="title">删除表单</template>
                                        <a-icon type="delete" />
                                    </a-tooltip>
                                    <a-icon type="ellipsis" />
                                </template>
                                <a-card-meta :title="item.name" :description="item.description" @click="selectForm(item)">
                                    <a-avatar slot="avatar" src="/img/avatar/geji.png" />
                                </a-card-meta>
                            </a-card>
                        </a-list-item>
                    </a-list>
                
                </a-tab-pane>
            </a-tabs>
        </a-modal>

        <!-- 选择模板 -->
        <a-modal :width="1000" :bodyStyle="{ 'padding-top': '0px' }" title="选择模板" :footer="null" wrap-class-name="form-json-editor-drawer" v-model="templateSelectModalVisible" @cancel="templateSelectModalVisible = false;">
            
            <a-tabs defaultActiveKey="pc">
                <a-tab-pane :key="tab.code" v-for="tab in [{ code: 'pc', title: 'PC端', icon: 'laptop' }, { code: 'mobile', title: '移动端', icon: 'mobile' }]">
                    <span slot="tab">
                        <a-icon :type="tab.icon" />
                        {{ tab.title }}模板
                    </span>

                    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :dataSource="formTemplates.filter(i => i.deviceType == tab.code)">
                        <a-list-item slot="renderItem" slot-scope="item">
                            <a-card hoverable style="width: 300px">
                                <img alt="预览图" @click="selectTemplate(item)" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" slot="cover" />
                                <template class="ant-card-actions" slot="actions">
                                    <!-- <a-icon type="setting" /> -->
                                    <a-tooltip placement="bottomLeft">
                                        <template slot="title">编辑模板</template>
                                        <a-icon type="form" />
                                    </a-tooltip>
                                    <a-icon type="ellipsis" />
                                </template>
                                <a-card-meta :title="item.title" :description="item.description" @click="selectTemplate(item)">
                                    <a-avatar slot="avatar" src="/img/avatar/geji.png" />
                                </a-card-meta>
                            </a-card>
                        </a-list-item>
                    </a-list>
                
                </a-tab-pane>
            </a-tabs>
        </a-modal>

        <!-- 预览界面 -->
        <a-modal :wrap-class-name="`preview-modal ${currentComponentLibrary.type} ${currentComponentLibrary.code}`" 
            :footer="null" 
            :centered="true" 
            :width="devices[formConfig.deviceId].width + 40" 
            :height="devices[formConfig.deviceId].height" 
            title="预览界面" 
            @cancel="previewVisible = false" 
            :visible="previewVisible" 
            :destroyOnClose="true"
            :style="{ marginLeft: '-330px' }"
        >
            <form-design-canvas 
                ref="controlCanvas"
                :preview="true"
                :formConfig="formConfig"
                :devices="devices"
                :componentLibraryList="componentLibraryList"
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
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
import { State, Getter, Mutation } from 'vuex-class';
import FormDesign from '@/@types/form-design';
import { initPropertyEditors } from '@/propertyEditor';
import { Enum } from '@/config/enum';
import { initVantControls } from '@/formControls_vant';
import { initUniControls } from '@/formControls_uni';
import { initAntDesignControls, formItemProps, columnItemProps, flexItemProps } from '@/formControls_antd.tsx';
import { initFormControlGroups } from '@/formControlGroups';
import { initRemoteDevices } from '@/formDevices';
import { cloneForce } from '@/lib/clone/index';
import { Base64 } from 'js-base64';
import { componentLibrarys } from '@/formLibrarys.ts';
import formTemplate from '@/formTemplate';
import { flatControls, fillPropertys, variableVueScript, exportTemplate, isFormChild, isFlexChild } from '@/tools/formCommon';

import Icon from 'vant/lib/icon';
import 'vant/lib/index.css';

Vue.use(Icon);

/** 拖拽的节点 */
let dragDom: any;

/** 所有组件 */
const _vantControls: Array<FormDesign.FormControl> = initVantControls();
const _antdControls: Array<FormDesign.FormControl> = initAntDesignControls();
const _uniControls: Array<FormDesign.FormControl> = initUniControls();

const _controlGroups: Array<FormDesign.FormControlGroup> = initFormControlGroups();

@Component({
    components: {
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        }
    }
})
export default class FormDesigner extends Vue {

    /** JSON编辑器弹出框是否显示 */
    jsonEditorVisible: boolean = false;

    /** 变量编辑器弹出框是否显示 */
    scriptEditorVisible: boolean = false;
    /** 样式编辑器弹出框是否显示 */
    styleEditorVisible: boolean = false;
    /** API编辑器弹出框是否显示 */
    apiEditorVisible: boolean = false;
    /** 模板选择弹出框是否显示 */
    templateSelectModalVisible: boolean = false;
    /** 表单选择弹出框是否显示 */
    formSelectModalVisible: boolean = false;

    /** 大纲展开节点列表 */
    expandedKeys: Array<string> = [];
    /** 大纲搜索文本 */
    searchValue: string = '';
    /** 是否自动展开大纲节点 */
    autoExpandParent: boolean = true;

    /** 分类列表 */
    categoryList: any[] = [];
    /** 表单列表 */
    formList: any[] = [];

    /** 预览界面是否显示 */
    previewVisible: boolean = false;
    /** JSON编辑器的值 */
    editorJson: string = '';
    /** 页面变量编辑器的历史值 */
    editorScriptHistory: string = '';
    /** 页面变量编辑器的值 */
    editorScript: string = '';
    /** 页面样式编辑器的值 */
    editorStyle: string = '';

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

    /** 组件库列表 */
    componentLibraryList: Array<FormDesign.ComponentLibrary> = componentLibrarys;

    /** 表单主题清单 */
    formThemes: Array<FormDesign.FormTheme> = [
        { code: 'default', title: '默认主题' },
        { code: 'red', title: '红色主题' },
    ];

    /** 表单模板清单 */
    formTemplates: Array<FormDesign.FormTemplate> = formTemplate();

    /** 当前组件库 */
    get currentComponentLibrary(): FormDesign.ComponentLibrary {
        return this.componentLibraryList.find(i => i.name == this.formConfig.formComponentLib) || componentLibrarys[0];
    }

    /** 当前控件对应的属性编辑器字典 */
    get currentPropertyEditors(): Record<string, Enum.FormControlPropertyEditor> {
        return this.currentSelectedControl[0].propertyEditors as Record<string, Enum.FormControlPropertyEditor>;
    }

    /** 用于保存的表单Id */
    get formId() {
        return this.$route?.query?.formId || this.formConfig?.id || '';
    }

    /** 演示Vue对象 */
    previewVue: Vue = new Vue();

    /** 当前焦点属性 */
    currentProp: any = {};

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
        id: '',
        formComponentLib: 'ant-design',
        canvasTitle: '主页',
        formTitle: '测试流程',
        formName: 'TestTask',
        width: 0,
        height: 0,
        headerHeight: 48,
        controlIndex: 1,
        deviceId: 'xsmallpc',
        formTheme: 'default',
        footer: {
            isShow: true,
            submitButtonText: '提交',
            cancelButton: false,
            cancelButtonText: '取消'
        }
    };

    /** 设备类型列表 */
    devices: Record<string, FormDesign.RemoteDevice> = initRemoteDevices();

    /** 历史表单 */
    historyForm: Array<{ formConfig: FormDesign.FormConfig, controls: FormDesign.FormPanel }> = [];

    /** Vue对象 */
    @Getter('getFormScript') formScript!: string;

    /** Vue对象代码 */
    @Getter('getFormScriptCode') formScriptCode!: string;

    /** 用户账号 */
    @Getter('getUserId') getUserId!: string;

    /** 企业编号 */
    @Getter('getEnterpriseId') getEnterpriseId!: string;

    /** 更新Vue代码 */
    @Mutation('setFormScript') setFormScript!: (script: string) => void;
    
    /** 画布组件列表 */
    @Provide() controlList: Array<FormDesign.FormControl> = [];

    /** 画布组件树 */
    @Provide() panel: FormDesign.FormPanel = {
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
    /** 当前选择控件所带来的控件事件列表 */
    currentSelectedControlEventList: Array<FormDesign.FormFunction> = [];
    /** 当前选择控件所带来的控件属性哈希表 */
    currentSelectedControlPropertyMap: Array<FormDesign.FormControlProperty> = [];

    /** 右键菜单配置 */
    contextMenuConfig = {
        visible: false,
        x: '0px',
        y: '0px'
    }

    /** 设计器事件总线 */
    @Provide() bus: Vue = new Vue();

    /** 属性编辑器库 */
    @Provide() propertyEditors: Record<string, FormDesign.PropertyEditor> = initPropertyEditors();

    /** 组件库组件列表 */
    get componentList() {
        switch (this.formConfig.formComponentLib) {
            case 'vant': return _vantControls;
            case 'ant-design': return _antdControls;
            case 'uni': return _uniControls;
            default: return [];
        };
    }

    /** 组件库 */
    get controlGroups() {
        return (_controlGroups || []).map(i => ({
            ...i,
            controls: ({
                'vant': _vantControls.filter(o => o.type == i.name),
                'uni': _uniControls.filter(o => o.type == i.name),
                'ant-design': _antdControls.filter(o => o.type == i.name)
            })[this.formConfig.formComponentLib]
        }));
    }

    /** 分组画布组件列表 */
    get controlListByGroup() {
        return (_controlGroups || []).map(i => ({
            ...i,
            controls: this.controlList.filter(o => o.type == i.name)
        })).filter(i => i.controls.length);
    }

    /** 切换右侧主Tabs */
    changeMainPropertyPanel(e) {
        this.bus.$emit('prop_change');
    }

    /** 搜索组件大纲 */
    onSearchOutline(e) {
        Object.assign(this, {
            expandedKeys: this.controlList.filter((item, i, self) => item.name.indexOf(e)),
            searchValue: e.target.value,
            autoExpandParent: true,
        });
    }

    /** 大纲节点展开 */
    onOutlineExpand(expandedKeys) {
        this.expandedKeys = expandedKeys;
        this.autoExpandParent = false;
    }

    /** 打开右键菜单 */
    contextMenuOpen(e) {
        this.contextMenuConfig.visible = true;
        this.contextMenuConfig.x = e.offsetWidth + 'px';
        this.contextMenuConfig.y = e.offsetHeight + 'px';
    }

    handleClick(e) {
        console.log(e);
    }

    /** 切换当前选择的控件 */
    changeSelectedFormControl(formControlList) {
        this.bus.$emit('prop_change');
        this.currentSelectedControl = formControlList;
        
        if (formControlList?.length) {
            this.currentSelectedFirstControlId = formControlList[0].id;
            this.refreshControlTools();

            this.currentSelectedControlPropertyMap = Object.assign.apply({}, [{}].concat(formControlList[0].propertys.map(i => ({[i.name]: i}))) as [object, ...any[]]);
            this.currentSelectedControlPropertyGroups = Object.entries(Enum.FormControlPropertyGroup).map(([key, value]) => {

                let _props: Array<FormDesign.FormControlProperty> = [];
                let _isFormChild = isFormChild(this.currentSelectedFirstControlId, this.panel.children);
                let _isFlexChild = isFlexChild(this.currentSelectedFirstControlId, this.panel.children);

                if (key == 'flex' && _isFlexChild) {
                    _props = flexItemProps;
                } else if (key == 'form' && formControlList[0].isFormItem && !_isFormChild) {
                    _props = formItemProps;
                } else if (key == 'childform' && formControlList[0].isFormItem && _isFormChild) {
                    _props = columnItemProps;
                } else {
                    _props = formControlList[0].propertys.filter(i => i.group == value);
                }

                return {
                    title: value,
                    propertys: _props
                };
            }).filter(i => i.propertys.length);

            this.currentSelectedControlEventList = formControlList?.length ? formControlList[0]?.events : [];
        } else {
            this.currentProp = {};
            this.currentSelectedFirstControlId = undefined;
            this.currentSelectedControlPropertyMap = [];
            this.currentSelectedControlPropertyGroups = [];
            this.currentSelectedControlEventList = [];
        }
    }

    /** 重绘工具栏（调整位置） */
    refreshControlTools() {
        if (this.currentSelectedControl.length) {

            if (this.currentSelectedControl[0].type == 'hidden') {

            } else {

                let _el = document.querySelector(`[control-id="${this.currentSelectedControl[0].id}"]`) as HTMLElement;
                let rect = _el.getBoundingClientRect();
                let bottom = document.body.offsetHeight - rect.bottom;
                let _isMobile = this.currentComponentLibrary.type == 'mobile';
                if (_isMobile) {
                    if (bottom > 200) {
                        this.toolsEl.style.transform = `translateY(${rect.top + this.canvasEl.scrollTop - 180}px)`;
                    } else if (rect.top > 200) {
                        this.toolsEl.style.transform = `translateY(${rect.bottom + this.canvasEl.scrollTop - 380}px)`;
                    }
                } else {
                    let _width = _el.offsetWidth;
                    let _height = _el.offsetHeight;
                    if (bottom > 200) {
                        this.toolsEl.style.transform = `translate(${ -40 }px, ${rect.top + this.canvasEl.scrollTop + _height - 40}px)`;
                    } else if (rect.top > 200) {
                        this.toolsEl.style.transform = `translateY(-100px, ${rect.bottom + this.canvasEl.scrollTop - 380}px)`;
                    }
                }
            }
        }
    }

    changeSelectedFormControlBySelect(e) {
        if (e) {
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
        if (prop) {
            let _value = e.target ? e.target.value : e;
            control[0].control.propAttrs[prop.name] = _value;
            if (prop?.change) {
                return prop.change.call(this, prop, propMap, control, _value, (this.$refs.controlCanvas as Vue).$refs);
            }
        }
    }

    /** 改变属性 */
    changeProperty(e, property) {
    }

    /** 改变事件 */
    changeEvent(e, property) {

    }

    get controlCanvas(): any {
        return this.$refs.controlCanvas;
    }

    /** 拖拽已存在的组件 */
    startDragFormControl(e, control: FormDesign.FormControl) {
        this.dragConfig.targetFormControlId = control.id;
        let _el: HTMLElement = document.createElement('div');
        _el.classList.add('form-design-drag-control');
        _el.innerHTML = control?.title || '';
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
            
            if (_y > 0 && _x > 0 && _x < this.controlCanvas.formConfig.width) {

                if (this.dragConfig.control.type == 'hidden') {

                    this.dragConfig.isDragArea = true;
                    this.dragConfig.insertControlId = '';

                } else {
                    
                    this.dragConfig.isDragArea = true;
                    let _height = 0;
                    /** 计算应该把组件插入到什么地方 */
                    let _currentHeight = 0;
                    let index = 0;
                    for (; index < this.panel.children.length; index++) {
                        let _id = this.panel.children[index].id;
                        let _control = this.getControlById(_id);
                        _height = (this.canvasPanelEl.querySelector(`[control-id=${_id}]`) as HTMLElement).offsetHeight || 0;
                        
                        if (this.dragConfig.control.type != 'layout' && _control.type === 'layout' && _id != this.dragConfig.targetFormControlId) {
                            
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

                                // 计算父组件下单未插入到子组件中的情况
                                if (_y >= _currentHeight - _height / 2 && _y <= _currentHeight + _height / 2) {
                                    this.dragConfig.insertControlId = _id;
                                    _currentHeight += _height;
                                    break;
                                } else if (_y > _currentHeight + _height / 2 && index < this.panel.children.length - 1) {
                                    this.dragConfig.insertControlId = this.panel.children[index + 1].id;
                                }

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

                }
                
            } else {
                this.dragConfig.isDragArea = false;
                this.controlCanvas.changeControlCursor(false);
            }
        }
    }

    /** 拖拽结束 */
    dragUp(e) {
        if (this.dragConfig.isDrag || this.dragConfig.isPreDrag) {
            document.body.removeChild(dragDom);
            dragDom = null;

            /** 放置控件 */
            if (this.dragConfig.isDragArea) {
                let _newControl: FormDesign.FormControl = cloneForce({
                    ...this.componentList.find(i => i.name == this.dragConfig.control.name),
                    height: 0
                });

                // 新控件和老控件以不同方式处理Id
                if (!this.dragConfig.targetFormControlId) {
                    _newControl.id = this.$common.createModelId(10);
                } else {
                    _newControl.id = this.dragConfig.targetFormControlId;
                }
                _newControl.control.attrs.id = _newControl.id;
                _newControl.control.attrs.remark = (_newControl.autoPrefix || '') + this.formConfig.controlIndex++;
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
                    if (this.dragConfig.insertControlSlotIndex !== undefined) {
                        ((this.panel.children.find(i => i.id == this.dragConfig.insertControlId) as FormDesign.FormControl).children as Array<Array<FormDesign.FormControl>>)[this.dragConfig.insertControlSlotIndex].splice(_insertIndex, 0, _newControl);
                    } else {
                        this.panel.children.splice(_insertIndex, 0, _newControl);
                    }
                    this.controlList.push(_newControl);
                }

                this.$nextTick(() => {
                    if (_newControl.type == 'hidden') {
                        this.changeSelectedFormControl([ _newControl ]);
                    }
                });
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

    /** 根据Id获取组件 */
    getControlById(id: string): FormDesign.FormControl {
        return this.controlList.find(i => i.id == id) as FormDesign.FormControl;
    }

    mounted() {
        this.toolsEl = document.querySelector('.form-control-tools');
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
                    let render = new FileReader();
                    render.readAsDataURL(files[0]);
                    if (files[0].type != 'application/json') {
                        _importJson.value = '';
                        this.$message.error('JSON文件格式不正确。');
                        return;
                    }
                    if (files[0].size > 204800) {
                        _importJson.value = '';
                        this.$message.error('JSON文件过大。');
                        return;
                    }
                    render.onload = (e: any) => {
                        let _file = Base64.decode(e.target.result.replace(/data:.*?;base64,/g, ''));
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

                        this.loadConfig(config);
                        _importJson.value = '';
                    }
                }
        });
    }

    created() {
        
        document.body.addEventListener('mousemove', this.dragMove);
        document.body.addEventListener('mouseup', this.dragUp);

        this.editorScript = this.formScriptCode;
        this.$root.login();


        if (!localStorage.getItem('HistoryDesignForm')) localStorage.setItem('HistoryDesignForm', '[]');
        else {
            let _formNames = JSON.parse(localStorage.getItem('HistoryDesignForm') as string);
            let _forms: Array<any> = [];
            _formNames.forEach(i => {
                let _str = localStorage.getItem(`HistoryDesignForm_${i}`) as string;
                if (_str && _str.length > 10) {
                    _forms.push(JSON.parse(_str));
                }
            })
            this.historyForm = _forms;
        }

        let _autoSave = () => {
            setTimeout(() => {
                this.$message.success('已自动保存快照。');
                this.save('TempDesignForm');
                _autoSave();
            }, 600000);
        }
        _autoSave();

        this.bus.$on('control_handle', (eventName, params) => {
            this[eventName].apply(this, params);
        });

        if (this.$route.query.formId) {
            this.$common.get('Form/GetForm', {
                id: this.$route.query.formId
            }, {}, this.$api).then(form => {
                this.initFormByForm(form);
            })
        } else {
            const hide: any = this.$message.loading('历史表单加载中...', 0);
            Promise.all([
                this.$common.get('Category/GetCategoryList', {}, {}, this.$api),
                this.$common.get('Form/GetFormList', {}, {}, this.$api)
            ]).then(([categoryList, formList]) => {
                this.categoryList = categoryList;
                this.formList = formList;
                setTimeout(hide, 0);
                setTimeout(d => {
                    this.$message.success('历史表单加载完毕。');
                }, 200);

                if (formList.length) {
                    this.formSelectModalVisible = true;
                }
            });
        }
        
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
        const ignoreKeys = [
            'propertys', 'height'
        ];
        return JSON.stringify(_exportJson, (key, value) => ignoreKeys.includes(key) ? undefined : value, '    ');
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
            _newControl.control.attrs.id = _newControl.id;
            _newControl.control.attrs.remark = (_newControl.autoPrefix || '') + this.formConfig.controlIndex++;
            panel.children.splice(slotIndex + 1, 0, _newControl);
            this.controlList.splice(_index + 1, 0, _newControl);
        }
        
        this.$nextTick(() => this.controlCanvas.refresh());
    }
    
    /** 控件删除 */
    controlRemove(e, panel: FormDesign.FormPanel, slotIndex: number, index: number) {
        if (index != undefined) {
            let _id = panel.children[slotIndex][index].id;
            let _controlListIndex = this.controlList.findIndex(i => i.id == _id);
            this.controlList.splice(_controlListIndex, 1);
            // @ts-ignore
            this.$set(panel.children, slotIndex, panel.children[slotIndex].filter((i, controlIndex) => index !== controlIndex));
        } else {
            let _id = panel.children[slotIndex].id;
            let _controlListIndex = this.controlList.findIndex(i => i.id == _id);
            this.controlList.splice(_controlListIndex, 1);
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

    /** 点击按钮重新生成页面变量 */
    generateFormScript() {
        if(this.controlList.filter(i => i.control.attrs.model).length) {
            this.$confirm({
                title: '警告',
                content: '将清空现有变量，是否根据控件重新生成变量表？',
                okType: 'danger',
                icon: 'warning',
                onOk: () => {
                    this.resetFormScript();
                },
                onCancel: () => {
                },
            });
        } else {
            this.$message.warning('当前尚无绑定变量');
        }
    }

    /** 重新生成页面变量 */
    resetFormScript() {
        // let _formScript = this.controlList.filter(i => i.control.attrs.model).map(i => ({
        //     keyword: 'let',
        //     name: i.control.attrs.model,
        //     type: (i.propertys.find(prop => prop.name == 'model') || { type: 'any' }).type,
        //     remark: i.control.attrs.remark,
        // })) as Array<FormDesign.FormVariable>;
        // this.setFormScript(_formScript);

        // this.editorScript = _formScript.map(i => `${i.remark ? '/** ' +  i.remark + ' */\n' : ''}${i.keyword} ${i.name}: ${i.type};`).join('\n\n');
    }

    /** 保存Vue代码 */
    saveFormScript() {
        this.setFormScript(this.editorScript);

        this.previewVue = new Vue(Function(this.editorScript)());

        this.$message.success('Vue配置已保存');
        this.scriptEditorVisible = false;
        this.editorScriptHistory = this.editorScript;
    }

    /** 保存页面样式 */
    saveFormStyle() {
        Sass.compile(this.editorStyle, result => {
            document.querySelector('[form-style]')?.remove();
            let style = document.createElement('style');
            style.setAttribute('form-style', '');
            style.type = 'text/css';
            //@ts-ignore
            style.innerHTML = result.text;
            //@ts-ignore
            document.querySelector('head').appendChild(style);
            this.$message.success('页面样式已保存');
        });
        this.styleEditorVisible = false;
    }

    /** 关闭页面变量编辑框 */
    cancelFormScript() {
        if (this.editorScriptHistory != this.editorScript) {
            this.$confirm({
                title: '警告',
                content: '是否放弃保存代码？',
                onOk: () => {
                    this.editorScript = this.editorScriptHistory;
                    this.scriptEditorVisible = false;
                },
                onCancel: () => {
                }
            });
        }
    }

    selectForm(form) {
        this.initFormByForm(form);
    }

    removeForm(form) {
        this.$confirm({
            title: '警告',
            content: `是否确认删除${form.name}？`,
            okType: 'danger',
            icon: 'warning',
            onOk: () => {
                let _index = this.formList.findIndex(i => i.id == form.id);
                this.$common.post('Form/DeleteForm', { id: form.id }, {
                }, this.$api).then(d => {
                    this.formList.splice(_index, 1);
                });
            },
            onCancel: () => {
            },
        });
    }

    /** 选择模板 */
    selectTemplate(template: FormDesign.FormTemplate) {
        this.$confirm({
            title: '警告',
            content: '将覆盖现有表单，是否确认新建表单？',
            okType: 'danger',
            icon: 'warning',
            onOk: () => {
                this.initFormByTemplate(template);
            },
            onCancel: () => {
            },
        });
    }

    /** 初始化表单 */
    initFormByForm(form: any) {
        let _form = JSON.parse(form.form);
        console.log(_form);
        this.changeSelectedFormControl([  ]);
        let _deviceId = _form.deviceType == 'pc' ? 'xsmallpc' : 'iphone678';
        this.formConfig = {
            id: '',
            canvasTitle: '主页',
            formTitle: '测试流程',
            formName: 'TestTask',
            width: this.devices[_deviceId].width,
            height: this.devices[_deviceId].height,
            headerHeight: 48,
            deviceId: _deviceId,
            footer: {
                isShow: true,
                submitButtonText: '提交',
                cancelButton: false,
                cancelButtonText: '取消'
            },
            formComponentLib: _form.library,
            controlIndex: 1,
            formTheme: 'default'
        };

        this.$set(this.panel, 'name', 'main');
        this.$set(this.panel, 'direction', 'row');

        this.formConfig = _form.formConfig;

        let _controlTree = fillPropertys(_form.controls.children, _form.formConfig.formComponentLib);

        this.$set(this.panel, 'children', _controlTree);

        this.controlList = flatControls(_controlTree);

        this.currentSelectedControl = [];
        this.currentSelectedFirstControlId = '';
        this.currentSelectedControlPropertyGroups = [];
        this.currentSelectedControlPropertyMap = [];

        this.editorScript = _form.formScript || '';
        this.editorStyle = _form.formStyle || '';

        this.saveFormScript();
        this.saveFormStyle();

        this.$nextTick(() => {
            this.toolsEl = document.querySelector('.form-control-tools');
            this.canvasPanelEl = document.querySelector('.form-design-canvas-mainpanel');
            this.canvasEl = document.querySelector('.form-design-body-canvas');
            this.controlCanvas.refresh();
            this.refresh();
            this.formSelectModalVisible = false;
        });
    }

    /** 初始化表单 */
    initFormByTemplate(template: FormDesign.FormTemplate) {
        console.log(template);
        this.changeSelectedFormControl([  ]);
        let _deviceId = template.deviceType == 'pc' ? 'xsmallpc' : 'iphone678';
        this.formConfig = {
            id: '',
            canvasTitle: '主页',
            formTitle: '测试流程',
            formName: 'TestTask',
            width: this.devices[_deviceId].width,
            height: this.devices[_deviceId].height,
            headerHeight: 48,
            deviceId: _deviceId,
            footer: {
                isShow: true,
                submitButtonText: '提交',
                cancelButton: false,
                cancelButtonText: '取消'
            },
            formComponentLib: template.library,
            controlIndex: 1,
            formTheme: 'default'
        };

        this.$set(this.panel, 'name', 'main');
        this.$set(this.panel, 'direction', 'row');

        let _controlTree = fillPropertys(template.controls, this.formConfig.formComponentLib);

        this.$set(this.panel, 'children', _controlTree);

        this.controlList = flatControls(_controlTree);

        this.currentSelectedControl = [];
        this.currentSelectedFirstControlId = '';
        this.currentSelectedControlPropertyGroups = [];
        this.currentSelectedControlPropertyMap = [];

        this.editorScript = template.script || '';
        this.editorStyle = template.style || '';

        this.saveFormScript();
        this.saveFormStyle();

        this.$nextTick(() => {
            this.toolsEl = document.querySelector('.form-control-tools');
            this.canvasPanelEl = document.querySelector('.form-design-canvas-mainpanel');
            this.canvasEl = document.querySelector('.form-design-body-canvas');
            this.controlCanvas.refresh();
            this.refresh();
            this.templateSelectModalVisible = false;
        });
    }

    /** 手动保存表单 */
    onSaveForm() {
        // let _historyDesignForm: Array<string> = JSON.parse(localStorage.getItem('HistoryDesignForm') || '[]');
        // if (!_historyDesignForm.includes(this.formConfig.formName)) {
        //     _historyDesignForm.push(this.formConfig.formName);
        //     localStorage.setItem('HistoryDesignForm', JSON.stringify(_historyDesignForm));
        //     this.save(`HistoryDesignForm_${this.formConfig.formName}`);
        // } else {
        //     this.$confirm({
        //         title: '警告',
        //         content: '已存在同名表单存档，是否覆盖？',
        //         okType: 'danger',
        //         icon: 'warning',
        //         onOk: () => {
        //             this.save(`HistoryDesignForm_${this.formConfig.formName}`);
        //         },
        //         onCancel: () => {
        //         },
        //     });
        // }

        this.save(`HistoryDesignForm_${this.formConfig.formName}`);
    }

    save(name) {
        this.$common.post(this.formId ? 'Form/EditForm' : 'Form/AddForm', {
            id: this.formId,
            categoryId: '731c7871-1a34-48fe-9180-7c7da8b28fd8', //'44756df3-7380-4813-bb6e-0fb0b19713dc',
            name: this.formConfig.formName,
            title: this.formConfig.formTitle,
            Form: JSON.stringify({
                formConfig: this.formConfig,
                controls: this.panel,
                formScript: this.formScriptCode,
                form: exportTemplate(this)
            }),
            createUserId: ''
        }, {}, this.$api).then(id => {
            console.log('生成表单id', id);
            this.formConfig.id = id;
        });
    }

    uploadForm() {

    }

    /** 切换属性的Attach */
    changePropAttach(prop, editor) {
        let _index = this.controlList.findIndex(i => i.id == this.currentSelectedControl[0].id);
        if (_index >= 0) {
            let _propIndex = this.controlList[_index].propertys.findIndex(i => i.name == prop.name);
            this.currentPropertyEditors[prop.name] = editor;

            let _currentControl = this.currentSelectedControl[0];

            if (_currentControl?.propertyEditors) this.$set(_currentControl.propertyEditors, prop.name, editor);
            _currentControl.control.attrs[prop.name] = prop.default;
            this.$set(_currentControl.control.attrs, '__' + prop.name, '');
        }
    }

    /** 页面重绘 */
    refresh() {
        this.canvasEl = document.querySelector('.form-design-body-canvas');
        this.canvasPanelEl = document.querySelector('.form-design-canvas-mainpanel');
        let { y, x } = this.canvasPanelEl.getBoundingClientRect();
        this.canvasLocation.y = this.canvasPanelEl.scrollTop - y;
        this.canvasLocation.x = this.canvasPanelEl.scrollLeft - x;
    }

    /** 清空历史表单 */
    clearHistoryForm() {
        let _historyDesignForm = localStorage.getItem('HistoryDesignForm');
        if (_historyDesignForm != null) {
            (JSON.parse(_historyDesignForm) as Array<string>).forEach((i: string) => {
                localStorage.removeItem(`HistoryDesignForm_${i}`);
            });
        }
        localStorage.setItem('HistoryDesignForm', '[]');
    }

    /** 选择历史表单 */
    selectHistoryForm(item) {
        this.$confirm({
            title: '警告',
            content: `将销毁现有表单，是否确认使用'${item.formConfig.formTitle}'？`,
            okType: 'danger',
            icon: 'warning',
            onOk: () => {
                this.loadConfig(item);
            },
            onCancel: () => {
            },
        });
    }

    /** 选择主题 */
    selectTheme(theme: FormDesign.FormTheme) {
        this.formConfig.formTheme = theme.code;
        this.$setTheme(theme.code);
    }

    /** 导入功能 */
    loadConfig(config: { formConfig: FormDesign.FormConfig, controls: FormDesign.FormPanel }) {
        this.formConfig = config.formConfig;

        /** 用于处理controlList的回调函数 */
        let _controlList: Array<FormDesign.FormControl> = [];
        const _cb = (parentNode) => {
            _controlList.push(parentNode);
            if (parentNode.children?.length) {
                parentNode.children.forEach(_cb);
            }
        };
        config.controls.children.forEach(_cb);

        /** 包括导入，需要单独处理 controlList */
        this.controlList = _controlList;
        this.panel = config.controls;

        this.currentSelectedControl = [];
        this.currentSelectedFirstControlId = '';
        this.currentSelectedControlPropertyGroups = [];
        this.currentSelectedControlPropertyMap = [];
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
    ${ this.formConfig.footer.cancelButton ? '/** 取消流程 */ cancelForm() {}' : '' }

    /** 提交流程 */
    submitForm() {
        Toast.loading({ mask: true, message: '提交中' });
    }
}
<\/script>

<style lang="scss" scoped>
    .page-${this.formConfig.formName} {
        
    }
</style>`;

        this.$common.downLoadFile(`${this.formConfig.formName}_${new Date().format('yyyy-MM-dd')}.vue`, _vueTxt);
    }
}
</script>