<template>
    <a-form-item 
        :colon="false"
        :label="$attrs.label" 
        :extra="$attrs.extra"
        :help="$attrs.help"
        :labelCol="{ span: $attrs.label ? $attrs.labelSpan || 0 : 0, offset: $attrs.label ? $attrs.labelOffset || 0 : 0 }"
        :wrapperCol="{ span: $attrs.label ? $attrs.wrapperSpan || 24 : 24, offset: $attrs.label ? $attrs.wrapperOffset || 0 : 0 }"
        class="form-control" 
        :class="{ 'form-control-loading': loading }" 
    >
        <span v-if="onlyText === true && isOriginControl" :id="private_name" class="form-label">
            <div class="selection-block-remark" v-html="getRemark"></div>
            <a-tooltip v-if="tip" placement="bottomLeft">
                <template slot="title">
                    <span>{{tip}}</span>
                </template>
                {{ formatter }}
            </a-tooltip>
            <template v-else>{{ formatter }}</template>
        </span>
        <template v-else>
            <a-spin v-if="loading" :size="size" class="form-control-spin" />
            <div class="selection-block-remark" :class="_remarksClass" v-html="getRemark"></div>
            <a-tooltip v-if="tip" placement="bottomLeft">
                <template slot="title">
                    <span>{{tip}}</span>
                </template>
                <component :field-name="name"
                    class="wfull bg-transparent" 
                    :size="size" 
                    :disabled="loading || $attrs.disabled"
                    v-decorator="[private_name, { rules: notCheck ? [] : rules, initialValue: $attrs.value, valuePropName: $attrs.valuePropName || 'value', getValueFromEvent: $attrs.valuePropName }]" 
                    :is="control" 
                    :onlyText="onlyText"
                    v-bind="controlAttrs" 
                    v-on="controlListeners"
                    @select="onSelect"
                >
                    <slot></slot>
                </component>
            </a-tooltip>
            <template v-else>
                <component 
                    :field-name="name"
                    class="wfull bg-transparent" 
                    :size="size" 
                    :disabled="loading || $attrs.disabled"
                    v-decorator="[private_name, { rules: notCheck ? [] : rules, initialValue: $attrs.value }]" 
                    :is="control" 
                    :onlyText="onlyText"
                    v-bind="controlAttrs" 
                    v-on="controlListeners"
                    @select="onSelect"
                >
                    <slot></slot>
                </component>
            </template>
        </template>
        
        <slot name="extra"></slot>
    </a-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';

@Component({})
export default class FormControl extends Vue {
    /** 是否加载中 */
    @Prop({ type: Object }) form!: any;
    /** 是否加载中 */
    @Prop({ type: Boolean, default: false }) loading!: boolean;
    /** 是否仅文本 */
    @Prop({ type: Boolean, default: false }) onlyText!: boolean;
    /** 标签宽度 */
    @Prop({ type: Number, default: 6 }) labelCol!: number;
    /** 内容宽度 */
    @Prop({ type: Number, default: 18 }) wrapperCol!: number;
    
    /** 提示 */
    @Prop({ type: String }) tip!: string;
    /** 组件类型 */
    @Prop({ type: String, default: 'span' }) control!: string;
    /** 绑定Name */
    @Prop({ type: String }) name!: string;
    /** 校验方式 */
    @Prop({ type: Array, default: () => [] }) rules!: Array<any>;
    /** 是否校验 */
    @Prop({ type: Boolean, default: true }) isCheck!: boolean;
    /** 控件尺寸 */
    @Prop({ type: String, default: 'default' }) size!: string;
    /** 显示转换 */
    @Prop({ type: Function }) format!: (value: string) => string;

    /** 绑定Name值 */
    private_name: string = '';

    /** 批注 */
    @Inject() readonly bus!: Vue;

    _remarksClass: string = '';

    /** 是否原始控件（影响文本模式下的展示形式） */
    get isOriginControl() {
        return ![
            'antd-form-design-control-date-picker',
            'antd-form-design-control-select',
            'antd-form-design-control-data-search',
            'antd-form-design-control-radio-group',
            'antd-form-design-control-checkbox-group'
        ].includes(this.control);
    }

    /** 表单对象 */
    get notCheck() {
        if (this?.$parent?.$attrs?.notCheck) {
            return this.$parent.$attrs.notCheck as any === true;
        } else return false;
    }

    get controlAttrs() {
        //@ts-ignore
        return Object.assign.apply({}, [{}].concat(Object.entries(this.$attrs).filter(([key, value]) => key != 'value').map(([key, value]) => ({ [key]: value }))));
    }

    get controlListeners() {
        let vm = this;
        return Object.assign({}, this.$listeners, {
            input: event => {
                console.log('input', event);
                vm.$emit('input', event?.target?.value ?? event);
            },
            change: event => {
                console.log('change', this.control, event);
                switch (this.control) {
                    case 'a-date-picker':
                    case 'a-slider':
                    case 'a-input-number':
                    case 'a-rate':
                    case 'a-switch':
                    case 'antd-form-design-control-select':
                    case 'antd-form-design-control-data-search':
                    case 'antd-form-design-control-radio-group':
                        vm.$emit('input', event);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    get formatter() {
        if (this.format) {
            let _re = this.format(this.$attrs.value);
            return _re;
        } else {
            return this.$attrs.value;
        }
    }

    /** 获取批注 */
    get getRemark() {
        let _html = this.formatter ?? '';
        let _re = '';
        //@ts-ignore
        const _remarks = this.bus?.remarks.filter(i => i.field == this.private_name);
        if (_html != '' && _remarks?.length) {
            for (let i = _remarks.length - 1; i >= 0; i--) {
                const item = _remarks[i];
                _re += `<span>${_html.slice(0, item.start)}<span id="${item.id}" class="remark-selection">${_html.slice(item.start, item.end)}</span>${_html.slice(item.end)}</span>`;
            }
        }
        return _re;
    }

    created() {
        // if (this?.$parent?.$attrs?.['field-name']) {
        //     this.private_name = this.$parent.$attrs['field-name'] || this.$attrs.model;
        // }
        // if (this.name) {
        //     this.private_name = this.name || this.$attrs.model;
        // }

        this.private_name = this.$attrs.model || this.$parent.$attrs['field-name'] || this.name;

        // if (this.form && this.$attrs.value) {
        //     this.form.setFieldsValue({
        //         [this.name]: this.$attrs.value
        //     });
        // }

        this._remarksClass = (() => {
            switch (this.size) {
                case 'small':
                    switch (this.control) {
                        case 'a-input': 
                        case 'a-select': 
                        case 'a-date-picker': 
                            return 'ant-input-sm';
                        case 'a-textarea':
                            return 'ant-textarea';
                    }
                    break;
                case 'default':
                    switch (this.control) {
                        case 'a-input': 
                        case 'a-select': 
                        case 'a-date-picker': 
                            return 'remark-ant-input';
                        case 'a-textarea':
                            return 'ant-textarea';
                    }
                    break;
                default:
                    break;
            }
            return '';
        })();
    }

    /** 选择事件 */
    onSelect(e) {
        console.log(e, this);
    }

    mounted() {
        this.bus.$on('selection', (id, str, options) => {
            if (id == this.private_name) {
                let _text = this.formatter;
                //@ts-ignore
                let _remarks = this.bus.remarks;
                if (options && options.el) {
                    options.start = options.el.selectionStart;
                    options.end = options.el.selectionEnd;
                }
                if (options && options.start) {
                    console.log(options);
                    this.$set(_remarks, _remarks.length, {
                        id: _remarks.length + 1,
                        field: this.private_name,
                        start: options.start,
                        end: options.end
                    });
                } else {
                    this.$set(_remarks, _remarks.length, {
                        id: _remarks.length + 1,
                        field: this.private_name,
                        start: _text.indexOf(str),
                        end: _text.indexOf(str) + str.length
                    });
                }
            }
        });
    }
}
</script>

<style lang="scss" scoped>
</style>
