import FormDesign from '@/@types/form-design';
import { Enum } from '@/config/enum';

let basicProps: Array<FormDesign.FormControlProperty> = [
    {
        name: 'visible', title: '是否显示', default: true,
        group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean,
        attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
        remark: '是否在界面上显示。'
    }, 
];

/** 表格列字段相关属性 */
export let columnItemProps: Array<FormDesign.FormControlProperty> = [
    {
        name: 'title', title: '列标题', default: '标签',
        group: Enum.FormControlPropertyGroup.childform, editor: Enum.FormControlPropertyEditor.singerLine,
        remark: '表格列头部显示的文字标题。'
    }, {
        name: 'onlyText', title: '仅文本', default: false,
        group: Enum.FormControlPropertyGroup.childform, editor: Enum.FormControlPropertyEditor.boolean,
        remark: '在表格内部是否仅以文本方式呈现数据。'
    }, {
        name: 'width', title: '列宽度', 
        group: Enum.FormControlPropertyGroup.childform, editor: Enum.FormControlPropertyEditor.pixel,
    }, {
        name: 'fixed', title: '是否冻结', default: false,
        group: Enum.FormControlPropertyGroup.childform, editor: Enum.FormControlPropertyEditor.boolean
    }, {
        name: 'dataIndex', title: '字段名', default: '',
        group: Enum.FormControlPropertyGroup.childform, editor: Enum.FormControlPropertyEditor.singerLine,
    }, {
        name: 'sorter', title: '允许排序', default: false,
        group: Enum.FormControlPropertyGroup.childform, editor: Enum.FormControlPropertyEditor.boolean
    }
];

/** 表单项相关属性 */
export let formItemProps: Array<FormDesign.FormControlProperty> = [
    {
        name: 'colon', title: '是否显示冒号', default: true,
        group: Enum.FormControlPropertyGroup.form, editor: Enum.FormControlPropertyEditor.boolean,
        remark: '配合 label 属性使用，表示是否显示 label 后面的冒号。'
    }, {
        name: 'extra', title: '额外提示信息', default: '',
        group: Enum.FormControlPropertyGroup.form, editor: Enum.FormControlPropertyEditor.multiLine,
        remark: '额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。'
    }, {
        name: 'help', title: '提示信息', default: '',
        group: Enum.FormControlPropertyGroup.form, editor: Enum.FormControlPropertyEditor.singerLine,
        remark: '提示信息，如不设置，则会根据校验规则自动生成。'
    }, {
        name: 'label', title: '标签文本', default: '标签',
        group: Enum.FormControlPropertyGroup.form, editor: Enum.FormControlPropertyEditor.singerLine,
        remark: '控件左侧标签文本。'
    }, {
        name: 'labelSpan', title: '标签占用列数', default: 5,
        group: Enum.FormControlPropertyGroup.form, editor: Enum.FormControlPropertyEditor.int,
        remark: '左侧标签占用的列数，最大值24。', attrs: { min: 0, max: 24 }
    }, {
        name: 'labelOffset', title: '标签右移列数', default: 1,
        group: Enum.FormControlPropertyGroup.form, editor: Enum.FormControlPropertyEditor.int,
        remark: '左侧标签在左侧填充的空白列数，最大值24。', attrs: { min: 0, max: 24 }
    }, {
        name: 'wrapperSpan', title: '内容占用列数', default: 18,
        group: Enum.FormControlPropertyGroup.form, editor: Enum.FormControlPropertyEditor.int,
        remark: '右侧控件占用的列数，最大值24。', attrs: { min: 0, max: 24 }
    }, {
        name: 'wrapperOffset', title: '内容右移列数', default: 0,
        group: Enum.FormControlPropertyGroup.form, editor: Enum.FormControlPropertyEditor.int,
        remark: '右侧控件在左侧填充的空白列数，最大值24。', attrs: { min: 0, max: 24 }
    }, {
        name: 'required', title: '是否必填', default: false,
        group: Enum.FormControlPropertyGroup.form, editor: Enum.FormControlPropertyEditor.boolean,
        attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
        remark: '是否必填，如不设置，则会根据校验规则自动生成。'
    }
];

let formControls: Array<FormDesign.FormControl> = [

    /**
     * 高级子表单
     */
    {
        id: '',
        control: {
            control: 'antd-form-design-complex-childform',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'complex-childform',
        icon: '',
        title: '高级子表单',
        autoPrefix: 'childform',
        type: Enum.FormControlType.layout,
        children: [ [] ],
        childrenSlot: '.complex-child-form',
        propertys: [
            {
                name: 'bordered', title: '边框', default: false, remark: '是否展示表格的外边框和列边框',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'scrollX', title: '固定宽度', remark: '用于设置表格宽度，如果需要表格具有一定的宽度并且具有横向滚动条时可设置',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel
            }, {
                name: 'scrollY', title: '固定高度', remark: '用于设置表格高度，如果需要表格具有一定的高度并且具有纵向滚动条时可设置',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel
            }, {
                name: 'rowKey', title: '主键', default: 'id',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'dataSource', title: '数据数组', default: [
                    { id: '1', name: '张三', age: 20 },
                    { id: '2', name: '李四', age: 21 },
                    { id: '3', name: '王五', age: 22 },
                ],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.json,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
                attrs: { style: { height: '200px' } }
                // change(prop, propMap, control, value, refs) {
                //     console.log(control);
                //     // propMap['view-data'].visible = value == JSON.parse(value);
                // }
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            { name: '', title: '', remark: '' },
        ]
    }, 

    /**
     * 栅格
     */
    {
        id: '',
        control: {
            control: 'antd-form-design-control-row',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
                type: 'flex'
            }
        },
        name: 'row',
        icon: '',
        title: '栅格',
        type: Enum.FormControlType.layout,
        children: [ [], [] ],
        childrenSlot: '.ant-col',
        propertys: [
            {
                name: 'gutter', title: '列间距', default: 0,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'tag', title: '元素标签', default: 'div', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'justify', title: '水平对齐方式', default: 'start', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '左侧对齐 Start', value: 'start' }, 
                    { title: '居中对齐 Center', value: 'center' }, 
                    { title: '右侧对齐 End', value: 'end' },
                    { title: '完全分散 SpaceAround', value: 'space-around' },
                    { title: '居中分散 SpaceBetween', value: 'space-between' }
                ] }
            }, {
                name: 'align', title: '垂直对齐方式', default: 'top', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '顶部对齐 Top', value: 'top' }, 
                    { title: '居中对齐 Center', value: 'center' }, 
                    { title: '底部对齐 Bottom', value: 'bottom' },
                ] }
            }, {
                name: 'options', title: '子栅格', default: [
                    { span: 12, offset: 0 },
                    { span: 12, offset: 0 },
                ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attrs: { 
                    columns: [
                        { name: 'span', title: '栅格大小', editor: Enum.FormControlPropertyEditor.int, attrs: { max: 24, min: 0 } },
                        { name: 'offset', title: '左位移', editor: Enum.FormControlPropertyEditor.int, attrs: { max: 24, min: 0 } },
                    ],
                    onRemove: (value, index, control) => control.children[index].length == 0,
                    onChange(control, index, removeCount, insertCount) { 
                        [].splice.apply(control.children, [index, removeCount].concat(new Array(insertCount).fill([])) as [number, number, ...never[]])
                    }
                }
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 标签页
     */
    {
        id: '',
        control: {
            control: 'antd-form-design-control-tabs',
            attrs: {},
            propAttrs: {},
            events: {},
            slot: {},
            defaultAttrs: {}
        },
        name: 'tabs',
        title: '标签页',
        autoPrefix: 'tabs',
        type: Enum.FormControlType.layout,
        children: [ [], [], [] ],
        childrenSlot: '.ant-tabs-tabpane',
        propertys: [
            {
                name: 'type', title: '样式类型', default: 'line', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list, 
                attrs: { options: [ 
                    { title: '常规标签页样式', value: 'line' },
                    { title: '按钮组样式', value: 'card' },
                    { title: '可编辑按钮组样式', value: 'editable-card' }
                ] }
            }, {
                name: 'tabBarGutter', title: '标签间隙', default: 0,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'size', title: '大小', default: 'default',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [
                    { title: '大号', value: 'large' },
                    { title: '中号', value: 'default' },
                    { title: '小号', value: 'small' }
                ] }
            }, {
                name: 'animated', title: '使用动画切换', default: true,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'tabPosition', title: '页签位置', default: 'top',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [
                    { title: '上方', value: 'top' },
                    { title: '右侧', value: 'right' },
                    { title: '下方', value: 'bottom' },
                    { title: '左侧', value: 'left' }
                ] }
            }, {
                name: 'hideAdd', title: '隐藏加号图标', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: '绑定变量', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'options', title: '子标签', default: [
                    { title: '标签1', icon: '' },
                    { title: '标签2', icon: '' },
                    { title: '标签3', icon: '' },
                ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attrs: { 
                    rowKey: 'title', 
                    columns: [
                        { name: 'icon', width: '30%', title: '图标', editor: Enum.FormControlPropertyEditor.icon, attrs: { } },
                        { name: 'title', width: '70%', title: '标题', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    ],
                    onRemove: (value, index, control) => control.children[index].length == 0,
                    onChange(control, index, removeCount, insertCount) { 
                        [].splice.apply(control.children, [index, removeCount].concat(new Array(insertCount).fill([])) as [number, number, ...never[]])
                    }
                }
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            { name: 'change', title: '切换面板', remark: '切换面板后的回调事件。' },
            { name: 'tabClick', title: '点击tab', remark: 'Tab被点击后的回调事件。' },
            { name: 'prevClick', title: '点击prev按钮', remark: 'Prev按钮被点击后的回调事件。' },
            { name: 'nextClick', title: '点击next按钮', remark: 'Next按钮被点击后的回调事件。' }
        ]
    },

    /**
     * 折叠面板
     */
    {
        id: '',
        control: {
            control: 'antd-form-design-control-collapse',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
                activeKey: [ 'a0', 'a1', 'a2' ],
                value: [ 'a0', 'a1', 'a2' ]
            }
        },
        name: 'collapse',
        title: '折叠面板',
        autoPrefix: 'collapse',
        type: Enum.FormControlType.layout,
        children: [ [], [], [] ],
        childrenSlot: '.ant-collapse-content-box',
        propertys: [
            {
                name: 'bordered', title: '边框', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'accordion', title: '手风琴模式', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    if (!value) {
                        control[0].control.attrs.value = [
                            control[0].control.attrs['value']
                        ];
                    }
                }
            }, {
                name: 'model', title: '绑定变量', default: '', require: true, type: 'Array<string>',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'options', title: '子面板', default: [
                    { title: '标题1', icon: '' },
                    { title: '标题2', icon: '' },
                    { title: '标题3', icon: '' },
                ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attrs: { 
                    rowKey: 'title', 
                    columns: [
                        { name: 'icon', width: '30%', title: '图标', editor: Enum.FormControlPropertyEditor.icon, attrs: { } },
                        { name: 'title', width: '70%', title: '标题', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    ],
                    onRemove: (value, index, control) => control.children[index].length == 0,
                    onChange(control, index, removeCount, insertCount) { 
                        [].splice.apply(control.children, [index, removeCount].concat(new Array(insertCount).fill([])) as [number, number, ...never[]])
                    }
                }
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 
    
    /**
     * 卡片
     */
    {
        id: '',
        control: {
            control: 'antd-form-design-control-card',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {
                default: [
                    {
                        control: 'form-design-blank-control',
                        attrs: {},
                        events: {},
                        propAttrs: {},
                        slot: {}
                    }
                ]
            },
            defaultAttrs: {}
        },
        name: 'card',
        title: '卡片',
        type: Enum.FormControlType.layout,
        children: [ [] ],
        childrenSlot: '.ant-card-body',
        propertys: [
            {
                name: 'title', title: '区域标题', default: '卡片', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine 
            }, {
                name: 'border', title: '边框', default: true, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
            }, {
                name: 'hoverable', title: '鼠标移过可浮起', default: false, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
            }, {
                name: 'size', title: '尺寸', default: 'default',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [
                    { title: '普通 Default', value: 'default' },
                    { title: '小型 Small', value: 'small' }
                ] } 
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 
    
    /**
     * 单行文本框
     */
    {
        id: '',
        control: {
            control: 'a-input',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'textbox',
        title: '单行文本框',
        autoPrefix: 'textbox',
        type: Enum.FormControlType.input,
        isFormItem: true,
        propertys: [
            {
                name: 'type', title: '文本框类型', default: 'text',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '文本 Text', value: 'text' },
                    { title: '密码 Password', value: 'password' },
                    { title: '电话 Tel', value: 'tel' },
                    { title: 'URL地址', value: 'url' }
                ] }
            }, {
                name: 'size', title: '尺寸', default: 'default',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [
                    { title: '普通 Default', value: 'default' },
                    { title: '小型 Small', value: 'small' }
                ] } 
            }, {
                name: 'prefix', title: '前缀', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'suffix', title: '后缀', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'placeholder', title: '占位提示文字',
                group: Enum.FormControlPropertyGroup.style, default: '请输入', editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'maxlength', title: '最大输入字数',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'readOnly', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'allowClear', title: '启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'defaultValue', title: '默认值',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
            }, {
                name: 'model', title: '绑定变量', type: 'string',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable,
                attrs: { type: 'string' }
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            { name: 'change', title: '内容变换', remark: '输入框内容变化时的回调事件。' },
            { name: 'pressEnter', title: '按下回车', remark: '在输入框焦点时按下回车时的回调事件。' },
        ]
    }, 
    
    /**
     * 多行文本框
     */
    {
        id: '',
        control: {
            control: 'a-textarea',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
                value: ''
            }
        },
        name: 'textarea',
        autoPrefix: 'textarea',
        title: '多行文本框',
        type: Enum.FormControlType.input,
        isFormItem: true,
        propertys: [
            {
                name: 'placeholder', title: '占位提示文字', default: '请输入',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'type', title: '文本框类型', default: 'text',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '文本 Text', value: 'text' },
                    { title: '密码 Password', value: 'password' },
                    { title: '电话 Tel', value: 'tel' },
                    { title: 'URL地址', value: 'url' }
                ] }
            }, {
                name: 'size', title: '尺寸', default: 'default',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [
                    { title: '普通 Default', value: 'default' },
                    { title: '小型 Small', value: 'small' }
                ] } 
            }, {
                name: 'rows', title: '默认显示行数',
                group: Enum.FormControlPropertyGroup.style, default: 3, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'autosize', title: '自适应高度',
                group: Enum.FormControlPropertyGroup.style, default: false, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'defaultValue', title: '默认值',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.multiLine,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
            }, {
                name: 'maxlength', title: '最大输入字数',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'readOnly', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'allowClear', title: '启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: '绑定变量', type: 'string',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 
    
    /**
     * 数字输入框
     */
    {
        id: '',
        control: {
            control: 'a-input-number',
            isMain: false,
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
                style: 'width: 100%;'
            }
        },
        name: 'input-number',
        title: '数字输入框',
        autoPrefix: 'number',
        type: Enum.FormControlType.input,
        isFormItem: true,
        propertys: [
            {
                name: 'placeholder', title: '占位提示文字', default: '请选择',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'size', title: '尺寸', default: 'default',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [
                    { title: '普通 Default', value: 'default' },
                    { title: '小型 Small', value: 'small' }
                ] }
            }, {
                name: 'decimalSeparator', title: '小数点',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'precision', title: '数值精度',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'max', title: '最大值',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'min', title: '最小值', default: 1,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'step', title: '步长', default: 1,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.float
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'readOnly', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: '绑定变量', type: 'number',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 日期框
     */
    {
        id: '',
        control: {
            control: 'a-date-picker',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
                style: 'width: 100%;'
            }
        },
        name: 'date-picker',
        title: '日期框',
        autoPrefix: 'datepicker',
        type: Enum.FormControlType.input,
        isFormItem: true,
        propertys: [
            {
                name: 'placeholder', title: '占位提示文字',
                group: Enum.FormControlPropertyGroup.style, default: '请选择日期', editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'size', title: '尺寸', default: 'default',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [
                    { title: '普通 Default', value: 'default' },
                    { title: '小型 Small', value: 'small' }
                ] } 
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'readOnly', title: '允许编辑日期', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'allowClear', title: '是否启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: '绑定变量', type: 'string',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    
    /**
     * 值选择器
     */
    {
        id: '',
        control: {
            control: 'a-input-search',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {
            },
            defaultAttrs: {
                enterButton: true
            }
        },
        name: 'data-select',
        title: '值选择器',
        autoPrefix: 'data',
        type: Enum.FormControlType.select,
        isFormItem: true,
        propertys: [
            {
                name: 'placeholder', title: '占位提示文字', default: '请选择',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'prefix', title: '前缀', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'suffix', title: '后缀', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'btn-icon', title: '按钮图标', default: 'search',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['button'][0].attrs.icon = value;
                }
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'readOnly', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'clearable', title: '是否启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: '绑定变量', type: 'string | Array<string>',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'dataSource', title: '数据源', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.json,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
                attrs: { style: { height: '200px' } }
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    },

    /**
     * 单选框组
     */
    {
        id: '',
        control: {
            control: 'a-radio-group', //van-radio-group
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'radio-group',
        title: '单选框组',
        autoPrefix: 'radio',
        type: Enum.FormControlType.select,
        isFormItem: true,
        propertys: [
            {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'options', title: '列表项', default: [ 
                    { value: '1', label: '单选框 1' }, 
                    { value: '2', label: '单选框 2' } 
                ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
                attrs: { rowKey: 'title', columns: [
                    { name: 'value', width: '30%', title: '值', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    { name: 'label', width: '40%', title: '文本', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    { name: 'disabled', width: '30%', title: '禁用', editor: Enum.FormControlPropertyEditor.boolean, default: false, attrs: { } },
                ] }
            }, {
                name: 'model', title: '绑定变量', type: 'string',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 复选框组
     */
    {
        id: '',
        control: {
            control: 'a-checkbox-group',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'checkbox-group',
        title: '复选框组',
        autoPrefix: 'checkbox',
        type: Enum.FormControlType.select,
        isFormItem: true,
        propertys: [
            {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'options', title: '列表项', default: [ 
                    { value: '1', label: '单选框 1' }, 
                    { value: '2', label: '单选框 2' } 
                ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
                attrs: { rowKey: 'title', columns: [
                    { name: 'value', width: '30%', title: '值', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    { name: 'label', width: '40%', title: '文本', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    { name: 'disabled', width: '30%', title: '禁用', editor: Enum.FormControlPropertyEditor.boolean, default: false, attrs: { } },
                ] }
            }, {
                name: 'model', title: '绑定变量', type: 'Array<string>',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    
    /**
     * 开关
     */
    {
        id: '',
        control: {
            control: 'a-switch',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'switch',
        title: '开关',
        autoPrefix: 'switch',
        type: Enum.FormControlType.select,
        isFormItem: true,
        propertys: [
            {
                name: 'checkedChildren', title: '选中文本', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'unCheckedChildren', title: '未选中文本', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'size', title: '尺寸', default: 'default',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [
                    { title: '普通 Default', value: 'default' },
                    { title: '小型 Small', value: 'small' }
                ] } 
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: '绑定变量', type: 'boolean',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 上传
     */
    {
        id: '',
        control: {
            control: 'a-uploader',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'uploader',
        title: '上传',
        autoPrefix: 'uploader',
        type: Enum.FormControlType.upload,
        propertys: [
            {
                name: 'upload-text', title: '文字提示', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'image-fit', title: '图片裁剪模式', default: 'cover',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '保持宽高比，显示长边', value: 'contain' },
                    { title: '保持宽高比，显示短边', value: 'cover' },
                    { title: '拉伸', value: 'fill' },
                    { title: '不处理', value: 'none' },
                    { title: '较小处理', value: 'scale-down' }
                ] }
            }, {
                name: 'preview-size', title: '预览图尺寸', default: '80px',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel
            }, {
                name: 'name', title: '标识符',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'accept', title: '接受文件类型', default: 'image/*',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'preview-image', title: '完成展示预览图', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'preview-full-image', title: '点击预览', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'multiple', title: '图片多选上传', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'capture', title: '图片选取模式', 
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ { title: '——', value: '' }, { title: '摄像头', value: 'camera' } ] }
            }, {
                name: 'max-size', title: '文件大小(byte)', 
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'max-count', title: '文件数量', 
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'result-type', title: '结果类型', default: 'file',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ { title: '文件 File', value: 'file' }, { title: '文本 Text', value: 'text' } ] }
            }, {
                name: 'model', title: '绑定变量', type: 'Array<string>',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'after-read', title: '读取完成回调函数', 
                group: Enum.FormControlPropertyGroup.function, editor: Enum.FormControlPropertyEditor.function
            }, {
                name: 'before-read', title: '读取前回调函数', 
                group: Enum.FormControlPropertyGroup.function, editor: Enum.FormControlPropertyEditor.function
            }, {
                name: 'before-delete', title: '删除前回调函数', 
                group: Enum.FormControlPropertyGroup.function, editor: Enum.FormControlPropertyEditor.function
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    },

    /**
     * 自定义控件
     */
    {
        id: '',
        control: {
            control: 'antd-form-design-control-custom',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'custom',
        title: '自定义控件',
        autoPrefix: 'custom',
        type: Enum.FormControlType.else,
        isFormItem: true,
        propertys: [
            {
                name: 'renderFn', title: 'JS表达式', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.javascript,
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 分页
     */
    {
        id: '',
        control: {
            control: 'a-pagination',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'pagination',
        title: '分页',
        autoPrefix: 'pagination',
        type: Enum.FormControlType.else,
        propertys: [
            {
                name: 'hideOnSinglePage', title: '单页时隐藏', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean,
            }, {
                name: 'simple', title: '简单模式', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean,
            }, {
                name: 'items-per-page', title: '每页数据条数', default: 10,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'showQuickJumper', title: '快速跳转', default: false, remark: '是否可以快速跳转至某页	',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
            }, {
                name: 'showSizeChanger', title: '可变页大小', default: false, remark: '是否可以改变每页数据条数',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: '绑定变量', type: 'number',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 滑动输入条
     */
    {
        id: '',
        control: {
            control: 'a-slider',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'slider',
        title: '滑动输入条',
        autoPrefix: 'slider',
        type: Enum.FormControlType.else,
        isFormItem: true,
        propertys: [
            {
                name: 'bar-height', title: '进度条高度', default: '2px',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel
            }, {
                name: 'vertical', title: '是否垂直', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'dots', title: '仅为刻度值', default: false, remark: '是否只能拖拽到刻度上。',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'max', title: '最大值', default: 100,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'min', title: '最小值', default: 0,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'step', title: '步长', default: 1, remark: '步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分。',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'range', title: '双滑块模式', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'defaultValue', title: '默认值',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.multiLine,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
            }, {
                name: 'model', title: '绑定变量', type: 'number',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 评分
     */
    {
        id: '',
        control: {
            control: 'a-rate',
            isMain: false,
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'rate',
        title: '评分',
        type: Enum.FormControlType.else,
        isFormItem: true,
        propertys: [
            {
                name: 'count', title: '图标总数', default: 5,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'allowHalf', title: '允许半选', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'allowClear', title: '允许清除', default: true, remark: '是否允许再次点击后清除。',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: '绑定变量', type: 'number',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 分割线
     */
    {
        id: '',
        control: {
            control: 'a-divider',
            isMain: false,
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'divider',
        title: '分割线',
        type: Enum.FormControlType.else,
        propertys: [
            {
                name: 'text', title: '标题', default: '',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'dashed', title: '虚线', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'orientation', title: '标题位置', default: 'left',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ { title: '左侧 Left', value: 'left' }, { title: '居中 Center', value: 'center' }, { title: '右侧 Right', value: 'right' } ] }
            }, {
                name: 'type', title: '分割线类型', default: 'horizontal',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ { title: '水平 Horizontal', value: 'horizontal' }, { title: '垂直 Vertical', value: 'vertical' } ] }
            }, 
        ],
        events: [
            
        ]
    }, 

    /**
     * 子表单
     */
    {
        id: '',
        control: {
            control: 'antd-form-design-childform',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'childform',
        icon: '',
        title: '子表单',
        autoPrefix: 'childform',
        type: Enum.FormControlType.else,
        propertys: [
            {
                name: 'bordered', title: '边框', default: false, remark: '是否展示表格的外边框和列边框',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'scrollX', title: '固定宽度', remark: '用于设置表格宽度，如果需要表格具有一定的宽度并且具有横向滚动条时可设置',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel
            }, {
                name: 'scrollY', title: '固定高度', remark: '用于设置表格高度，如果需要表格具有一定的高度并且具有纵向滚动条时可设置',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel
            }, {
                name: 'rowKey', title: '主键', default: 'id',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'columns', title: '表格列', default: [
                    { dataIndex: 'id', title: '编号' },
                    { dataIndex: 'name', title: '姓名' },
                    { dataIndex: 'age', title: '年龄' },
                ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
                attrs: {
                    columns: [
                        { 
                            name: 'dataIndex',
                            title: '字段名',
                            width: '80px',
                            editor: Enum.FormControlPropertyEditor.singerLine
                        }, {
                            name: 'title',
                            title: '标题',
                            width: '80px',
                            editor: Enum.FormControlPropertyEditor.singerLine
                        }, {
                            name: 'width',
                            title: '宽度',
                            width: '50px',
                            editor: Enum.FormControlPropertyEditor.int
                        }, { 
                            name: 'align', 
                            title: '对齐', 
                            editor: Enum.FormControlPropertyEditor.list, 
                            width: '50px',
                            attrs: {
                                options: [
                                    { title: '左', value: 'left' }, 
                                    { title: '中', value: 'center' }, 
                                    { title: '右', value: 'right' }
                                ]
                            }
                        }, { 
                            name: 'colSpan',
                            title: '合并列数',
                            editor: Enum.FormControlPropertyEditor.int,
                            width: '60px',
                            attrs: { max: 99, min: 0 }
                        }
                    ],
                    onRemove: (value, index, control) => control.children[index].length == 0,
                    onChange(control, index, removeCount, insertCount) { 
                        [].splice.apply(control.children, [index, removeCount].concat(new Array(insertCount).fill([])) as [number, number, ...never[]])
                    }
                }
            }, {
                name: 'dataSource', title: '数据数组', default: [
                    { id: '1', name: '张三', age: 20 },
                    { id: '2', name: '李四', age: 21 },
                    { id: '3', name: '王五', age: 22 },
                ],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.json,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
                attrs: { style: { height: '200px' } }
                // change(prop, propMap, control, value, refs) {
                //     console.log(control);
                //     // propMap['view-data'].visible = value == JSON.parse(value);
                // }
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 
]

export function initAntDesignControls() {
    return formControls.map(i => ({
        ...i,
        // @ts-ignore
        propertyEditors: Object.assign.apply({}, basicProps
            .concat(i.propertys)
            .concat(i.isFormItem ? [...columnItemProps, ...formItemProps] : [])
            .filter(o => o.attach?.length)
            .map(o => {
                return {[o.name]: o.editor};
            })
        ),
        control: {
            ...i.control,
            propertys: basicProps.concat(i.propertys).map(prop => ({
                ...prop,
                
            })).concat([
                
            ]),
            // @ts-ignore
            attrs: Object.assign.apply({}, Object.entries(i.control.defaultAttrs)
                .map(([key, value]) => ({[key]:value}))
                .concat(
                    basicProps.concat(i.propertys).concat(i.isFormItem ? [...columnItemProps, ...formItemProps] : [])
                        .filter(o => o.default !== undefined)
                        .map(o => ({[o.name]: o.default}))
                )
            )
        },
        propertys: [
            ...basicProps,
            ...i.propertys
        ]
    }))
}