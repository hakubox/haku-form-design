<template>
    <div class="box-editor">
        <div class="box-editor-top">
            <span class="box-editor-label">上</span>
            <input v-model.number="inputValue[0]" @change="change" type="number" />
            <span class="box-editor-unit">px</span>
        </div>
        <div class="box-editor-right">
            <span class="box-editor-label">右</span>
            <input v-model.number="inputValue[1]" @change="change" type="number" />
            <span class="box-editor-unit">px</span>
        </div>
        <div class="box-editor-bottom">
            <span class="box-editor-label">下</span>
            <input v-model.number="inputValue[2]" @change="change" type="number" />
            <span class="box-editor-unit">px</span>
        </div>
        <div class="box-editor-left">
            <span class="box-editor-label">左</span>
            <input v-model.number="inputValue[3]" @change="change" type="number" />
            <span class="box-editor-unit">px</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post, recursive } from '@/tools/common';
import FormDesign from '@/@types/form-design';
import { Getter } from 'vuex-class';

@Component({
  components: {
  }
})
export default class BoxEditor extends Vue {
	/** 当前变量 */
    @Prop({
        default: () => [0, 0, 0, 0],
        type: Array
    }) value!: [number, number, number, number];
    /** 样式类型 */
    @Prop({ default: 'padding' }) styleName!: 'padding' | 'margin';

    /** 真实值 */
    inputValue: [number, number, number, number] = [0, 0, 0, 0];
    
	mounted(){
        this.init();
    }

    /** 初始化 */
    init() {
        this.inputValue = this.value;
    }

    destroy() {
    }

    /** 改变值 */
    change() {
        this.$emit('input', this.inputValue);
    }
}
</script>

<style lang="scss" scoped>
    .box-editor {
        position: relative;
        height: 72px;
        margin-top: 10px;
        margin-bottom: 10px;

        // &:before {
        //     content: '';
        //     position: absolute;
        //     top: 24px;
        //     left: 32%;
        //     width: 36%;
        //     height: 12px;
        //     border: 1px solid #CCC;
        // }

        > div {
            position: absolute;
            height: 24px;
            padding: 0px;
            border-radius: 4px;

            > .box-editor-label {
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin-right: 5px;
            }

            > .box-editor-unit {
                position: absolute;
                top: 0px;
                right: 12px;
                color: #BBB;
                font-size: 12px;
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin-left: 5px;
            }

            > input {
                border: 1px solid #d9d9d9;
                border-radius: 4px;
                height: 24px;
                width: calc(100% - 25px);
                vertical-align: top;
                line-height: 18px;
                padding-right: 20px;
                padding-left: 5px;
                color: #666;
                font-size: 12px;
            }
        }

        > .box-editor-top {
            top: 0px;
            left: 30%;
            width: 40%;
        }

        > .box-editor-right {
            top: 24px;
            right: 0%;
            width: 30%;
        }

        > .box-editor-bottom {
            bottom: 0px;
            right: 30%;
            width: 40%;
        }

        > .box-editor-left {
            top: 24px;
            left: 0%;
            width: 30%;
        }
    }
</style>