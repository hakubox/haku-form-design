import { FormDesign } from '@/@types/form-design';
import { Enum } from '../../config/enum';


let formControls: Array<FormDesign.FormControl> = [

    /**
     * 栅格
     */
    {
        id: '',
        control: {
            control: 'gj-form-design-control-row',
            attrs: {},
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
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.json,
            }
        ]
    }, 

    /**
     * 宫格子项
     */
    // {
    //     id: '',
    //     control: {
    //         control: 'van-grid-item',
    //         attrs: {},
    //         slot: {},
    //         defaultAttrs: {}
    //     },
    //     name: 'grid-item',
    //     title: '宫格子项',
    //     type: Enum.FormControlType.layout,
    //     propertys: [
    //         {
    //             name: 'text', title: '文字', 
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine 
    //         }, {
    //             name: 'icon', title: '图标', 
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon 
    //         }, {
    //             name: 'dot', title: '小红点', default: false,
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
    //         }, {
    //             name: 'info', title: '徽标内容', 
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine 
    //         }, {
    //             name: 'url', title: '跳转链接', 
    //             group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.singerLine 
    //         }, {
    //             name: 'replace', title: '跳转替换历史', 
    //             group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean 
    //         }
    //     ]
    // }, 

    /**
     * 标签页
     */
    {
        id: '',
        control: {
            control: 'gj-form-design-control-tabs',
            attrs: {},
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
                name: 'border', title: '显示标签栏外框', default: true,
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
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'options', title: '子标签', default: [
                    { title: '标签1', icon: '' },
                    { title: '标签2', icon: '' },
                    { title: '标签3', icon: '' },
                ],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.json,
            }
        ]
    }, 

    /**
     * 标签页-子页
     */
    // {
    //     id: '',
    //     control: {
    //         control: 'van-tab',
    //         attrs: {},
    //         slot: {},
    //         defaultAttrs: {}
    //     },
    //     name: 'tab-item',
    //     title: '标签页子项',
    //     type: Enum.FormControlType.layout,
    //     propertys: [
    //         {
    //             name: 'title', title: '子页标题', 
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
    //         }, {
    //             name: 'disabled', title: '是否禁用', default: false, 
    //             group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
    //         }, {
    //             name: 'url', title: '跳转链接', 
    //             group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.singerLine
    //         }, {
    //             name: 'replace', title: '替换历史页面', default: false,
    //             group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
    //         }, {
    //             name: 'name', title: '标签名称', default: '', 
    //             group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
    //         }
    //     ]
    // }, 

    /**
     * 折叠面板
     */
    {
        id: '',
        control: {
            control: 'gj-form-design-control-collapse',
            attrs: {},
            slot: {},
            defaultAttrs: {}
        },
        name: 'collapse',
        title: '折叠面板',
        type: Enum.FormControlType.layout,
        children: [ [], [], [] ],
        childrenSlot: '.van-collapse-item__content',
        propertys: [
            {
                name: 'accordion', title: '手风琴模式', default: false, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
            }, {
                name: 'border', title: '外边框', default: true, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
            }, {
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'options', title: '子面板', default: [
                    { title: '标题1', icon: '', rightIcon: 'arrow' },
                    { title: '标题2', icon: '', rightIcon: 'arrow' },
                    { title: '标题3', icon: '', rightIcon: 'arrow' },
                ],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.json,
            }
        ]
    }, 

    /**
     * 折叠面板子项
     */
    // {
    //     id: '',
    //     control: {
    //         control: 'van-collapse-item',
    //         attrs: {},
    //         slot: {},
    //         defaultAttrs: {}
    //     },
    //     name: 'collapse-item',
    //     title: '折叠面板子项',
    //     type: Enum.FormControlType.layout,
    //     propertys: [
    //         {
    //             name: 'icon', title: '左侧图标', 
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.icon 
    //         }, {
    //             name: 'size', title: '标题栏大小', 
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
    //             attrs: { options: [ { title: '——', value: '' }, { title: '大型 Large', value: 'large' } ] }
    //         }, {
    //             name: 'title', title: '左侧标题', default: '标签',
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine 
    //         }, {
    //             name: 'value', title: '右侧内容', 
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine 
    //         }, {
    //             name: 'label', title: '描述信息', 
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.multiLine 
    //         }, {
    //             name: 'border', title: '内边框', default: true,
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
    //         }, {
    //             name: 'is-link', title: '显示右侧箭头', default: true,
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
    //         }, {
    //             name: 'title-class', title: '左侧标题额外类名', 
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine 
    //         }, {
    //             name: 'value-class', title: '右侧内容额外类名', 
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine 
    //         }, {
    //             name: 'label-class', title: '描述信息额外类名', 
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine 
    //         }, {
    //             name: 'disabled', title: '是否禁用', default: false,
    //             group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
    //         }, {
    //             name: 'v-model', title: 'v-model', default: '', require: true,
    //             group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
    //         }, 
    //     ]
    // }, 
    
    /**
     * 控件组
     */
    {
        id: '',
        control: {
            control: 'gj-form-design-control-cell-group',
            attrs: {},
            slot: {
                default: [
                    {
                        control: 'gj-form-design-blank-control',
                        attrs: {},
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
            },
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
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, 
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
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, 
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
            slot: {
                default: [
                    {
                        control: 'van-stepper',
                        attrs: {},
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
                name: 'border', title: '是否显示外边框', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
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
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, 
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
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'data-source-type', title: '数据源类型', default: 'basic-data', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.dataSourceType,
                change(prop, propMap, control, value, refs) {
                    propMap['view-data'].visible = value == 'view-data';
                    propMap['basic-data'].visible = value == 'basic-data';
                    propMap['user'].visible = value == 'user';
                    propMap['group'].visible = value == 'group';
                }
            }, {
                name: 'basic-data', title: '可选基础数据', require: true, leaf: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.basicData
            }, {
                name: 'view-data', title: '可选视图数据', visible: false, require: true, leaf: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.viewData
            }, 
        ]
    },

    /**
     * 单选框组
     */
    {
        id: '',
        control: {
            control: 'gj-form-design-control-radio-group', //van-radio-group
            attrs: {},
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
                name: 'use-datasouce', title: '使用数据源', default: false,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.boolean,
                change(prop, propMap, control, value, refs) {
                    propMap['data-source-type'].visible = value;
                    propMap['view-data'].visible = value;
                    propMap['basic-data'].visible = false;
                    propMap['user'].visible = false;
                    propMap['group'].visible = false;
                    propMap['options'].visible = !value;
                }
            }, {
                name: 'options', title: '单选框列表项', default: [ { id: '1', title: '单选框 1', icon: '' }, { id: '2', title: '单选框 2', icon: '' } ],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.json
            }, {
                name: 'data-source-type', title: '数据源类型', default: 'basic-data', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.dataSourceType,
                change(prop, propMap, control, value, refs) {
                    propMap['view-data'].visible = value == 'view-data';
                    propMap['basic-data'].visible = value == 'basic-data';
                    propMap['user'].visible = value == 'user';
                    propMap['group'].visible = value == 'group';
                }
            }, {
                name: 'basic-data', title: '可选基础数据', require: true, leaf: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.basicData
            }, {
                name: 'view-data', title: '可选视图数据', visible: false, require: true, leaf: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.viewData
            }, {
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, 
        ]
    }, 

    /**
     * 复选框组
     */
    {
        id: '',
        control: {
            control: 'van-checkbox-group',
            attrs: {},
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
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, 
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
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, 
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
                name: 'border', title: '内边框',  default: true,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
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
                name: 'active-value', title: '打开的值', default: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.any
            }, {
                name: 'inactive-value', title: '关闭的值', default: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.any
            }, {
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, 
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
                name: 'v-model', title: 'v-model', default: '', require: true,
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
            } 
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
            slot: {
                default: [
                    {
                        control: 'van-uploader',
                        attrs: {},
                        slot: {
                            default: [
                                {
                                    control: 'van-button',
                                    attrs: {
                                        icon: 'photograph',
                                        type: 'primary',
                                        size: 'small'
                                    },
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
                name: 'v-model', title: 'v-model', default: '', require: true,
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
            } 
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
                name: 'required', title: '是否必填', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, 
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
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, 
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
                name: 'v-model', title: 'v-model', default: '', require: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, 
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
            slot: {
                default: [
                    {
                        control: 'van-count-down',
                        attrs: {},
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
                name: 'border', title: '是否显示外边框', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
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
            }
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
            slot: {
                default: [
                    {
                        control: 'van-rate',
                        attrs: {},
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
                name: 'border', title: '是否显示外边框', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
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
            }
        ]
    }, 

    /**
     * 宫格
     */
    {
        id: '',
        control: {
            control: 'gj-form-design-control-grid',
            attrs: {},
            slot: {},
            defaultAttrs: {}
        },
        name: 'grid',
        title: '宫格',
        type: Enum.FormControlType.else,
        children: [ [] ],
        propertys: [
            {
                name: 'column-num', title: '列数', default: 4, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int 
            }, {
                name: 'gutter', title: '格子间距(px)', default: 0, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.int 
            }, {
                name: 'border', title: '显示边框', default: true, 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean 
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
                    { title: '标题1', icon: '' },
                    { title: '标题2', icon: '' },
                    { title: '标题3', icon: '' },
                    { title: '标题4', icon: '' },
                    { title: '标题5', icon: '' },
                    { title: '标题6', icon: '' },
                    { title: '标题7', icon: '' },
                    { title: '标题8', icon: '' },
                    { title: '标题9', icon: '' },
                ],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.json,
            }
        ]
    }, 
]

export function initControls() {
    return formControls.map(i => ({
        ...i,
        control: {
            ...i.control,
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