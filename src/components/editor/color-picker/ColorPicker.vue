<template lang="html">
	<div class="color-picker" :class="`color-picker-${size}${isShowPicker ? ' active' : ''}`" @mousedown.stop="extendPicker">
        <input class="color-picker-input" ref="colorInput" type="text" :value="value" @change="changeColor($event)">
        <div class="color-picker-color-box">
            <div class="color-picker-color-value" :style="{ 'background-color': value }"></div>
        </div>
        
        <div class="color-picker-dropdown" ref="colorPicker" :class="{ 'color-picker-dropdown-show': showPicker, 'color-picker-dropdown-top': showPickerTop }" @mousedown.stop>
            <div class="color-picker-disk" ref="colorPickerDisk" :style="{ 'background-color': diskBackGround }" @mousedown="handleStartDrag">
                <div class="color-picker-disk-point" :style="{ transform: `translate(${cursorLeft}px, ${cursorTop}px)` }">
                
                </div>
            </div>

            <div class="color-picker-color">
                <div class="color-picker-oldcolor" :style="{ 'background': oldValue }"></div>
                <div class="color-picker-newcolor" :style="{ 'background': newValue }"></div>
            </div>

            <!-- 色环值 -->
            <color-picker-slider v-model="hue" :max="360" class="color-picker-slider-disk" :slider-style="{ 'background': 'linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)' }" />
            <!-- 透明度 -->
            <color-picker-slider v-model="alpha" :max="100" class="color-picker-slider-alpha" :slider-style="{ 'background': `linear-gradient(90deg,${setAlpha(0)} 0%,${setAlpha(1)} 100%)` }" />

            <hr />

            <div class="color-picker-history">
                <div class="color-picker-history-item" v-for="item in history" :key="item.id">
                    <div class="color-picker-history-item-color" :title="item" :style="{ background: item }" @click="selectHistoryColor(item)"></div>
                </div>
            </div>

            <hr style="margin-top: 2px;" v-show="history.length" />

            <div class="color-picker-footer">
                <div class="color-picker-footer-text">
                    <input type="text" v-model="newValue">
                    <div class="color-picker-footer-text-type">{{colorType}}</div>
                    <i v-if="canChangeColorType" title="切换类型" class="color-picker-footer-text-changetype fal fa-exchange" @click="changeColorType"></i>
                </div>
                <div class="color-picker-footer-tools">
                    <button class="color-picker-footer-tools-clear">清空</button>
                    <button class="color-picker-footer-tools-confirm" @click="comfirm">确定</button>
                </div>
            </div>

        </div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';
import Color from '@/lib/color/Color';

@Component({
  components: {
  }
})
export default class ColorPicker extends Vue {
	/** 当前颜色 */
    @Prop({
        default: ''
    }) value!: string;
	/** 显示透明色 */
    @Prop({
        default: true
    }) showAlpha!: boolean;
    /** 颜色类型 */
    @Prop({
        type: String,
        default: 'rgb'
    }) colorType!: ('hex' | 'rgb' | 'hsl' | 'hsv');
    /** 是否可切换颜色类型 */
    @Prop({
        type: Boolean,
        default: false
    }) canChangeColorType!: boolean;
    @Prop({
        type: String,
        default: 'default'
    }) size!: ('large' | 'default' | 'small');

    /** 是否开始选择 */
    showPicker: boolean = false;
    /** 弹框展开方向 */
    showPickerTop: boolean = true;

    /** 旧色值 */
    oldValue: string = '#FFFFFF';
    /** 新色值 */
    newValue: string = '';
    
    /** 色环值 */
    get hue() {
        return this.color.get('hue');
    }
    set hue(value) {
        this.color.set('hue', value);
        this.newValue = this.color.value;
    }

    /** 透明度 */
    get alpha() {
        return this.color.get('alpha');
    }
    set alpha(value) {
        this.color.set('alpha', value);
        this.newValue = this.color.value;
    }

    /** 是否开始在色板拖拽取色 */
    isStartDrag = false;
    /** 色板游标离上部距离 */
    cursorTop = 0;
    /** 色板游标离左部距离 */
    cursorLeft = 0;

    color: Color = new Color({
        enableAlpha: this.showAlpha,
        format: this.colorType
    });
    /** 文本框元素 */
    colorInputEl;
    /** 弹出框元素 */
    colorPickerEl;
    /** 画板元素 */
    colorPickerDiskEl;

    /** 调色板的背景色 */
    get diskBackGround() {
        return `hsl(${this.color.get('hue')}, 100%, 50%)`;
    }

    /** 颜色历史记录 */
    history: Array<string> = [];

    /** 是否显示下拉框 */
    isShowPicker = false;

    /** 颜色改变函数 */
    changeColor(e?) {
        let value = e ? e.target.value : this.color.value;
        
        if (this.value != value) {

            let rect = this.colorPickerDiskEl.getBoundingClientRect();
            this.cursorLeft = this.color.get('saturation') * rect.width / 100;
            this.cursorTop = (100 - this.color.get('value')) * rect.height / 100;

            this.color.fromString(value.trim().toLowerCase());
        }
    }

    /** 设置透明度（0 ~ 1） */
    setAlpha(alpha: number) {
        const { r, g, b } = this.color.toRgb();
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
	mounted(){
        this.init();
        
    }

    /** 初始化 */
    init() {
        this.colorInputEl = this.$refs.colorInput;
        this.colorPickerEl = this.$refs.colorPicker;
        this.colorPickerDiskEl = this.$refs.colorPickerDisk;
        this.color.fromString(this.value.trim().toLowerCase());
        this.color.format = this.colorType;
        this.alpha = this.color._alpha;
        document.body.addEventListener('mouseup', this.handleEndDrag);
        document.body.addEventListener('mousemove', this.handleDrag);
        document.body.addEventListener('mousedown', this.shrinkPicker);

        let _historyList:any = sessionStorage.getItem('colorPickerHistory');
        if (!_historyList || !_historyList.length) _historyList = [ 'rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)' ];
        else _historyList = JSON.parse(_historyList);
        this.history = _historyList;

        let rect = this.colorPickerDiskEl.getBoundingClientRect();
        this.cursorLeft = this.color.get('saturation') * rect.width / 100;
        this.cursorTop = (100 - this.color.get('value')) * rect.height / 100;
    }

    destroy() {
        document.body.addEventListener('mouseup', this.handleEndDrag);
        document.body.addEventListener('mousemove', this.handleDrag);
        document.body.addEventListener('mousedown', this.shrinkPicker);
    }

    handleStartDrag(e) {
        this.isStartDrag = true;
        this.handleDrag(e);
    }

    /** 在色板取色 */
    handleDrag(e) {
        if (this.isStartDrag) {
            let rect = this.colorPickerDiskEl.getBoundingClientRect();
            let left = e.pageX - rect.left;
            let top = e.pageY - rect.top;
            left = Math.min(Math.max(0, left), rect.width);
            top = Math.min(Math.max(0, top), rect.height);
            this.cursorLeft = left;
            this.cursorTop = top;
            this.color.set({
              saturation: left / rect.width * 100,
              value: 100 - top / rect.height * 100
            });
            this.newValue = this.color.value;
        }
    }

    /** 拖拽完毕 */
    handleEndDrag() {
        this.isStartDrag = false;
    }

    /** 选择历史颜色 */
    selectHistoryColor(item) {
        this.setColor(item);
    }

    setColor(color: string) {
        this.newValue = color;
        this.color.fromString(this.newValue);

        let rect = this.colorPickerDiskEl.getBoundingClientRect();
        this.cursorLeft = this.color.get('saturation') * rect.width / 100;
        this.cursorTop = (100 - this.color.get('value')) * rect.height / 100;
        
        this.comfirm();
    }

    /** 切换颜色类型 */
    changeColorType() {
        let colorType = this.colorType;
        switch (colorType) {
            case 'rgb':
                colorType = 'hsv';
                break;
            case 'hsv':
                colorType = 'hsl';
                break;
            case 'hsl':
                colorType = 'hex';
                break;
            case 'hex':
                colorType = 'rgb';
                break;
            default:
                break;
        }
        this.$emit('update:colorType', colorType);
        this.color.format = this.colorType;
        this.setColor(this.color.value);
    }

    /** 展开 */
    extendPicker() {
        let { y } = this.colorInputEl.getBoundingClientRect();
        let { height } = document.body.getBoundingClientRect();
        this.showPickerTop = height - y < 380;
        this.showPicker = true;

        this.init();
    }
    /** 收缩 */
    shrinkPicker() {
        this.showPicker = false;
    }

    /** 确定 */
    comfirm() {
        this.oldValue = this.newValue;
        this.$emit('input', this.newValue);
        this.showPicker = false;
        
        let _color = new Color({
            enableAlpha: true,
            format: 'rgb'
        });
        if (this.history.length > 20) {
            this.history.splice(0, 1);
        }
        _color.fromString(this.newValue);
        if (!this.history.includes(_color.value)) {
            this.history.push(_color.value);
            sessionStorage.setItem('colorPickerHistory', JSON.stringify(this.history));
        }
    }
    
    
}
</script>

<style lang="scss" scoped>
    // 颜色选择器
    .color-picker {
        position: relative;
        display: inline-block;
        width: 100%;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 26px;

        &.color-picker-large {

        }
        &.color-picker-default {
            
        }
        &.color-picker-small {
            line-height: 20px;

            > .color-picker-color-box {
                top: 3px;
            }
        }

        > .color-picker-input {
            border: none;
            width: 100%;
            border-radius: 4px;
            padding-right: 30px;
            padding-left: 10px;
        }

        > .color-picker-color-box {
            position: absolute;
            top: 6px;
            right: 6px;
            border-radius: 3px;
            width: 16px;
            height: 16px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);

            > .color-picker-color-value {
                position: absolute;
                top: 0px;
                left: 0px;
                border-radius: 3px;
                width: 100%;
                height: 100%;
                box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2) inset;
            }
        }

        // 下拉框
        > .color-picker-dropdown {
            position: absolute;
            z-index: 3;
            background-color: white;
            border: 1px solid #EEE;
            top: calc(100% + 2px);
            right: 0px;
            padding: 5px;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transform: translateY(20px);
            transition: 0.15s;
            visibility: hidden;
            will-change: transform, opacity;

            &.color-picker-dropdown-show {
                visibility: visible;
                transform: translateY(0px);
                opacity: 1;
            }

            &.color-picker-dropdown-top {
                top: initial;
                bottom: calc(100% + 4px);
                transform: translateY(-20px);

                &.color-picker-dropdown-show {
                    visibility: visible;
                    transform: translateY(0px);
                    opacity: 1;
                }
            }

            > hr {
            }

            > .color-picker-color {
                display: flex;
                flex-direction: column;
                width: 50px;
                height: 50px;
                margin: 12px;
                margin-left: 30px;
                border-radius: 4px;
                border: 1px solid #E0E0E0;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
            
                > .color-picker-oldcolor {
                    position: relative;
                    flex-grow: 1;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;

                    &:before {
                        position: absolute;
                        color: #BBB;
                        content: '旧';
                        line-height: 25px;
                        left: -22px;
                        font-size: 12px;
                    }
                }
                > .color-picker-newcolor {
                    position: relative;
                    flex-grow: 1;
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;

                    &:before {
                        content: '新';
                        position: absolute;
                        color: #BBB;
                        line-height: 25px;
                        left: -22px;
                        font-size: 12px;
                    }
                }
            }

            > .color-picker-disk {
                user-select: none;
                position: relative;
                width: 290px;
                height: 190px;

                > .color-picker-disk-point {
                    position: absolute;
                    cursor: pointer;
                    top: -6px;
                    left: -6px;
                    width: 13px;
                    height: 13px;
                    border-radius: 50%;
                    border: 1px solid white;
                    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
                    background-color: rgba(255,255,255,0.1);

                    &:before {
                        position: absolute;
                        top: -15px;
                        left: -15px;
                        width: 43px;
                        height: 43px;
                    }
                }
                
                &:before {
                    content: '';
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(0deg,#000,transparent),
                                linear-gradient(90deg,#fff,hsla(0,0%,100%,0));
                }
            }

            > .color-picker-slider-disk {
                position: absolute;
                top: 213px;
                left: 100px;
                width: calc(100% - 115px);
            }

            > .color-picker-slider-alpha {
                position: absolute;
                top: 238px;
                left: 100px;
                width: calc(100% - 115px);
            }

            // 历史列表
            > .color-picker-history {
                display: flex;
                flex-wrap: wrap;

                > .color-picker-history-item {
                    position: relative;
                    cursor: pointer;
                    display: inline-block;
                    margin: 0px 4px 8px 4px;
                    width: 16px;
                    height: 16px;
                    border-radius: 3px;
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);

                    > .color-picker-history-item-color {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: 100%;
                        height: 100%;
                        border-radius: 3px;
                        box-shadow: 0px 0px 3px rgba(0,0,0,0.2) inset;  
                    }
                }
            }

            // 选择器底部
            > .color-picker-footer {
                display: flex;
                width: 290px;

                > .color-picker-footer-text {
                    flex-grow: 1;
                    display: flex;
                    width: 100%;
                    align-items: center;
                    border: 1px solid #d9d9d9;
                    border-radius: 4px;
                    margin-right: 4px;

                    > input {
                        border: none;
                        display: inline-block;
                        line-height: 20px;
                        flex-shrink: 1;
                        padding-left: 5px;
                        font-size: 12px;
                        width: 100%;
                    }

                    > .color-picker-footer-text-type {
                        display: inline-block;
                        cursor: default;
                        width: 30px;
                        line-height: 24px;
                        text-align: center;
                        flex-shrink: 0;
                        color: #AAA;
                    }

                    > .color-picker-footer-text-changetype {
                        display: inline-block;
                        cursor: pointer;
                        width: 26px;
                        line-height: 22px;
                        border-radius: 4px;
                        text-align: center;
                        flex-shrink: 0;
                        color: $-primary-color;
                        transition: 0.2s;
                        margin-right: 2px;

                        &:hover {
                            color: white;
                            background-color: $-primary-color;
                        }
                    }
                }

                > .color-picker-footer-tools {
                    text-align: right;
                    flex-shrink: 0;

                    > .color-picker-footer-tools-confirm {
                        border: 1px solid #d9d9d9;
                        background-color: white;
                        border-radius: 4px;
                        font-size: 12px;
                        height: 27px;
                        line-height: 24px;
                        padding-left: 8px;
                        padding-right: 8px;
                        transition: 0.2s;

                        &:hover {
                            color: white;
                            background-color: $-primary-color;
                        }
                    }

                    > .color-picker-footer-tools-clear {
                        border: none;
                        background-color: white;
                        border-radius: 4px;
                        color: $-primary-color;
                        font-size: 12px;
                        height: 27px;
                        line-height: 24px;
                        padding-left: 6px;
                        padding-right: 6px;
                        margin-right: 4px;
                        transition: 0.2s;

                        &:hover {
                            background-color: #F5F5F5;
                        }
                    }
                }
            }
            
        }

        
    }
</style>