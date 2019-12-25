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