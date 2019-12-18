import FormDesign from '@/@types/form-design';
import { Enum } from '@/config/enum';


let formControls: Array<FormDesign.FormControl> = [

    /**
     * 栅格
     */
    {
        id: '',
        control: {
            control: 'vant-form-design-control-row',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {}
        },
        name: 'row',
        icon: '',
        title: '栅格',
        type: Enum.FormControlType.layout,
        children: [ [], [] ],
        childrenSlot: '.van-col',
        propertys: [
            {
                name: 'type', title: '布局方式', default: '', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ { title: '普通布局', value: '' }, { title: 'Flex布局', value: 'flex' } ] }
            }, {
                name: 'gutter', title: '列间距', default: 0, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'tag', title: '元素标签', default: 'div', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'justify', title: '主轴对齐方式', default: 'start', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '左侧对齐 Start', value: 'start' }, 
                    { title: '居中对齐 Center', value: 'center' }, 
                    { title: '右侧对齐 End', value: 'end' },
                    { title: '完全分散 SpaceAround', value: 'space-around' },
                    { title: '居中分散 SpaceBetween', value: 'space-between' }
                ] }
            }, {
                name: 'align', title: '交叉轴对齐方式', default: 'top', 
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
                        { name: 'offset', title: '位移', editor: Enum.FormControlPropertyEditor.int, attrs: { max: 24, min: 0 } },
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
            control: 'vant-form-design-control-tabs',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {}
        },
        name: 'tabs',
        title: '标签页',
        type: Enum.FormControlType.layout,
        children: [ [], [], [] ],
        childrenSlot: '.van-tab__pane',
        propertys: [
            {
                name: 'type', title: '样式类型', default: 'line', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list, 
                attrs: { options: [ { title: '常规标签页样式', value: 'line' }, { title: '按钮组样式', value: 'card' } ] }
            }, {
                name: 'duration', title: '动画时间(s)', default: 0.3, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.float 
            }, {
                name: 'background', title: '标签栏背景色', default: '#FFFFFF', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color 
            }, {
                name: 'line-height', title: '底部条高度', default: 3, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int 
            }, {
                name: 'color', title: '标签主题色', default: '#ee0a24', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color 
            }, {
                name: 'title-active-color', title: '标题选中态颜色', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color 
            }, {
                name: 'title-inactive-color', title: '标题默认态颜色', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color 
            }, {
                name: 'swipe-threshold', title: '粘性布局时离顶部距离(px)', default: 0,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'animated', title: '开启转场动画', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'ellipsis', title: '省略过长标签文字', default: true,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'sticky', title: '使用粘性布局', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'swipe-threshold', title: '可滚动标签数', default: 4,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'swipeable', title: '手势滑动切换', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'lazy-render', title: '延迟渲染', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: 'model', default: '', require: true,
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
            
        ]
    }, 

    /**
     * 折叠面板
     */
    {
        id: '',
        control: {
            control: 'vant-form-design-control-collapse',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
                value: [ 0, 1, 2 ]
            }
        },
        name: 'collapse',
        title: '折叠面板',
        type: Enum.FormControlType.layout,
        children: [ [], [], [] ],
        childrenSlot: '.van-collapse-item__content',
        propertys: [
            {
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
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'options', title: '子面板', default: [
                    { title: '标题1', icon: '', rightIcon: 'arrow' },
                    { title: '标题2', icon: '', rightIcon: 'arrow' },
                    { title: '标题3', icon: '', rightIcon: 'arrow' },
                ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attrs: { 
                    rowKey: 'title', 
                    columns: [
                        { name: 'icon', width: '25%', title: '图标', editor: Enum.FormControlPropertyEditor.icon, attrs: { } },
                        { name: 'rightIcon', width: '25%', title: '右侧图标', editor: Enum.FormControlPropertyEditor.icon, attrs: { } },
                        { name: 'title', width: '50%', title: '标题', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
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
     * 控件组
     */
    {
        id: '',
        control: {
            control: 'vant-form-design-control-cell-group',
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
        name: 'panel',
        title: '控件组',
        type: Enum.FormControlType.layout,
        children: [ [] ],
        childrenSlot: '.van-cell-group',
        propertys: [
            {
                name: 'title', title: '区域标题', default: '表单区域', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine 
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
            control: 'van-field',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'singer-line',
        title: '单行文本框',
        type: Enum.FormControlType.input,
        propertys: [
            {
                name: 'type', title: '文本框类型', default: 'text',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '文本', value: 'text' },
                    { title: '密码', value: 'password' }
                ] }
            }, {
                name: 'label', title: '左侧标题', default: '标签',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'left-icon', title: '左侧图标', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon
            }, {
                name: 'right-icon', title: '右侧图标', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon
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
                name: 'readonly', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'clearable', title: '是否启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 
    
    /**
     * 多行文本框
     */
    {
        id: '',
        control: {
            control: 'van-field',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
                type: 'textarea',
                value: ''
            }
        },
        name: 'mutil-line',
        title: '多行文本框',
        type: Enum.FormControlType.input,
        propertys: [
            {
                name: 'label', title: '左侧标题', default: '标签',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'placeholder', title: '占位提示文字',
                group: Enum.FormControlPropertyGroup.style, default: '请输入', editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'rows', title: '默认显示行数',
                group: Enum.FormControlPropertyGroup.style, default: 2, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'autosize', title: '高度自适应',
                group: Enum.FormControlPropertyGroup.style, default: true, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'maxlength', title: '最大输入字数',
                group: Enum.FormControlPropertyGroup.action, default: 150, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'show-word-limit', title: '显示字数统计', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'readonly', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'clearable', title: '是否启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 
    
    /**
     * 步进器
     */
    {
        id: '',
        control: {
            control: 'van-cell',
            isMain: false,
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {
                default: [
                    {
                        control: 'van-stepper',
                        attrs: {},
                        events: {},
                        propAttrs: {},
                        slot: {},
                        defaultAttrs: {
                        }
                    }
                ]
            },
            defaultAttrs: {
            }
        },
        name: 'stepper',
        title: '步进器',
        type: Enum.FormControlType.input,
        propertys: [
            {
                name: 'title', title: '左侧标题', default: '标签',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'icon', title: '左侧图标', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon
            }, {
                name: 'input-width', title: '输入框宽度', default: '32px',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel,
                change(prop, propMap, control, value, refs) {
                    // refs[control[0].id][0].$children[0]['input-width'] = value;
                    control[0].control.slot['default'][0].attrs['input-width'] = value;
                }
            }, {
                name: 'decimal-length', title: '固定小数位数',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['decimal-length'] = value;
                }
            }, {
                name: 'max', title: '最大值',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['max'] = value;
                }
            }, {
                name: 'min', title: '最小值', default: 1,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['min'] = value;
                }
            }, {
                name: 'step', title: '步长', default: 1,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.float,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['step'] = value;
                }
            }, {
                name: 'integer', title: '是否只允许整数', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['integer'] = value;
                }
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['disabled'] = value;
                }
            }, {
                name: 'disable-input', title: '是否禁用输入框', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['disable-input'] = value;
                }
            }, {
                name: 'readonly', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['readonly'] = value;
                }
            }, {
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['required'] = value;
                }
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
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
            control: 'van-field',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {
                button: [
                    {
                        control: 'van-button',
                        slot: {},
                        attrs: {
                            size: 'small',
                            type: 'primary',
                            icon: 'search'
                        },
                        events: {},
                        propAttrs: {},
                    }
                ]
            },
            defaultAttrs: {
                type: 'text'
            }
        },
        name: 'data-select',
        title: '值选择器',
        type: Enum.FormControlType.select,
        propertys: [
            {
                name: 'label', title: '左侧标题', default: '标签',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'placeholder', title: '占位提示文字', default: '请选择',
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
                name: 'readonly', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'clearable', title: '是否启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
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
            control: 'form-design-control-radio-group', //van-radio-group
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'radio-group',
        title: '单选框组',
        type: Enum.FormControlType.select,
        propertys: [
            {
                name: 'icon-size', title: '图标大小',  default: '20px',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel
            }, {
                name: 'checked-color', title: '选中框颜色',  default: '#1989fa',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'options', title: '绑定数据源', default: [ 
                    { id: '1', title: '单选框 1', icon: '' }, 
                    { id: '2', title: '单选框 2', icon: '' } 
                ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
                attrs: { rowKey: 'title', columns: [
                    { name: 'id', width: '30%', title: 'Id', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    { name: 'icon', width: '30%', title: '图标', editor: Enum.FormControlPropertyEditor.icon, attrs: { } },
                    { name: 'title', width: '70%', title: '标题', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                ] }
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
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
            control: 'form-design-control-checkbox-group',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'checkbox-group',
        title: '复选框组',
        type: Enum.FormControlType.select,
        propertys: [
            {
                name: 'icon-size', title: '图标大小',  default: '20px',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel
            }, {
                name: 'checked-color', title: '选中框颜色',  default: '#1989fa',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color
            }, {
                name: 'max', title: '最大可选数', default: 0,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'options', title: '数据源', default: [ { id: '1', title: '复选框 1', icon: '' }, { id: '2', title: '复选框 2', icon: '' } ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attrs: { rowKey: 'title', columns: [
                    { name: 'id', width: '30%', title: 'Id', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    { name: 'icon', width: '30%', title: '图标', editor: Enum.FormControlPropertyEditor.icon, attrs: { } },
                    { name: 'title', width: '70%', title: '标题', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                ] }
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
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
            control: 'van-field',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'date-select',
        title: '日期框',
        type: Enum.FormControlType.input,
        propertys: [
            {
                name: 'label', title: '左侧标题', default: '标签',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'right-icon', title: '右侧图标', default: 'calender-o',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon
            }, {
                name: 'placeholder', title: '占位提示文字',
                group: Enum.FormControlPropertyGroup.style, default: '请选择日期', editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'readonly', title: '允许编辑日期', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'clearable', title: '是否启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
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
            control: 'van-switch-cell',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'switch',
        title: '开关',
        type: Enum.FormControlType.select,
        propertys: [
            {
                name: 'size', title: '开关尺寸', default: '20px',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel
            }, {
                name: 'title', title: '左侧标题',  default: '标签',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'checked-color', title: '选中框颜色',  default: '#1989fa',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'active-value', title: '打开的值', default: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.any
            }, {
                name: 'inactive-value', title: '关闭的值', default: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.any
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 图片上传
     */
    {
        id: '',
        control: {
            control: 'van-uploader',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'image-uploader',
        title: '图片上传',
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
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
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
     * 文件上传
     */
    {
        id: '',
        control: {
            control: 'van-cell',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {
                default: [
                    {
                        control: 'van-uploader',
                        attrs: {},
                        events: {},
                        propAttrs: {},
                        slot: {
                            default: [
                                {
                                    control: 'van-button',
                                    attrs: {
                                        icon: 'photograph',
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    events: {},
                                    propAttrs: {},
                                    html: 'aa',
                                    slot: {}
                                }
                            ]
                        }
                    }
                ]
            },
            defaultAttrs: {
            }
        },
        name: 'file-uploader',
        title: '文件上传',
        type: Enum.FormControlType.upload,
        propertys: [
            {
                name: 'title', title: '左侧标题', default: '标签', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'upload-text', title: '文字提示', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'name', title: '标识符',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'accept', title: '接受文件类型', default: '*',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'multiple', title: '多选上传', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
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
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
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
     * 分页
     */
    {
        id: '',
        control: {
            control: 'van-pagination',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'pagination',
        title: '分页',
        type: Enum.FormControlType.else,
        propertys: [
            {
                name: 'mode', title: '显示模式', default: 'multi',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ { title: '简单模式 Simple', value: 'simple' }, { title: '多页模式 multi', value: 'multi' } ] }
            }, {
                name: 'items-per-page', title: '每页数据条数', default: 10,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'prev-text', title: '“上一页”文本', default: '上一页',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'next-text', title: '“下一页”文本', default: '下一页',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'show-page-size', title: '显示页码个数', default: 5,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'force-ellipses', title: '显示省略号', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 搜索
     */
    {
        id: '',
        control: {
            control: 'van-search',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'search',
        title: '搜索',
        type: Enum.FormControlType.else,
        propertys: [
            {
                name: 'label', title: '左侧标题', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'background', title: '搜索框背景色', default: '#f2f2f2',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color
            }, {
                name: 'input-align', title: '内容对齐方式', default: 'left',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ { title: '左对齐', value: 'left' }, { title: '居中对齐', value: 'center' }, { title: '右对齐', value: 'right' } ] }
            }, {
                name: 'left-icon', title: '左侧图标', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon
            }, {
                name: 'right-icon', title: '右侧图标', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon
            }, {
                name: 'clearable', title: '启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'show-action', title: '显示取消按钮', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'action-text', title: '取消按钮文字', default: '取消', leaf: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'readonly', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'shape', title: '搜索框形状', default: 'square',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ { title: '方形', value: 'square' }, { title: '圆形', value: 'round' } ] }
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 滑块
     */
    {
        id: '',
        control: {
            control: 'van-slider',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'slider',
        title: '滑块',
        type: Enum.FormControlType.else,
        propertys: [
            {
                name: 'bar-height', title: '进度条高度', default: '2px',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel
            }, {
                name: 'active-color', title: '激活态颜色',  default: '#1989fa',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color
            }, {
                name: 'active-color', title: '默认颜色',  default: '#e5e5e5',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color
            }, {
                name: 'max', title: '最大可选数', default: 0,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'model', title: 'model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 倒计时
     */
    {
        id: '',
        control: {
            control: 'van-cell',
            isMain: false,
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {
                default: [
                    {
                        control: 'van-count-down',
                        attrs: {},
                        events: {},
                        propAttrs: {},
                        slot: {},
                        defaultAttrs: {
                        }
                    }
                ]
            },
            defaultAttrs: {
            }
        },
        name: 'count-down',
        title: '倒计时',
        type: Enum.FormControlType.else,
        propertys: [
            {
                name: 'title', title: '左侧标题', default: '倒计时',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'icon', title: '左侧图标', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon
            }, {
                name: 'format', title: '时间格式', default: 'HH:mm:ss',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.singerLine,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['format'] = value;
                }
            }, {
                name: 'time', title: '倒计时时长',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.int,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['time'] = value;
                }
            }, {
                name: 'auto-start', title: '自动开始', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['auto-start'] = value;
                }
            }, {
                name: 'millisecond', title: '毫秒级渲染', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['millisecond'] = value;
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
     * 评分
     */
    {
        id: '',
        control: {
            control: 'van-cell',
            isMain: false,
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {
                default: [
                    {
                        control: 'van-rate',
                        attrs: {},
                        events: {},
                        propAttrs: {},
                        slot: {},
                        defaultAttrs: {
                        }
                    }
                ]
            },
            defaultAttrs: {
            }
        },
        name: 'rate',
        title: '评分',
        type: Enum.FormControlType.else,
        propertys: [
            {
                name: 'title', title: '左侧标题', default: '评分',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'icon', title: '左侧图标', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['icon'] = value;
                }
            }, {
                name: 'void-icon', title: '未选中的图标', default: 'star-o',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['void-icon'] = value;
                }
            }, {
                name: 'count', title: '图标总数', default: 5,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['count'] = value;
                }
            }, {
                name: 'size', title: '图标大小(px)', default: '20px',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.pixel,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['size'] = value;
                }
            }, {
                name: 'gutter', title: '图标间距(px)', default: 4,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['gutter'] = value;
                }
            }, {
                name: 'color', title: '选中的颜色', default: '#ffd21e',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['color'] = value;
                }
            }, {
                name: 'void-color', title: '未选中的颜色', default: '#c7c7c7',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['void-color'] = value;
                }
            }, {
                name: 'disabled-color', title: '禁用时的颜色', default: '#bdbdbd',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.color,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['disabled-color'] = value;
                }
            }, {
                name: 'allow-half', title: '允许半选', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['allow-half'] = value;
                }
            }, {
                name: 'readonly', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['readonly'] = value;
                }
            }, {
                name: 'disabled', title: '是否禁用评分', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['disabled'] = value;
                }
            }, {
                name: 'touchable', title: '滑动手势评分', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    control[0].control.slot['default'][0].attrs['touchable'] = value;
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
     * 宫格
     */
    {
        id: '',
        control: {
            control: 'form-design-control-grid',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {}
        },
        name: 'grid',
        title: '宫格',
        type: Enum.FormControlType.else,
        children: [ [] ],
        propertys: [
            {
                name: 'column-num', title: '列数', default: 3, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int 
            }, {
                name: 'gutter', title: '格子间距(px)', default: 0, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int 
            }, {
                name: 'center', title: '居中显示', default: true, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
            }, {
                name: 'square', title: '正方形格子', default: false, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
            }, {
                name: 'clickable', title: '开启反馈', default: false, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
            }, {
                name: 'icon-size', title: '图标大小(px)', default: 28, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int 
            }, {
                name: 'options', title: '子项', default: [
                    { text: '标题1', icon: 'photo-o' },
                    { text: '标题2', icon: 'photo-o' },
                    { text: '标题3', icon: 'photo-o' },
                    { text: '标题4', icon: 'photo-o' },
                    { text: '标题5', icon: 'photo-o' },
                    { text: '标题6', icon: 'photo-o' },
                    { text: '标题7', icon: 'photo-o' },
                    { text: '标题8', icon: 'photo-o' },
                    { text: '标题9', icon: 'photo-o' },
                ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attrs: { rowKey: 'title', columns: [
                    { name: 'icon', width: '30%', title: '图标', editor: Enum.FormControlPropertyEditor.icon, attrs: { } },
                    { name: 'text', width: '70%', title: '标题', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                ] }
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 
]

export function initVantControls() {
    return formControls.map(i => ({
        ...i,
        control: {
            ...i.control,
            propertys: i.propertys.concat([
                
            ]),
            // @ts-ignore
            attrs: Object.assign.apply({}, Object.entries(i.control.defaultAttrs)
                .map(([key, value]) => ({[key]:value}))
                .concat(
                    i.propertys
                        .filter(o => o.default !== undefined)
                        .map(o => ({[o.name]: o.default}))
                )
            )
        }
    }))
}