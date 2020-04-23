import FormDesign from '@/@types/form-design';
import { formControls, initAntDesignControls, formItemProps, columnItemProps, basicProps } from "@/formControls_antd.tsx";
import { cloneForce } from "@/lib/clone";
import axios from 'axios';
import common, { createModelId } from './common';
import store from '@/config/store';

/** 获取数据源
 * @param {any} dataSource 数据源
 * @param {any} type 类型
 * @param {object} [options={}] 配置项
 */
export function getDataSource(dataSource: any, type: any, options: { map?: (arr: any) => any, filter?: (arr: any) => boolean } = {}): Promise<Record<string, any>[]> {
    if (!type) throw new Error('类型参数不能为空。');
    
    let re: Promise<Record<string, any>[]> = new Promise((resolve, reject) => resolve([]));

    const _exec = (_re) => {
        if (options.map && _re?.map) {
            _re = _re.map(options.map);
        }
        if (options.filter && _re?.filter) {
            _re = _re.filter(options.filter);
        }
        return _re;
    }
    
    switch (type) {
        case 'model-list':
            re = new Promise((resolve, reject) => resolve(_exec(dataSource)));
            break;
        case 'json':
            re = new Promise((resolve, reject) => resolve(_exec(dataSource)));
            break;
        case 'variable':
            if (typeof(dataSource) == 'string') {
                re = new Promise((resolve, reject) => {
                    try {
                        console.log(store.getters);
                        let _re = Function('__data__', 'return __data__.' + dataSource)(store.getters?.getFormScript?.data);
                        
                        resolve(_exec(_re));
                    } catch (error) {
                        reject(error);
                    }
                });
            } else {
                re = new Promise((resolve, reject) => resolve(_exec(dataSource)));
            }
            break;
        case 'expression':
            re = new Promise((resolve, reject) => resolve(_exec(Function('__data__', 'let me = __data__; return ' + dataSource)({
                ...store.getters?.getFormScript?.data,
                ...store.getters?.getformScript?.methods
            }))));
            break;
        case 'basic-data':
            re = common.post('ExtenalApi/GetBasicDataById', {
                enterpriseId: store.getters.getEnterpriseId, 
                languageCulture: "zh-CN",
                code: dataSource,
                filters: {}
            }).then(d => new Promise((resolve, reject) => resolve(_exec(d))));
            break;
        case 'view-data':
            re = common.post('ExtenalApi/GetViewTable', {
                enterpriseId: store.getters.getEnterpriseId, 
                languageCulture: "zh-CN",
                code: dataSource,
                filters: {}
            }).then(d => new Promise((resolve, reject) => {
                if (d.viewTable) {
                    resolve(_exec(d.viewTable));
                } else {
                    reject();
                }
            }));
            break;
        default:
            if (type?.type === 'api') {
                let api: FormDesign.Api | undefined = store.getters?.getApiList?.find(i => i.address == dataSource?.address);
                if (api) {
                    re = axios.request({
                        method: api.type,
                        url: api.address,
                        [{ get:'params', post: 'data' }[api.type]]: dataSource?.params ? Function(dataSource.params)() : {}
                    }).then(d => new Promise((resolve, reject) => resolve(_exec(dataSource?.formatter ? (Function(dataSource.formatter)()(d)) : d))));
                } else {
                    throw new Error('API不存在。');
                }
            }
            break;
    }

    return re;
}

/** 填充控件属性 */
export function fillPropertys(controls: Array<FormDesign.FormControl>, componentLibraryName: string): Array<FormDesign.FormControl> {
    
    /** 原始组件列表 */
    let _originalControlList: Array<FormDesign.FormControl> = cloneForce(controls);
    /** 对应组件库组件列表 */
    let _controlList: Array<FormDesign.FormControl> = [];
    /** 初始化组件函数 */
    let _initControls: Function = () => {};

    switch (componentLibraryName) {
        case 'ant-design':
            _controlList = formControls;
            _initControls = initAntDesignControls;
            break;
        case 'vant':

            break;
        case 'uni':

            break;
        default:
            throw new Error(`找不到${componentLibraryName}组件库。`);
    }
    
    const _cb = (list: Array<FormDesign.FormControl>) => {
        if(list?.length) {
            for (let i = 0; i < list.length; i++) {
                let _children = list[i].children;

                let _control = _controlList.find(control => control.name == list[i].name);
                if (_control) {
                    list[i].id = createModelId(10);
                    list[i].control.defaultAttrs = cloneForce(_control.control.defaultAttrs);
                    list[i].autoPrefix = _control.autoPrefix;
                    list[i].title = _control.title;
                    list[i].type = _control.type;
                    list[i].isFormItem = _control.isFormItem;
                    list[i].propertys = cloneForce(_control.propertys);
                    list[i].render = _control.render;
                    list[i].isHide = _control.isHide;
                    list[i].isOriginal = _control.isOriginal;
                }

                if (_children?.length) {
                    for (let o = 0; o < _children.length; o++) {
                        _cb(_children[o]);
                    }
                }
            }
            let _list = _initControls(list);
            for (let index = 0; index < list.length; index++) {
                list[index] = {
                    ..._list[index],
                    // propertyEditors: list[index].propertyEditors
                };
            }
        }
    };
    
    _cb(_originalControlList);

    return _originalControlList;
}

/** 拍平控件树 */
export function flatControls(controls: Array<FormDesign.FormControl>) {

    let _controlList: Array<FormDesign.FormControl> = [];

    const _cb = (list: Array<FormDesign.FormControl>) => {
        if(list?.length) {
            for (let i = 0; i < list.length; i++) {
                let _children = list[i].children;
                
                _controlList.push(list[i]);

                if (_children?.length) {
                    for (let o = 0; o < _children.length; o++) {
                        _cb(_children[o]);
                    }
                }
            }
        }
    };
    
    _cb(controls);

    return _controlList;
}

/** 获取变量真实值 */
export function getValue(variable: FormDesign.FormVariable) {
    return variable.default;
}

/** 根据变量返回对应类型的原始变量字符串 */
export function getDefaultStrForValue(val: any): string {
    if (typeof(val) != 'object') {
        switch (typeof(val)) {
            case 'string': return '\"\"';
            case 'number': return '0';
            case 'boolean': return 'false';
            case 'function': return '() => {}';
            case 'symbol': return 'Symbol()';
            default: return 'undefined';
        }
    } else {
        let type = Object.prototype.toString.apply(val).slice(8, -1);

        if (type == 'Object') return JSON.stringify(val, undefined, '    ').split('\n').map((i, index) => {
            if (index > 0) return '    ' + i.replace(/"\S+":/g, txt => txt.slice(1, -2) + ':');
            else return i;
        }).join('\n');
        else return `new ${val}()`;
    }
}

/** 解析函数并获取函数头 */
export function functionHeaderParse(match: [string, string], content: string): { body: string, bodyRanges: Array<Array<number>> } {
    let _regRange = new RegExp(`${match[0]}|${match[1]}`, 'g');
    let _item: RegExpExecArray | null = null;
    let _rangeIndex = 0;
    let _functionRanges: Array<Array<number>> = [];
    let _content = content;

    while(_item = _regRange.exec(_content)) {
        if (_item !== null) {
            if (!_functionRanges[_rangeIndex]) {
                _functionRanges[_rangeIndex] = [_item.index, 0];
            }
            switch (_content[_item.index]) {
                case match[0]:
                    _functionRanges[_rangeIndex][1] = _functionRanges[_rangeIndex][1] + 1;
                    break;
                case match[1]:
                    _functionRanges[_rangeIndex][1] = _functionRanges[_rangeIndex][1] - 1;
                    break;
                default:
                    break;
            }
            if (_functionRanges[_rangeIndex][1] == 0) {
                _functionRanges[_rangeIndex][1] = _item.index;
                _rangeIndex++;
            }
        }
    }

    for (let index = _functionRanges.length - 1; index >= 0; index--) {
        _content = `${_content.substr(0, _functionRanges[index][0])};${_content.substr(_functionRanges[index][1] + 1)}`;
    }
    
    return {
        body: _content,
        bodyRanges: _functionRanges
    };
}

/** 获取真实属性 */
export function getRealProp(control: FormDesign.FormControl, propName: string, script: FormDesign.FormScript) {
    const props = control.control.attrs;

    if (!props['__' + propName]) return props[propName];

    let _editor = control.propertyEditors?.[propName];
    let _value = props['__' + propName];
    switch (_editor) {
        case 'expression':
            _value = Function('__data__', 'let me = __data__; return ' + _value)({
                ...script.data instanceof Function ? script.data() : script.data,
                ...script.methods
            });
            break;
    }

    return _value;
}

export function getRealProps(control: FormDesign.FormControl, script: FormDesign.FormScript) {
    return Object.keys(control.control.attrs).map(i => getRealProp(control, i, script));
}

/** 解析Vue代码 */
export function variableVueScript(strVariable: string): { script: FormDesign.FormScript, comment: Record<string, string> } {
    let _reg = /\/\*\*\s*(?<remark>.*?)\s*\*\/\s*(?<name>[a-zA-Z0-9_]+)(:|\()/g;
    let _item: RegExpExecArray | null;
    let _list: Record<string, string> = {};
    while(_item = _reg.exec(strVariable)) {
        if (_item !== null) {
            _list[_item.groups?.name || ''] = _item.groups?.remark || '';
        }
    }
    return {
        script: Function(strVariable)() as FormDesign.FormScript,
        comment: _list
    };
}

/** 判断节点是否为高级子表单的子节点 */
export function isFormChild(controlId, controls: FormDesign.FormControl[]) {
    return controls
        .filter(i => i.name == 'complex-childform')
        .map(i => i.children)
        .flat(2)
        .map(i => i.id)
        .includes(controlId);
}

/** 判断节点是否为Flex的子节点 */
export function isFlexChild(controlId, controls: FormDesign.FormControl[]) {
    return controls
        .filter(i => i.name == 'flex')
        .map(i => i.children)
        .flat(2)
        .map(i => i.id)
        .includes(controlId);
}

/** 导出Vue模板代码 */
export function exportTemplate({ formConfig, panel }: { formConfig: FormDesign.FormConfig, panel: FormDesign.FormPanel }) {
    
    let _control: FormDesign.FormControl;

    /** 构造控件的属性 */
    const _generateAttrs = (control: FormDesign.BasicControl, config?: { in?: string[], out?: string[] }, isTableChild: boolean = false) => {
        let _re = '';
        _re += Object.entries(control.attrs || {}).filter(([key, value]) => value).map(([key, value]) => {
            if (config?.in?.includes(key) === false) return '';
            if (config?.out?.includes(key) === true) return '';

            const _isSync = _control.propertys.find(i => i.name == key)?.isSync === true;

            if (key.startsWith('__')) return '';

            // TODO: 需要在这加上关于其他通用属性的校验！
            const _propertys = _control.propertys;
            
            if (formConfig.formComponentLib == 'ant-design') {
                _propertys.concat(basicProps);
                
                if (isFormChild(_control.id, panel.children)) {
                    _propertys.concat(columnItemProps);
                } else if (isFlexChild(_control.id, panel.children)) {
                    _propertys.concat(formItemProps);
                } else if (_control.isFormItem) {
                    _propertys.concat(formItemProps);
                }
            }
            
            /** 是否为原始 */
            const _isOriginalType = _control?.propertyEditors?.[key] === undefined || _propertys?.find?.(i => i?.name == key)?.editor === _control?.propertyEditors?.[key];

            let _reStr = '';

            if (_isOriginalType === false) {
                _reStr += `${key}_type='${_control?.propertyEditors?.[key]}' `;
                value = control.attrs['__' + key];
            } else {
                const _propType = _propertys.find(i => i.name == key)?.editor || _control?.propertyEditors?.[key];
                _reStr += `${key}_type='${_propType}' `;
            }

            // 如果是明细表下面的组件
            if (isTableChild) {
                switch (key) {
                    case 'remark': return '';
                    case 'dataIndex': return `:model='"detail_" + index + "_${value}"' v-model='record.${value}'`;
                    case 'visible': return `v-show='${value}'`;
                    case 'model': 
                    case 'label':
                        return '';
                    default:
                        break;
                }
            } else {
                switch (key) {
                    case 'remark': return '';
                    case 'model': return `model='${value}' v-model='${value}'`;
                    case 'visible': return `v-show='${value}'`;
                    default:
                        break;
                }
            }
            
            if (_control?.propertyEditors?.[key]) {
                switch (_control?.propertyEditors?.[key]) {
                    case 'boolean':
                    case 'pixel':
                    case 'int':
                    case 'float':
                    case 'byte':
                    case 'list':
                    case 'javascript':
                    case 'function':
                        _reStr += `:${key}${_isSync?'.sync':''}='${value}'`;
                        break;
                    case 'expression':
                    case 'variable':
                        _reStr += `:${key}${_isSync?'.sync':''}='${value}'`;
                        break;
                    case 'singer-line':
                    case 'multi-line':
                    case 'color':
                    case 'icon':
                        _reStr += `${key}='${value}'`;
                        break;
                    case 'json':
                    case 'model-list':
                        _reStr += ` :${key}${_isSync?'.sync':''}='${JSON.stringify(value)}'`;
                        break;
                    case 'rules':
                        if (value.length) {
                            let _ruleTxt = '';
                            _ruleTxt += `:${key}='[`;
                            _ruleTxt += value.map(i => {
                                let _ruleItem = Object.entries(i).map(([ruleKey, ruleValue]) => {
                                    let _ruleValue = ruleValue;
                                    if (typeof(_ruleValue) === 'string') return `${ruleKey}: "${ruleValue}"`;
                                    else return `${ruleKey}: ${ruleValue}`;
                                }).join(', ');
                                return `{ ${_ruleItem} }`.replace(/\{\{value\}\}/g, i[i.category]);
                            }).join(', ').replace(/\{\{label\}\}/g, control.attrs.label);
                            _ruleTxt += ']\'';
                            return `${_ruleTxt}`;
                        } else {
                            return '';
                        }
                        break;
                    case 'view-data':
                    case 'basic-data':
                    case 'api':
                        _reStr += ` ${key}='${control.attrs['__' + key]}'`;
                        break;
                    case 'box':
                        break;
                    default:
                        break;
                }
                return _reStr;
            }
            let _value = value;
            if (value instanceof Object || value instanceof Array) {
                _value = JSON.stringify(value);
            }
            // if (control.attrs['__' + key]) return '';
            
            if (typeof(_value) === 'string') return `${key}='${_value.replace(/me\./g, 'this.').replace(/'/g, '\\\'')}'`;
            else return `:${key}${_isSync?'.sync':''}='${_value}'`;
        }).filter(i => i).join(' ');

        let _events = Object.entries(control.events || {});
        if (_events.length) {
            _re += ' ';
            _re += _events.map(([key, value]) => {
                let _value = value;
                if (value instanceof Object || value instanceof Array) {
                    _value = JSON.stringify(value);
                }
                return `@${key}='${_value}'`;
            }).filter(i => i).join(' ');
        }
        return _re;
    };

    /** 构造单个基础控件 */
    const _generateSingerBasicControl = (control: FormDesign.BasicControl, level, mainIndex?: number) => {
        let _re = '';
        _re += `<${control.control} `;
        _re += _generateAttrs(control);
        if (control.control == 'a-divider') {
            debugger;
            _re += ` name="d${mainIndex}" `;
        }
        let _slots = Object.entries(control.slot);
        if (_slots.length) {
            _re += '\n';
            _slots.map(([key, value]) => {
                _re += `${'    '.repeat(level + 1)}<template #${key}>\n`;
                _re += value.map(item => _generateSingerBasicControl(item, level + 2));
                _re += `${'    '.repeat(level + 1)}</template>\n`;
            }).join('\n\n');
            _re += `${'    '.repeat(level)}`;
        }
        _re += `</${control.control}>\n`;
        return _re;
    };

    /** 构造单个控件 */
    const _generateSingerControl = (control: FormDesign.FormControl, level, pControl?: FormDesign.FormControl, mainIndex?: number) => {
        _control = control;
        let _re = '';
        let _reControl = '';
//         if (control.isFormItem) {
//             let _attrs = control.control.attrs;
//             _re += `<a-form-item class="" :colon="false" :label-col="{ span: ${_attrs.labelSpan}, offset: ${_attrs.labelOffset} }" :wrapper-col="{ span: ${_attrs.wrapperSpan}, offset: ${_attrs.wrapperOffset} }" ${_generateAttrs(control.control, { in: ['label', 'labelCol'] })}>
// {{control}}
// </a-form-item>`.split('\n').map(i => (i.startsWith('{{') ? '' : '    '.repeat(level)) + i).join('\n');
//             level++;
//         } else {
//             _re += '{{control}}';
//         }
        _re += '{{control}}';
        if (control.render) {
            let _renderTemplete = control.render(control).split('\n').map(i => (i.startsWith('{{') ? '' : '    '.repeat(level)) + i).join('\n');
            _renderTemplete = _renderTemplete.replace('{{attrs}}', _generateAttrs(control.control, {}, pControl?.name === 'complex-childform'));
            let _children: FormDesign.FormControl[] = control.children?.flat(2) || [];
            _renderTemplete = _renderTemplete.replace(/\{\{children_(\d+)\}\}/g, (txt, index) => {
                if (_children[Number(index)]) {
                    return _generateSingerControl(_children[Number(index)], level + 2, control, mainIndex);
                } else {
                    return '';
                }
            });
            _reControl += _renderTemplete;
        } else {
            if (pControl?.name === 'complex-childform') {

                if (control.control.attrs.onlyText) {
                    return _re.replace('{{control}}', `{{text}}`);
                }
            }
            if (control.isOriginal === true) {
                _reControl += `${'    '.repeat(level)}<${control.control.control} `;
            } else {
                _reControl += `${'    '.repeat(level)}<form-control :form="form" :onlyText="isOnlyText" control='${control.control.control}' `;
            }
            if (control.ref) {
                _reControl += `ref='${control.ref}' `;
            }
            _reControl += _generateAttrs(control.control, {}, pControl?.name === 'complex-childform');
            _reControl += `>`;
            if (control.control.attrs.text) {
                _reControl += control.control.attrs.text;
            }
            if (control.children) {
                control.children.forEach((child, childIndex) => {
                    if (child) {
                        _reControl += `<template #child${childIndex}>`;
                        _reControl += child.flat(1).map(child => _generateSingerControl(child, level + 1, control, mainIndex));
                        _reControl += '</template>';
                    }
                });
            }
            
            let _slots = Object.entries(control.control.slot);
            if (_slots.length) {
                _reControl += '\n';
                _slots.map(([key, value]) => {
                    _reControl += `${'    '.repeat(level + 1)}<template #${key}>\n`;
                    _reControl += value.map(item => _generateSingerBasicControl(item, level + 2));
                    _reControl += `${'    '.repeat(level + 1)}</template>\n`;
                }).join('\n\n');
                _reControl += `${'    '.repeat(level)}`;
            }
            if (control.isOriginal === true) {
                _reControl += `</${control.control.control}>`;
            } else {
                _reControl += `</form-control>`;
            }
            
        }
        return _re.replace('{{control}}', _reControl);
    };
    
    /** 递归构造控件 */
    const _generateControlStr = (controls: FormDesign.FormControl[]) => {
        let _re = '';
        _re += controls.map((i, index) => _generateSingerControl(i, 2, undefined, index)).join('\n');
        return _re;
    };

    /** 构造Vue页面文件 */
    let _vueTxt = `<div>
    <!-- FormTitle  : ${formConfig.formTitle} -->
    <!-- FormName   : ${formConfig.formName} -->
    <!-- CreateDate : ${new Date().format('yyyy-MM-dd HH:mm')} -->

    <div class="page-${formConfig.formName}">

        <h1 class="form-title">${formConfig.formTitle}</h1>

${_generateControlStr(panel.children)}
        
    </div>
</div>`;

    console.log(_vueTxt);
    return _vueTxt;
}