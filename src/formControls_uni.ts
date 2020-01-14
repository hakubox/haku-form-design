import FormDesign from '@/@types/form-design';
import { Enum } from '@/config/enum';


let formControls: Array<FormDesign.FormControl> = [

    /**
     * 分页器
     */
    {
        id: '',
        control: {
            control: 'uni-pagination',
            attrs: {},
            events: {},
            propAttrs: {},
            slot: {},
            defaultAttrs: {}
        },
        name: 'pagination',
        icon: '',
        title: '分页器',
        type: Enum.FormControlType.else,
        childrenSlot: '.van-col',
        propertys: [
            {
                name: 'show-icon', title: 'icon形式', default: '', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.boolean
            }, {
                name: 'prev-text', title: '左侧文字', default: '', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'prev-text', title: '右侧文字', default: '', 
                group: Enum.FormControlPropertyGroup.style, editor: Enum.FormControlPropertyEditor.singerLine
            }, {
                name: 'remark', title: '备注名', default: '',
                group: Enum.FormControlPropertyGroup.data, editor: Enum.FormControlPropertyEditor.singerLine
            }
        ],
        events: [
            
        ]
    }, 
]

export function initUniControls() {
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
                .concat(
                    Object.entries(i.control.attrs)
                        .map(([key, value]) => ({[key]:value}))
                )
            )
        }
    }))
}