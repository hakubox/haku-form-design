import FormDesign from './@types/form-design';
import { Enum } from '@/config/enum';
import { icons } from '@/iconEditor';
import { post } from './tools/common';
import serviceConfig from '@/config/service.ts';

const _service = serviceConfig;

const propertyEditors: Array<FormDesign.PropertyEditor> = [
    {
        name: 'any',
        description: '任意',
        control: [
            {
                control: 'a-input',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    size: 'small'
                },
                events: {},
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.any,
        format: val => eval(val)
    }, {
        name: 'pixel',
        description: '像素',
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
                },
                events: {},
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.pixel,
        format: val => val + 'px'
    }, {
        name: 'color',
        description: '颜色',
        control: [
            {
                control: 'color-picker',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    addonAfter: '颜色',
                    size: 'small'
                },
                events: {},
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.color
    }, {
        name: 'byte',
        description: '字节',
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
                },
                events: {},
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.byte
    }, {
        name: 'singer-line',
        description: '单行文本',
        control: [
            {
                control: 'a-input',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    size: 'small'
                },
                events: {},
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.singerLine
    }, {
        name: 'multi-line',
        description: '多行文本',
        control: [
            {
                control: 'a-textarea',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    size: 'small',
                    autosize: { minRows: 2, maxRows: 6 }
                },
                events: {},
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.multiLine
    }, {
        name: 'boolean',
        description: '真假',
        control: [
            {
                control: 'a-switch',
                slot: {},
                attrs: {
                    checkedChildren: '是',
                    unCheckedChildren: '否'
                },
                events: {},
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.boolean
    }, {
        name: 'int',
        description: '整数',
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
                },
                events: {},
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.int
    }, {
        name: 'float',
        description: '小数',
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
                },
                events: {},
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.float
    }, {
        name: 'list',
        description: '列表',
        control: [
            {
                control: 'a-select',
                slot: {},
                attrs: {
                    allowClear: false,
                    buttonStyle: 'solid',
                    style: { width: '100%' },
                    size: 'small'
                },
                events: {},
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.list
    }, {
        name: 'view-data',
        description: '视图',
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
                    get options() { return _service.viewData }
                },
                events: {}, 
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.viewData
    }, {
        name: 'basic-data',
        description: '基础数据',
        control: [
            {
                control: 'a-select',
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
                    get options() { return _service.baseData }
                }, 
                events: {}, 
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.basicData
    }, {
        name: 'icon',
        description: '图标',
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
        name: 'json',
        description: 'JSON',
        control: [
            {
                control: 'object-editor',
                slot: {},
                attrs: {
                    isFormExpression: true,
                    language: 'javascript',
                    options: {
                        lineNumbers: "off",
                        scrollBeyondLastLine: false,
                    },
                    style: { width: '100%', height: '300px' }
                },
                events: {}, 
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.json
    }, {
        name: 'javascript',
        description: 'Javascript',
        control: [
            {
                control: 'code-editor',
                slot: {},
                attrs: {
                    isFormExpression: true,
                    language: 'javascript',
                    options: {
                        lineNumbers: "off",
                        scrollBeyondLastLine: false,
                    },
                    style: { width: '100%', height: '300px' }
                },
                events: {}, 
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.javascript
    }, {
        name: 'model-list',
        description: '对象列表',
        control: [
            {
                control: 'model-list-editor',
                slot: {},
                attrs: {
                },
                events: {}, 
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.modelList
    }, {
        name: 'expression',
        description: '表达式',
        control: [
            {
                control: 'code-editor',
                slot: {},
                attrs: {
                    isFormExpression: true,
                    language: 'javascript',
                    options: {
                        lineNumbers: "off",
                        scrollBeyondLastLine: false,
                    },
                    style: { width: '100%', height: '80px' }
                },
                events: {}, 
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.singerLine
    }, {
        name: 'variable',
        description: '变量',
        control: [
            {
                control: 'variable-picker',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    size: 'small'
                },
                events: {}, 
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.singerLine
    }, {
        name: 'function',
        description: '函数',
        control: [
            {
                control: 'function-picker',
                slot: {},
                attrs: {
                    style: { width: '100%' },
                    allowClear: true,
                    size: 'small'
                },
                events: {}, 
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.function
    }, {
        name: 'rules',
        description: '校验规则',
        control: [
            {
                control: 'rules-editor',
                slot: {},
                attrs: {
                },
                events: {}, 
                propAttrs: {}
            }
        ],
        editor: Enum.FormControlPropertyEditor.rules
    }, 
]

export function initPropertyEditors(): Record<string, FormDesign.PropertyEditor> {
    // @ts-ignore
    return Object.assign.apply({}, [{}].concat(propertyEditors.map(i => ({[i.name]: i}))));
}