<template lang="html">
	<div class="color-picker-slider">
        <div ref="slider" class="color-picker-slider-content" :style="sliderStyle" @mousedown="startDrag">
            <div :style="{ left: cursorLeft + 'px' }" class="color-picker-slider-bar"></div>
        </div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get, post } from '@/tools/common';

@Component({
  components: {
  }
})
export default class ColorPickerSlider extends Vue {

    @Prop({
        type: Number,
        default: 0
    }) value!: number;

    @Prop() sliderStyle: any;

    @Prop({ type: Number, default: 100 }) max!: number;

    /** 是否开始拖拽 */
    isStartDrag = false;
    /** 滑块元素 */
    sliderEl: any = {};

    /** 游标离左侧距离 */
    get cursorLeft() {
        return (this.sliderEl.offsetWidth || 0) * this.value / this.max - 8;
    }

    startDrag(e) {
        this.isStartDrag = true;
        this.drag(e);
    }

    drag(e) {
        if (this.isStartDrag) {
            let rect = this.sliderEl.getBoundingClientRect();
            let _cursorLeft = Math.min(Math.max(0, e.pageX - rect.left), rect.width);
            let _value = Math.round(_cursorLeft / this.sliderEl.offsetWidth * this.max);
            this.$emit('input', _value);
            this.$emit('change', _value);
        }
    }

    endDrag() {
        this.isStartDrag = false;
    }
    
	mounted(){
		this.init();
    }

    /** 初始化 */
    init() {
        this.sliderEl = this.$refs.slider;
        document.body.addEventListener('mousemove', this.drag);
        document.body.addEventListener('mouseup', this.endDrag);
    }

    destroy() {
        document.body.removeEventListener('mousemove', this.drag);
        document.body.removeEventListener('mouseup', this.endDrag);
    }
}
</script>

<style lang="scss" scoped>
    .color-picker-slider {
        user-select: none;
        position: relative;
        display: block;
        width: 100%;
        height: 12px;
        border-radius: 3px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);

        &:before {
            content: '';
        }

        > .color-picker-slider-content {
            user-select: none;
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            border-radius: 3px;

            > .color-picker-slider-bar {
            user-select: none;
                position: absolute;
                cursor: default;
                top: -2px;
                left: -7px;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: #F8F8F8;
                box-shadow: 1px 1px 6px 0px rgba(0,0,0,0.4);
            }
        }
    }
</style>