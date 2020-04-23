import FormDesign from '@/@types/form-design';
import { Enum } from '@/config/enum';

export let basicProps: Array<FormDesign.FormControlProperty> = [
    {
        name: 'visible', title: '是否显示', default: true,
        group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean,
        attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
        remark: '控件是否在界面上显示。'
    }, {
        name: 'loading', title: '是否加载中', default: false,
        group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean,
        attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
        remark: '控件当前是否为加载中状态。'
    }, {
        name: 'margin', title: '外边距', 
        group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.box,
        attrs: { styleName: 'margin' },
        remark: '控件外边距。'
    }, {
        name: 'padding', title: '内边距', 
        group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.box,
        attrs: { styleName: 'padding' },
        remark: '控件内边距。'
    }, {
        name: 'tip', title: '悬浮提示',
        group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine,
        attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
        remark: '控件的悬浮提示。'
    }, {
        name: 'id', title: '控件编号', default: '',
        group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine,
        remark: '在页面中调用控件属性或函数使用的控件编号。',
        attrs: {
            'read-only': true
        }
    }, {
        name: 'remark', title: '备注名', default: '',
        group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
    }
];

/** flex子项相关属性 */
export let flexItemProps: Array<FormDesign.FormControlProperty> = [
    {
        name: 'order', title: '排序', default: 0, 
        group: Enum.FormControlPropertyGroup.flex, editor: Enum.FormControlPropertyEditor.int,
        remark: '子项的排列顺序，数值越小越靠前，默认为0。'
    }, {
        name: 'flexGrow', title: '放大比例', default: 0, 
        group: Enum.FormControlPropertyGroup.flex, editor: Enum.FormControlPropertyEditor.int,
        remark: '子项的放大比例，默认为0，即如果存在剩余空间，也不放大。'
    }, {
        name: 'flexShrink', title: '缩小比例', default: 1, 
        group: Enum.FormControlPropertyGroup.flex, editor: Enum.FormControlPropertyEditor.int,
        remark: '子项的的缩小比例，默认为1，即如果空间不足，该项目将缩小。'
    }, {
        name: 'flexBasis', title: '基础空间', default: 'auto', 
        group: Enum.FormControlPropertyGroup.flex, editor: Enum.FormControlPropertyEditor.singerLine,
        remark: '定义了在分配多余空间之前，项目占据的主轴空间。'
    }, {
        name: 'alignSelf', title: '独立对齐方式', default: 'auto', 
        group: Enum.FormControlPropertyGroup.flex, editor: Enum.FormControlPropertyEditor.list,
        attrs: { options: [ 
            { title: '自动 Auto', value: 'auto' }, 
            { title: '头部对齐 FlexStart', value: 'flex-start' }, 
            { title: '尾部对齐 FlexEnd', value: 'flex-end' }, 
            { title: '居中对齐 Center', value: 'center' }, 
            { title: '占满高度 Stretch', value: 'stretch' }, 
            { title: '基线对齐 Baseline', value: 'baseline' }, 
        ] },
        remark: '定义了在分配多余空间之前，项目占据的主轴空间。'
    },
];

/** 表格列字段相关属性 */
export let columnItemProps: Array<FormDesign.FormControlProperty> = [
    {
        name: 'title', title: '列标题', default: '标签',
        group: Enum.FormControlPropertyGroup.childform, editor: Enum.FormControlPropertyEditor.singerLine,
        remark: '表格列头部显示的文字标题。'
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
    }, {
        name: 'onlyText', title: '仅文本', default: false,
        group: Enum.FormControlPropertyGroup.childform, editor: Enum.FormControlPropertyEditor.boolean,
        attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
        remark: '组件内容是否展示为纯文本。'
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
    }, {
        name: 'onlyText', title: '仅文本', default: false,
        group: Enum.FormControlPropertyGroup.form, editor: Enum.FormControlPropertyEditor.boolean,
        attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
        remark: '组件内容是否展示为纯文本。'
    }
];

export const formControls: Array<FormDesign.FormControl> = [

    /**
     * 弹出框
     */
    {
        id: '',
        control: {
            control: 'a-modal',
            isMain: false,
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'dialog',
        title: '弹出框',
        type: Enum.FormControlType.hidden,
        propertys: [
            {
                name: 'visible', title: '是否显示', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'width', title: '宽度', default: 'auto', remark: '可用像素宽度或百分比宽度。',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 抽屉
     */
    {
        id: '',
        control: {
            control: 'a-drawer',
            isMain: false,
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
            }
        },
        name: 'drawer',
        title: '抽屉',
        type: Enum.FormControlType.hidden,
        propertys: [
            {
                name: 'visible', title: '是否显示', default: false,
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'width', title: '宽度', default: 'auto', remark: '可用像素宽度或百分比宽度。',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'height', title: '高度', default: 'auto', remark: '',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'placement', title: '抽屉方向', default: 'right', remark: '',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: {
                    options: [ 
                        { title: '上方 Top', value: 'top' }, 
                        { title: '右侧 Right', value: 'right' }, 
                        { title: '下方 Bottom', value: 'bottom' },
                        { title: '左侧 Left', value: 'left' }
                    ]
                }
            }
        ],
        events: [
            
        ]
    }, 

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
        isOriginal: true,
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
                name: 'dataSource', title: '数据源', default: '', isSync: true,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable,
                attach: [
                    Enum.FormControlPropertyEditor.expression, 
                    Enum.FormControlPropertyEditor.basicData, 
                    Enum.FormControlPropertyEditor.viewData, 
                    Enum.FormControlPropertyEditor.api
                ],
                attrs: { style: { height: '200px' } }
                // change(prop, propMap, control, value, refs) {
                //     // propMap['view-data'].visible = value == JSON.parse(value);
                // }
            }
        ],
        events: [
            { name: '', title: '', remark: '' },
        ],
        render(control) {

            const _getCol = (child, index) => {
                return `<a-table-column title="${child.control.attrs.title}" dataIndex="${child.control.attrs.dataIndex}" key="${child.control.attrs.dataIndex}">
                    <template slot-scope="text, record, index">
                        {{children_${index}}}
                    </template>
                </a-table-column>`;
            };
            
            return `<task-detail-table {{attrs}}>
                ${this.children?.flat(2).map((i, index) => _getCol(i, index)).join('\n')}
            </task-detail-table>`;
        }
    }, 

    /**
     * Flex布局
     */
    {
        id: '',
        control: {
            control: 'antd-form-design-control-flex',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {
                type: 'flex'
            }
        },
        name: 'flex',
        icon: '',
        title: 'Flex布局',
        autoPrefix: 'flex',
        type: Enum.FormControlType.layout,
        children: [ [] ],
        childrenSlot: '.form-flex',
        isOriginal: true,
        propertys: [
            {
                name: 'flexDirection', title: '主轴方向', default: 'row',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '行 Row', value: 'row' }, 
                    { title: '行逆序 RowReverse', value: 'row-reverse' }, 
                    { title: '列 Column', value: 'column' },
                    { title: '列逆序 ColumnReverse', value: 'column-reverse' }
                ] }
            }, {
                name: 'flexWrap', title: '换行规则', default: 'nowrap',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '不换行 Nowrap', value: 'nowrap' }, 
                    { title: '换行 Wrap', value: 'wrap' }, 
                    { title: '换行逆序 WrapReverse', value: 'wrap-reverse' }
                ] }
            }, {
                name: 'justifyContent', title: '主轴对齐方式', default: 'flex-start',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '头部对齐 FlexStart', value: 'flex-start' }, 
                    { title: '尾部对齐 FlexEnd', value: 'flex-end' }, 
                    { title: '居中对齐 Center', value: 'center' }, 
                    { title: '两端对齐 SpaceBetween', value: 'space-between' }, 
                    { title: '分布对齐 SpaceAround', value: 'space-around' }
                ] }
            }, {
                name: 'alignItems', title: '交叉轴对齐方式', default: 'stretch',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '头部对齐 FlexStart', value: 'flex-start' }, 
                    { title: '尾部对齐 FlexEnd', value: 'flex-end' }, 
                    { title: '居中对齐 Center', value: 'center' }, 
                    { title: '占满高度 Stretch', value: 'stretch' }, 
                    { title: '基线对齐 Baseline', value: 'baseline' }, 
                ] }
            }, {
                name: 'alignContent', title: '多轴线对齐方式', default: 'stretch',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '头部对齐 FlexStart', value: 'flex-start' }, 
                    { title: '尾部对齐 FlexEnd', value: 'flex-end' }, 
                    { title: '居中对齐 Center', value: 'center' }, 
                    { title: '两端对齐 SpaceBetween', value: 'space-between' }, 
                    { title: '分布对齐 SpaceAround', value: 'space-around' },
                    { title: '占满高度 Stretch', value: 'stretch' }, 
                ], allowClear: false }
            }
        ],
        events: [
            
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
        autoPrefix: 'row',
        type: Enum.FormControlType.layout,
        children: [ [], [] ],
        childrenSlot: '.ant-col',
        isOriginal: true,
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
                    onRemove: (value, index, control) => !control?.children?.[index]?.length,
                    onChange(control, index, removeCount, insertCount) { 
                        [].splice.apply(control.children, [index, removeCount].concat(new Array(insertCount).fill([])) as [number, number, ...never[]])
                    }
                }
            }
        ],
        events: [
            
        ],
        render() {
            let _options = this.control.attrs.options.map((item, index) => `
            <a-col :span="${item.span}" :offset="${item.offset}">
                {{children_${index}}}
            </a-col>`).join('\n');
            return `<a-row {{attrs}}>\n${_options}\n</a-row>`;
        }
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
        isOriginal: true,
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
                    onRemove: (value, index, control) => !control?.children?.[index]?.length,
                    onChange(control, index, removeCount, insertCount) { 
                        [].splice.apply(control.children, [index, removeCount].concat(new Array(insertCount).fill([])) as [number, number, ...never[]])
                    }
                },
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
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
        isOriginal: true,
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
                    onRemove: (value, index, control) => !control?.children?.[index]?.length,
                    onChange(control, index, removeCount, insertCount) { 
                        [].splice.apply(control.children, [index, removeCount].concat(new Array(insertCount).fill([])) as [number, number, ...never[]])
                    }
                },
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
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
        autoPrefix: 'card',
        type: Enum.FormControlType.layout,
        children: [ [] ],
        childrenSlot: '.ant-card-body',
        isOriginal: true,
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
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'read-only', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'allowClear', title: '启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'defaultValue', title: '默认值', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ],
                remark: '文本框控件默认值。'
            }, {
                name: 'rules', title: '校验规则', default: [],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.rules,
                attach: [ Enum.FormControlPropertyEditor.expression ],
                remark: '控件值校验规则。',
                attrs: { type: Enum.FormControlRuleType.text }
            }, {
                name: 'model', title: '绑定变量', type: 'string',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }
        ],
        events: [
            { name: 'change', title: '内容变换', remark: '输入框内容变化时的回调事件。' },
            { name: 'pressEnter', title: '按下回车', remark: '在输入框焦点时按下回车时的回调事件。' },
        ],
//         render() {
//             if (this.control.attrs.label) {
//                 let _attrs = this.control.attrs;
//                 return `<form-control label="${_attrs.label}" :colon="false" :label-col="{ span: ${_attrs.labelSpan}, offset: ${_attrs.labelOffset} }" :wrapper-col="{ span: ${_attrs.wrapperSpan}, offset: ${_attrs.wrapperOffset} }">
//     <span class="control-custom ant-form-text">{{${_attrs?.renderFn?.replace(/\bme\.\b/g, '')}}}</span>
// </form-control>`;
//             } else {
//                 return `<span class="control-custom ant-form-text">{{${this.control.attrs.renderFn.replace(/\bme\.\b/g, '')}}}</span>`;
//             }
//         }
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
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'read-only', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'allowClear', title: '启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'rules', title: '校验规则', default: [],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.rules,
                attach: [ Enum.FormControlPropertyEditor.expression ],
                remark: '控件值校验规则。',
                attrs: { type: Enum.FormControlRuleType.text }
            }, {
                name: 'model', title: '绑定变量', type: 'string',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
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
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'read-only', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'rules', title: '校验规则', default: [],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.rules,
                attach: [ Enum.FormControlPropertyEditor.expression ],
                remark: '控件值校验规则。',
                attrs: { type: Enum.FormControlRuleType.number }
            }, {
                name: 'model', title: '绑定变量', type: 'number',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
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
            control: 'antd-form-design-control-date-picker',
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
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'read-only', title: '允许编辑日期', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'allowClear', title: '是否启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'rules', title: '校验规则', default: [],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.rules,
                attach: [ Enum.FormControlPropertyEditor.expression ],
                remark: '控件值校验规则。',
                attrs: { type: Enum.FormControlRuleType.date }
            }, {
                name: 'model', title: '绑定变量', type: 'string',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }
        ],
        events: [
            
        ]
    }, 

    /**
     * 下拉框
     */
    {
        id: '',
        control: {
            control: 'antd-form-design-control-select',
            attrs: {
                style: {
                    width: '100%'
                }
            },
            events: {},
            propAttrs: {},
            slot: {
            },
            defaultAttrs: {
                enterButton: true
            }
        },
        name: 'a-select',
        title: '下拉框',
        autoPrefix: 'data',
        type: Enum.FormControlType.select,
        isFormItem: true,
        propertys: [
            {
                name: 'placeholder', title: '占位提示文字', default: '请选择',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'read-only', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'clearable', title: '是否启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'labelField', title: '文本属性', default: 'label',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'valueField', title: '值属性', type: 'value',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'rules', title: '校验规则', default: [],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.rules,
                attach: [ Enum.FormControlPropertyEditor.expression ],
                remark: '控件值校验规则。',
                attrs: { type: Enum.FormControlRuleType.select }
            }, {
                name: 'model', title: '绑定变量', type: 'string | Array<string>',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'options', title: '数据源', require: true, default: [], remark: '展示字段为label，值字段为value',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.json,
                attach: [
                    Enum.FormControlPropertyEditor.variable, 
                    Enum.FormControlPropertyEditor.expression, 
                    Enum.FormControlPropertyEditor.basicData, 
                    Enum.FormControlPropertyEditor.viewData, 
                    Enum.FormControlPropertyEditor.api
                ]
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
            control: 'antd-form-design-control-data-search',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {
            },
            defaultAttrs: {
                enterButton: true
            }
        },
        name: 'data-search',
        title: '值选择器',
        autoPrefix: 'data',
        type: Enum.FormControlType.select,
        isFormItem: true,
        propertys: [
            {
                name: 'dialogTitle', title: '弹出框标题', default: '查询数据',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'placeholder', title: '占位提示文字', default: '请选择',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'prefix', title: '前缀', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'suffix', title: '后缀', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'disabled', title: '是否禁用', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'read-only', title: '是否只读', default: false,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'clearable', title: '是否启用清除', default: true,
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'rules', title: '校验规则', default: [],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.rules,
                attach: [ Enum.FormControlPropertyEditor.expression ],
                remark: '控件值校验规则。',
                attrs: { type: Enum.FormControlRuleType.select }
            }, {
                name: 'model', title: '绑定变量', type: 'string[]', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
            }, {
                name: 'rowKey', title: '标识列字段', default: 'id', remark: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'rowTextKey', title: '文本列字段', default: 'text', remark: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'dataSource', title: '数据源', require: true, default: [],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.json,
                attach: [ 
                    Enum.FormControlPropertyEditor.variable, 
                    Enum.FormControlPropertyEditor.expression, 
                    Enum.FormControlPropertyEditor.basicData, 
                    Enum.FormControlPropertyEditor.viewData, 
                    Enum.FormControlPropertyEditor.api
                ]
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
                            width: '120px',
                            editor: Enum.FormControlPropertyEditor.singerLine
                        }, {
                            name: 'title',
                            title: '标题',
                            editor: Enum.FormControlPropertyEditor.singerLine
                        }, {
                            name: 'width',
                            title: '宽度',
                            width: '60px',
                            editor: Enum.FormControlPropertyEditor.int
                        }, { 
                            name: 'align', 
                            title: '对齐', 
                            editor: Enum.FormControlPropertyEditor.list, 
                            width: '60px',
                            attrs: {
                                options: [
                                    { title: '左', value: 'left' }, 
                                    { title: '中', value: 'center' }, 
                                    { title: '右', value: 'right' }
                                ]
                            }
                        }
                    ],
                    onRemove: (value, index, control) => !control?.children?.[index]?.length,
                    onChange(control, index, removeCount, insertCount) { 
                        [].splice.apply(control.children, [index, removeCount].concat(new Array(insertCount).fill([])) as [number, number, ...never[]])
                    }
                }
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
            control: 'antd-form-design-control-radio-group', //van-radio-group
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
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'labelField', title: '文本属性', default: 'label',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'valueField', title: '值属性', default: 'value',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'options', title: '列表项', default: [ 
                    { value: '1', label: '单选框 1' } 
                ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attach: [
                    Enum.FormControlPropertyEditor.variable, 
                    Enum.FormControlPropertyEditor.expression, 
                    Enum.FormControlPropertyEditor.basicData, 
                    Enum.FormControlPropertyEditor.viewData, 
                    Enum.FormControlPropertyEditor.api
                ],
                attrs: { rowKey: 'title', columns: [
                    { name: 'value', width: '30%', title: '值', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    { name: 'label', width: '40%', title: '文本', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    { name: 'disabled', width: '30%', title: '禁用', editor: Enum.FormControlPropertyEditor.boolean, default: false, attrs: { } },
                ] }
            }, {
                name: 'rules', title: '校验规则', default: [],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.rules,
                attach: [ Enum.FormControlPropertyEditor.expression ],
                remark: '控件值校验规则。',
                attrs: { type: Enum.FormControlRuleType.select }
            }, {
                name: 'model', title: '绑定变量', type: 'string',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
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
            control: 'antd-form-design-control-checkbox-group',
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
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'labelField', title: '文本属性', default: 'label',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'valueField', title: '值属性', default: 'value',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'options', title: '列表项', default: [ 
                    { value: '1', label: '单选框 1' } 
                ],
                layout: Enum.PropertyLayout.block,
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.modelList,
                attach: [
                    Enum.FormControlPropertyEditor.variable, 
                    Enum.FormControlPropertyEditor.expression, 
                    Enum.FormControlPropertyEditor.basicData, 
                    Enum.FormControlPropertyEditor.viewData, 
                    Enum.FormControlPropertyEditor.api
                ],
                attrs: { rowKey: 'title', columns: [
                    { name: 'value', width: '30%', title: '值', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    { name: 'label', width: '40%', title: '文本', editor: Enum.FormControlPropertyEditor.singerLine, attrs: { } },
                    { name: 'disabled', width: '30%', title: '禁用', editor: Enum.FormControlPropertyEditor.boolean, default: false, attrs: { } },
                ] }
            }, {
                name: 'rules', title: '校验规则', default: [],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.rules,
                attach: [ Enum.FormControlPropertyEditor.expression ],
                remark: '控件值校验规则。',
                attrs: { type: Enum.FormControlRuleType.select }
            }, {
                name: 'model', title: '绑定变量', type: 'string',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
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
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.boolean,
                attach: [ Enum.FormControlPropertyEditor.variable, Enum.FormControlPropertyEditor.expression ]
            }, {
                name: 'model', title: '绑定变量', type: 'boolean',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.variable
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
            control: 'antd-form-design-control-upload',
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
        isFormItem: true,
        type: Enum.FormControlType.upload,
        propertys: [
            {
               name: 'btn-text', title: '按钮文本', default: '点击上传',
               group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'upload-tip', title: '文字提示', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'listType', title: '文件列表样式', default: 'text',
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ 
                    { title: '普通文件 Text', value: 'text' },
                    { title: '图片模式 Picture', value: 'picture' },
                    { title: '图片卡片 Picture-Card', value: 'picture-card' },
                ] }
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
                name: 'name', title: '文件参数名', default: 'file',
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
                name: 'url', title: '上传地址', 
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.api,
                attrs: { hasFormatter: false, hasParams: false }
            }, {
                name: 'result-type', title: '结果类型', default: 'file',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.list,
                attrs: { options: [ { title: '文件 File', value: 'file' }, { title: '文本 Text', value: 'text' } ] }
            }, {
                name: 'data', title: '附加参数', default: '(file) => {}',
                group: Enum.FormControlPropertyGroup.action, editor: Enum.FormControlPropertyEditor.expression,
            }, {
                name: 'headers', title: '请求头部', default: '{}',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.expression
            }, {
                name: 'rules', title: '校验规则', default: [],
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.rules,
                attach: [ Enum.FormControlPropertyEditor.expression ],
                remark: '控件值校验规则。',
                attrs: { type: Enum.FormControlRuleType.upload }
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
                name: 'renderFn', title: 'JS表达式', default: '', remark: '使用JS构造字符串或节点，节点构造函数是h()，对应页面vue对象的变量是me。',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.javascript,
            }
        ],
        events: [
            
        ],
        render() {
            if (this.control.attrs.label) {
                let _attrs = this.control.attrs;
                return `<a-form-item label="${_attrs.label}" :colon="false" :label-col="{ span: ${_attrs.labelSpan}, offset: ${_attrs.labelOffset} }" :wrapper-col="{ span: ${_attrs.wrapperSpan}, offset: ${_attrs.wrapperOffset} }">
    <span class="control-custom ant-form-text">{{${this.control.attrs.renderFn.replace(/\bme\.\b/g, '')}}}</span>
</a-form-item>`;
            } else {
                return `<span class="control-custom ant-form-text">{{${this.control.attrs.renderFn.replace(/\bme\.\b/g, '')}}}</span>`;
            }
        }
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
                current: 0,
                total: 999
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
        isOriginal: true,
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
                attrs: { options: [ { title: '左侧 Left', value: 'left' }, { title: '居中 Center', value: '' }, { title: '右侧 Right', value: 'right' } ] }
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
        isOriginal: true,
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
                    onRemove: (value, index, control) => !control?.children?.[index]?.length,
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
                //     // propMap['view-data'].visible = value == JSON.parse(value);
                // }
            }
        ],
        events: [
            
        ]
    }, 
]

export function initAntDesignControls(controlList?: Array<FormDesign.FormControl>) {
    if (!controlList) {
        controlList = formControls;
    }

    let _blankPropertys: FormDesign.FormControlProperty[] = [];

    let _propertys: FormDesign.FormControlProperty[] = [
        {
            name: 'id', title: '控件编号', default: '',
            group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine,
            remark: '在页面中调用控件属性或函数使用的控件编号。',
            attrs: { readonly: true }
        }, {
            name: 'remark', title: '备注名', default: '',
            group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
        }
    ];

    const _getBasicProps = (control) => {
        return control.type == 'hidden' ? _propertys : basicProps;
    }

    return controlList.map(i => ({
        ...i,
        propertyEditors: Object.assign.apply({}, [{}].concat(_blankPropertys
            .concat(_getBasicProps(i))
            .concat(i.propertys)
            .concat(i.isFormItem ? [...flexItemProps, ...columnItemProps, ...formItemProps] : [])
            .filter(o => o.attach?.length)
            .map(o => {
                return {[o.name]: o.editor};
            })) as [object, ...FormDesign.FormControlProperty[]]
        ),
        control: {
            ...i.control,
            propertys: _getBasicProps(i).concat(i.propertys).map(prop => ({
                ...prop,
                
            })).concat([
                
            ]),
            attrs: Object.assign.apply({}, [{}].concat(Object.entries(i.control.defaultAttrs as Record<string, any>)
                .map(([key, value]) => ({[key]:value}))
                .concat(
                    _blankPropertys
                    .concat(_getBasicProps(i))
                    .concat(i.propertys)
                    .concat(i.isFormItem ? [...flexItemProps, ...columnItemProps, ...formItemProps] : [])
                    .filter(o => o.default !== undefined)
                    .map(o => ({[o.name]: o.default}))
                )
                .concat(
                    Object.entries(i.control.attrs)
                        .map(([key, value]) => ({[key]:value}))
                )) as [object, ...FormDesign.FormControlProperty[]]
            )
        },
        propertys: [
            ..._getBasicProps(i),
            ...i.propertys
        ]
    }))
}