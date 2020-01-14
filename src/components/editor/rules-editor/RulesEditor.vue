<template>
    <div class="rules-editor">
        <!-- 是否必填 -->
        <a-input-group compact class="rule-item">
            <a-checkbox class="rule-item-label" @change="changeEnable()" v-model="allRules.required.value">是否必填</a-checkbox>
        </a-input-group>
        <!-- 最大文本长度 -->
        <a-input-group compact class="rule-item" :class="{ enable: allRules.len.enable }">
            <a-checkbox class="rule-item-label" @change="changeEnable(allRules.len)" v-model="allRules.len.enable">最大长度</a-checkbox>
            <a-input-number class="rule-item-value" @change="change" size="small" v-show="allRules.len.enable" v-model.lazy="allRules.len.value" />
        </a-input-group>
        <!-- 最小值 -->
        <a-input-group compact class="rule-item" :class="{ enable: allRules.min.enable }">
            <a-checkbox class="rule-item-label" @change="changeEnable(allRules.min)" v-model="allRules.min.enable">最小值</a-checkbox>
            <a-input-number class="rule-item-value" @change="change" size="small" v-show="allRules.min.enable" v-model.lazy="allRules.min.value" />
        </a-input-group>
        <!-- 最大值 -->
        <a-input-group compact class="rule-item" :class="{ enable: allRules.max.enable }">
            <a-checkbox class="rule-item-label" @change="changeEnable(allRules.max)" v-model="allRules.max.enable">最大值</a-checkbox>
            <a-input-number class="rule-item-value" @change="change" size="small" v-show="allRules.max.enable" v-model.lazy="allRules.max.value" />
        </a-input-group>
        <!-- 正则表达式 -->
        <a-input-group compact class="rule-item" :class="{ enable: allRules.pattern.enable }">
            <a-checkbox class="rule-item-label" @change="changeEnable(allRules.pattern)" v-model="allRules.pattern.enable">正则表达式</a-checkbox>
            <a-input class="rule-item-value" @change="change" size="small" v-show="allRules.pattern.enable" v-model.lazy.trim="allRules.pattern.value" />
        </a-input-group>
        <!-- 内建校验类型 https://github.com/yiminghe/async-validator#type -->
        <a-input-group compact class="rule-item" :class="{ enable: allRules.type.enable }">
            <a-checkbox class="rule-item-label" @change="changeEnable(allRules.type)" v-model="allRules.type.enable">数值类型</a-checkbox>
            <a-select class="rule-item-value" @change="change" size="small" v-show="allRules.type.enable" :options="types" v-model="allRules.type.value"></a-select>
        </a-input-group>
        <!-- 自定义校验 -->
        <a-input-group compact class="rule-item" :class="{ enable: allRules.validator.enable }">
            <a-checkbox class="rule-item-label" @change="changeEnable(allRules.validator)" v-model="allRules.validator.enable">自定义校验</a-checkbox>
            <a-input class="rule-item-value" @change="change" size="small" v-show="allRules.validator.enable" v-model="allRules.validator.value" />
        </a-input-group>
        <!-- 允许空格 -->
        <a-input-group compact class="rule-item">
            <a-checkbox class="rule-item-label" @change="changeEnable()" v-model="allRules.whitespace.value">允许空格</a-checkbox>
        </a-input-group>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post, recursive } from '@/tools/common';
import FormDesign from '@/@types/form-design';
import { Getter } from 'vuex-class';

interface Rules {
    /** 是否启用校验 */
    enable: boolean;
    /** 值 */
    value: any;
}

@Component({
  components: {
  }
})
export default class RulesEditor extends Vue {
	/** 当前变量 */
    @Prop({
        default: ''
    }) value!: Array<any>;
    /** 筛选变量类型 */
    @Prop({
        type: String,
        default: 'any'
    }) type!: string;
    @Prop({
        type: String,
        default: 'default'
    }) size!: ('large' | 'default' | 'small');

    /** 真实值 */
    inputValue: Array<string> = [];

    /** 所有条件状态 */
    allRules: Record<string, Rules> = {
        required: { enable: true, value: undefined },
        enum: { enable: false, value: undefined },
        len: { enable: false, value: undefined },
        min: { enable: false, value: undefined },
        max: { enable: false, value: undefined },
        message: { enable: false, value: undefined },
        pattern: { enable: false, value: undefined },
        type: { enable: false, value: undefined },
        transform: { enable: false, value: undefined },
        validator: { enable: false, value: undefined },
        whitespace: { enable: true, value: undefined }
    };

    /** 内建校验类型选项 */
    types = [
        { value: 'any', label: '任意值' },
        { value: 'string', label: '字符串' },
        { value: 'number', label: '数字' },
        { value: 'boolean', label: '布尔/真假' },
        { value: 'method', label: '函数' },
        { value: 'regexp', label: '正则表达式' },
        { value: 'integer', label: '整数' },
        { value: 'float', label: '浮点数' },
        { value: 'array', label: '数组' },
        { value: 'object', label: '对象' },
        { value: 'enum', label: '枚举' },
        { value: 'date', label: '日期' },
        { value: 'url', label: '地址' },
        { value: 'hex', label: 'HEX颜色' },
        { value: 'email', label: '邮箱' },
    ];
    
	mounted(){
        this.init();
    }

    /** 初始化 */
    init() {
        if (this.value) {
            this.value.forEach(i => {
                this.$set(this.allRules, i.category, { enable: !!i[i.category], value: i[i.category] });
            });
        }
    }

    destroy() {
    }

    /** 改变值 */
    change() {
        let re = Object.entries(this.allRules).filter(([key, value]) => value.enable && !!value.value).map(([key, value]) => {
            return { [key]: value.value, category: key };
        });
        this.$emit('input', re);
    }

    changeEnable(variable?) {
        if (variable) {
            variable.value = undefined;
        }
        this.change();
    }
    
}
</script>

<style lang="scss" scoped>
.rules-editor {
    word-break: break-all;
    white-space: normal;

    > .rule-item {
        display: inline-block;
        margin-bottom: 8px;
        width: auto;

        &.enable {
            display: flex;
            width: 100%;
        }

        > .rule-item-label {
            user-select: none;
            vertical-align: middle;
            line-height: 22px;
            padding-left: 8px;
            flex-grow: 1;
            white-space: nowrap;
        }
        > .rule-item-value {
            flex-grow: 200;
        }
    }
}



</style>