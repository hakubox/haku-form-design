import FormDesign from '@/@types/form-design';
import { formControls, initAntDesignControls } from "@/formControls_antd";
import { cloneForce } from "@/lib/clone";
import { createModelId } from './common';

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
                    list[i].propertyEditors = cloneForce(_control.propertyEditors);
                    list[i].propertys = cloneForce(_control.propertys);
                }

                if (_children?.length) {
                    for (let o = 0; o < _children.length; o++) {
                        _cb(_children[o]);
                    }
                }
            }
            let _list = _initControls(list);
            for (let index = 0; index < list.length; index++) {
                list[index] = _list[index];
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

/** 解析变量 */
export function variableParse(strVariable: string): Array<FormDesign.FormVariable> {
    const _strVariables = strVariable.trim().replace(/\r|\n/g, '');

    /** 解析子节点变量 */
    const _parseChildren = (value: string, parent: FormDesign.FormVariable, regExp: RegExpExecArray) => {
        const _value = value.replace(/\r|\n/g, '').trim();
        const _reg = /(\/\*\*\s*(?<remark>\S+)\s*?\*\/[\s\n\r\t]*)?(?<name>[a-zA-Z0-9_]+)\s*:\s*(?<default>'\S+?'|"\S+?"|\[.*?\]|\{.*?\}|[^\s,{}]+?)(,|\s*$)/g;
        const _list: Array<FormDesign.FormVariable> = [];
        let _item: RegExpExecArray | null = null;
        if (regExp.groups) {
            parent.children = _list;

            while(_item = _reg.exec(_value)) {
                if (_item !== null) {
                    let _var: FormDesign.FormVariable = {
                        ..._item.groups,
                        keyword: (_item.groups?.keyword as ('let' | 'var' | 'const')) || 'let',
                        name: _item.groups?.name || '',
                        type: _item.groups?.type || undefined,
                        default: _item.groups?.default || undefined
                    };
                    if (!_var.type) {
                        if (_var.default) {
                            if (!isNaN(+_var.default)) {
                                _var.type = 'number';
                                _var.default = JSON.parse(_var.default);
                            }
                            if (typeof(_var.default) != 'object') {
                                _var.default = Function('return ' + _var.default)();
                                _var.type = typeof(_var.default);
                            } else {
                                _var.type = Object.prototype.toString.call(_var.default).slice(8, -1);
                                // _var.default = JSON.parse(_var.default);
                                _parseChildren(_var.default.trim().slice(1, -1), _var, _item);
                            }
                        } else {
                            _var.type = 'any';
                        }
                    } else if (_var.type != 'string' && _var.default) {
                        _var.default = Function('return ' + _var.default)();
                    }
                    _list.push(_var);
                }
            }
        }
    };

    const _reg = /(\/\*\*\s*(?<remark>\S+)\s*\*\/[\s\n\r\t]*)?(?<keyword>var|let|const)\s(?<name>[a-zA-Z0-9_]+)\s*(:\s*(?<type>[^=]+)\s*)?(\s*=\s*)?(?<default>'\S+?'|"\S+?"|\[.*?\]|\{.*?\}|[^\s,{}]+?)?(;|$)/g;
    const _list: Array<FormDesign.FormVariable> = [];
    let _item: RegExpExecArray | null = null;
    /** 最外层变量识别 */
    while(_item = _reg.exec(_strVariables)) {
        if (_item !== null) {
            let _var: FormDesign.FormVariable = {
                ..._item.groups,
                keyword: (_item.groups?.keyword as ('let' | 'var' | 'const')) || 'let',
                name: _item.groups?.name || '',
                type: _item.groups?.type || undefined,
                default: _item.groups?.default || undefined
            };
            if (!_var.type) {
                if (_var.default) {
                    if (!isNaN(+_var.default)) {
                        _var.type = 'number';
                        _var.default = JSON.parse(_var.default);
                    }
                    if (typeof(_var.default) != 'object') {
                        _var.default = JSON.parse(_var.default);
                        _var.type = typeof(_var.default);
                    } else {
                        _var.type = Object.prototype.toString.call(_var.default).slice(8, -1);
                        _var.default = Function('return ' + _var.default)();
                        _parseChildren(_item.groups?.value.trim().slice(1, -1) as string, _var, _item);
                    }
                } else {
                    _var.type = 'any';
                }
            } else if (_var.type != 'string' && _var.default) {
                if (_var.default.trim().startsWith('{') && _var.default.trim().endsWith('}')) {
                    _var.default = Function('return ' + _var.default)();
                    _parseChildren(_item.groups?.default as string, _var, _item);
                } else {
                    _var.default = Function('return ' + _var.default)();
                }
            }
            _list.push(_var);
        }
    }

    console.log(_list);
    return _list;
}