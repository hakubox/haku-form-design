import FormDesign from './@types/form-design';

/** 组件分组列表 */
let _controlGroups: Array<FormDesign.FormControlGroup> = [
    {
        name: 'layout',
        title: '布局控件',
        icon: 'layout',
        controls: []
    }, {
        name: 'input',
        title: '输入控件',
        icon: 'edit',
        controls: []
    }, {
        name: 'select',
        title: '选择控件',
        icon: 'select',
        controls: []
    }, {
        name: 'upload',
        title: '上传控件',
        icon: 'cloud-upload',
        controls: []
    }, {
        name: 'else',
        title: '其他控件',
        icon: 'inbox',
        controls: []
    }
];

export function initFormControlGroups(): Array<FormDesign.FormControlGroup> {
    return _controlGroups;
}