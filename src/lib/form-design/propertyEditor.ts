import { FormDesign } from '@/@types/form-design';
import { Enum } from '../../config/enum';
import { icons } from './iconEditor';

let propertyEditors: Array<FormDesign.PropertyEditor> = [
    {
        name: 'any',
        control: [
            {
                control: 'a-input',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    size: 'small'
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.any,
        format: val => eval(val)
    }, {
        name: 'pixel',
        control: [
            {
                control: 'a-input',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    maxlength: 4,
                    min: 10,
                    allowClear: true,
                    addonAfter: '像素',
                    size: 'small'
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.pixel,
        format: val => val + 'px'
    }, {
        name: 'color',
        control: [
            {
                control: 'gj-color-picker',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    addonAfter: '颜色',
                    size: 'small'
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.color
    }, {
        name: 'byte',
        control: [
            {
                control: 'a-input-number',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    formatter: value => `${value}byte`,
                    parser: value => value.replace('byte', ''),
                    allowClear: true,
                    size: 'small'
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.byte
    }, 
    
    {
        name: 'singer-line',
        control: [
            {
                control: 'a-input',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    size: 'small'
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.singerLine
    }, {
        name: 'multi-line',
        control: [
            {
                control: 'a-textarea',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    size: 'small',
                    autosize: { minRows: 2, maxRows: 6 }
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.multiLine
    }, {
        name: 'boolean',
        control: [
            {
                control: 'a-switch',
                slot: {},
                attrs: {
                    checkedChildren: '开',
                    unCheckedChildren: '关'
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.boolean
    }, {
        name: 'int',
        control: [
            {
                control: 'a-input-number',
                slot: {},
                attrs: {
                    precision: 0,
                    min: 0,
                    style: { width: '100%' },
                    allowClear: true,
                    size: 'small'
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.int
    }, {
        name: 'float',
        control: [
            {
                control: 'a-input-number',
                slot: {},
                attrs: {
                    step: 0.1,
                    min: 0,
                    style: { width: '100%' },
                    allowClear: true,
                    size: 'small'
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.float
    }, {
        name: 'list',
        control: [
            {
                control: 'a-select',
                slot: {},
                attrs: {
                    buttonStyle: 'solid',
                    style: { width: '100%' },
                    size: 'small'
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.list
    }, {
        name: 'data-source-type',
        control: [
            {
                control: 'a-radio-group',
                slot: {
                    default: [
                        { control: 'a-radio-button', attrs: { value: 'basic-data' }, slot: {}, html: '基础数据' },
                        { control: 'a-radio-button', attrs: { value: 'view-data' }, slot: {}, html: '数据视图' },
                        { control: 'a-radio-button', attrs: { value: 'user' }, slot: {}, html: '用户' },
                        { control: 'a-radio-button', attrs: { value: 'group' }, slot: {}, html: '组织' },
                    ]
                },
                attrs: {
                    buttonStyle: 'solid',
                    style: { width: '100%' },
                    size: 'small'
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.dataSourceType
    }, {
        name: 'view-data',
        control: [
            {
                control: 'a-select',
                slot: {
                },
                attrs: {
                    enterButton: '查询',
                    style: { width: '100%' },
                    placeholder: '选择视图数据',
                    showSearch: true,
                    allowClear: true,
                    size: 'small',
                    options: [
                        { value: 'aaa', label: 'aaa' },
                        { value: 'bbb', label: 'bbb' },
                        { value: 'ccc', label: 'ccc' },
                    ]
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.viewData
    }, {
        name: 'basic-data',
        control: [
            {
                control: 'a-tree-select',
                slot: {},
                attrs: {
                    enterButton: '查询',
                    style: { width: '100%' },
                    placeholder: '选择基础数据',
                    allowClear: true,
                    showSearch: true,
                    size: 'small',
                    filterTreeNode: true,
                    treeDefaultExpandAll: true,
                    treeData: [
                        { value: 'aaa', title: 'aaa', key: 'aaa', children: [
                            { value: 'bbb', title: 'bbb', key: 'bbb' },
                            { value: 'ccc', title: 'ccc', key: 'ccc' },
                        ] },
                    ]
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.basicData
    }, 
    
    // <a-select dropdownClassName="icon-select" defaultValue="lucy" style="width: 200px" :open="true">
    //     <a-select-opt-group>
    //         <span slot="label"><a-icon type="user" />Manager</span>
    //         <a-select-option value="jack"><van-icon name="success" /></a-select-option>
    //         <a-select-option value="lucy"><van-icon name="plus" /></a-select-option>
    //     </a-select-opt-group>
    //     <a-select-opt-group label="Engineer">
    //         <a-select-option value="Yiminghe">yiminghe</a-select-option>
    //     </a-select-opt-group>
    // </a-select>
    {
        name: 'icon',
        control: [
            {
                control: 'a-select',
                event: {},
                attrs: {
                    showSearch: true,
                    style: { 
                        width: '100%',
                        fontFamily: 'vant-icon',
                        color: 'rgba(0, 0, 0, 0.65)',
                        fontSize: '20px',
                        lineHeight: '12px',
                        // fontWeight: '700',
                        verticalAlign: 'middle'
                    },
                    dropdownClassName: 'icon-editor-select',
                    placeholder: '',
                    allowClear: true,
                    size: 'small'
                },
                slot: {
                    //@ts-ignore
                    default: icons.map(i => ({
                        control: 'a-select-option',
                        html: i.label,
                        slot: {
                            default: icons
                        },
                        attrs: {
                            value: i.value
                        }
                    }))
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.icon
    }, {
        name: 'function',
        control: [
            {
                control: 'a-input',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    addonAfter: '函数',
                    size: 'small'
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.function
    }, {
        name: 'json',
        control: [
            {
                control: 'a-textarea',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    size: 'small',
                    autosize: { minRows: 2, maxRows: 6 }
                }
            }
        ],
        editor: Enum.FormControlPropertyEditor.json
    }, 
]

export function initPropertyEditors(): Record<string, FormDesign.PropertyEditor> {
    // @ts-ignore
    return Object.assign.apply({}, [{}].concat(propertyEditors.map(i => ({[i.name]: i}))));
}